"use client"

import { useAuth } from '@/lib/auth-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { QuestList } from '@/components/quest-list'

export default function QuestsPage() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <div className="container p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Daily Quests</h1>
          <p className="text-muted-foreground">
            Complete quests to gain experience and rewards
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <QuestList />
      </div>
    </div>
  )
}