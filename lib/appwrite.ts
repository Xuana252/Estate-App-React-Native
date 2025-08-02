import { Account, Avatars, Client, Databases } from "react-native-appwrite";
const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!;
const ENDPOINT = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!;
const PLATFORM = process.env.EXPO_PUBLIC_APPWRITE_PLATFORM!;

const DB_ID = process.env.EXPO_PUBLIC_APPWRITE_DB_ID!;
const GALLERIES_COLLECTION_ID =
  process.env.EXPO_PUBLIC_APPWRITE_GALLERIES_COLLECTION_ID!;
const AGENTS_COLLECTION_ID =
  process.env.EXPO_PUBLIC_APPWRITE_AGENTS_COLLECTION_ID!;
const REVIEWS_COLLECTION_ID =
  process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID!;
const PROPERTIES_COLLECTION_ID =
  process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID!;
const BUCKET_ID = process.env.EXPO_PUBLIC_APPWRITE_BUCKET_ID!;

export const config = {
  platform: "com.xuan.nestate",
  endpoint: ENDPOINT,
  projectId: PROJECT_ID,
  databaseId: DB_ID,
  galleriesCollectionId: GALLERIES_COLLECTION_ID,
  reviewsCollectionId: REVIEWS_COLLECTION_ID,
  agentsCollectionId: AGENTS_COLLECTION_ID,
  propertiesCollectionId: PROPERTIES_COLLECTION_ID,
  bucketId: BUCKET_ID,
};

const client = new Client();
client.setEndpoint(ENDPOINT).setProject(PROJECT_ID).setPlatform(PLATFORM);

export const avatar = new Avatars(client);
export const account = new Account(client);
export const databases = new Databases(client);
