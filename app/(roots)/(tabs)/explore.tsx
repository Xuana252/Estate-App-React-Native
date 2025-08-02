import { Card } from "@/components/Card";
import Filter from "@/components/Filter";
import NoResults from "@/components/NoResults";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import { useFetch } from "@/lib/useFetch";
import { GetProperties } from "@/services/api";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const explore = () => {
  const params = useLocalSearchParams<{ query?: string; filter?: string }>();

  const {
    data: properties,
    loading,
    refetch,
  } = useFetch(
    () =>
      GetProperties({ query: params.query, filter: params.filter, limit: 20 }),
    false
  );

  useEffect(() => {
    refetch();
  }, [params.filter, params.query]);

  const header = useMemo(
    () => (
      <>
        <View className="flex-row items-center justify-between gap-2">
          <TouchableOpacity
            onPress={() => router.back()}
            className="rounded-full p-2 bg-primary-200/20"
          >
            <Image
              source={icons.backArrow}
              className="size-6"
              resizeMode="contain"
            />
          </TouchableOpacity>

          <Text className="font-rubik-semibold text-base ">
            Search for Your Ideal Home
          </Text>

          <Image source={icons.bell} className="size-6" />
        </View>
        <Search />

        <View className="mt-5">
          <Filter />

          <Text className="text-xl font-rubik-bold text-black-300 mt-5">
            Found {properties?.length} Properties
          </Text>
        </View>
      </>
    ),
    [properties]
  );
  return (
    <SafeAreaView className="grow bg-white ">
      <FlatList
        data={properties}
        renderItem={({ item }) => <Card item={item} />}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        className="px-5 flex-1"
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator
              size={"large"}
              className="text-primary-300 mt-5"
            />
          ) : (
            <NoResults />
          )
        }
        contentContainerClassName=" pb-32"
        columnWrapperClassName="gap-3  flex-1"
        ItemSeparatorComponent={() => <View className="h-3" />}
        ListHeaderComponent={() => header}
      />
    </SafeAreaView>
  );
};

export default explore;
