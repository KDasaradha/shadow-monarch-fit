"use client"

import { useAuth } from '@/lib/auth-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Users, Trophy, Shield, Target } from 'lucide-react'

export default function GuildPage() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <div className="container p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Hunter Guild</h1>
          <p className="text-muted-foreground">
            Join forces with other hunters
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Guild Status</CardTitle>
              <CardDescription>
                You are not currently a member of any guild
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center h-[300px]">
              <Users className="h-16 w-16 mb-4 text-muted-foreground" />
              <h3 className="text-xl font-medium mb-2">Join a Guild</h3>
              <p className="text-muted-foreground text-center max-w-md mb-6">
                Guilds allow you to team up with other hunters, tackle group challenges, and earn exclusive rewards.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button>Browse Guilds</Button>
                <Button variant="outline">Create Guild</Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create a Guild</CardTitle>
              <CardDescription>
                Form your own hunter organization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="guild-name">Guild Name</Label>
                  <Input id="guild-name" placeholder="Enter guild name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guild-description">Description</Label>
                  <Input id="guild-description" placeholder="Describe your guild" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Create Guild</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Top Guilds</CardTitle>
              <CardDescription>
                The most powerful hunter organizations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge className="h-6 w-6 rounded-full flex items-center justify-center p-0">1</Badge>
                    <span>Shadow Hunters</span>
                  </div>
                  <Badge variant="outline">S-Rank</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge className="h-6 w-6 rounded-full flex items-center justify-center p-0">2</Badge>
                    <span>Dragon Slayers</span>
                  </div>
                  <Badge variant="outline">A-Rank</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge className="h-6 w-6 rounded-full flex items-center justify-center p-0">3</Badge>
                    <span>Phoenix Wings</span>
                  </div>
                  <Badge variant="outline">A-Rank</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}