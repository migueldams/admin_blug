import {useQuery , useMutation ,useQueryClient} from '@tanstack/react-query';
import { QUERY_KEYS } from './queryKeys';
import { createArticles, createBlogs, createMarkets, getRecentArticles, getRecentBlogs, getRecentMarkets, signInWithGoogle, signOutAccount } from '../appwrite/api';

export const useSignInWithGoogle = () => {
    return useMutation({
        mutationFn:  signInWithGoogle,
    })
}

export const useGetRecentArticles = () => {
    return useQuery(
        {
            queryKey: [QUERY_KEYS.GET_RECENT_ARTICLES],
            queryFn: getRecentArticles,
            
        }
    )
}
export const useGetRecentBlogs = () => {
    return useQuery(
        {
            queryKey: [QUERY_KEYS.GET_RECENT_BLOGS],
            queryFn: getRecentBlogs,
            
        }
    )
}
export const useGetRecentMarkets = () => {
    return useQuery(
        {
            queryKey: [QUERY_KEYS.GET_RECENT_MARKETS],
            queryFn: getRecentMarkets,
            
        }
    )
}
export const useSignOutAccount = () => {
    return useMutation({
        mutationFn: signOutAccount
    })
}

export const useCreateArticle = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:  (newPost:any) => createArticles(newPost),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [QUERY_KEYS.GET_RECENT_POSTS]});
        }}
    )
}

export const useCreatBlogs = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:  (newPost:any) => createBlogs(newPost),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [QUERY_KEYS.GET_RECENT_POSTS]});
        }}
    )
}

export const useCreatMarkets = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:  (newPost:any) => createMarkets(newPost),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [QUERY_KEYS.GET_RECENT_POSTS]});
        }}
    )
}