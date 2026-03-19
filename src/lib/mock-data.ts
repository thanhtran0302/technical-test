// Mock data pour l'exercice
// Ce fichier simule les données de l'API Wyylde

import { UserAccount } from '@/types'

export const mockAccount: UserAccount = {
  userid: 12345,
  id: 'abc123-def456-ghi789',
  email: 'user@example.com',

  nickname: {
    current: 'JohnDoe',
    old: [
      { nickname: 'JohnD', discarded: '2024-01-15' },
    ],
    change_availability: '2024-06-15',
  },

  subscription: {
    provider: 'S', // Stripe
    publishableKey: 'pk_test_xxx',
    payment_methods: ['card', 'sepa_debit'],

    enabled: true,
    expire: '2024-04-15',

    cards: [
      {
        id: 'card_123',
        object: 'card',
        name: 'John Doe',
        exp_month: 12,
        exp_year: 2025,
        brand: 'Visa',
        funding: 'credit',
        last4: '4242',
        default: true,
        created: 1704067200,
        expired: 'N',
      },
      {
        id: 'card_456',
        object: 'card',
        name: 'John Doe',
        exp_month: 1,
        exp_year: 2024,
        brand: 'MasterCard',
        funding: 'debit',
        last4: '5678',
        default: false,
        created: 1704067200,
        expired: 'N',
      },
    ],
    default_card: {
      id: 'card_123',
      object: 'card',
      name: 'John Doe',
      exp_month: 12,
      exp_year: 2025,
      brand: 'Visa',
      funding: 'credit',
      last4: '4242',
      default: true,
      created: 1704067200,
      expired: 'N',
    },

    rebill: {
      created: 1704067200,
      start: '2024-01-15',
      amount: 2990, // 29.90€
      enable: 'Y',
      next: 1713139200, // 15 avril 2024
      currency: 'EUR',
      first_amount: 29.9,
      reference: 'ABO-3M-10',
      interval: 3,
    },

    last: {
      amount: 29.9,
      transacid: 'txn_abc123',
      mean: 'card',
      status: 'S', // Success
      option: 'ABO-3M-10',
      currency: 'EUR',
      timestamp: 1704067200,
      last4: '4242',
      brand: 'Visa',
    },
  },

  offers: [
    {
      id: 1,
      reference: 'ABO-1M',
      amount: 19.9,
      rebill_amount: 19.9,
      periodic_amount: 19.9,
      currency: 'EUR',
      duration: '1M',
      duration_month: 1,
      interval: 'month',
      interval_count: 1,
      mean: 'card',
      type: 'PACK_GOLD',
      flag: false,
    },
    {
      id: 2,
      reference: 'ABO-3M-10',
      amount: 29.9,
      rebill_amount: 29.9,
      periodic_amount: 9.97,
      currency: 'EUR',
      duration: '3M',
      duration_month: 3,
      interval: 'month',
      interval_count: 3,
      mean: 'card',
      type: 'PACK_GOLD',
      flag: true,
    },
    {
      id: 3,
      reference: 'ABO-6M',
      amount: 49.9,
      rebill_amount: 49.9,
      periodic_amount: 8.32,
      currency: 'EUR',
      duration: '6M',
      duration_month: 6,
      interval: 'month',
      interval_count: 6,
      mean: 'card',
      type: 'PACK_GOLD',
      flag: false,
    },
    {
      id: 4,
      reference: 'ABO-12M',
      amount: 79.9,
      rebill_amount: 79.9,
      periodic_amount: 6.66,
      currency: 'EUR',
      duration: '12M',
      duration_month: 12,
      interval: 'year',
      interval_count: 12,
      mean: 'card',
      type: 'PACK_GOLD',
      flag: false,
    },
  ],

  offers_with_rebill: [],

  offers_with_promotion: [
    {
      id: 5,
      reference: 'PROMO-3M',
      amount: 19.9,
      original_amount: 29.9,
      rebill_amount: 29.9,
      periodic_amount: 6.63,
      currency: 'EUR',
      duration: '3M',
      duration_month: 3,
      interval: 'month',
      interval_count: 3,
      mean: 'card',
      type: 'PACK_GOLD',
      flag: true,
      promotional: 1,
      tag: 'REACR',
      template: 'reacquisition',
      expire: '2024-03-20',
      name: 'Offre fidélité',
    },
  ],

  last_rebill_failed: false,

  sponsorship: {
    offer_duration_days: 30,
    is_offer_available: true,
  },
}

// Version avec rebill échoué
export const mockAccountRebillFailed: UserAccount = {
  ...mockAccount,
  last_rebill_failed: true,
  moratorium: 7,
  subscription: {
    ...mockAccount.subscription,
    rebill: {
      ...mockAccount.subscription.rebill!,
      enable: 'N',
    },
  },
}

// Version non-abonné
export const mockAccountNotSubscribed: UserAccount = {
  ...mockAccount,
  subscription: {
    ...mockAccount.subscription,
    enabled: false,
    expire: '',
    rebill: undefined,
    cards: [],
    default_card: undefined,
  },
  last_rebill_failed: false,
}
