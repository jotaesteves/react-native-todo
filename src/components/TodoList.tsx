import React from "react";
import { Text, View, FlatList } from "react-native";
import { type Todo, type FilterType } from "../store/todoStore";
import { TodoItem } from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  filter: FilterType;
  totalTodos: number;
  onToggleTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
}

export function TodoList({ todos, filter, totalTodos, onToggleTodo, onDeleteTodo }: TodoListProps) {
  const EmptyComponent = () => (
    <View className="flex-1 justify-center items-center py-20">
      <Text className="text-gray-500 text-lg mb-2">{totalTodos === 0 ? "No todos yet" : `No ${filter} todos`}</Text>
      <Text className="text-gray-400 text-center">
        {totalTodos === 0 ? "Add your first todo above" : `Try switching to a different filter`}
      </Text>
    </View>
  );

  return (
    <FlatList
      data={todos}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 20 }}
      ListEmptyComponent={EmptyComponent}
      renderItem={({ item }) => <TodoItem todo={item} onToggle={onToggleTodo} onDelete={onDeleteTodo} />}
    />
  );
}
