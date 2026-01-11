import {useQuery , useMutation ,useQueryClient} from '@tanstack/react-query';
import { QUERY_KEYS } from './queryKeys';
import { createArticles, createBlogs, createFormations, createMarkets, getFormations, getRecentArticles, getRecentBlogs, getRecentMarkets, signInWithGoogle, signOutAccount } from '../appwrite/api';

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
export const useGetFormations = () => {
    return useQuery(
        {
            queryKey: [QUERY_KEYS.GET_RECENT_EVENTS],
            queryFn: getFormations,
            
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
            queryClient.invalidateQueries({queryKey: [QUERY_KEYS.GET_RECENT_ARTICLES]});
        }}
    )
}

export const useCreatBlogs = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:  ({newPost,onProgress}:any) => createBlogs(newPost, onProgress),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [QUERY_KEYS.GET_RECENT_BLOGS]});
        }}
    )
}

export const useCreateEvents = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:  (newPost:any) => createFormations(newPost),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [QUERY_KEYS.GET_RECENT_EVENTS]});
        }}
    )
}

export const useCreatMarkets = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:  (newPost:any) => createMarkets(newPost),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [QUERY_KEYS.GET_RECENT_MARKETS]});
        }}
    )
}