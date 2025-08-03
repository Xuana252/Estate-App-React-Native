import React, { useRef } from "react";
import { Image, View } from "react-native";
import {
    Extrapolation,
    interpolate,
    useSharedValue,
} from "react-native-reanimated";
import Carousel, {
    ICarouselInstance,
    Pagination,
} from "react-native-reanimated-carousel";

const CustomCarousel = ({ images }: { images: string[] }) => {
  const progress = useSharedValue(0);
  const ref = useRef<ICarouselInstance>(null);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      /**
       * Calculate the difference between the current index and the target index
       * to ensure that the carousel scrolls to the nearest index
       */
      count: index - progress.value,
      animated: true,
    });
  };
  return (
    <View className="relative">
      <Carousel
        ref={ref}
        vertical={false}
        loop
        width={400}
        height={250}
        style={{
          width: "100%",
        }}
        onProgressChange={progress}
        scrollAnimationDuration={500}
        data={images}
        renderItem={({ item }: { item: any }) => (
          <Image
            source={{ uri: item as string }}
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "cover",
            }}
          />
        )}
      />
      <Pagination.Custom
        progress={progress}
        data={images}
        dotStyle={{
         boxShadow: '2px 2px 0px rgba(0, 0, 0, 0.2)',
          borderRadius: 50,
          width: 8,
          height: 8,
          backgroundColor: "white",
          padding: 2
        }}
        activeDotStyle={{
          width: 25,
          overflow: "hidden",
          backgroundColor: "#0061FF",
        }}
        containerStyle={{
          position: "absolute",
          bottom: 8,
          alignContent: "center",
          gap: 10,
        }}
        horizontal
        onPress={onPressPagination}
        customReanimatedStyle={(
          progress: number,
          index: number,
          length: number
        ) => {
          let val = Math.abs(progress - index);
          if (index === 0 && progress > length - 1) {
            val = Math.abs(progress - length);
          }

          return {
            transform: [
              {
                translateY: interpolate(
                  val,
                  [0, 1],
                  [0, 0],
                  Extrapolation.CLAMP
                ),
              },
            ],
          };
        }}
      />
    </View>
  );
};

export default CustomCarousel;
