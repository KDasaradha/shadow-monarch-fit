"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/lib/auth-provider'
import { CheckCircle, Clock, Zap, Brain, Dumbbell, Heart } from 'lucide-react'
import { SystemMessage } from './system-message'
import { soundEffects } from '@/lib/sound-effects'

// Mock quest data
const mockQuests = [
  {
    id: '1',
    title: 'Morning Exercise',
    description: 'Complete 20 push-ups to increase your strength.',
    difficulty: 1,
    reward_xp: 30,
    category: 'physical',
    status: 'pending'
  },
  {
    id: '2',
    title: 'Mental Training',
    description: 'Solve 5 logic puzzles to enhance your intelligence.',
    difficulty: 2,
    reward_xp: 40,
    category: 'mental',
    status: 'pending'
  },
  {
    id: '3',
    title: 'Endurance Challenge',
    description: 'Run for 15 minutes to improve your stamina.',
    difficulty: 2,
    reward_xp: 50,
    category: 'physical',
    status: 'pending'
  },
  {
    id: '4',
    title: 'Skill Acquisition',
    description: 'Learn a new skill or practice an existing one for 30 minutes.',
    difficulty: 3,
    reward_xp: 60,
    category: 'skill',
    status: 'pending'
  }
]

export function QuestList() {
  const [quests, setQuests] = useState(mockQuests)
  const [systemMessage, setSystemMessage] = useState<string | null>(null)
  const [messageType, setMessageType] = useState<'info' | 'success' | 'warning' | 'error'>('info')
  const { toast } = useToast()
  const { user } = useAuth()

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'physical':
        return <Dumbbell className="h-4 w-4 mr-1" />
      case 'mental':
        return <Brain className="h-4 w-4 mr-1" />
      case 'skill':
        return <Zap className="h-4 w-4 mr-1" />
      default:
        return <Clock className="h-4 w-4 mr-1" />
    }
  }

  const getDifficultyLabel = (difficulty: number) => {
    switch (difficulty) {
      case 1:
        return 'Easy'
      case 2:
        return 'Medium'
      case 3:
        return 'Hard'
      default:
        return 'Unknown'
    }
  }

  const completeQuest = (id: string) => {
    setQuests(quests.map(quest => 
      quest.id === id ? { ...quest, status: 'completed' } : quest
    ))

    const completedQuest = quests.find(q => q.id === id)
    
    if (completedQuest) {
      // Play sound effect
      soundEffects.play('questComplete')
      
      // Show system message
      setMessageType('success')
      setSystemMessage(`Quest completed: ${completedQuest.title}. You earned ${completedQuest.reward_xp} XP!`)
      
      // Show toast notification
      toast({
        title: "Quest Completed!",
        description: `You earned ${completedQuest.reward_xp} XP.`,
      })

      // Simulate random event (20% chance)
      if (Math.random() < 0.2) {
        setTimeout(() => {
          setMessageType('info')
          setSystemMessage("A special event has appeared! Complete it for bonus rewards.")
          soundEffects.play('notification')
        }, 3000)
      }
    }
  }

  // Trigger a random event on first load (for demo purposes)
  useEffect(() => {
    const timer = setTimeout(() => {
      const randomEvent = Math.random() < 0.5
        ? "A dungeon has appeared nearby! New quests available soon."
        : "System boost activated! All XP gains increased by 20% for the next hour."
      
      setMessageType('info')
      setSystemMessage(randomEvent)
    }, 10000)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Daily Quests</h2>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => soundEffects.play('buttonClick')}
        >
          Refresh Quests
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quests.map((quest) => (
          <Card key={quest.id} className={cn("solo-card", quest.status === 'completed' ? 'opacity-70' : '')}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{quest.title}</CardTitle>
                <Badge variant={quest.status === 'completed' ? 'secondary' : 'default'}>
                  {quest.status === 'completed' ? (
                    <span className="flex items-center">
                      <CheckCircle className="h-3 w-3 mr-1" /> Completed
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" /> Pending
                    </span>
                  )}
                </Badge>
              </div>
              <CardDescription>{quest.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="flex items-center">
                  {getCategoryIcon(quest.category)}
                  {quest.category.charAt(0).toUpperCase() + quest.category.slice(1)}
                </Badge>
                <Badge variant="outline" className="flex items-center">
                  <Heart className="h-4 w-4 mr-1" />
                  {getDifficultyLabel(quest.difficulty)}
                </Badge>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-2">
              <div className="text-sm font-medium">
                <span className="flex items-center">
                  <Zap className="h-4 w-4 mr-1 text-yellow-500" />
                  {quest.reward_xp} XP
                </span>
              </div>
              <Button 
                size="sm" 
                onClick={() => {
                  completeQuest(quest.id)
                  soundEffects.play('buttonClick')
                }}
                disabled={quest.status === 'completed'}
                className={quest.status !== 'completed' ? 'solo-glow' : ''}
              >
                {quest.status === 'completed' ? 'Completed' : 'Complete Quest'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {systemMessage && (
        <SystemMessage 
          message={systemMessage} 
          onClose={() => setSystemMessage(null)}
          type={messageType}
        />
      )}
    </div>
  )
}

// Helper function to conditionally join class names
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}