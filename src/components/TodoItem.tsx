import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { type Todo } from "../store/todoStore";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
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
