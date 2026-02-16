"use client"
import { createBrowserSupabaseClient } from "@/app/lib/supabase/client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"   

export default function LogoutButton() {
  const supabase = createBrowserSupabaseClient()
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.refresh()
    router.push("/")
  }

  return (
    <Button variant="outline" onClick={handleLogout}>
      Sign out
    </Button>
  )
}
