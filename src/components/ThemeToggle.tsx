import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { getThemeColors } from "../utils/theme";

export function ThemeToggle() {
  const { theme, themeMode, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const themeColors = getThemeColors(isDark);

  const getThemeIcon = () => {
    if (themeMode === "light") return "☀️";
    if (themeMode === "dark") return "🌙";
    return "🔄"; // system
  };

  const getThemeLabel = () => {
    if (themeMode === "light") return "Light";
    if (themeMode === "dark") return "Dark";
    return "Auto";
  };

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      className={`px-3 py-2 rounded-lg ${themeColors.cardBackground} ${themeColors.border} border`}
    >
      <Text className={`text-xs ${themeColors.textSecondary}`}>
        {getThemeIcon()} {getThemeLabel()}
      </Text>
    </TouchableOpacity>
  );
}
