"use client"

import { useAuth } from '@/lib/auth-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SystemMessage } from '@/components/system-message'
import { QuestList } from '@/components/quest-list'
import { StatsDisplay } from '@/components/stats-display'
import { useState, useEffect } from 'react'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function Dashboard() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [showWelcome, setShowWelcome] = useState(false)

  useEffect(() => {
    // Show welcome message after a short delay
    const timer = setTimeout(() => {
      setShowWelcome(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Calculate XP needed for next level (simple formula)
  const xpForNextLevel = user ? user.level * 100 : 100
  const xpProgress = user ? (user.xp / xpForNextLevel) * 100 : 0

  return (
    <div className="container p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome, {user?.name}</h1>
          <p className="text-muted-foreground">
            {user?.rank} Hunter | Level {user?.level}
          </p>
        </div>
        <Card className="w-full md:w-auto mt-4 md:mt-0">
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>XP Progress</span>
                <span>{user?.xp} / {xpForNextLevel}</span>
              </div>
              <Progress value={xpProgress} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="quests" className="space-y-4">
        <TabsList>
          <TabsTrigger value="quests">Daily Quests</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
          <TabsTrigger value="training">Training</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
        </TabsList>
        
        <TabsContent value="quests" className="space-y-4">
          <QuestList />
        </TabsContent>
        
        <TabsContent value="stats">
          <StatsDisplay />
        </TabsContent>
        
        <TabsContent value="training">
          <Card>
            <CardHeader>
              <CardTitle>Training Center</CardTitle>
              <CardDescription>
                Enhance your abilities through specialized training
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Access the full training center to improve your strength, stamina, agility, and intelligence.
              </p>
              <Link href="/dashboard/training">
                <Button className="w-full sm:w-auto">
                  Go to Training Center <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="inventory">
          <Card>
            <CardHeader>
              <CardTitle>Inventory</CardTitle>
              <CardDescription>
                View your collected items and equipment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Your inventory is empty. Complete quests to earn rewards!
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {showWelcome && (
        <SystemMessage 
          message="Welcome to the System, Hunter. Your daily quests await."
          onClose={() => {
            toast({
              title: "System Notification",
              description: "Complete quests to gain XP and increase your rank.",
            })
          }}
        />
      )}
    </div>
  )
}