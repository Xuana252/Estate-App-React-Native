import icons from "@/constants/icons";
import images from "@/constants/images";
import { useAuth } from "@/lib/provider";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const auth = () => {
  const { LogIn } = useAuth();
  return (
    <SafeAreaView className="bg-white grow">
      <View className="px-5 grow">
        <ScrollView className="w-full grow" contentContainerClassName="grow">
          <Image
            source={images.onboarding}
            className="w-full h-full"
            resizeMode="cover"
          />
        </ScrollView>

        <Text className="text-base text-center uppercase font-rubik text-black-200">
          Welcome to Nestate
        </Text>
        <Text className="text-3xl text-center font-rubik-bold text-black-300 mt-2">
          Let's get you closer to {"\n"}
          <Text className="text-primary-300"> Your Ideal home</Text>
        </Text>

        <Text className="text-lg font-rubik text-black-200 text-center mt-12">
          Login to Nestate with Google
        </Text>

        <TouchableOpacity
          onPress={LogIn}
          className="bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5 flex-row items-center justify-center"
        >
          <Image
            source={icons.google}
            className=" size-5"
            resizeMode="contain"
          />
          <Text className="text-lg font-rubik-medium text-black-300 ml-2">
            Continue with Google
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default auth;
