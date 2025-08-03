import icons from "@/constants/icons";
import React from "react";
import { Image, Text, View } from "react-native";

const ReviewCard = ({ review }: { review: any }) => {
  return (
    <View className="flex-col gap-4">
      <View className="flex-row items-center gap-2">
        <Image
          source={{ uri: review.avatar }}
          className="rounded-full size-9 overflow-hidden"
        />
        <Text className="text-black-300 font-rubik-semibold flex-1">
          {review.name}
        </Text>
        <View className="flex-row items-center gap-1">
          <Image source={icons.star} tintColor={"orange"} className="size-6" />
          <Text className="font-rubik text-black-200">{review.rating}</Text>
        </View>
      </View>
      <Text className="text-black-200 text-sm font-rubik-regular">
        {review.review}
      </Text>
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <Image source={icons.heart} className="size-6" tintColor={"#0061FF"} />
          <Text className="text-sm">{Math.round(Math.random()*400+300)}</Text>
        </View>

        <Text className="text-black-200 text-sm font-rubik">
          {new Date(review?.$createdAt).toLocaleDateString("VN")}
        </Text>
      </View>
    </View>
  );
};

export default ReviewCard;
