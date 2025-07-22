import React from "react";
import { Text, TouchableOpacity, Alert } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { getThemeColors } from "../utils/theme";

interface ClearCompletedButtonProps {
  completedCount: number;
  onClearCompleted: () => void;
}

export function ClearCompletedButton({ completedCount, onClearCompleted }: ClearCompletedButtonProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const themeColors = getThemeColors(isDark);

  const handleClearCompleted = () => {
    if (completedCount === 0) return;

    Alert.alert("Clear Completed", `Delete ${completedCount} completed todo${completedCount > 1 ? "s" : ""}?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Clear",
        style: "destructive",
        onPress: onClearCompleted,
      },
    ]);
  };

  if (completedCount === 0) return null;

  return (
    <TouchableOpacity
      onPress={handleClearCompleted}
      className={`mb-12 p-3 ${themeColors.danger} rounded-lg border ${themeColors.dangerBorder}`}
    >
      <Text className={`text-center ${themeColors.dangerText} font-medium`}>
        Clear {completedCount} Completed Todo{completedCount > 1 ? "s" : ""}
      </Text>
    </TouchableOpacity>
  );
}
