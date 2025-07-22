import React from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { useTodoStore } from "../store/todoStore";

export function TodoInput() {
  const { inputText, setInputText, addTodo } = useTodoStore();

  const handleAddTodo = () => {
    addTodo(inputText);
  };

  return (
    <View className="mb-6">
      <View className="flex-row items-center bg-white rounded-lg shadow-sm border border-gray-200">
        <TextInput
          className="flex-1 px-4 py-3 text-base text-gray-800"
          placeholder="What needs to be done?"
          placeholderTextColor="#9CA3AF"
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={handleAddTodo}
          returnKeyType="done"
        />
        <TouchableOpacity
          onPress={handleAddTodo}
          className="px-4 py-3 bg-blue-500 rounded-r-lg"
          disabled={!inputText.trim()}
        >
          <Text className="text-white font-semibold">Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
