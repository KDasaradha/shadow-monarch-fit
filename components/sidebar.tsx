"use client"

import { useAuth } from '@/lib/auth-provider'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ThemeToggle } from '@/components/theme-toggle'
import { 
  LayoutDashboard, 
  ListTodo, 
  BarChart, 
  Dumbbell, 
  Backpack, 
  Users, 
  Trophy, 
  Settings, 
  LogOut,
  Heart
} from 'lucide-react'

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const { user, logout } = useAuth()
  const pathname = usePathname()

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      label: "Quests",
      icon: ListTodo,
      href: "/dashboard/quests",
      active: pathname === "/dashboard/quests",
    },
    {
      label: "Stats",
      icon: BarChart,
      href: "/dashboard/stats",
      active: pathname === "/dashboard/stats",
    },
    {
      label: "Training",
      icon: Dumbbell,
      href: "/dashboard/training",
      active: pathname === "/dashboard/training",
    },
    {
      label: "Anatomy",
      icon: Heart,
      href: "/dashboard/anatomy",
      active: pathname === "/dashboard/anatomy",
    },
    {
      label: "Inventory",
      icon: Backpack,
      href: "/dashboard/inventory",
      active: pathname === "/dashboard/inventory",
    },
    {
      label: "Guild",
      icon: Users,
      href: "/dashboard/guild",
      active: pathname === "/dashboard/guild",
    },
    {
      label: "Leaderboard",
      icon: Trophy,
      href: "/dashboard/leaderboard",
      active: pathname === "/dashboard/leaderboard",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
      active: pathname === "/dashboard/settings",
    },
  ]

  return (
    <div className={cn("pb-12 border-r min-h-screen bg-card", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold tracking-tight">
              Solo System
            </h2>
            <ThemeToggle />
          </div>
          <div className="mt-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                  {user?.name?.charAt(0) || "H"}
                </div>
                <div>
                  <p className="text-sm font-medium leading-none">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.rank}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-3">
          <ScrollArea className="h-[calc(100vh-8rem)]">
            <div className="space-y-1">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "flex items-center py-2 px-3 text-sm font-medium rounded-md",
                    route.active
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
                  )}
                >
                  <route.icon className="mr-2 h-4 w-4" />
                  {route.label}
                </Link>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
      <div className="px-3 absolute bottom-4 w-full pr-8">
        <Button 
          variant="outline" 
          className="justify-start" 
          onClick={logout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  )
}