interface ImportMetaEnv {
    readonly VITE_APPWRITE_ENDPOINT: string
    readonly VITE_APPWRITE_PROJECT_ID: string
    readonly VITE_APPWRITE_STORAGE_ID: string
    readonly VITE_APPWRITE_DATABASES_ID: string
    readonly VITE_APPWRITE_TABLE_USERS_ID: string
    readonly VITE_APPWRITE_TABLEs_POSTS_ID: string
    readonly VITE_APPWRITE_TABLE_EVENTS_ID: string
    // ajoute d'autres variables Vite ici si nécessaire
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}