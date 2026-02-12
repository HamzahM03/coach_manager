import * as z from "zod"

export const SignInFormSchema = z.object({
  email: z.email("Please enter a valid email.").trim(),
  password: z.string().min(1, "Password is required.").trim(),
})

export type AuthFormState =
  | {
      errors?: Record<string, string[]>
      message?: string
    }
  | null

