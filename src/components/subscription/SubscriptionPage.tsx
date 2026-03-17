'use client'

import { useSubscription } from '@/queries'
import { Spinner, Card, CardContent, CardHeader, CardTitle, Button } from '@/components/ui'
import { SubscriptionStatus } from './SubscriptionStatus'
import { OffersList } from './OffersList'

export function SubscriptionPage() {
  const { isGold, isLoading, error } = useSubscription()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Spinner size="lg" />
      </div>
    )
  }

  if (error) {
    return (
      <Card className="border-destructive">
        <CardContent className="pt-6">
          <p className="text-destructive">
            Erreur lors du chargement: {error.message}
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <SubscriptionStatus />
      <OffersList />
    </div>
  )
}
