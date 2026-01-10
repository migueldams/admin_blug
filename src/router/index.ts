import { useRoutes, useNavigate, type NavigateFunction } from "react-router-dom"
import { useEffect } from "react"
import { router } from "./config"

let navigateRevolver: (navigate: NavigateFunction) => void

export const navigatePromise = new Promise<NavigateFunction>(resolve => {
  navigateRevolver = resolve
})

export function AppRoutes() {
  const element = useRoutes(router)
  const navigate = useNavigate()

  useEffect(() => {
    navigateRevolver(navigate)
  }, [navigate])

  return element
}
