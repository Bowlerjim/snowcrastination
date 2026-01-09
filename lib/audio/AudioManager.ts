export class AudioManager {
  private audioContext: AudioContext | null = null
  private isMuted = false
  private masterVolume = 0.3
  private fireLoopGain: GainNode | null = null
  private fireOscillator: OscillatorNode | null = null

  constructor() {
    this.initializeAudioContext()
    this.startFireAmbience()
  }

  private initializeAudioContext() {
    if (typeof window !== 'undefined' && !this.audioContext) {
      try {
        const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext
        this.audioContext = new AudioContextClass()
      } catch (e) {
        console.warn('Web Audio API not supported')
      }
    }
  }

  private startFireAmbience() {
    if (!this.audioContext) return

    try {
      const ctx = this.audioContext

      // Create fire ambience using multiple oscillators
      this.fireLoopGain = ctx.createGain()
      this.fireLoopGain.connect(ctx.destination)
      this.fireLoopGain.gain.value = this.masterVolume * 0.2

      // Main tone (crackling base)
      const osc1 = ctx.createOscillator()
      osc1.frequency.value = 150
      osc1.type = 'sine'
      osc1.connect(this.fireLoopGain)
      osc1.start()

      // Modulation for crackling effect
      const modOsc = ctx.createOscillator()
      modOsc.frequency.value = 5
      modOsc.type = 'sine'

      const modGain = ctx.createGain()
      modGain.gain.value = 50
      modOsc.connect(modGain)
      modGain.connect(osc1.frequency)
      modOsc.start()

      this.fireOscillator = osc1
    } catch (e) {
      console.warn('Could not start fire ambience:', e)
    }
  }

  playSoundEffect(type: 'throw' | 'hit' | 'accumulate' | 'gameOver') {
    if (!this.audioContext || this.isMuted) return

    try {
      const ctx = this.audioContext
      const now = ctx.currentTime
      const gainNode = ctx.createGain()
      gainNode.connect(ctx.destination)
      gainNode.gain.value = this.masterVolume

      switch (type) {
        case 'throw': {
          const osc = ctx.createOscillator()
          osc.frequency.setValueAtTime(400, now)
          osc.frequency.exponentialRampToValueAtTime(200, now + 0.1)
          osc.connect(gainNode)
          gainNode.gain.setValueAtTime(0.1, now)
          gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1)
          osc.start(now)
          osc.stop(now + 0.1)
          break
        }

        case 'hit': {
          const osc = ctx.createOscillator()
          osc.frequency.setValueAtTime(600, now)
          osc.frequency.exponentialRampToValueAtTime(300, now + 0.15)
          osc.connect(gainNode)
          gainNode.gain.setValueAtTime(0.15, now)
          gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15)
          osc.start(now)
          osc.stop(now + 0.15)
          break
        }

        case 'accumulate': {
          const osc = ctx.createOscillator()
          osc.frequency.setValueAtTime(200, now)
          osc.frequency.exponentialRampToValueAtTime(100, now + 0.2)
          osc.connect(gainNode)
          gainNode.gain.setValueAtTime(0.05, now)
          gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2)
          osc.start(now)
          osc.stop(now + 0.2)
          break
        }

        case 'gameOver': {
          const osc = ctx.createOscillator()
          osc.frequency.setValueAtTime(300, now)
          osc.frequency.exponentialRampToValueAtTime(100, now + 0.5)
          osc.connect(gainNode)
          gainNode.gain.setValueAtTime(0.2, now)
          gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.5)
          osc.start(now)
          osc.stop(now + 0.5)
          break
        }
      }
    } catch (e) {
      console.warn('Could not play sound effect:', e)
    }
  }

  setFireVolume(volume: number) {
    if (this.fireLoopGain) {
      this.fireLoopGain.gain.value = Math.max(0, volume * this.masterVolume * 0.2)
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted
    if (this.fireLoopGain) {
      this.fireLoopGain.gain.value = this.isMuted ? 0 : this.masterVolume * 0.2
    }
  }

  isMutedState(): boolean {
    return this.isMuted
  }
}
