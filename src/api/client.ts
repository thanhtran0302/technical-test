// API Client mock pour l'exercice
// Dans un vrai projet, ceci serait connecté à l'API Wyylde

import { UserAccount, Offer, SubscriptionPayment } from '@/types'

// Pour l'exercice, on utilise le mock local
// Dans un vrai projet, ceci serait 'https://api.wyylde.com'
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ''

class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options?.headers,
    }

    // Dans un vrai projet, on ajouterait le token d'auth ici
    // const token = localStorage.getItem('token')
    // if (token) headers['Authorization'] = `Bearer ${token}`

    const response = await fetch(url, {
      ...options,
      headers,
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' })
  }

  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async put<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' })
  }
}

export const apiClient = new ApiClient(API_BASE_URL)

// ─────────────────────────────────────────────
// API Functions
// ─────────────────────────────────────────────

export const accountApi = {
  getMyAccount: () => apiClient.get<UserAccount>('/my/account'),

  getOffers: () => apiClient.get<{ offers: Offer[] }>('/my/account?get_offers=1'),

  toggleRebill: (enabled: boolean) =>
    apiClient.put('/subscribe', { rebill: enabled ? 1 : 0 }),

  subscribe: (params: {
    reference: string
    source: string
    amount: number
    immediateCharge?: number
  }) => apiClient.post('/subscribe', params),

  getPaymentHistory: (page?: string) =>
    apiClient.get<{ payments: SubscriptionPayment[] }>(
      `/payment/transactions${page ? `?page=${page}` : ''}`
    ),
}
