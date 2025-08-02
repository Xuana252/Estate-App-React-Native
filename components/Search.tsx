import icons from "@/constants/icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useRef, useState } from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";

const Search = () => {
  const params = useLocalSearchParams<{ query?: string }>();
  const [query, setQuery] = useState(params?.query);
  const timeOutRef = useRef<number | null>(null);

  function handleSearch(text: string) {
    setQuery(text);
    if (timeOutRef.current) {
      clearTimeout(timeOutRef.current);
    }
    timeOutRef.current = setTimeout(() => {
      router.setParams({ query: text.trim() });
    }, 500);
  }

  return (
    <View className="flex-row items-center justify-between mt-5 rounded-lg bg-accent-100 w-full px-4 border border-primary-100 py-2">
      <View className="flex-row items-center justify-start z-50 flex-1">
        <Image source={icons.search} className="size-5" />
        <TextInput
          value={query}
          placeholder="Search something"
          onChangeText={handleSearch}
          className="text-sm font-rubik text-black-300 ml-2 grow"
          placeholderTextColor={"#191D3150"}
          verticalAlign="middle"
          textAlignVertical="center"
        />
      </View>
      <TouchableOpacity>
        <Image source={icons.filter} className="size-5" />
      </TouchableOpacity>
    </View>
  );
};

export default Search;
