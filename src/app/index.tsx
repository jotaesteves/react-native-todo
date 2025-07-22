import React from "react";
import { Text, View, TextInput, TouchableOpacity, FlatList, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTodoStore, type Todo } from "../store/todoStore";

export default function TodoApp() {
  const {
    inputText,
    filter,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    setFilter,
    setInputText,
    getFilteredTodos,
    getStats,
  } = useTodoStore();

  const filteredTodos = getFilteredTodos();
  const stats = getStats();

  const handleAddTodo = () => {
    addTodo(inputText);
  };

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

  const handleClearCompleted = () => {
    if (stats.completed === 0) return;

    Alert.alert("Clear Completed", `Delete ${stats.completed} completed todo${stats.completed > 1 ? "s" : ""}?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Clear",
        style: "destructive",
        onPress: clearCompleted,
      },
    ]);
  };

  return (
    <KeyboardAvoidingView className="flex-1 bg-gray-50" behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <Header />
      <View className="flex-1 px-4">
        {/* Add Todo Input */}
        <View className="mb-6">
          <View className="flex-row items-center bg-white rounded-lg shadow-sm border border-gray-200">
            <TextInput
              className="flex-1 px-4 py-3 text-base text-gray-800"
              placeholder="What needs to be done?"
              placeholderTextColor="#9CA3AF"
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={handleAddTodo}
              returnKeyType="done"
            />
            <TouchableOpacity
              onPress={handleAddTodo}
              className="px-4 py-3 bg-blue-500 rounded-r-lg"
              disabled={!inputText.trim()}
            >
              <Text className="text-white font-semibold">Add</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats */}
        {stats.total > 0 && (
          <View className="mb-4 p-3 bg-white rounded-lg shadow-sm border border-gray-200">
            <Text className="text-center text-gray-600">
              {stats.total} total • {stats.active} active • {stats.completed} completed
            </Text>
          </View>
        )}

        {/* Filter Buttons */}
        {stats.total > 0 && (
          <View className="flex-row mb-4 bg-white rounded-lg shadow-sm border border-gray-200">
            {(["all", "active", "completed"] as const).map((filterType) => (
              <TouchableOpacity
                key={filterType}
                onPress={() => setFilter(filterType)}
                className={`flex-1 py-3 ${filter === filterType ? "bg-blue-500" : "bg-white"} ${
                  filterType === "all" ? "rounded-l-lg" : filterType === "completed" ? "rounded-r-lg" : ""
                }`}
              >
                <Text
                  className={`text-center font-medium capitalize ${
                    filter === filterType ? "text-white" : "text-gray-600"
                  }`}
                >
                  {filterType}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Todo List */}
        <FlatList
          data={filteredTodos}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={
            <View className="flex-1 justify-center items-center py-20">
              <Text className="text-gray-500 text-lg mb-2">
                {stats.total === 0 ? "No todos yet" : `No ${filter} todos`}
              </Text>
              <Text className="text-gray-400 text-center">
                {stats.total === 0 ? "Add your first todo above" : `Try switching to a different filter`}
              </Text>
            </View>
          }
          renderItem={({ item }) => <TodoItem todo={item} onToggle={toggleTodo} onDelete={handleDeleteTodo} />}
        />

        {/* Clear Completed Button */}
        {stats.completed > 0 && (
          <TouchableOpacity
            onPress={handleClearCompleted}
            className="mb-4 p-3 bg-red-50 rounded-lg border border-red-200"
          >
            <Text className="text-center text-red-600 font-medium">
              Clear {stats.completed} Completed Todo{stats.completed > 1 ? "s" : ""}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <View className="mb-3 bg-white rounded-lg shadow-sm border border-gray-200">
      <View className="flex-row items-center p-4">
        <TouchableOpacity onPress={() => onToggle(todo.id)} className="mr-3">
          <View
            className={`w-6 h-6 rounded-full border-2 ${
              todo.completed ? "bg-green-500 border-green-500" : "border-gray-300"
            } flex items-center justify-center`}
          >
            {todo.completed && <Text className="text-white text-xs font-bold">✓</Text>}
          </View>
        </TouchableOpacity>

        <View className="flex-1">
          <Text className={`text-base ${todo.completed ? "line-through text-gray-500" : "text-gray-800"}`}>
            {todo.text}
          </Text>
          <Text className="text-xs text-gray-400 mt-1">
            {todo.createdAt.toLocaleDateString()} at{" "}
            {todo.createdAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </Text>
        </View>

        <TouchableOpacity onPress={() => onDelete(todo.id)} className="ml-3 p-2">
          <Text className="text-red-500 text-lg">🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function Header() {
  const { top } = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: top }} className="bg-white border-b border-gray-200">
      <View className="px-4 py-4">
        <Text className="text-2xl font-bold text-center text-gray-800">📝 Todo App</Text>
      </View>
    </View>
  );
}
