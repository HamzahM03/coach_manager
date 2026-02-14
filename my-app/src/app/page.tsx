import Link from "next/link"
import { createServerSupabaseClient } from "@/app/lib/supabase/server" // adjust to your path

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Badge } from "@/app/components/ui/badge"

export default async function HomePage() {
  const supabase = await createServerSupabaseClient()

  const { data, error } = await supabase.auth.getClaims()
  const claims = error ? null : data?.claims
  const userId = claims?.sub // user id
  const isAuthed = !!userId


  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
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
                <Button asChild>
                  <Link href="/dashboard/sessions">New Session</Link>
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="ghost">
                  <Link href="/login">Sign in</Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">Get started</Link>
                </Button>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Multi-tenant</Badge>
              <Badge variant="secondary">Next.js + Supabase</Badge>
              <Badge variant="secondary">Paperless workflows</Badge>
            </div>

            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Replace clipboards with a workflow coaches actually use.
            </h1>

            <p className="text-muted-foreground text-lg leading-relaxed">
              Sign participants in fast, track attendance, packages, and payments,
              and keep emergency info one click away—without juggling paper.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              {isAuthed ? (
                <>
                  <Button asChild className="w-full sm:w-auto">
                    <Link href="/dashboard">Go to dashboard</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full sm:w-auto">
                    <Link href="/dashboard/participants">View participants</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild className="w-full sm:w-auto">
                    <Link href="/signup">Start free</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full sm:w-auto">
                    <Link href="/login">Sign in</Link>
                  </Button>
                </>
              )}
            </div>

            <p className="text-xs text-muted-foreground">
              Built for sports camps first — flexible enough for any session-based business.
            </p>
          </div>

          {/* Hero card "preview" */}
          <Card className="w-full">
            <CardHeader className="space-y-1">
              <CardTitle className="text-xl">Today’s Session</CardTitle>
              <CardDescription>Quick actions you’ll use constantly</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <Card className="border-dashed">
                  <CardHeader className="py-4">
                    <CardTitle className="text-base">Check-in</CardTitle>
                    <CardDescription>Tap a name, mark present</CardDescription>
                  </CardHeader>
                </Card>

                <Card className="border-dashed">
                  <CardHeader className="py-4">
                    <CardTitle className="text-base">Attendance</CardTitle>
                    <CardDescription>Instant totals + history</CardDescription>
                  </CardHeader>
                </Card>

                <Card className="border-dashed">
                  <CardHeader className="py-4">
                    <CardTitle className="text-base">Packages</CardTitle>
                    <CardDescription>Track credits & expiration</CardDescription>
                  </CardHeader>
                </Card>

                <Card className="border-dashed">
                  <CardHeader className="py-4">
                    <CardTitle className="text-base">Emergency</CardTitle>
                    <CardDescription>Contacts + medical notes</CardDescription>
                  </CardHeader>
                </Card>
              </div>

              <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Profit snapshot</p>
                  <p className="text-xs text-muted-foreground">
                    See what you made this week at a glance
                  </p>
                </div>
                <p className="text-sm font-semibold">$ — — —</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Feature grid */}
        <section className="mt-12 grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Fast check-ins</CardTitle>
              <CardDescription>
                Stop digging through papers—search, tap, done.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Payments & packages</CardTitle>
              <CardDescription>
                Track who paid, what plan they’re on, and what’s left.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Emergency access</CardTitle>
              <CardDescription>
                Medical notes and guardians always available when needed.
              </CardDescription>
            </CardHeader>
          </Card>
        </section>

        {/* “How it works” */}
        <section className="mt-12">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">How it works</CardTitle>
              <CardDescription>
                Three steps from messy paperwork to clean operations.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <p className="text-sm font-medium">1) Add participants</p>
                <p className="text-sm text-muted-foreground">
                  Store profiles, guardians, medical notes, and packages.
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">2) Run sessions</p>
                <p className="text-sm text-muted-foreground">
                  Check-in flow designed for chaos: phones, tablets, laptops.
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">3) Track outcomes</p>
                <p className="text-sm text-muted-foreground">
                  Attendance history + revenue snapshots so you know what’s working.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Bottom CTA */}
        <section className="mt-12">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">
                {isAuthed ? "You’re ready." : "Ready to go paperless?"}
              </CardTitle>
              <CardDescription>
                {isAuthed
                  ? "Jump back in and run your next session."
                  : "Create a workspace for your camp (or any session-based business)."}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-muted-foreground">
                Multi-tenant SaaS • Secure auth • Built on Supabase
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                {isAuthed ? (
                  <>
                    <Button asChild>
                      <Link href="/dashboard">Open dashboard</Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link href="/dashboard/sessions">Start a session</Link>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button asChild>
                      <Link href="/signup">Get started</Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link href="/login">Sign in</Link>
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Footer */}
        <footer className="mt-16 border-t pt-8 text-sm text-muted-foreground">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} CampOps</p>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-foreground">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-foreground">
                Terms
              </Link>
              <Link href="/contact" className="hover:text-foreground">
                Contact
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
