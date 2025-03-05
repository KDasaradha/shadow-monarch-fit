"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { soundEffects } from '@/lib/sound-effects'

interface SystemMessageProps {
  message: string
  duration?: number
  onClose?: () => void
  className?: string
  type?: 'info' | 'success' | 'warning' | 'error'
}

export function SystemMessage({ 
  message, 
  duration = 5000, 
  onClose,
  className,
  type = 'info'
}: SystemMessageProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setVisible(false)
      }, duration)
      
      return () => clearTimeout(timer)
    }
  }, [duration])

  const handleClose = () => {
    setVisible(false)
    if (onClose) {
      onClose()
    }
  }

  // Play sound effect when message appears
  useEffect(() => {
    soundEffects.play('notification')
  }, [])

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500/20 border-green-500/30 text-green-50'
      case 'warning':
        return 'bg-yellow-500/20 border-yellow-500/30 text-yellow-50'
      case 'error':
        return 'bg-red-500/20 border-red-500/30 text-red-50'
      case 'info':
      default:
        return 'bg-blue-500/20 border-blue-500/30 text-blue-50'
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className={cn(
            "fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full",
            className
          )}
        >
          <div className={cn(
            "system-message backdrop-blur-md border p-4 rounded-lg shadow-lg",
            getTypeStyles()
          )}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="text-sm font-medium mb-1 solo-text-glow">SYSTEM MESSAGE</h4>
                <p className="text-lg font-medium">{message}</p>
              </div>
              <button 
                onClick={handleClose}
                className="ml-4 text-blue-300 hover:text-blue-100 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}