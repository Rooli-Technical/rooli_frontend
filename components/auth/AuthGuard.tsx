"use client"

import { useAuth } from "@/providers/auth-provider"
import { usePathname, useRouter } from "next/navigation"
import type React from "react"
import { useEffect, useRef } from "react"

interface AuthGuardProps {
  children: React.ReactNode
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, mounted } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const redirectAttempted = useRef(false)

  useEffect(() => {
    if (!mounted) return
    if (redirectAttempted.current) return

    if (!isAuthenticated) {
      redirectAttempted.current = true
      const currentPath = pathname || "/"
      router.replace(`/auth/login?redirect=${encodeURIComponent(currentPath)}`)
    }
  }, [isAuthenticated, mounted, router, pathname])

  if (!mounted || !isAuthenticated) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-muted-foreground">Checking authentication...</p>
      </div>
    )
  }

  return <>{children}</>
}