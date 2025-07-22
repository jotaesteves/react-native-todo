import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useTodoStore, type FilterType } from "../store/todoStore";
import { useTheme } from "../contexts/ThemeContext";
import { getThemeColors } from "../utils/theme";

interface TodoFiltersProps {
  showFilters: boolean;
}

export function TodoFilters({ showFilters }: TodoFiltersProps) {
  const { filter, setFilter } = useTodoStore();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const themeColors = getThemeColors(isDark);

  if (!showFilters) return null;

  return (
    <View className={`flex-row mb-4 ${themeColors.cardBackground} rounded-lg shadow-sm border ${themeColors.border}`}>
      {(["all", "active", "completed"] as const).map((filterType: FilterType) => (
        <TouchableOpacity
          key={filterType}
          onPress={() => setFilter(filterType)}
          className={`flex-1 py-3 ${filter === filterType ? themeColors.primary : themeColors.cardBackground} ${
            filterType === "all" ? "rounded-l-lg" : filterType === "completed" ? "rounded-r-lg" : ""
          }`}
        >
          <Text
            className={`text-center font-medium capitalize ${
              filter === filterType ? "text-white" : themeColors.textSecondary
            }`}
          >
            {filterType}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
