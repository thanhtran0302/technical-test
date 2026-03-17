import { NextRequest, NextResponse } from 'next/server'
import { mockAccount, mockAccountRebillFailed, mockAccountNotSubscribed } from '@/lib/mock-data'

// Route API mock pour simuler /my/account
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const scenario = searchParams.get('scenario') || 'default'

  // Simuler un délai réseau
  await new Promise((resolve) => setTimeout(resolve, 500))

  let account

  switch (scenario) {
    case 'rebill_failed':
      account = mockAccountRebillFailed
      break
    case 'not_subscribed':
      account = mockAccountNotSubscribed
      break
    case 'error':
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      )
    default:
      account = mockAccount
  }

  return NextResponse.json(account)
}

// Route pour toggle rebill
export async function PUT(request: NextRequest) {
  const body = await request.json()
  const { rebill } = body

  await new Promise((resolve) => setTimeout(resolve, 800))

  return NextResponse.json({
    success: true,
    rebill_enabled: rebill === 1,
  })
}
