// context/campaign-context.tsx
"use client"

import { createContext, useContext, ReactNode } from 'react'
import { useCampaign } from '@/lib/useCampaign'
import { Building, Player } from '@/lib/types'

type CampaignContextType = ReturnType<typeof useCampaign> & {
  campID: string
}

export const CampaignContext = createContext<CampaignContextType>(
  {
    buildings: { buildings: [], count: 0, error: null, isEmpty: true, loading: false },
    campID: "none",
    isLoading: false,
    party: { count: 0, error: null, isEmpty: true, loading: false, party: [] }

  }
)

export function CampaignProvider({
  children,
  campID
}: {
  children: ReactNode
  campID: string
}) {
  const campaignData = useCampaign(campID)

  const value : CampaignContextType = {
    ...campaignData,
    campID
  }

  return (
    <CampaignContext.Provider value={value}>
      {children}
    </CampaignContext.Provider>
  )
}

export function useCampaignContext() {
  const context = useContext(CampaignContext)
  if (!context) {
    throw new Error('useCampaignContext must be used within a CampaignProvider')
  }
  return context
}