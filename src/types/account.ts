// Types basés sur l'API Wyylde /my/account

export type PaymentMethod = 'card' | 'sepa_debit' | 'google' | 'apple'

export type SubscriptionProvider = 'S' | 'P' // Stripe ou Paybox

export type PaymentStatus = 'S' | 'C' | 'E' | 'AS' | 'AE' | 'RR' | 'RS' | 'RE'

// ─────────────────────────────────────────────
// OFFRES
// ─────────────────────────────────────────────

export interface Offer {
  id: number
  reference: string // ex: "ABO-3M-10"
  amount: number // Prix en euros
  original_amount?: number
  rebill_amount: number
  periodic_amount: number
  currency: string

  duration: string // "1M", "3M", "6M", "12M", "2D", "15D"
  duration_day?: number
  duration_month?: number
  duration_year?: number

  interval: string
  interval_count: number

  mean: 'card' | 'allopass'
  type: string // "PACK_GOLD", "PACK_DISCOVERY"
  flag: boolean
  category?: string

  // Offres promotionnelles
  promotional?: 0 | 1
  tag?: string
  template?: string
  expire?: string
  name?: string
}

// ─────────────────────────────────────────────
// PAIEMENTS
// ─────────────────────────────────────────────

export interface PaymentCard {
  id: string
  object: 'card'
  name: string
  exp_month: number
  exp_year: number
  brand: string
  funding: string
  last4: string
  default: boolean
  created: number
  expired: string
  wallet?: 'google_pay' | 'apple_pay'
}

export interface PaymentSepa {
  id: string
  object: 'sepa_debit' | 'source'
  default: boolean
  last4: string
  bank_code: string
  country: string
  created: number
  expired: string
}

export type PaymentSource = PaymentCard | PaymentSepa

export interface SubscriptionPayment {
  amount: number
  transacid: string
  mean: string
  status: PaymentStatus
  option: string
  currency: string
  timestamp: number
  last4: string
  brand: string
  rebill?: 0 | '1' | '2'
  charge?: {
    refunded: boolean
  }
  amount_refunded?: number
}

// ─────────────────────────────────────────────
// ABONNEMENT
// ─────────────────────────────────────────────

export interface Rebill {
  created: number
  start: string
  amount: number // En centimes
  enable: 'Y' | 'N'
  next: number // Timestamp
  currency?: string
  first_amount: number
  reference: string
  interval: number
  offer?: Offer
}

export interface Subscription {
  provider: SubscriptionProvider
  publishableKey: string
  stripeAccount?: string | null
  payment_methods: PaymentMethod[]

  enabled: boolean
  expire: string

  cards: PaymentSource[]
  default_card?: PaymentSource

  rebill?: Rebill
  last?: SubscriptionPayment
}

// ─────────────────────────────────────────────
// COMPTE UTILISATEUR
// ─────────────────────────────────────────────

export interface UserAccount {
  userid: number
  id: string
  email: string

  nickname: {
    current: string
    old: Array<{
      nickname: string
      discarded: string
    }>
    change_availability: string
  }

  subscription: Subscription

  offers: Offer[]
  offers_with_rebill: Offer[]
  offers_with_promotion: Offer[]

  last_rebill_failed: boolean
  moratorium?: number

  sponsorship: {
    offer_duration_days: number
    is_offer_available: boolean
  }
}
