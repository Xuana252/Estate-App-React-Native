import { useAuth } from "@/lib/provider";
import { router, Slot } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const _layout = () => {
  const { loading, user } = useAuth();
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/auth");
    }
  }, [loading, user]);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" className="text-primary-300" />
      </SafeAreaView>
    );
  }
  return <Slot />;
};

export default _layout;
