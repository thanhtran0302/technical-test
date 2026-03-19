'use client'

import { useSubscription, useToggleRebill } from '@/queries'
import { Card, CardContent, CardHeader, CardTitle, Button, Switch } from '@/components/ui'
import { Crown, AlertCircle, Calendar, CreditCard } from 'lucide-react'
import { useState } from 'react'

export function SubscriptionStatus() {
  const { subscription, isGold, hasRebill, rebillFailed, moratorium } = useSubscription()
  const toggleRebill = useToggleRebill()
  const [showConfirm, setShowConfirm] = useState(false)

  const handleToggleRebill = async () => {
    if (hasRebill && !showConfirm) {
      setShowConfirm(true)
      return
    }

    await toggleRebill.mutateAsync(!hasRebill)
    setShowConfirm(false)
  }

  const formatDate = (date: string | number) => {
    if (typeof date === 'number') {
      return new Date(date * 1000).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    }
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Crown className="h-5 w-5 text-brand-gold" />
          Mon abonnement
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isGold ? (
          <>
            <div className="flex items-center gap-3 text-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Crown className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Membre Gold</p>
                <p className="text-muted-foreground">
                  jusqu'au {formatDate(subscription?.expire || '')}
                </p>
              </div>
            </div>

            {rebillFailed && (
              <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-destructive">
                      Paiement échoué
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Le dernier prélèvement a échoué.{' '}
                      {moratorium && moratorium > 0 && (
                        <>Il reste {moratorium} jours de moratoire.</>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {subscription?.rebill && (
              <div className="space-y-4 rounded-lg border bg-muted/50 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Renouvellement automatique</span>
                  </div>
                  <Switch
                    checked={hasRebill}
                    onCheckedChange={handleToggleRebill}
                    disabled={toggleRebill.isPending}
                  />
                </div>

                {showConfirm && (
                  <div className="rounded border border-yellow-500/50 bg-yellow-500/10 p-3">
                    <p className="text-sm mb-2">
                      ⚠️ Voulez-vous vraiment désactiver le renouvellement automatique ?
                    </p>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={handleToggleRebill}
                      >
                        Confirmer
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setShowConfirm(false)}
                      >
                        Annuler
                      </Button>
                    </div>
                  </div>
                )}

                {hasRebill && (
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>
                      Prochain prélèvement :{' '}
                      <span className="font-medium text-foreground">
                        {formatDate(subscription.rebill.next)}
                      </span>
                    </p>
                    <p>
                      Montant :{' '}
                      <span className="font-medium text-foreground">
                        {(subscription.rebill.amount / 100).toFixed(2)}€
                      </span>
                    </p>
                  </div>
                )}

                {subscription.default_card && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CreditCard className="h-4 w-4" />
                    <span>
                      {'brand' in subscription.default_card 
                        ? `${subscription.default_card.brand} •••• `
                        : 'SEPA •••• '}
                      {subscription.default_card.last4}
                    </span>
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-6">
            <p className="text-muted-foreground mb-4">
              Vous n'êtes pas encore abonné
            </p>
            <Button>S'abonner maintenant</Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
