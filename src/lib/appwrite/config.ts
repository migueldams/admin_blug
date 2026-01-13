import {Client ,Account, Databases, Storage, Avatars} from "appwrite";

export const appwriteConfig ={
    projectId: import.meta.env.VITE_APPWRITE_PROJET_ID,
    endpoint: import.meta.env.VITE_APPWRITE_ENPOINT,
    storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID,
    databasesId: import.meta.env.VITE_APPWRITE_DATABASES_ID,
    tableUsersId: import.meta.env.VITE_APPWRITE_TABLE_USERS_ID,
    tablePostsId: import.meta.env.VITE_APPWRITE_TABLE_POSTS_ID,
    tableEventsId: import.meta.env.VITE_APPWRITE_TABLE_EVENTS_ID,
}


const client = new Client();
console.log()

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);