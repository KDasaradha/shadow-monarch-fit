"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Dumbbell, Lock, Timer, Zap } from 'lucide-react'

interface ExerciseCardProps {
  exercise: {
    id: string
    name: string
    description: string
    muscleGroup: string
    difficulty: number
    requiredRank: string
    primaryStat: string
    imageUrl: string
    locked: boolean
    sets?: number
    reps?: number
    duration?: number
  }
  onStart: () => void
  onComplete: () => void
}

export function ExerciseCard({ exercise, onStart, onComplete }: ExerciseCardProps) {
  const [inProgress, setInProgress] = useState(false)
  const [progress, setProgress] = useState(0)
  const [completed, setCompleted] = useState(false)

  const handleStart = () => {
    if (exercise.locked) return
    
    setInProgress(true)
    setProgress(0)
    onStart()
    
    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setInProgress(false)
          setCompleted(true)
          onComplete()
          return 100
        }
        return prev + 10
      })
    }, 1000)
  }

  const handleReset = () => {
    setInProgress(false)
    setProgress(0)
    setCompleted(false)
  }

  const getDifficultyLabel = (difficulty: number) => {
    switch (difficulty) {
      case 1: return 'Easy'
      case 2: return 'Medium'
      case 3: return 'Hard'
      case 4: return 'Expert'
      case 5: return 'Master'
      default: return 'Unknown'
    }
  }

  return (
    <Card className={exercise.locked ? 'opacity-70' : ''}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{exercise.name}</CardTitle>
          <Badge variant={exercise.locked ? 'outline' : 'default'}>
            {exercise.locked ? (
              <span className="flex items-center">
                <Lock className="h-3 w-3 mr-1" /> {exercise.requiredRank}
              </span>
            ) : (
              getDifficultyLabel(exercise.difficulty)
            )}
          </Badge>
        </div>
        <CardDescription>{exercise.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="relative w-full h-48 mb-4 rounded-md overflow-hidden">
          <img
            src={exercise.imageUrl}
            alt={exercise.name}
            className="w-full h-full object-cover"
          />
          {exercise.locked && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
              <div className="text-center">
                <Lock className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm font-medium">Reach {exercise.requiredRank} to unlock</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline" className="flex items-center">
            <Dumbbell className="h-3 w-3 mr-1" />
            {exercise.muscleGroup.charAt(0).toUpperCase() + exercise.muscleGroup.slice(1)}
          </Badge>
          
          {exercise.sets && exercise.reps && (
            <Badge variant="outline" className="flex items-center">
              <Zap className="h-3 w-3 mr-1" />
              {exercise.sets} sets × {exercise.reps} reps
            </Badge>
          )}
          
          {exercise.duration && (
            <Badge variant="outline" className="flex items-center">
              <Timer className="h-3 w-3 mr-1" />
              {exercise.duration} min
            </Badge>
          )}
        </div>
        
        {inProgress && (
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-xs">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-0">
        {!inProgress && !completed ? (
          <Button 
            className="w-full" 
            onClick={handleStart}
            disabled={exercise.locked}
          >
            {exercise.locked ? 'Locked' : 'Start Exercise'}
          </Button>
        ) : completed ? (
          <Button 
            className="w-full" 
            variant="outline"
            onClick={handleReset}
          >
            Completed - Do Again
          </Button>
        ) : (
          <Button 
            className="w-full" 
            variant="outline"
            disabled
          >
            In Progress...
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}