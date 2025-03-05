"use client"

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth-provider'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { SystemMessage } from '@/components/system-message'
import { ExerciseCard } from '@/components/exercise-card'
import { muscleGroups, exercises } from '@/lib/exercise-data'
import { Dumbbell, Heart, Zap, Brain, Lock, Filter } from 'lucide-react'
import { Progress } from '@/components/ui/progress'

export default function TrainingPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState('all')
  const [systemMessage, setSystemMessage] = useState<string | null>(null)
  const [filteredExercises, setFilteredExercises] = useState(exercises)

  useEffect(() => {
    if (selectedMuscleGroup === 'all') {
      setFilteredExercises(exercises)
    } else {
      setFilteredExercises(exercises.filter(exercise => exercise.muscleGroup === selectedMuscleGroup))
    }
  }, [selectedMuscleGroup])

  if (!user) return null

  const isExerciseLocked = (requiredRank: string) => {
    const rankLevels = {
      'E-Rank': 1,
      'D-Rank': 2,
      'C-Rank': 3,
      'B-Rank': 4,
      'A-Rank': 5,
      'S-Rank': 6
    }
    
    const userRankLevel = rankLevels[user.rank as keyof typeof rankLevels] || 1
    const requiredRankLevel = rankLevels[requiredRank as keyof typeof rankLevels] || 1
    
    return userRankLevel < requiredRankLevel
  }

  const handleStartExercise = () => {
    setSystemMessage("Training session started. Focus on proper form for maximum effectiveness.")
  }

  const handleCompleteExercise = () => {
    // Calculate XP gain (would be more complex in a real app)
    const xpGain = Math.floor(Math.random() * 10) + 5
    
    toast({
      title: "Exercise Completed!",
      description: `You gained ${xpGain} XP.`,
    })
    
    setSystemMessage("Exercise completed successfully. Your body is getting stronger.")
  }

  return (
    <div className="container p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Training Center</h1>
          <p className="text-muted-foreground">
            Enhance your abilities through specialized training
          </p>
        </div>
      </div>

      <Tabs defaultValue="exercises" className="space-y-4">
        <TabsList>
          <TabsTrigger value="exercises">Exercises</TabsTrigger>
          <TabsTrigger value="programs">Training Programs</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>
        
        <TabsContent value="exercises" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Exercise Library</CardTitle>
              <CardDescription>
                Choose exercises to improve specific abilities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant={selectedMuscleGroup === 'all' ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedMuscleGroup('all')}
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    All
                  </Button>
                  
                  {muscleGroups.map((group) => (
                    <Button 
                      key={group.id}
                      variant={selectedMuscleGroup === group.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedMuscleGroup(group.id)}
                    >
                      <group.icon className="h-4 w-4 mr-2" />
                      {group.name}
                    </Button>
                  ))}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredExercises.map((exercise) => (
                    <ExerciseCard 
                      key={exercise.id}
                      exercise={{
                        ...exercise,
                        locked: isExerciseLocked(exercise.requiredRank)
                      }}
                      onStart={handleStartExercise}
                      onComplete={handleCompleteExercise}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="programs">
          <Card>
            <CardHeader>
              <CardTitle>Training Programs</CardTitle>
              <CardDescription>
                Structured training regimens for optimal results
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Recommended Programs</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-lg">Beginner's Path</CardTitle>
                        <Badge>E-Rank</Badge>
                      </div>
                      <CardDescription>3 days per week, 30 minutes per session</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-muted-foreground">
                        Perfect for new hunters. Focuses on building foundational strength and stamina.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button size="sm" className="w-full">Start Program</Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-lg">Hunter Conditioning</CardTitle>
                        <Badge>D-Rank</Badge>
                      </div>
                      <CardDescription>4 days per week, 45 minutes per session</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-muted-foreground">
                        Balanced training to improve overall physical capabilities.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button size="sm" className="w-full" disabled={user.rank === 'E-Rank'}>
                        {user.rank === 'E-Rank' ? (
                          <><Lock className="h-4 w-4 mr-2" /> Locked</>
                        ) : 'Start Program'}
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-lg">Elite Combat Training</CardTitle>
                        <Badge>B-Rank</Badge>
                      </div>
                      <CardDescription>5 days per week, 60 minutes per session</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-muted-foreground">
                        Advanced training regimen focusing on combat readiness and physical prowess.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button size="sm" className="w-full" disabled={user.rank === 'E-Rank' || user.rank === 'D-Rank' || user.rank === 'C-Rank'}>
                        {user.rank === 'E-Rank' || user.rank === 'D-Rank' || user.rank === 'C-Rank' ? (
                          <><Lock className="h-4 w-4 mr-2" /> Locked</>
                        ) : 'Start Program'}
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-lg">Shadow Monarch Protocol</CardTitle>
                        <Badge>S-Rank</Badge>
                      </div>
                      <CardDescription>6 days per week, 90 minutes per session</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-muted-foreground">
                        The ultimate training program designed for the elite. Pushes all physical and mental limits.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button size="sm" className="w-full" disabled={user.rank !== 'S-Rank'}>
                        {user.rank !== 'S-Rank' ? (
                          <><Lock className="h-4 w-4 mr-2" /> Locked</>
                        ) : 'Start Program'}
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="achievements">
          <Card>
            <CardHeader>
              <CardTitle>Training Achievements</CardTitle>
              <CardDescription>
                Track your progress and unlock special rewards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-muted/40">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <Dumbbell className="h-5 w-5 mr-2 text-chart-1" />
                        Iron Body
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-2">
                        Complete 50 strength training exercises
                      </p>
                      <Progress value={30} max={100} className="h-2" />
                      <p className="text-xs text-right mt-1">30%</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-muted/40">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <Heart className="h-5 w-5 mr-2 text-chart-2" />
                        Endless Stamina
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-2">
                        Complete 30 cardio training sessions
                      </p>
                      <Progress value={15} max={100} className="h-2" />
                      <p className="text-xs text-right mt-1">15%</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-muted/40">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <Zap className="h-5 w-5 mr-2 text-chart-3" />
                        Lightning Reflexes
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-2">
                        Complete 25 agility training exercises
                      </p>
                      <Progress value={40} max={100} className="h-2" />
                      <p className="text-xs text-right mt-1">40%</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-muted/40">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <Brain className="h-5 w-5 mr-2 text-chart-4" />
                        Mental Fortress
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-2">
                        Complete 20 mental training exercises
                      </p>
                      <Progress value={25} max={100} className="h-2" />
                      <p className="text-xs text-right mt-1">25%</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-dashed border-2">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-muted-foreground">???</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Locked achievement. Continue training to discover.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-dashed border-2">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-muted-foreground">???</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Locked achievement. Continue training to discover.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {systemMessage && (
        <SystemMessage 
          message={systemMessage} 
          onClose={() => setSystemMessage(null)}
        />
      )}
    </div>
  )
}