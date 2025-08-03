import { account, avatar, config, databases } from "@/lib/appwrite";
import * as Linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";
import { OAuthProvider, Query } from "react-native-appwrite";
export async function Login() {
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
}

export async function Logout() {
  const res = await account.deleteSession("current");

  if (!res) throw new Error("Logout failed");
}

export async function GetUser() {
  const user = await account.get();

  if (!user.$id) throw new Error("User not found");
  else {
    const userAvatar = avatar.getInitialsURL(user.name || "User");
    return { ...user, avatar: userAvatar.toString() };
  }
}

export async function GetLatestProperties() {
  const res = await databases.listDocuments(
    config.databaseId,
    config.propertiesCollectionId,
    [Query.orderAsc("$createdAt"), Query.limit(5)]
  );

  return res.documents;
}

export async function GetProperties({
  filter,
  query,
  limit,
}: {
  filter?: string;
  query?: string;
  limit?: number;
}) {
  const buildQuery = [Query.orderDesc("$createdAt")];

  if (filter && filter !== "All") buildQuery.push(Query.equal("type", filter));

  if (query)
    buildQuery.push(
      Query.or([
        Query.search("name", query),
        Query.search("address", query),
        Query.search("type", query),
      ])
    );

  if (limit) buildQuery.push(Query.limit(limit));
  const res = await databases.listDocuments(
    config.databaseId,
    config.propertiesCollectionId,
    buildQuery
  );

  return res.documents;
}

export async function GetPropertyWithID(id: string) {
  const res = await databases.getDocument(
    config.databaseId,
    config.propertiesCollectionId,
    id
  );

  return res
}
