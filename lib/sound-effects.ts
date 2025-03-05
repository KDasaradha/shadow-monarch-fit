"use client"

class SoundEffects {
  private static instance: SoundEffects
  private sounds: { [key: string]: HTMLAudioElement } = {}
  private enabled: boolean = true
  private currentlyPlaying: HTMLAudioElement | null = null

  private constructor() {
    if (typeof window !== 'undefined') {
      // Initialize sound effects
      this.sounds = {
        notification: new Audio('/sounds/notification.mp3'),
        levelUp: new Audio('/sounds/level-up.mp3'),
        questComplete: new Audio('/sounds/quest-complete.mp3'),
        buttonClick: new Audio('/sounds/button-click.mp3'),
        error: new Audio('/sounds/error.mp3'),
        success: new Audio('/sounds/success.mp3')
      }

      // Set volume for all sounds
      Object.values(this.sounds).forEach(sound => {
        sound.volume = 0.5
        // Preload sounds
        sound.preload = 'auto'
      })

      // Load settings from localStorage
      this.loadSettings()
    }
  }

  public static getInstance(): SoundEffects {
    if (!SoundEffects.instance) {
      SoundEffects.instance = new SoundEffects()
    }
    return SoundEffects.instance
  }

  private loadSettings(): void {
    if (typeof window !== 'undefined') {
      const soundEnabled = localStorage.getItem('soundEffectsEnabled')
      this.enabled = soundEnabled === null ? true : soundEnabled === 'true'
    }
  }

  public setEnabled(enabled: boolean): void {
    this.enabled = enabled
    if (typeof window !== 'undefined') {
      localStorage.setItem('soundEffectsEnabled', String(enabled))
      
      // Stop any currently playing sound when disabled
      if (!enabled && this.currentlyPlaying) {
        this.currentlyPlaying.pause()
        this.currentlyPlaying.currentTime = 0
        this.currentlyPlaying = null
      }
    }
  }

  public isEnabled(): boolean {
    return this.enabled
  }

  public async play(soundName: 'notification' | 'levelUp' | 'questComplete' | 'buttonClick' | 'error' | 'success'): Promise<void> {
    if (!this.enabled || typeof window === 'undefined') return

    try {
      const sound = this.sounds[soundName]
      if (!sound) return

      // Stop currently playing sound if any
      if (this.currentlyPlaying) {
        this.currentlyPlaying.pause()
        this.currentlyPlaying.currentTime = 0
      }

      // Reset the sound before playing
      sound.currentTime = 0
      
      // Set as current sound and play
      this.currentlyPlaying = sound
      await sound.play()
      
      // Handle sound completion
      sound.onended = () => {
        if (this.currentlyPlaying === sound) {
          this.currentlyPlaying = null
        }
      }
    } catch (error) {
      // Silently handle errors to prevent console spam
      this.currentlyPlaying = null
    }
  }
}

export const soundEffects = SoundEffects.getInstance()