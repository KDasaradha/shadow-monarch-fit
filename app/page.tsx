import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowRight, Shield, Zap, Brain, Award } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center text-center space-y-8 mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-primary">
            Solo Leveling System
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Complete daily quests, gain experience, and level up your abilities. 
            Become the strongest hunter in the world.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="gap-2">
                Login <ArrowRight size={16} />
              </Button>
            </Link>
            <Link href="/register">
              <Button size="lg" variant="outline" className="gap-2">
                Register <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl flex items-center gap-2">
                <Shield className="h-6 w-6 text-chart-1" />
                Rank Up
              </CardTitle>
              <CardDescription>
                Progress from E-Rank to S-Rank
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Complete quests and gain experience to increase your rank. Each rank unlocks new abilities and challenges.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl flex items-center gap-2">
                <Zap className="h-6 w-6 text-chart-2" />
                Daily Quests
              </CardTitle>
              <CardDescription>
                New challenges every day
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Receive personalized quests based on your stats and abilities. Complete them to earn XP and special rewards.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl flex items-center gap-2">
                <Brain className="h-6 w-6 text-chart-3" />
                Train Abilities
              </CardTitle>
              <CardDescription>
                Enhance your core stats
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Focus on training specific abilities like strength, stamina, agility, and intelligence to customize your hunter.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl flex items-center gap-2">
                <Award className="h-6 w-6 text-chart-4" />
                Join Guilds
              </CardTitle>
              <CardDescription>
                Team up with other hunters
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Form or join guilds to tackle group challenges, compete on leaderboards, and earn exclusive guild rewards.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}