import { useAuth } from "@/lib/provider";
import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const { LogOut,user } = useAuth();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
       <Text>{user?.email}</Text>
      <TouchableOpacity onPress={LogOut}>
        <Text>Logout</Text>
      </TouchableOpacity>
      <Link href={"/auth"}>Sign in</Link>
    </View>
  );
}
