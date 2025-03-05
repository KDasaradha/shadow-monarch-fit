"use client"

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth-provider'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/hooks/use-toast'
import { useTheme } from 'next-themes'
import { soundEffects } from '@/lib/sound-effects'
import { 
  Sun, 
  Moon, 
  Monitor, 
  Volume2, 
  VolumeX,
  Palette
} from 'lucide-react'

export default function SettingsPage() {
  const { user, logout } = useAuth()
  const { toast } = useToast()
  const { theme, setTheme } = useTheme()
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [notifications, setNotifications] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(soundEffects.isEnabled())
  const [selectedTheme, setSelectedTheme] = useState(theme || 'dark')

  useEffect(() => {
    setSelectedTheme(theme || 'dark')
  }, [theme])

  if (!user) return null

  const handleSaveProfile = () => {
    soundEffects.play('success')
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved.",
    })
  }

  const handleSavePreferences = () => {
    soundEffects.play('success')
    toast({
      title: "Preferences Updated",
      description: "Your preferences have been saved.",
    })
  }

  const handleThemeChange = (newTheme: string) => {
    setSelectedTheme(newTheme)
    setTheme(newTheme)
    soundEffects.play('buttonClick')
  }

  const handleSoundToggle = (enabled: boolean) => {
    setSoundEnabled(enabled)
    soundEffects.setEnabled(enabled)
    if (enabled) {
      soundEffects.play('buttonClick')
    }
  }

  return (
    <div className="container p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account and preferences
          </p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card className="solo-card">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Hunter Name</Label>
                <Input 
                  id="name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rank">Rank</Label>
                <Input 
                  id="rank" 
                  value={user.rank} 
                  disabled 
                  className={`rank-${user.rank.charAt(0).toLowerCase()}`}
                />
                <p className="text-xs text-muted-foreground">
                  Your rank increases as you level up
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => {
                  handleSaveProfile()
                  soundEffects.play('buttonClick')
                }}
                className="solo-glow"
              >
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="preferences">
          <Card className="solo-card">
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>
                Customize your experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Theme</h3>
                <div className="flex flex-wrap gap-4">
                  <Button 
                    variant={selectedTheme === 'light' ? "default" : "outline"}
                    className="flex items-center gap-2"
                    onClick={() => handleThemeChange('light')}
                  >
                    <Sun className="h-4 w-4" />
                    Light
                  </Button>
                  <Button 
                    variant={selectedTheme === 'dark' ? "default" : "outline"}
                    className="flex items-center gap-2"
                    onClick={() => handleThemeChange('dark')}
                  >
                    <Moon className="h-4 w-4" />
                    Dark
                  </Button>
                  <Button 
                    variant={selectedTheme === 'system' ? "default" : "outline"}
                    className="flex items-center gap-2"
                    onClick={() => handleThemeChange('system')}
                  >
                    <Monitor className="h-4 w-4" />
                    System
                  </Button>
                  <Button 
                    variant={selectedTheme === 'solo' ? "default" : "outline"}
                    className="flex items-center gap-2"
                    onClick={() => handleThemeChange('solo')}
                  >
                    <Palette className="h-4 w-4" />
                    Solo Theme
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notifications">Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive quest and event notifications
                  </p>
                </div>
                <Switch 
                  id="notifications" 
                  checked={notifications} 
                  onCheckedChange={(checked) => {
                    setNotifications(checked)
                    if (soundEnabled) soundEffects.play('buttonClick')
                  }} 
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="soundEffects">Sound Effects</Label>
                  <p className="text-sm text-muted-foreground">
                    Play sound effects for actions and events
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {soundEnabled ? <Volume2 className="h-4 w-4 text-muted-foreground" /> : <VolumeX className="h-4 w-4 text-muted-foreground" />}
                  <Switch 
                    id="soundEffects" 
                    checked={soundEnabled} 
                    onCheckedChange={handleSoundToggle} 
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => {
                  handleSavePreferences()
                  if (soundEnabled) soundEffects.play('buttonClick')
                }}
                className="solo-glow"
              >
                Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="account">
          <Card className="solo-card">
            <CardHeader>
              <CardTitle>Account Management</CardTitle>
              <CardDescription>
                Manage your account settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 items-start">
              <Button 
                onClick={() => soundEffects.play('buttonClick')}
                className="solo-glow"
              >
                Change Password
              </Button>
              <div className="w-full pt-4 border-t">
                <h3 className="text-lg font-medium mb-2">Danger Zone</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  These actions are irreversible
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      soundEffects.play('buttonClick')
                      logout()
                    }}
                  >
                    Logout
                  </Button>
                  <Button 
                    variant="destructive"
                    onClick={() => soundEffects.play('error')}
                  >
                    Delete Account
                  </Button>
                </div>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}