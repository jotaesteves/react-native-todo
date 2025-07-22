import React from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { useTodoStore } from "../store/todoStore";
import { useTheme } from "../contexts/ThemeContext";
import { getThemeColors } from "../utils/theme";

export function TodoInput() {
  const { inputText, inputDescription, setInputText, addTodo } = useTodoStore();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const themeColors = getThemeColors(isDark);

  const handleAddTodo = () => {
    addTodo(inputText, inputDescription);
  };

  return (
    <View className="mb-4">
      <Text className={`text-sm font-medium mb-2 ${themeColors.textSecondary}`}>What needs to be done?</Text>
      <View
        className={`flex-row items-center ${themeColors.cardBackground} rounded-lg shadow-sm border ${themeColors.border}`}
      >
        <TextInput
          className={`flex-1 px-4 py-3 text-base ${themeColors.text}`}
          placeholder="Enter your todo title..."
          placeholderTextColor={themeColors.placeholder}
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={handleAddTodo}
          returnKeyType="done"
        />
        <TouchableOpacity
          onPress={handleAddTodo}
          className={`px-4 py-3 ${themeColors.primary} rounded-r-lg`}
          disabled={!inputText.trim()}
        >
          <Text className="text-white font-semibold">Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
