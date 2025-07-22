import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useTodoStore, type FilterType } from "../store/todoStore";

interface TodoFiltersProps {
  showFilters: boolean;
}

export function TodoFilters({ showFilters }: TodoFiltersProps) {
  const { filter, setFilter } = useTodoStore();

  if (!showFilters) return null;

  return (
    <View className="flex-row mb-4 bg-white rounded-lg shadow-sm border border-gray-200">
      {(["all", "active", "completed"] as const).map((filterType: FilterType) => (
        <TouchableOpacity
          key={filterType}
          onPress={() => setFilter(filterType)}
          className={`flex-1 py-3 ${filter === filterType ? "bg-blue-500" : "bg-white"} ${
            filterType === "all" ? "rounded-l-lg" : filterType === "completed" ? "rounded-r-lg" : ""
          }`}
        >
          <Text
            className={`text-center font-medium capitalize ${filter === filterType ? "text-white" : "text-gray-600"}`}
          >
            {filterType}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
