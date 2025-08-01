
import { Account, Avatars, Client, Databases } from "react-native-appwrite";
const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!;
const ENDPOINT = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!;
const PLATFORM = process.env.EXPO_PUBLIC_APPWRITE_PLATFORM!;

const client = new Client();
client
  .setEndpoint(ENDPOINT)
  .setProject(PROJECT_ID)
  .setPlatform(PLATFORM)


export const avatar = new Avatars(client)
export const account = new Account(client)
export const database = new Databases(client)
 

export const DB_ID = process.env.EXPO_PUBLIC_APPWRITE_DB_ID!
