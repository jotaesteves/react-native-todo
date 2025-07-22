import React from "react";
import { Text, View } from "react-native";

interface TodoStatsProps {
  total: number;
  active: number;
  completed: number;
}

export function TodoStats({ total, active, completed }: TodoStatsProps) {
  if (total === 0) return null;

  return (
    <View className="mb-4 p-3 bg-white rounded-lg shadow-sm border border-gray-200">
      <Text className="text-center text-gray-600">
        {total} total • {active} active • {completed} completed
      </Text>
    </View>
  );
}
