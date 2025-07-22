import { create } from "zustand";

export interface Todo {
  id: string;
  text: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
}

export type FilterType = "all" | "active" | "completed";

interface TodoState {
  todos: Todo[];
  filter: FilterType;
  inputText: string;
  inputDescription: string;
}

interface TodoActions {
  addTodo: (text: string, description?: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  clearCompleted: () => void;
  setFilter: (filter: FilterType) => void;
  setInputText: (text: string) => void;
  setInputDescription: (description: string) => void;
  getFilteredTodos: () => Todo[];
  getStats: () => {
    total: number;
    active: number;
    completed: number;
  };
}

type TodoStore = TodoState & TodoActions;

export const useTodoStore = create<TodoStore>((set, get) => ({
  // Initial state
  todos: [],
  filter: "all",
  inputText: "",
  inputDescription: "",

  // Actions
  addTodo: (text: string, description?: string) => {
    const trimmedText = text.trim();
    if (!trimmedText) return;

    const newTodo: Todo = {
      id: Date.now().toString(),
      text: trimmedText,
      description: description?.trim() || undefined,
      completed: false,
      createdAt: new Date(),
    };

    set((state) => ({
      todos: [newTodo, ...state.todos],
      inputText: "",
      inputDescription: "",
    }));
  },

  toggleTodo: (id: string) => {
    set((state) => ({
      todos: state.todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
    }));
  },

  deleteTodo: (id: string) => {
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    }));
  },

  clearCompleted: () => {
    set((state) => ({
      todos: state.todos.filter((todo) => !todo.completed),
    }));
  },

  setFilter: (filter: FilterType) => {
    set({ filter });
  },

  setInputText: (text: string) => {
    set({ inputText: text });
  },

  setInputDescription: (description: string) => {
    set({ inputDescription: description });
  },

  getFilteredTodos: () => {
    const { todos, filter } = get();
    switch (filter) {
      case "active":
        return todos.filter((todo) => !todo.completed);
      case "completed":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  },

  getStats: () => {
    const { todos } = get();
    return {
      total: todos.length,
      active: todos.filter((todo) => !todo.completed).length,
      completed: todos.filter((todo) => todo.completed).length,
    };
  },
}));
