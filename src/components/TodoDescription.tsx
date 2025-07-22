import React from "react";
import { Text, View, TextInput } from "react-native";
import { useTodoStore } from "../store/todoStore";
import { useTheme } from "../contexts/ThemeContext";
import { getThemeColors } from "../utils/theme";

export function TodoDescription() {
  const { inputDescription, setInputDescription } = useTodoStore();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const themeColors = getThemeColors(isDark);

  return (
    <View className="mb-4">
      <Text className={`text-sm font-medium mb-2 ${themeColors.textSecondary}`}>Description (Optional)</Text>
      <View className={`${themeColors.cardBackground} rounded-lg shadow-sm border ${themeColors.border}`}>
        <TextInput
          className={`px-4 py-3 text-base ${themeColors.text} min-h-[80px]`}
          placeholder="Add more details about your todo..."
          placeholderTextColor={themeColors.placeholder}
          value={inputDescription}
          onChangeText={setInputDescription}
          multiline
          textAlignVertical="top"
        />
      </View>
    </View>
  );
}
