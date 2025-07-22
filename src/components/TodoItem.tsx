import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { type Todo } from "../store/todoStore";
import { useTheme } from "../contexts/ThemeContext";
import { getThemeColors } from "../utils/theme";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const themeColors = getThemeColors(isDark);

  return (
    <View className={`mb-3 ${themeColors.cardBackground} rounded-lg shadow-sm border ${themeColors.border}`}>
      <View className="flex-row items-center p-4">
        <TouchableOpacity onPress={() => onToggle(todo.id)} className="mr-3">
          <View
            className={`w-6 h-6 rounded-full border-2 ${
              todo.completed ? `${themeColors.success} ${themeColors.successBorder}` : themeColors.border
            } flex items-center justify-center`}
          >
            {todo.completed && <Text className="text-white text-xs font-bold">✓</Text>}
          </View>
        </TouchableOpacity>

        <View className="flex-1">
          <Text className={`text-base ${todo.completed ? `line-through ${themeColors.textMuted}` : themeColors.text}`}>
            {todo.text}
          </Text>
          {todo.description && (
            <Text
              className={`text-sm mt-1 ${
                todo.completed ? `line-through ${themeColors.textMuted}` : themeColors.textSecondary
              }`}
            >
              {todo.description}
            </Text>
          )}
          <Text className={`text-xs ${themeColors.textMuted} mt-1`}>
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
