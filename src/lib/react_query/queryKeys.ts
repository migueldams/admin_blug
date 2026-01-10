export const QUERY_KEYS = {
  // AUTH KEYS
  CREATE_USER_ACCOUNT : "createUserAccount",

  // USER KEYS
  GET_CURRENT_USER : "getCurrentUser",
  GET_USERS : "getUsers",
  GET_USER_BY_ID : "getUserById",

  // POST KEYS
  GET_POSTS : "getPosts",
  GET_INFINITE_POSTS : "getInfinitePosts",
  GET_RECENT_ARTICLES : "getRecentArticles",
  GET_RECENT_BLOGS : "getRecentBlogs",
  GET_RECENT_MARKETS : "getRecentMarkets",
  GET_POST_BY_ID : "getPostById",
  GET_USER_POSTS : "getUserPosts",
  GET_FILE_PREVIEW : "getFilePreview",

  //  SEARCH KEYS
  SEARCH_POSTS : "getSearchPosts",
} as const;