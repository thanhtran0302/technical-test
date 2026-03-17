'use client'

import { useAccount } from '@/queries'
import { Card, CardContent, CardHeader, CardTitle, Button } from '@/components/ui'
import { Check, Star } from 'lucide-react'
import { Offer } from '@/types'

export function OffersList() {
  const { data: account } = useAccount()

  const offers = account?.offers_with_promotion?.length
    ? account.offers_with_promotion
    : account?.offers || []

  if (!offers.length) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>Offres disponibles</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {offers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

interface OfferCardProps {
  offer: Offer
}

function OfferCard({ offer }: OfferCardProps) {
  const isPopular = offer.flag || offer.promotional
  const monthlyPrice = offer.periodic_amount.toFixed(2)

  return (
    <div
      className={`relative rounded-lg border p-4 transition-all hover:shadow-md ${
        isPopular ? 'border-primary shadow-sm' : ''
      }`}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
            <Star className="h-3 w-3" />
            Populaire
          </span>
        </div>
      )}

      <div className="mb-4">
        <h3 className="font-semibold text-lg">{offer.duration}</h3>
        {offer.name && (
          <p className="text-sm text-muted-foreground">{offer.name}</p>
        )}
      </div>

      <div className="mb-4">
        {offer.original_amount && (
          <p className="text-sm text-muted-foreground line-through">
            {offer.original_amount.toFixed(2)}€
          </p>
        )}
        <p className="text-3xl font-bold">{offer.amount.toFixed(2)}€</p>
        <p className="text-sm text-muted-foreground">
          soit {monthlyPrice}€/mois
        </p>
      </div>

      <ul className="mb-4 space-y-2 text-sm">
        <li className="flex items-center gap-2">
          <Check className="h-4 w-4 text-primary" />
          Accès illimité
        </li>
        <li className="flex items-center gap-2">
          <Check className="h-4 w-4 text-primary" />
          Messagerie prioritaire
        </li>
        <li className="flex items-center gap-2">
          <Check className="h-4 w-4 text-primary" />
          Visibilité boostée
        </li>
      </ul>

      <Button className="w-full" variant={isPopular ? 'default' : 'outline'}>
        Choisir
      </Button>
    </div>
  )
}
