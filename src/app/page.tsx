import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { SubscriptionPage } from '@/components/subscription/SubscriptionPage'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container py-10">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">Wyylde Technical Test</h1>
          <p className="text-muted-foreground">
            Exercice de vibe coding pour les entretiens
          </p>
        </div>

        <SubscriptionPage />
      </div>
    </main>
  )
}
