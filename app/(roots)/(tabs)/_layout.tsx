import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import React from "react";
const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "white",
          position: "absolute",
          borderTopColor: "#0061FF1A",
          borderTopWidth: 1,
          minHeight: 70,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused, color }) => (
            <>
              {focused ? (
                <Ionicons name="home" size={24} color={color} />
              ) : (
                <Ionicons name="home-outline" size={24} color={color} />
              )}
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",

          tabBarIcon: ({ focused, color }) => (
            <>
              {focused ? (
                <Ionicons name="search" size={24} color={color} />
              ) : (
                <Ionicons name="search-outline" size={24} color={color} />
              )}
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused, color }) => (
            <>
              {focused ? (
                <FontAwesome name="user" size={24} color={color} />
              ) : (
                <FontAwesome name="user-o" size={22} color={color} />
              )}
            </>
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
