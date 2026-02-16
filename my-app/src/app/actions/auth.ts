"use server"

import { z } from "zod"
import { redirect } from "next/navigation"
import { SignInFormSchema, type AuthFormState } from "@/app/lib/definitions"
import { createServerSupabaseClient } from "@/app/lib/supabase/server"

export async function signIn(
  prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const validatedFields = SignInFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  })

  if (!validatedFields.success) {
    const flattened = z.flattenError(validatedFields.error)
    return { errors: flattened.fieldErrors }
  }

  const supabase = await createServerSupabaseClient()
  const { email, password } = validatedFields.data

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    // don’t leak which part was wrong
    return { message: "Invalid email or password" }
  }

  // if you want, redirect after login (common pattern)
  redirect("/dashboard")

  // (unreachable, but keeps TS happy if you remove redirect later)
  // return { message: "Signed in successfully!" }
}
