import { ID, OAuthProvider, Query } from "appwrite";
import { account, appwriteConfig, databases, storage } from "./config";


export const signInWithGoogle = async () => {
    try {

        const session = account.createOAuth2Session(
            OAuthProvider.Google,
            "http://localhost:5173/layout",
            "http://localhost:5173/"
        );


        return session;
    } catch (error) {
        console.error("Error during Google sign-in:", error);
        throw error;
    }
};

export const signOutAccount = async () => {

    try {
        await account.get();
        const session = await account.deleteSession({ sessionId: "current" });
        return session
    } catch (e) {
        console.log(e)
    }
}

export async function saveUserToDB(
    user: {
        accountId: string,
        username: string,
        password: string,
    }
) {
    try {

        const userData = await databases.createDocument(
            {
                databaseId: import.meta.env.VITE_APPWRITE_DATABASES_ID,
                collectionId: import.meta.env.VITE_APPWRITE_TABLE_USERS_ID,
                documentId: ID.unique(),
                data: user,
            }
        );

        return userData;
    } catch (error) {
        console.error("Error saving user to database:", error);
        throw error;
    }
}

export const getRecentArticles = async () => {
    try {

        const posts = await databases.listDocuments(
            {
                databaseId: appwriteConfig.databasesId,
                collectionId: appwriteConfig.tablePostsId,
                queries: [Query.orderDesc('$createdAt'),
                Query.equal("categorie", 'Article'),
                ],
            }
        );
        console.log(posts)

        if (!posts) {
            return []
        }

        return posts;
    } catch (error) {
        console.error("Error fetching recent posts:", error);
        throw error;
    }
}

export const createArticles = async (newPost: {
    title: string,
    excerpt: string,
    file: File[],
}) => {
    try {
        const NewMedia = await storage.createFile({
            bucketId: appwriteConfig.storageId,
            fileId: ID.unique(),
            file: newPost.file[0]
        });
        if (!NewMedia) throw new Error("File upload failed");

        const fileUrl = await storage.getFileView({
            bucketId: appwriteConfig.storageId,
            fileId: NewMedia.$id
        });

        if (!fileUrl) throw new Error("Failed to get file URL");
        
        console.log(typeof(NewMedia.$id));
        
        const postData = savePostToDB({
            title: newPost.title,
            excerpt: newPost.excerpt,
            imageUrl: fileUrl,
            categorie: 'Article',
            imageId: NewMedia.$id
        });



        

        if (!fileUrl) {
            await storage.deleteFile({
                bucketId: appwriteConfig.storageId,
                fileId: NewMedia.$id
            })
            return null
        }
        return postData;


    } catch (error) {
        console.error("Error creating post:", error);
        throw error;
    }

}


export const getRecentBlogs = async () => {
    try {

        const posts = await databases.listDocuments(
            {
                databaseId: appwriteConfig.databasesId,
                collectionId: appwriteConfig.tablePostsId,
                queries: [Query.orderDesc('$createdAt'),
                Query.equal("categorie", 'blog'),
                ],
            }
        );
        console.log(posts)

        if (!posts) {
            return []
        }

        return posts;
    } catch (error) {
        console.error("Error fetching recent posts:", error);
        throw error;
    }
}

export const createBlogs = async (newPost: {
    title: string,
    excerpt: string,
    file: File[],
}, onProgress?: (progress: number) => void ) => {
    try {
        const NewMedia = await storage.createFile({
            bucketId: appwriteConfig.storageId,
            fileId: ID.unique(),
            file: newPost.file[0],
            onProgress: (progress) => {
                    console.log(progress.progress); // 0 → 100
                }
        });
    if (!NewMedia) throw new Error("File upload failed");

    const fileUrl = await storage.getFileView({
        bucketId: appwriteConfig.storageId,
        fileId: NewMedia.$id
    });

    if (!fileUrl) throw new Error("Failed to get file URL");

    const postData = savePostToDB({
        title: newPost.title,
        excerpt: newPost.excerpt,
        imageUrl: fileUrl,
        categorie: 'blog',
        imageId: Number(NewMedia.$id)
    });

    if (!fileUrl) {
        await storage.deleteFile({
            bucketId: appwriteConfig.storageId,
            fileId: NewMedia.$id,

        })
        return null
    }
    return postData;


} catch (error) {
    console.error("Error creating post:", error);
    throw error;
}

}

export const getRecentMarkets = async () => {
    try {

        const posts = await databases.listDocuments(
            {
                databaseId: appwriteConfig.databasesId,
                collectionId: appwriteConfig.tablePostsId,
                queries: [Query.orderDesc('$createdAt'),
                Query.equal("categorie", 'market'),
                ],
            }
        );
        console.log(posts)

        if (!posts) {
            return []
        }

        return posts;
    } catch (error) {
        console.error("Error fetching recent posts:", error);
        throw error;
    }
}

export const createMarkets = async (newPost: {
    title: string,
    excerpt: string,
    file: File[],
}) => {
    try {
        const NewMedia = await storage.createFile({
            bucketId: appwriteConfig.storageId,
            fileId: ID.unique(),
            file: newPost.file[0]
        });
        if (!NewMedia) throw new Error("File upload failed");

        const fileUrl = await storage.getFileView({
            bucketId: appwriteConfig.storageId,
            fileId: NewMedia.$id
        });

        if (!fileUrl) throw new Error("Failed to get file URL");

        const postData = savePostToDB({
            title: newPost.title,
            excerpt: newPost.excerpt,
            imageUrl: fileUrl,
            categorie: 'market',
            imageId: Number(NewMedia.$id)
        });

        if (!fileUrl) {
            await storage.deleteFile({
                bucketId: appwriteConfig.storageId,
                fileId: NewMedia.$id
            })
            return null
        }
        return postData;


    } catch (error) {
        console.error("Error creating post:", error);
        throw error;
    }

}

export const getFormations = async () => {
    try {

        const posts = await databases.listDocuments(
            {
                databaseId: appwriteConfig.databasesId,
                collectionId: appwriteConfig.tableEventsId,
                queries: [Query.orderDesc('$createdAt'),
                Query.equal("status", 'upcoming'),
                ],
            }
        );
        console.log(posts)

        if (!posts) {
            return []
        }

        return posts;
    } catch (error) {
        console.error("Error fetching recent posts:", error);
        throw error;
    }
}

export const createFormations = async (newPost: {
    title: string,
    location: string,
    description: string,
    types: string,
    status: string,
    date: string,
    time: string,
}) => {
    try {

        const postData = await databases.createDocument(
            {
                databaseId: appwriteConfig.databasesId,
                collectionId: appwriteConfig.tableEventsId,
                documentId: ID.unique(),
                data: newPost,
            }
        );


        return postData;


    } catch (error) {
        console.error("Error creating post:", error);
        throw error;
    }

}



const savePostToDB = async (post: {
    title: string,
    excerpt: string,
    imageUrl: string,
    categorie: string,
    imageId: string,
}) => {
    try {
        const postData = await databases.createDocument(
            {
                databaseId: appwriteConfig.databasesId,
                collectionId: appwriteConfig.tablePostsId,
                documentId: ID.unique(),
                data: post,
            }
        );
        return postData;
    } catch (error) {
        console.error("Error saving post to database:", error);
        throw error;
    }
}