import React from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../contexts/ThemeContext";
import { getThemeColors } from "../utils/theme";
import { ThemeToggle } from "./ThemeToggle";

export function TodoHeader() {
  const { top } = useSafeAreaInsets();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const themeColors = getThemeColors(isDark);

  return (
    <View style={{ paddingTop: top }} className={`${themeColors.headerBackground} ${themeColors.border} border-b`}>
      <View className="px-4 py-4 flex-row items-center justify-between">
        <Text className={`text-2xl font-bold ${themeColors.text}`}>📝 Todo App</Text>
        <ThemeToggle />
      </View>
    </View>
  );
}
