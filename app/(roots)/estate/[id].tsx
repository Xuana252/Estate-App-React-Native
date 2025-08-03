import CustomCarousel from "@/components/Carousel";
import FacilityIcon from "@/components/FacilityIcon";
import ReviewCard from "@/components/ReviewCard";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { useFetch } from "@/lib/useFetch";
import { GetPropertyWithID } from "@/services/api";
import { router, useLocalSearchParams } from "expo-router";
import React, { useMemo } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const estate = () => {
  const params = useLocalSearchParams<{ id: string }>();
  const { data, loading, refetch } = useFetch(() =>
    GetPropertyWithID(params.id)
  );

  const propertyImages = useMemo(() => {
    if (data?.gallery) {
      return data?.gallery?.map((g: any) => g.image);
    } else {
      return [];
    }
  }, [data?.gallery]);

  return (
    <View className="flex-1">
      <ScrollView className="flex-1 relative">
        <View className="absolute top-10 inset-x-0 flex-row items-center justify-between p-4 z-50">
          <TouchableOpacity
            className="p-2 rounded-full "
            onPress={() => router.back()}
          >
            <Image source={icons.backArrow} className="size-6" />
          </TouchableOpacity>

          <View className="flex-row gap-2 items-center">
            <Image
              source={icons.heart}
              className="size-6"
              tintColor={"black"}
            />
            <Image source={icons.send} className="size-6" tintColor={"black"} />
          </View>
        </View>
        <CustomCarousel images={propertyImages} />

        <View className="px-4 pt-4">
          <Text className="text-2xl font-rubik-extrabold text-black-300">
            {data?.name}
          </Text>
          <View className="flex-row gap-4 items-center my-2">
            <View className="bg-primary-200 py-1 px-2 rounded-full">
              <Text className="text-primary-300 font-rubik-medium text-sm">
                {data?.type}
              </Text>
            </View>

            <View className="flex-row items-center gap-2 ">
              <Image
                source={icons.star}
                tintColor={"orange"}
                className="size-6"
              />

              <Text className="text-black-100 font-rubik-medium">
                {data?.rating} {`(${data?.reviews.length} reviews)`}
              </Text>
            </View>
          </View>
          <View className="flex-row items-center justify-start gap-2 my-2">
            <View className="flex-row items-center gap-2">
              <Image
                source={icons.bed}
                className="size-10 p-3 rounded-full bg-primary-100 text-primary-300"
              />

              <Text className="text-black-200 font-rubik-semibold text-sm">
                {`${data?.bedrooms} Beds`}
              </Text>
            </View>
            <View className="flex-row items-center gap-2">
              <Image
                source={icons.bath}
                className="size-10 p-3 rounded-full bg-primary-100 text-primary-300"
              />

              <Text className="text-black-200 font-rubik-semibold text-sm">
                {`${data?.bathrooms} Baths`}
              </Text>
            </View>
            <View className="flex-row items-center gap-2">
              <Image
                source={icons.area}
                className="size-10 p-3 rounded-full bg-primary-100 text-primary-300"
              />

              <Text className="text-black-200 font-rubik-semibold text-sm">
                {`${data?.area} sqft`}
              </Text>
            </View>
          </View>
          <View className="border-t border-primary-200 my-4"></View>
          <Text className="font-semibold text-xl text-black-300 my-4">
            Agent
          </Text>
          <View className="flex-row items-center gap-4">
            <Image
              source={{ uri: data?.agent.avatar }}
              className="size-14 rounded-full overflow-hidden"
            />

            <View className="flex-col flex-1 items-start justify-center">
              <Text className="font-rubik-medium text-lg text-black-300">
                {data?.agent.name}
              </Text>
              <Text className="text-sm font-rubik text-black-200">
                {data?.agent.email}
              </Text>
            </View>

            <View className="flex-row items-center gap-4">
              <Image source={icons.chat} className="size-8" />
              <Image source={icons.phone} className="size-8" />
            </View>
          </View>
          <Text className="font-semibold text-xl text-black-300 my-4">
            Overview
          </Text>

          <Text className="text-black-100 font-rubik text-sm">
            {data?.description}
          </Text>

          <Text className="font-semibold text-xl text-black-300 my-4">
            Facilities
          </Text>

          <FlatList
            data={data?.facilities}
            renderItem={({ item }) => <FacilityIcon facility={item} />}
            columnWrapperClassName="items-center"
            ItemSeparatorComponent={() => <View className="size-3"></View>}
            keyExtractor={(item) => item}
            numColumns={4}
            scrollEnabled={false}
          />

          <Text className="font-semibold text-xl text-black-300 my-4">
            Gallery
          </Text>

          <FlatList
            data={propertyImages}
            renderItem={({ item }) => (
              <Image
                source={{ uri: item }}
                resizeMode="cover"
                className="overflow-hidden rounded-xl size-32"
              />
            )}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <Image className="size-3"></Image>}
            keyExtractor={(item, index) => index.toString()}
            horizontal
          />
          <Text className="font-semibold text-xl text-black-300 my-4">
            Location
          </Text>

          <View className="flex-row items-center gap-2">
            <Image source={icons.location} className="size-6" />
            <Text className="font-rubik-medium text-sm text-black-200">
              {data?.address}
            </Text>
          </View>

          <Image
            source={images.map}
            className="w-full h-[200px] rounded-2xl overflow-hidden "
            resizeMode="contain"
          />

          <View className="flex-row items-center">
            <Image
              source={icons.star}
              tintColor={"orange"}
              className="size-8"
            />
            <Text className="text-black-300 font-rubik-bold text-xl ml-2">
              {data?.rating} {`(${data?.reviews.length} reviews)`}
            </Text>

            <Text className="text-base font-rubik-bold text-primary-300 ml-auto">
              See all
            </Text>
          </View>
          <FlatList
            data={data?.reviews}
            renderItem={({ item }) => <ReviewCard review={item} />}
            ItemSeparatorComponent={() => <Image className="size-4"></Image>}
            contentContainerClassName="py-4"
            keyExtractor={(item) => item.$id}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
       <View className="fixed bottom-0 inset-0 rounded-t-3xl flex-row items-center justify-between p-4 pb-8 border border-primary-200">
          <View className="flex-col items-start gap-2 flex-1">
            <Text className="text-black-200 font-rubik-semibold">Price</Text>
            <Text className="text-primary-300 font-rubik-semibold text-2xl">{`$ ${data?.price}`}</Text>
          </View>

          <TouchableOpacity className="shadow rounded-full items-center justify-center p-3 bg-primary-300 flex-1">
            <Text className="text-white font-rubik-semibold text-lg">Book Now</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
};

export default estate;
