// React Query hooks pour l'API Wyylde

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { accountApi } from '@/api'
import { UserAccount, Offer } from '@/types'

// ─────────────────────────────────────────────
// Query Keys
// ─────────────────────────────────────────────

export const accountKeys = {
  all: ['account'] as const,
  details: () => [...accountKeys.all, 'details'] as const,
  offers: () => [...accountKeys.all, 'offers'] as const,
  subscription: () => [...accountKeys.all, 'subscription'] as const,
  cards: () => [...accountKeys.all, 'cards'] as const,
  paymentHistory: (page?: string) =>
    [...accountKeys.all, 'history', page] as const,
}

// ─────────────────────────────────────────────
// Queries
// ─────────────────────────────────────────────

export function useAccount() {
  return useQuery({
    queryKey: accountKeys.details(),
    queryFn: accountApi.getMyAccount,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useOffers() {
  return useQuery({
    queryKey: accountKeys.offers(),
    queryFn: accountApi.getOffers,
    staleTime: 10 * 60 * 1000,
    select: (data) => data.offers,
  })
}

export function useSubscription() {
  const { data: account, ...query } = useAccount()

  return {
    subscription: account?.subscription,
    isGold: account?.subscription?.enabled ?? false,
    provider: account?.subscription?.provider,
    hasRebill: account?.subscription?.rebill?.enable === 'Y',
    rebillFailed: account?.last_rebill_failed ?? false,
    moratorium: account?.moratorium,
    account,
    ...query,
  }
}

export function useCards() {
  const { data: account, ...query } = useAccount()

  const validCards = account?.subscription?.cards?.filter(card => {
    const now = new Date()
    const expDate = new Date(card.exp_year, card.exp_month)
    return expDate >= now
  }) ?? []

  return {
    cards: account?.subscription?.cards ?? [],
    defaultCard: account?.subscription?.default_card,
    hasCards: (account?.subscription?.cards?.length ?? 0) > 0,
    ...query,
  }
}

// ─────────────────────────────────────────────
// Mutations
// ─────────────────────────────────────────────

export function useToggleRebill() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (enabled: boolean) => accountApi.toggleRebill(enabled),

    onMutate: async (enabled) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: accountKeys.details() })

      // Snapshot the previous value
      const previousAccount = queryClient.getQueryData<UserAccount>(
        accountKeys.details()
      )

      // Optimistically update
      if (previousAccount) {
        queryClient.setQueryData<UserAccount>(accountKeys.details(), {
          ...previousAccount,
          subscription: {
            ...previousAccount.subscription,
            rebill: {
              ...previousAccount.subscription.rebill!,
              enable: enabled ? 'Y' : 'N',
            },
          },
        })
      }

      return { previousAccount }
    },

    onError: (err, variables, context) => {
      // Rollback on error
      if (context?.previousAccount) {
        queryClient.setQueryData(accountKeys.details(), context.previousAccount)
      }
    },

    onSettled: () => {
      // Refetch after error or success
      queryClient.invalidateQueries({ queryKey: accountKeys.details() })
    },
  })
}

export function useSubscribe() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: accountApi.subscribe,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: accountKeys.all })
    },
  })
}
