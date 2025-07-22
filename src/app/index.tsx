import React from "react";
import { View, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { useTodoStore } from "../store/todoStore";
import { TodoHeader, TodoInput, TodoStats, TodoFilters, TodoList, ClearCompletedButton } from "../components";

export default function TodoApp() {
  const { filter, toggleTodo, deleteTodo, clearCompleted, getFilteredTodos, getStats } = useTodoStore();

  const filteredTodos = getFilteredTodos();
  const stats = getStats();

  const handleDeleteTodo = (id: string) => {
    Alert.alert("Delete Todo", "Are you sure you want to delete this todo?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deleteTodo(id),
      },
    ]);
  };

  return (
    <KeyboardAvoidingView className="flex-1 bg-gray-50" behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <TodoHeader />

      <View className="flex-1 px-4 mt-2">
        <TodoInput />

        <TodoStats total={stats.total} active={stats.active} completed={stats.completed} />

        <TodoFilters showFilters={stats.total > 0} />

        <TodoList
          todos={filteredTodos}
          filter={filter}
          totalTodos={stats.total}
          onToggleTodo={toggleTodo}
          onDeleteTodo={handleDeleteTodo}
        />

        <ClearCompletedButton completedCount={stats.completed} onClearCompleted={clearCompleted} />
      </View>
    </KeyboardAvoidingView>
  );
}
