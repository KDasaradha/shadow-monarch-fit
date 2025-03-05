"use client"

import { useAuth } from '@/lib/auth-provider'
import { StatsDisplay } from '@/components/stats-display'

export default function StatsPage() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <div className="container p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Hunter Stats</h1>
          <p className="text-muted-foreground">
            Track your abilities and progression
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <StatsDisplay />
      </div>
    </div>
  )
}