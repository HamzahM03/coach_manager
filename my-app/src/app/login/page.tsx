import { redirect } from "next/navigation"
import { createServerSupabaseClient } from "@/app/lib/supabase/server"
import LoginForm from "./LoginForm"

export default async function LoginPage() {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase.auth.getClaims()
  const claims = error ? null : data?.claims

  // already authed → go dashboard
  if (claims?.sub) {
    redirect("/dashboard") // or "/protected/dashboard" if that's your real route
  }

  return <LoginForm />
}
