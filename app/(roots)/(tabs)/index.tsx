import { Card, FeaturedCard } from "@/components/Card";
import Filter from "@/components/Filter";
import NoResults from "@/components/NoResults";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import { useAuth } from "@/lib/provider";
import { useFetch } from "@/lib/useFetch";
import { GetLatestProperties, GetProperties } from "@/services/api";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { user } = useAuth();
  const params = useLocalSearchParams<{ query?: string ; filter?: string }>();
  const { data: featuredProperties, loading: featuredPropertiesLoading } =
    useFetch(GetLatestProperties);

  const {
    data: properties,
    loading,
    refetch,
  } = useFetch(
    () =>
      GetProperties({ query: params.query, filter: params.filter, limit: 6 }),
    false
  );

  useEffect(() => {
    refetch();
  }, [params.filter, params.query]);

  return (
    <SafeAreaView className="grow bg-white ">
      <ScrollView className="px-5">
        <View className="flex-row items-center justify-between mt-5">
          <View className="flex-row items-center gap-2">
            <Image
              source={{ uri: user?.avatar }}
              className="size-10 rounded-full"
            />
            <View className="flex-col items-start justify-center">
              <Text className="text-xs font-rubik text-black-100">
                Good Morning
              </Text>
              <Text className="text-base font-rubik-medium text-black-300">
                {user?.name}
              </Text>
            </View>
          </View>
          <Image source={icons.bell} className="size-6" />
        </View>

        <Search />

        <View className="my-5">
          <View className="flex-row items-center justify-between">
            <Text className="text-xl font-rubik-bold text-black-300">
              Featured
            </Text>
            <TouchableOpacity className="">
              <Text className="text-base font-rubik-bold text-primary-300">
                See all
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {featuredPropertiesLoading ? (
          <ActivityIndicator size={"large"} className="text-primary-300 mt-5" />
        ) : (
          <FlatList
            data={featuredProperties}
            renderItem={({ item }) => <FeaturedCard item={item} />}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View className="w-3" />}
          />
        )}

        <View className="my-5">
          <View className="flex-row items-center justify-between">
            <Text className="text-xl font-rubik-bold text-black-300">
              Our Recommendations
            </Text>
            <TouchableOpacity className="">
              <Text className="text-base font-rubik-bold text-primary-300">
                See all
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Filter />
        <FlatList
          data={properties}
          renderItem={({ item }) => <Card item={item} />}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          className="overflow-visible"
          scrollEnabled={false}
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
          ListHeaderComponent={() => <></>}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
