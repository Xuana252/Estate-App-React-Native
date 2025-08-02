import icons from "@/constants/icons";
import images from "@/constants/images";
import { Link } from "expo-router";
import React from "react";
import {
    Image,
    ImageBackground,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { Models } from "react-native-appwrite";

const FeaturedCard = ({ item }: { item: Models.DefaultDocument }) => {
  return (
    <Link href={`/estate/${item.$id}`} asChild>
      <TouchableOpacity className="flex-col items-start w-60 h-80 relative rounded-2xl overflow-hidden">
        <ImageBackground source={{ uri: item.image }} className=" size-full">
          <ImageBackground
            source={images.cardGradient}
            className=" size-full p-4"
          >
            <View className="flex flex-row rounded-full gap-1 bg-white/90 px-3 py-1.5 absolute top-5 right-5">
              <Image source={icons.star} className="size-3.5" />
              <Text className="text-xs font-rubik-bold text-primary-300 ">
                {item.rating}
              </Text>
            </View>
            <View className="mt-auto flex-col items-start">
              <Text
                className="text-xl font-rubik-extrabold text-white"
                numberOfLines={1}
              >
                {item.name}
              </Text>
              <Text className="text-white text-base font-rubik">
                {item.address}
              </Text>
              <View className="flex-row items-center justify-between mt-2 w-full">
                <Text className="text-white font-rubik-extrabold text-xl">
                  ${" "}{item.price}
                </Text>
                <Image source={icons.heart} className="size-5" />
              </View>
            </View>
          </ImageBackground>
        </ImageBackground>
      </TouchableOpacity>
    </Link>
  );
};

const Card = ({ item }: { item: Models.DefaultDocument }) => {
  return (
    <Link
      href={`/estate/${item.$id}`}
      asChild
      className="shadow-lg shadow-black-100/70"
    >
      <TouchableOpacity className="flex-col items-start flex-1 rounded-xl bg-white ">
        <View className="relative w-full aspect-square rounded-t-xl overflow-hidden">
          <ImageBackground source={{uri: item.image}} className="w-full aspect-square">
            <View className="flex flex-row rounded-full gap-1 bg-white/90 px-3 py-1.5 absolute top-2 right-2">
              <Image source={icons.star} className="size-3.5" />
              <Text className="text-xs font-rubik-bold text-primary-300 ">
                {item.rating}
              </Text>
            </View>
          </ImageBackground>
        </View>
        <View className="mt-auto flex-col items-start px-3 py-4">
          <Text className="text-xl font-rubik-extrabold " numberOfLines={1}>
            {item.name}
          </Text>
          <Text className=" text-base font-rubik">{item.address}</Text>
          <View className="flex-row items-center justify-between mt-2 w-full">
            <Text className=" font-rubik-extrabold text-xl text-primary-300">
              ${" "}{item.price}
            </Text>
            <Image
              source={icons.heart}
              className="size-5"
              tintColor={"#191d31"}
            />
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export { Card, FeaturedCard };
