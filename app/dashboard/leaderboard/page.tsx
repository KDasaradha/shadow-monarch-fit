"use client"

import { useState } from 'react'
import { useAuth } from '@/lib/auth-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Trophy, Users, User, Search, Medal, Crown, Shield } from 'lucide-react'
import { soundEffects } from '@/lib/sound-effects'

export default function LeaderboardPage() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')

  if (!user) return null

  // Mock data for hunters
  const hunters = [
    { id: '1', name: 'Shadow Monarch', rank: 'S-Rank', level: 99, guild: 'Shadow Hunters' },
    { id: '2', name: 'Dragon Slayer', rank: 'S-Rank', level: 87, guild: 'Dragon Slayers' },
    { id: '3', name: 'Phoenix Knight', rank: 'A-Rank', level: 76, guild: 'Phoenix Wings' },
    { id: '4', name: 'Iron Fist', rank: 'A-Rank', level: 72, guild: 'Shadow Hunters' },
    { id: '5', name: 'Thunder Blade', rank: 'A-Rank', level: 68, guild: 'Dragon Slayers' },
    { id: '6', name: 'Frost Mage', rank: 'B-Rank', level: 54, guild: 'Arcane Masters' },
    { id: '7', name: 'Swift Arrow', rank: 'B-Rank', level: 49, guild: 'Phoenix Wings' },
    { id: '8', name: 'Stone Guardian', rank: 'C-Rank', level: 35, guild: 'Earth Defenders' },
    { id: '9', name: 'Flame Dancer', rank: 'C-Rank', level: 32, guild: 'Phoenix Wings' },
    { id: '10', name: 'Night Stalker', rank: 'D-Rank', level: 24, guild: 'Shadow Hunters' },
  ]

  // Mock data for guilds
  const guilds = [
    { id: '1', name: 'Shadow Hunters', rank: 'S-Rank', members: 42, avgLevel: 65 },
    { id: '2', name: 'Dragon Slayers', rank: 'A-Rank', members: 38, avgLevel: 58 },
    { id: '3', name: 'Phoenix Wings', rank: 'A-Rank', members: 35, avgLevel: 52 },
    { id: '4', name: 'Arcane Masters', rank: 'B-Rank', members: 29, avgLevel: 43 },
    { id: '5', name: 'Earth Defenders', rank: 'B-Rank', members: 26, avgLevel: 39 },
    { id: '6', name: 'Crimson Blades', rank: 'C-Rank', members: 22, avgLevel: 31 },
    { id: '7', name: 'Azure Knights', rank: 'C-Rank', members: 20, avgLevel: 28 },
    { id: '8', name: 'Emerald Guardians', rank: 'D-Rank', members: 15, avgLevel: 22 },
  ]

  const getRankClass = (rank: string) => {
    const rankLetter = rank.charAt(0).toLowerCase()
    return `rank-${rankLetter}`
  }

  const filteredHunters = searchQuery 
    ? hunters.filter(hunter => 
        hunter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hunter.guild.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hunter.rank.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : hunters

  const filteredGuilds = searchQuery
    ? guilds.filter(guild => 
        guild.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guild.rank.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : guilds

  return (
    <div className="container p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leaderboard</h1>
          <p className="text-muted-foreground">
            Compare your progress with other hunters
          </p>
        </div>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search hunters or guilds..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="hunters" className="space-y-4">
        <TabsList>
          <TabsTrigger 
            value="hunters"
            onClick={() => soundEffects.play('buttonClick')}
          >
            <User className="h-4 w-4 mr-2" />
            Hunters
          </TabsTrigger>
          <TabsTrigger 
            value="guilds"
            onClick={() => soundEffects.play('buttonClick')}
          >
            <Users className="h-4 w-4 mr-2" />
            Guilds
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="hunters">
          <Card className="solo-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
                Top Hunters
              </CardTitle>
              <CardDescription>
                The most powerful hunters in the world
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border overflow-hidden">
                  <div className="grid grid-cols-12 p-4 text-sm font-medium border-b bg-muted/50">
                    <div className="col-span-1">#</div>
                    <div className="col-span-4">Hunter</div>
                    <div className="col-span-2">Rank</div>
                    <div className="col-span-2">Level</div>
                    <div className="col-span-3">Guild</div>
                  </div>
                  
                  {filteredHunters.slice(0, 3).map((hunter, index) => (
                    <div key={hunter.id} className="grid grid-cols-12 p-4 text-sm border-b bg-muted/20">
                      <div className="col-span-1 flex items-center">
                        {index === 0 && <Crown className="h-5 w-5 text-yellow-500" />}
                        {index === 1 && <Medal className="h-5 w-5 text-gray-300" />}
                        {index === 2 && <Medal className="h-5 w-5 text-amber-600" />}
                      </div>
                      <div className="col-span-4 font-medium">{hunter.name}</div>
                      <div className={`col-span-2 ${getRankClass(hunter.rank)}`}>{hunter.rank}</div>
                      <div className="col-span-2">Level {hunter.level}</div>
                      <div className="col-span-3">{hunter.guild}</div>
                    </div>
                  ))}
                  
                  {filteredHunters.slice(3).map((hunter, index) => (
                    <div key={hunter.id} className="grid grid-cols-12 p-4 text-sm border-b last:border-0">
                      <div className="col-span-1">{index + 4}</div>
                      <div className="col-span-4">{hunter.name}</div>
                      <div className={`col-span-2 ${getRankClass(hunter.rank)}`}>{hunter.rank}</div>
                      <div className="col-span-2">Level {hunter.level}</div>
                      <div className="col-span-3">{hunter.guild}</div>
                    </div>
                  ))}
                </div>
                
                <div className="rounded-md border p-4 bg-muted/20">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>Your Rank: </span>
                    <span className={`font-medium ${getRankClass(user.rank)}`}>{user.rank}</span>
                    <span className="text-muted-foreground ml-2">(Level {user.level})</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="guilds">
          <Card className="solo-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-blue-500" />
                Top Guilds
              </CardTitle>
              <CardDescription>
                The most powerful hunter organizations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border overflow-hidden">
                  <div className="grid grid-cols-12 p-4 text-sm font-medium border-b bg-muted/50">
                    <div className="col-span-1">#</div>
                    <div className="col-span-5">Guild</div>
                    <div className="col-span-2">Rank</div>
                    <div className="col-span-2">Members</div>
                    <div className="col-span-2">Avg. Level</div>
                  </div>
                  
                  {filteredGuilds.slice(0, 3).map((guild, index) => (
                    <div key={guild.id} className="grid grid-cols-12 p-4 text-sm border-b bg-muted/20">
                      <div className="col-span-1 flex items-center">
                        {index === 0 && <Crown className="h-5 w-5 text-yellow-500" />}
                        {index === 1 && <Medal className="h-5 w-5 text-gray-300" />}
                        {index === 2 && <Medal className="h-5 w-5 text-amber-600" />}
                      </div>
                      <div className="col-span-5 font-medium">{guild.name}</div>
                      <div className={`col-span-2 ${getRankClass(guild.rank)}`}>{guild.rank}</div>
                      <div className="col-span-2">{guild.members}</div>
                      <div className="col-span-2">{guild.avgLevel}</div>
                    </div>
                  ))}
                  
                  {filteredGuilds.slice(3).map((guild, index) => (
                    <div key={guild.id} className="grid grid-cols-12 p-4 text-sm border-b last:border-0">
                      <div className="col-span-1">{index + 4}</div>
                      <div className="col-span-5">{guild.name}</div>
                      <div className={`col-span-2 ${getRankClass(guild.rank)}`}>{guild.rank}</div>
                      <div className="col-span-2">{guild.members}</div>
                      <div className="col-span-2">{guild.avgLevel}</div>
                    </div>
                  ))}
                </div>
                
                <div className="rounded-md border p-4 bg-muted/20">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>Your Guild: </span>
                    <span className="font-medium">Not a member</span>
                    <span className="text-muted-foreground ml-2">(Join a guild to appear on the leaderboard)</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}