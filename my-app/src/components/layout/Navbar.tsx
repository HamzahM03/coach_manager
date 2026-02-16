import Link from "next/link"
import { createServerSupabaseClient } from "@/app/lib/supabase/server"
import LogoutButton from "@/components/auth/LogoutButton"
import { Button } from "@/components/ui/button"

export default async function Navbar() {
  const supabase = await createServerSupabaseClient()
  const { data } = await supabase.auth.getClaims()
  const isAuthed = !!data?.claims?.sub

  return (
    <header className="border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-semibold tracking-tight">
          CampOps
        </Link>

        <nav className="flex items-center gap-2">
          {isAuthed ? (
            <>
              <Button asChild variant="ghost">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <LogoutButton />
            </>
          ) : (
            <>
              <Button asChild variant="ghost">
                <Link href="/login">Sign in</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Try it free</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
