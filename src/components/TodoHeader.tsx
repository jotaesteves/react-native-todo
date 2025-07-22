import React from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function TodoHeader() {
  const { top } = useSafeAreaInsets();

  return (
    <View style={{ paddingTop: top }} className="bg-white border-b border-gray-200">
      <View className="px-4 py-4">
        <Text className="text-2xl font-bold text-center text-gray-800">📝 Todo App</Text>
      </View>
    </View>
  );
}
