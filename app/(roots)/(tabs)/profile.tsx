import { settings } from "@/constants/data";
import icons from "@/constants/icons";
import { useAuth } from "@/lib/provider";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface SettingItemProps {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  textStyle?: string;
  showArrow?: boolean;
}

const SettingItems = ({
  icon,
  title,
  onPress,
  textStyle,
  showArrow = true,
}: SettingItemProps) => (
  <TouchableOpacity
    className="flex-row items-center justify-between py-3"
    onPress={onPress}
  >
    <View className="flex-row items-center gap-3">
      <Image source={icon} className="size-6" />
      <Text className={`text-lg font-rubik-medium text-black-300 ${textStyle}`}>
        {title}
      </Text>
    </View>

    {showArrow && <Image source={icons.rightArrow} className="size-5" />}
  </TouchableOpacity>
);
const profile = () => {
  const { user, LogOut } = useAuth();
  return (
    <SafeAreaView className="grow bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-7"
      >
        <View className="flex-row items-center justify-between mt-5">
          <Text className="text-xl font-rubik-bold">Profile</Text>
          <Image source={icons.bell} className="size-5" />
        </View>
        <View className="flex-col justify-center mt-5 items-center">
          <View className="flex-col items-center relative mt-5">
            <Image
              source={{ uri: user?.avatar }}
              className="size-44 relative rounded-full"
              resizeMode="cover"
            />
            <TouchableOpacity className="absolute bottom-1 right-2">
              <Image source={icons.edit} className="size-9" />
            </TouchableOpacity>
          </View>
          <Text className="text-2xl font-rubik-bold mt-2">{user?.name}</Text>
          <Text className="text-lg font-rubik-regular text-black-200">{user?.email}</Text>
        </View>

        <View className="flex-col mt-10">
          <SettingItems icon={icons.calendar} title="My Bookings" />
          <SettingItems icon={icons.wallet} title="Payments" />
        </View>

        <View className="flex-col mt-5 border-t pt-5 border-primary-200">
          {settings.slice(2).map((item, index) => (
            <SettingItems key={index} {...item} />
          ))}
        </View>

        <View className="flex-col mt-5 border-t pt-5 border-primary-200">
          <SettingItems
            icon={icons.logout}
            title="Log out"
            onPress={LogOut}
            textStyle="text-danger"
            showArrow={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default profile;
