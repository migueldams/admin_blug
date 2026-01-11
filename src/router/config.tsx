
import Home from "@/_root/Home"
import Login from "@/auth/Login"
import { Navigate, type RouteObject } from "react-router-dom"
import Layout from '@/_root/Layout'
import AddArticle from "@/_root/AddPosts/AddArticle"
import AddEvents from "@/_root/AddEvents/AddEvents"
import AddBlog from "@/_root/AddBlog/AddBlog"
import AddMarket from "@/_root/AddMarket/AddMarket"

export const router: RouteObject[] = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/layout",
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="home" replace /> },
      { path: "home", element: <Home /> },
      { path: 'add-article', element: <AddArticle /> },
      { path: 'add-events', element: <AddEvents /> },
      { path: 'add-market', element: <AddMarket /> },
      { path: 'add-blog', element: <AddBlog /> },
      
    ],
  },
].filter(Boolean)
