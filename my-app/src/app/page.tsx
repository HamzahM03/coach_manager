import Link from "next/link"
import { createServerSupabaseClient } from "@/app/lib/supabase/server"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default async function HomePage() {
  const supabase = await createServerSupabaseClient()

  const { data, error } = await supabase.auth.getClaims()
  const claims = error ? null : data?.claims
  const userId = claims?.sub
  const isAuthed = !!userId


  return (
    <div className="min-h-screen bg-background text-foreground">


      <main className="mx-auto max-w-6xl px-6">

        {/* ── HERO ── */}
        <section className="py-16 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

            {/* Left: copy */}
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">For camps &amp; clinics</Badge>
                <Badge variant="secondary">Replaces paper attendance</Badge>
                <Badge variant="secondary">No spreadsheets needed</Badge>
              </div>

              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Your sessions are full.
                Your records shouldn't be a mess.
              </h1>

              <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
                CampOps replaces the paper, notebooks, and mental math that slow down coaches
                running session-based programs — so you always know who showed up, who owes
                you, and what you made.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                {isAuthed ? (
                  <>
                    <Button asChild className="w-full sm:w-auto">
                      <Link href="/dashboard">Go to dashboard</Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full sm:w-auto">
                      <Link href="/dashboard/sessions">Check in to today's session</Link>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button asChild className="w-full sm:w-auto">
                      <Link href="/signup">Try it free — no setup needed</Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full sm:w-auto">
                      <Link href="/login">Sign in</Link>
                    </Button>
                  </>
                )}
              </div>

              <div className="space-y-1 pt-2 text-sm text-muted-foreground">
                <p>Built for coaches running weekly sessions and selling packages.</p>
                <p>Works on your phone at the gym door. No training required.</p>
              </div>
            </div>

            {/* Right: preview card */}
            <Card className="w-full">
              <CardHeader className="space-y-1">
                <CardTitle className="text-xl">Today: Weekend Skills Camp</CardTitle>
                <CardDescription>Search a name → tap to check in → balance updates automatically</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-3">
                  <Card className="border-dashed">
                    <CardHeader className="py-4">
                      <CardTitle className="text-base">Present</CardTitle>
                      <CardDescription>
                        <span className="font-medium text-foreground">12</span> / 18
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card className="border-dashed">
                    <CardHeader className="py-4">
                      <CardTitle className="text-base">Balances due</CardTitle>
                      <CardDescription>
                        <span className="font-medium text-foreground">2</span> participants
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card className="border-dashed">
                    <CardHeader className="py-4">
                      <CardTitle className="text-base">This week</CardTitle>
                      <CardDescription>
                        Profit <span className="font-medium text-foreground">$—</span>
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </div>

                <div className="rounded-lg border">
                  <div className="flex items-center justify-between border-b px-4 py-3">
                    <p className="text-sm font-medium">Check-in</p>
                    <p className="text-xs text-muted-foreground">Search · tap · done</p>
                  </div>

                  <div className="divide-y">
                    {[
                      { name: "Avery Johnson", detail: "2 sessions left", meta: "Paid" },
                      { name: "Marcus Lee", detail: "1 session left", meta: "Owes $20" },
                      { name: "Noah Patel", detail: "6 sessions left", meta: "Paid" },
                    ].map((p) => (
                      <div key={p.name} className="flex items-center justify-between px-4 py-3">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">{p.name}</p>
                          <p className="text-xs text-muted-foreground">{p.detail}</p>
                        </div>
                        <Badge variant="secondary" className="shrink-0">
                          {p.meta}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium">Expenses (example)</p>
                    <p className="text-xs text-muted-foreground">
                      Gym rent, equipment, staff — recorded in seconds
                    </p>
                  </div>
                  <p className="text-sm font-semibold">$—</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ── PAIN → RELIEF ── */}
        <section className="py-16">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Sound familiar?</CardTitle>
                <CardDescription>If you're running sessions on paper, you already know.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc space-y-2 pl-5">
                  <li>A parent asks how many sessions their kid has left — and you have to check the binder.</li>
                  <li>You forgot to mark someone absent last week, and now the count is off.</li>
                  <li>At the end of the month, you're adding up cash on your phone's calculator.</li>
                  <li>You know someone owes you money — you're just not sure exactly how much.</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">One place. Always current.</CardTitle>
                <CardDescription>CampOps handles the tracking so you can focus on the session.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc space-y-2 pl-5">
                  <li>Check someone in — their session count drops automatically.</li>
                  <li>Record a payment in 10 seconds, from your phone, mid-session.</li>
                  <li>See who owes a balance without opening a spreadsheet.</li>
                  <li>End-of-month summary: money in, expenses out, simple math.</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ── DAY IN THE LIFE ── */}
        <section className="py-16">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">What a Thursday looks like with CampOps</CardTitle>
              <CardDescription>No extra admin. No carrying things forward.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                Eight kids show up. You open today's session on your phone. Check-in takes two minutes —
                search a name, tap, done. One parent asks about remaining sessions.
                You tell them instantly: <span className="font-medium text-foreground">"Three left."</span>
              </p>
              <p>
                After camp, you log the gym rental fee. That's it.
                Records are current. Balances are accurate. Nothing to carry forward to a notebook.
              </p>
              <p>
                At the end of the month, you open the profit summary.
                Money in, expenses out — the math is already done.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="py-16">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Up and running in one session</CardTitle>
              <CardDescription>No training, no IT setup, no learning curve.</CardDescription>
            </CardHeader>

            <CardContent className="grid gap-8 md:grid-cols-3">
              <div className="space-y-2">
                <p className="text-sm font-medium">1) Add your participants</p>
                <p className="text-sm text-muted-foreground">
                  Build your roster once. Add, edit, or remove participants anytime.
                  Register new walk-ins in seconds — right from your phone or tablet.
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">2) Start a session, tap to check in</p>
                <p className="text-sm text-muted-foreground">
                  Open today's session, search a name, tap. That's the whole check-in.
                  Package balance updates the moment you do.
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">3) Always know where you stand</p>
                <p className="text-sm text-muted-foreground">
                  Payments recorded. Expenses tracked. At any point: how much came in,
                  what it cost, and what's left — no spreadsheet required.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* ── WHO IT'S FOR ── */}
        <section className="py-16">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Built for camps — flexible for more</CardTitle>
              <CardDescription>
                If you sell session packages and track attendance, this is for you.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <p className="text-sm font-medium">Works great for</p>
                <p className="text-sm text-muted-foreground">
                  Basketball camps · skills clinics · private trainers · youth programs · tutoring · studios
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Stays focused on purpose</p>
                <p className="text-sm text-muted-foreground">
                  CampOps does registration, packages, check-ins, payments, and profit — and does
                  them well. It's not trying to be an all-in-one platform. That's the point.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* ── FAQ ── */}
        <section className="py-16">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">FAQ</CardTitle>
              <CardDescription>Quick answers before you jump in.</CardDescription>
            </CardHeader>

            <CardContent className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <p className="text-sm font-medium">How long does setup take?</p>
                <p className="text-sm text-muted-foreground">
                  Most coaches have their roster loaded and their first session running within
                  20 minutes. No tutorials required.
                </p>
              </div>

              

              <div className="space-y-2">
                <p className="text-sm font-medium">Can I record cash and e-transfer payments?</p>
                <p className="text-sm text-muted-foreground">
                  Yes — any payment method works. Record it in seconds and it posts to the
                  participant's balance immediately. Card payment processing is planned for a future update.
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Is this only for sports?</p>
                <p className="text-sm text-muted-foreground">
                  It's built for camps and clinics, but works for any business that sells
                  session packages and tracks attendance.
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Can staff help with check-ins?</p>
                <p className="text-sm text-muted-foreground">
                  Owner-only works well to start. Staff roles are on the roadmap as a natural
                  upgrade when you expand.
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">What does it cost?</p>
                <p className="text-sm text-muted-foreground">
                  Free to start — no credit card needed. Paid plans are available as your
                  program grows.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="pb-16">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">
                Ready to know where everything stands — without checking the binder?
              </CardTitle>
              <CardDescription>
                Your next session is a good place to start. Takes 20 minutes to set up.
              </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-muted-foreground">
                Registration · Packages · Attendance · Payments · Profit snapshot
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                {isAuthed ? (
                  <>
                    <Button asChild>
                      <Link href="/dashboard">Open dashboard</Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link href="/dashboard/sessions">Check in to today's session</Link>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button asChild>
                      <Link href="/signup">Start free — set up your first session</Link>
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
        <footer className="border-t py-10 text-sm text-muted-foreground">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} CampOps</p>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-foreground">Privacy</Link>
              <Link href="/terms" className="hover:text-foreground">Terms</Link>
              <Link href="/contact" className="hover:text-foreground">Contact</Link>
            </div>
          </div>
        </footer>

      </main>
    </div>
  )
}