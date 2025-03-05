"use client"

import { useAuth } from '@/lib/auth-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Dumbbell, Heart, Zap, Brain } from 'lucide-react'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend
} from 'recharts'

export function StatsDisplay() {
  const { user } = useAuth()
  
  if (!user) return null
  
  // Calculate max stat value for radar chart
  const maxStat = Math.max(user.strength, user.stamina, user.agility, user.intelligence)
  
  const radarData = [
    {
      subject: 'Strength',
      value: user.strength,
      fullMark: maxStat > 50 ? maxStat : 50,
    },
    {
      subject: 'Stamina',
      value: user.stamina,
      fullMark: maxStat > 50 ? maxStat : 50,
    },
    {
      subject: 'Agility',
      value: user.agility,
      fullMark: maxStat > 50 ? maxStat : 50,
    },
    {
      subject: 'Intelligence',
      value: user.intelligence,
      fullMark: maxStat > 50 ? maxStat : 50,
    },
  ]
  
  const barData = [
    {
      name: 'Strength',
      value: user.strength,
      color: 'hsl(var(--chart-1))',
    },
    {
      name: 'Stamina',
      value: user.stamina,
      color: 'hsl(var(--chart-2))',
    },
    {
      name: 'Agility',
      value: user.agility,
      color: 'hsl(var(--chart-3))',
    },
    {
      name: 'Intelligence',
      value: user.intelligence,
      color: 'hsl(var(--chart-4))',
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Hunter Stats</CardTitle>
          <CardDescription>
            Your current abilities and attributes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Dumbbell className="h-4 w-4 mr-2 text-chart-1" />
                    <span>Strength</span>
                  </div>
                  <span className="font-medium">{user.strength}</span>
                </div>
                <Progress value={user.strength} max={100} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Heart className="h-4 w-4 mr-2 text-chart-2" />
                    <span>Stamina</span>
                  </div>
                  <span className="font-medium">{user.stamina}</span>
                </div>
                <Progress value={user.stamina} max={100} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Zap className="h-4 w-4 mr-2 text-chart-3" />
                    <span>Agility</span>
                  </div>
                  <span className="font-medium">{user.agility}</span>
                </div>
                <Progress value={user.agility} max={100} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Brain className="h-4 w-4 mr-2 text-chart-4" />
                    <span>Intelligence</span>
                  </div>
                  <span className="font-medium">{user.intelligence}</span>
                </div>
                <Progress value={user.intelligence} max={100} className="h-2" />
              </div>
            </div>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart outerRadius={90} data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis />
                  <Radar
                    name="Stats"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Stat Comparison</CardTitle>
          <CardDescription>
            Visual representation of your abilities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={barData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" name="Value" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Rank Information</CardTitle>
          <CardDescription>
            Current rank and progression details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Current Rank: {user.rank}</h3>
              <p className="text-muted-foreground">
                Level {user.level} Hunter
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Rank Progression</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <div className={`w-4 h-4 rounded-full mr-2 ${user.rank === 'E-Rank' ? 'bg-primary' : 'bg-muted'}`}></div>
                  <span className={user.rank === 'E-Rank' ? 'font-medium' : ''}>E-Rank (Levels 1-10)</span>
                </li>
                <li className="flex items-center">
                  <div className={`w-4 h-4 rounded-full mr-2 ${user.rank === 'D-Rank' ? 'bg-primary' : 'bg-muted'}`}></div>
                  <span className={user.rank === 'D-Rank' ? 'font-medium' : ''}>D-Rank (Levels 11-20)</span>
                </li>
                <li className="flex items-center">
                  <div className={`w-4 h-4 rounded-full mr-2 ${user.rank === 'C-Rank' ? 'bg-primary' : 'bg-muted'}`}></div>
                  <span className={user.rank === 'C-Rank' ? 'font-medium' : ''}>C-Rank (Levels 21-30)</span>
                </li>
                <li className="flex items-center">
                  <div className={`w-4 h-4 rounded-full mr-2 ${user.rank === 'B-Rank' ? 'bg-primary' : 'bg-muted'}`}></div>
                  <span className={user.rank === 'B-Rank' ? 'font-medium' : ''}>B-Rank (Levels 31-40)</span>
                </li>
                <li className="flex items-center">
                  <div className={`w-4 h-4 rounded-full mr-2 ${user.rank === 'A-Rank' ? 'bg-primary' : 'bg-muted'}`}></div>
                  <span className={user.rank === 'A-Rank' ? 'font-medium' : ''}>A-Rank (Levels 41-50)</span>
                </li>
                <li className="flex items-center">
                  <div className={`w-4 h-4 rounded-full mr-2 ${user.rank === 'S-Rank' ? 'bg-primary' : 'bg-muted'}`}></div>
                  <span className={user.rank === 'S-Rank' ? 'font-medium' : ''}>S-Rank (Levels 51+)</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}