import React from "react";
import { Text, TouchableOpacity, Alert } from "react-native";

interface ClearCompletedButtonProps {
  completedCount: number;
  onClearCompleted: () => void;
}

export function ClearCompletedButton({ completedCount, onClearCompleted }: ClearCompletedButtonProps) {
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
    <TouchableOpacity onPress={handleClearCompleted} className="mb-12 p-3 bg-red-50 rounded-lg border border-red-200">
      <Text className="text-center text-red-600 font-medium">
        Clear {completedCount} Completed Todo{completedCount > 1 ? "s" : ""}
      </Text>
    </TouchableOpacity>
  );
}
