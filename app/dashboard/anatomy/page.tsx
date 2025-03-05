"use client"

import { useState } from 'react'
import { useAuth } from '@/lib/auth-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { SystemMessage } from '@/components/system-message'
import { muscleGroups } from '@/lib/exercise-data'
import { Info, Lock } from 'lucide-react'

export default function AnatomyPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [selectedBodyPart, setSelectedBodyPart] = useState('chest')
  const [systemMessage, setSystemMessage] = useState<string | null>(null)

  if (!user) return null

  const bodyParts = [
    { id: 'chest', name: 'Chest', description: 'Pectoralis major and minor muscles', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' },
    { id: 'back', name: 'Back', description: 'Latissimus dorsi, rhomboids, and trapezius', image: 'https://images.unsplash.com/photo-1603287681836-b174ce5074c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80' },
    { id: 'legs', name: 'Legs', description: 'Quadriceps, hamstrings, calves, and glutes', image: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80' },
    { id: 'arms', name: 'Arms', description: 'Biceps, triceps, and forearms', image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' },
    { id: 'shoulders', name: 'Shoulders', description: 'Deltoids (anterior, lateral, and posterior)', image: 'https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' },
    { id: 'core', name: 'Core', description: 'Abdominals, obliques, and lower back', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' }
  ]

  const muscleDetails = {
    chest: [
      { name: 'Pectoralis Major', description: 'The largest chest muscle that spans across the chest and attaches to the shoulder and upper arm. Responsible for pushing movements and bringing the arms toward the midline of the body.', requiredRank: 'E-Rank' },
      { name: 'Pectoralis Minor', description: 'A smaller, triangular muscle that lies underneath the pectoralis major. Helps with breathing and stabilizes the scapula.', requiredRank: 'D-Rank' },
      { name: 'Serratus Anterior', description: 'Located on the side of the chest, this muscle helps with pushing movements and scapular stability.', requiredRank: 'C-Rank' }
    ],
    back: [
      { name: 'Latissimus Dorsi', description: 'The largest back muscle, spanning from the mid-back to the lower back. Responsible for pulling movements and bringing the arms down and back.', requiredRank: 'E-Rank' },
      { name: 'Trapezius', description: 'A large, triangular muscle that extends from the neck to the middle of the back. Helps with shoulder and neck movements.', requiredRank: 'D-Rank' },
      { name: 'Rhomboids', description: 'Located between the shoulder blades, these muscles help retract the scapula and maintain posture.', requiredRank: 'C-Rank' },
      { name: 'Erector Spinae', description: 'A group of muscles that run along the spine, providing support and allowing for extension and rotation of the spine.', requiredRank: 'B-Rank' }
    ],
    legs: [
      { name: 'Quadriceps', description: 'A group of four muscles on the front of the thigh that extend the knee and are crucial for walking, running, and jumping.', requiredRank: 'E-Rank' },
      { name: 'Hamstrings', description: 'A group of three muscles on the back of the thigh that flex the knee and extend the hip.', requiredRank: 'E-Rank' },
      { name: 'Calves', description: 'Comprised of the gastrocnemius and soleus muscles, they enable plantar flexion of the foot and are essential for walking and running.', requiredRank: 'D-Rank' },
      { name: 'Glutes', description: 'The gluteus maximus, medius, and minimus form the buttocks and are crucial for hip extension, abduction, and rotation.', requiredRank: 'C-Rank' }
    ],
    arms: [
      { name: 'Biceps Brachii', description: 'A two-headed muscle on the front of the upper arm that flexes the elbow and supinates the forearm.', requiredRank: 'E-Rank' },
      { name: 'Triceps Brachii', description: 'A three-headed muscle on the back of the upper arm that extends the elbow.', requiredRank: 'E-Rank' },
      { name: 'Brachialis', description: 'Located underneath the biceps, this muscle is a pure elbow flexor.', requiredRank: 'D-Rank' },
      { name: 'Forearm Muscles', description: 'A complex group of muscles that control wrist and finger movements.', requiredRank: 'C-Rank' }
    ],
    shoulders: [
      { name: 'Deltoid (Anterior)', description: 'The front part of the shoulder muscle, responsible for raising the arm forward.', requiredRank: 'E-Rank' },
      { name: 'Deltoid (Lateral)', description: 'The middle part of the shoulder muscle, responsible for raising the arm to the side.', requiredRank: 'D-Rank' },
      { name: 'Deltoid (Posterior)', description: 'The rear part of the shoulder muscle, responsible for raising the arm backward.', requiredRank: 'D-Rank' },
      { name: 'Rotator Cuff', description: 'A group of four muscles that stabilize the shoulder joint and enable rotation.', requiredRank: 'C-Rank' }
    ],
    core: [
      { name: 'Rectus Abdominis', description: 'The "six-pack" muscle that flexes the spine and helps maintain posture.', requiredRank: 'E-Rank' },
      { name: 'Obliques', description: 'Located on the sides of the abdomen, these muscles rotate and bend the torso.', requiredRank: 'D-Rank' },
      { name: 'Transverse Abdominis', description: 'The deepest abdominal muscle that stabilizes the spine and maintains internal abdominal pressure.', requiredRank: 'C-Rank' },
      { name: 'Lower Back Muscles', description: 'Support the spine and enable extension and rotation movements.', requiredRank: 'B-Rank' }
    ]
  }

  const selectedPart = bodyParts.find(part => part.id === selectedBodyPart)
  const muscles = muscleDetails[selectedBodyPart as keyof typeof muscleDetails] || []

  const isMuscleLocked = (requiredRank: string) => {
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

  const handleLearnMore = (muscle: any) => {
    if (isMuscleLocked(muscle.requiredRank)) {
      toast({
        title: "Knowledge Locked",
        description: `You need to be ${muscle.requiredRank} or higher to access this information.`,
        variant: "destructive"
      })
      return
    }

    setSystemMessage(`Analyzing ${muscle.name}... This muscle is crucial for optimal performance in combat situations.`)
    
    toast({
      title: "Knowledge Acquired",
      description: `You've gained deeper understanding of the ${muscle.name}.`,
    })
  }

  return (
    <div className="container p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Human Anatomy</h1>
          <p className="text-muted-foreground">
            Study the human body to optimize your training
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Body Regions</CardTitle>
              <CardDescription>
                Select a region to study
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {bodyParts.map((part) => (
                  <Button 
                    key={part.id}
                    variant={selectedBodyPart === part.id ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => setSelectedBodyPart(part.id)}
                  >
                    {part.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Knowledge Level</CardTitle>
              <CardDescription>
                Your anatomical understanding
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>E-Rank Knowledge</span>
                  <Badge variant="outline" className={user.rank !== 'E-Rank' ? 'bg-primary/20' : ''}>Unlocked</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>D-Rank Knowledge</span>
                  <Badge variant="outline" className={user.rank !== 'E-Rank' ? 'bg-primary/20' : ''}>
                    {user.rank === 'E-Rank' ? 'Locked' : 'Unlocked'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>C-Rank Knowledge</span>
                  <Badge variant="outline" className={user.rank !== 'E-Rank' && user.rank !== 'D-Rank' ? 'bg-primary/20' : ''}>
                    {user.rank === 'E-Rank' || user.rank === 'D-Rank' ? 'Locked' : 'Unlocked'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>B-Rank Knowledge</span>
                  <Badge variant="outline" className={user.rank !== 'E-Rank' && user.rank !== 'D-Rank' && user.rank !== 'C-Rank' ? 'bg-primary/20' : ''}>
                    {user.rank === 'E-Rank' || user.rank === 'D-Rank' || user.rank === 'C-Rank' ? 'Locked' : 'Unlocked'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>{selectedPart?.name} Anatomy</CardTitle>
              <CardDescription>
                {selectedPart?.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative w-full h-64 mb-6 rounded-md overflow-hidden">
                <img
                  src={selectedPart?.image}
                  alt={selectedPart?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Key Muscles</h3>
                
                <div className="grid grid-cols-1 gap-4">
                  {muscles.map((muscle, index) => (
                    <Card key={index} className={isMuscleLocked(muscle.requiredRank) ? 'opacity-70' : ''}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{muscle.name}</CardTitle>
                          <Badge variant={isMuscleLocked(muscle.requiredRank) ? 'outline' : 'secondary'}>
                            {isMuscleLocked(muscle.requiredRank) ? (
                              <span className="flex items-center">
                                <Lock className="h-3 w-3 mr-1" /> {muscle.requiredRank}
                              </span>
                            ) : (
                              'Unlocked'
                            )}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        {isMuscleLocked(muscle.requiredRank) ? (
                          <p className="text-muted-foreground">
                            This knowledge is locked. Reach {muscle.requiredRank} to unlock.
                          </p>
                        ) : (
                          <p>{muscle.description}</p>
                        )}
                      </CardContent>
                      <CardContent className="pt-0">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="w-full"
                          onClick={() => handleLearnMore(muscle)}
                          disabled={isMuscleLocked(muscle.requiredRank)}
                        >
                          <Info className="h-4 w-4 mr-2" />
                          Learn More
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {systemMessage && (
        <SystemMessage 
          message={systemMessage} 
          onClose={() => setSystemMessage(null)}
        />
      )}
    </div>
  )
}