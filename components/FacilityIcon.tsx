import icons from "@/constants/icons";
import React from "react";
import { Image, Text, View } from "react-native";

export enum Facility {
  Laundry = "Laundry",
  CarParking = "Car-Parking",
  SportsCenter = "Sports-Center",
  Cutlery = "Cutlery",
  Gym = "Gym",
  SwimmingPool = "Swimming-pool",
  Wifi = "Wifi",
  PetCenter = "Pet-Center",
}
const FacilityIcon = ({ facility }: { facility: Facility }) => {
  function renderIcon() {
    switch (facility) {
      case Facility.Laundry:
        return icons.laundry;
      case Facility.CarParking:
        return icons.carPark;
      case Facility.SportsCenter:
        return icons.run;
      case Facility.Cutlery:
        return icons.cutlery;
      case Facility.Gym:
        return icons.dumbell;
      case Facility.SwimmingPool:
        return icons.swim;
      case Facility.Wifi:
        return icons.wifi;
      case Facility.PetCenter:
        return icons.dog;
    }
  }
  return (
    <View className="flex-col items-center gap-2 w-[25%] px-1">
      <Image
        source={renderIcon()}
        tintColor={"#0061FF"}
        className="size-12 p-2  bg-primary-200 rounded-full"
      />
      <Text
        className="text-ellipsis overflow-hidden font-rubik text-xs text-black-200"
        numberOfLines={1}
      >
        {facility}
      </Text>
    </View>
  );
};

export default FacilityIcon;
