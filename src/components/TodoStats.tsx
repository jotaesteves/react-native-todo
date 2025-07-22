import React from "react";
import { Text, View } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { getThemeColors } from "../utils/theme";

interface TodoStatsProps {
  total: number;
  active: number;
  completed: number;
}

export function TodoStats({ total, active, completed }: TodoStatsProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const themeColors = getThemeColors(isDark);

  if (total === 0) return null;

  return (
    <View className={`mb-4 p-3 ${themeColors.cardBackground} rounded-lg shadow-sm border ${themeColors.border}`}>
      <Text className={`text-center ${themeColors.textSecondary}`}>
        {total} total • {active} active • {completed} completed
      </Text>
    </View>
  );
}
