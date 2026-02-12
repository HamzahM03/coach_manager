"use client"

import { useActionState } from "react"
import { signIn } from "@/app/actions/auth" // <-- change this path to wherever your action lives
import type { AuthFormState } from "@/app/lib/definitions"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"

const initialState: AuthFormState = null

export default function Login() {
  const [state, action, isPending] = useActionState(signIn, initialState)

  // (Optional) flatten all field errors for a simple display
  const allErrors = state?.errors ? Object.values(state.errors).flat() : []

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>

        <CardContent>
          {/* Key change: form action=action (server action) */}
          <form action={action} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
              />

              {/* Field-specific errors (works even though errors is Record) */}
              {state?.errors?.email?.map((err) => (
                <p key={err} className="text-sm text-destructive">
                  {err}
                </p>
              ))}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
                >
                  Forgot?
                </a>
              </div>

              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                required
              />

              {state?.errors?.password?.map((err) => (
                <p key={err} className="text-sm text-destructive">
                  {err}
                </p>
              ))}
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Signing in..." : "Sign in"}
            </Button>

            {/* General message from the server action (e.g. invalid credentials) */}
            {!!state?.message && (
              <p className="text-sm text-destructive">{state.message}</p>
            )}

            {/* Optional: show all errors at bottom too */}
            {allErrors.length > 0 && (
              <div className="space-y-1">
                {allErrors.map((err) => (
                  <p key={err} className="text-sm text-destructive">
                    {err}
                  </p>
                ))}
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
