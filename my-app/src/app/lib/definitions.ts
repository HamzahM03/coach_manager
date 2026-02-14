import * as z from "zod"

export const SignInFormSchema = z.object({
  email: z.email({ message: "Please enter a valid email." }),
  password: z.string().min(1, "Password is required."),
})

export type AuthFormState =
  | {
      errors?: Record<string, string[]>
      message?: string
    }
  | null

