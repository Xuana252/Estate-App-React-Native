import { categories } from "@/constants/data";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";

const Filter = () => {
  const params = useLocalSearchParams<{ filter?: string }>();
  const [selectedCategory, setSelectedCategory] = useState(
    params.filter || "All"
  );

  const handleCategory = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory("");
      router.setParams({ filter: "" });
      return;
    }

    setSelectedCategory(category);
    router.setParams({ filter: category!=="All"?category:"" });
  };
  return (
    <FlatList
      data={categories}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => handleCategory(item.category)}
          className={`items-center justify-center px-4 py-2 rounded-full  ${selectedCategory === item.category ? "bg-primary-300 " : "bg-primary-100 border border-primary-200"}`}
        >
          <Text
            className={`${selectedCategory === item.category ? "text-white font-rubik-bold" : "text-black-300 font-rubik"} text-sm`}
          >
            {item.title}
          </Text>
        </TouchableOpacity>
      )}
      keyExtractor={(item, index) => index.toString()}
      ItemSeparatorComponent={() => <Text className="w-3" />}
      horizontal
      className="my-4"
    />
  );
};

export default Filter;
