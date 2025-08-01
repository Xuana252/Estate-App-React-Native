import { account, avatar } from "@/lib/appwrite";
import * as Linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";
import { OAuthProvider } from "react-native-appwrite";
export async function Login() {
  try {
    const redirectUri = Linking.createURL("/(roots)/(tabs)/index");

    const res = await account.createOAuth2Token(
      OAuthProvider.Google,
      redirectUri
    );

    if (!res) throw new Error("Login failed");

    const browserRes = await openAuthSessionAsync(res.toString(), redirectUri);

    if (browserRes.type !== "success") {
      throw new Error("Login cancelled or failed");
    }

    const url = new URL(browserRes.url);

    const secret = url.searchParams.get("secret")?.toString();
    const userId = url.searchParams.get("userId")?.toString();

    if (!secret || !userId) {
      throw new Error("Invalid response from authentication");
    }

    const session = await account.createSession(userId, secret);

    if (!session) {
      throw new Error("Failed to create session");
    }
    return true;
  } catch (error) {
    throw error;
  }
}

export async function Logout() {
  try {
    const res = await account.deleteSession("current");

    if (!res) throw new Error("Logout failed");
  } catch (error) {
    throw error;
  }
}

export async function GetUser() {
  try {
    const user = await account.get();

    if (!user.$id) throw new Error("User not found");
    else {
      const userAvatar = avatar.getInitials(user.name || "User");
      return { ...user, avatar: userAvatar.toString() };
    }
  } catch (error) {
    throw error;
  }
}
