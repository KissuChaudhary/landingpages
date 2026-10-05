"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Play,
  Pause,
  Volume2,
  Volume1,
  VolumeX,
  Maximize,
  Minimize,
} from "lucide-react"

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return "0:00"
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, "0")}`
}

export function HeroVideoPlayer() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const scrubberRef = useRef<HTMLDivElement>(null)
  const hideControlsTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Player state: Muted by default, plays automatically
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [volume, setVolume] = useState(0.5)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(44.2)
  const [bufferedPercent, setBufferedPercent] = useState(0)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // UI state
  const [showControls, setShowControls] = useState(true)
  const [isScrubbing, setIsScrubbing] = useState(false)
  const [hoverTime, setHoverTime] = useState<number | null>(null)
  const [hoverPosition, setHoverPosition] = useState<number>(0)
  const [isHoveringTimeline, setIsHoveringTimeline] = useState(false)
  const [centerAction, setCenterAction] = useState<"play" | "pause" | "unmute" | "mute" | null>(null)
  const [isBuffering, setIsBuffering] = useState(false)

  // Auto-hide controls after 2.5s of inactivity during playback
  const resetControlsTimer = useCallback(() => {
    setShowControls(true)
    if (hideControlsTimerRef.current) {
      clearTimeout(hideControlsTimerRef.current)
    }
    if (isPlaying && !isScrubbing) {
      hideControlsTimerRef.current = setTimeout(() => {
        setShowControls(false)
      }, 2500)
    }
  }, [isPlaying, isScrubbing])

  // Trigger brief center feedback icon pulse
  const triggerCenterFeedback = (action: "play" | "pause" | "unmute" | "mute") => {
    setCenterAction(action)
    setTimeout(() => {
      setCenterAction((prev) => (prev === action ? null : prev))
    }, 450)
  }

  // Toggle Mute / Unmute (tied to clicking anywhere on the video)
  const toggleMute = useCallback((e?: React.MouseEvent | React.TouchEvent) => {
    e?.stopPropagation()
    const video = videoRef.current
    if (!video) return

    if (isMuted) {
      video.muted = false
      setIsMuted(false)
      const targetVol = volume > 0 ? volume : 0.5
      setVolume(targetVol)
      video.volume = targetVol
      triggerCenterFeedback("unmute")
    } else {
      video.muted = true
      setIsMuted(true)
      triggerCenterFeedback("mute")
    }
    resetControlsTimer()
  }, [isMuted, volume, resetControlsTimer])

  // Toggle Play / Pause (tied strictly to dedicated controls)
  const togglePlay = useCallback((e?: React.MouseEvent | React.TouchEvent) => {
    e?.stopPropagation()
    const video = videoRef.current
    if (!video) return

    if (video.paused || video.ended) {
      video.play().then(() => {
        setIsPlaying(true)
        triggerCenterFeedback("play")
      }).catch(() => {})
    } else {
      video.pause()
      setIsPlaying(false)
      triggerCenterFeedback("pause")
    }
    resetControlsTimer()
  }, [resetControlsTimer])

  // Clicking anywhere on the video canvas toggles mute/unmute
  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    toggleMute(e)
  }

  // Tapping anywhere on the video canvas on mobile toggles mute/unmute and reveals controls
  const handleCanvasTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    toggleMute(e)
  }

  // Change Volume Slider
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation()
    const newVol = parseFloat(e.target.value)
    setVolume(newVol)
    const video = videoRef.current
    if (video) {
      video.volume = newVol
      if (newVol === 0) {
        video.muted = true
        setIsMuted(true)
      } else {
        video.muted = false
        setIsMuted(false)
      }
    }
    resetControlsTimer()
  }

  // Seek by relative seconds (+/-)
  const seekRelative = (seconds: number) => {
    const video = videoRef.current
    if (!video) return
    const maxDur = duration || video.duration || 44.2
    const newTime = Math.min(Math.max(video.currentTime + seconds, 0), maxDur)
    video.currentTime = newTime
    setCurrentTime(newTime)
    resetControlsTimer()
  }

  // Cycle playback speed
  const cyclePlaybackRate = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation()
    const video = videoRef.current
    if (!video) return
    const rates = [1, 1.25, 1.5, 2]
    const nextIndex = (rates.indexOf(playbackRate) + 1) % rates.length
    const nextRate = rates[nextIndex]
    video.playbackRate = nextRate
    setPlaybackRate(nextRate)
    resetControlsTimer()
  }

  // Fullscreen toggle
  const toggleFullscreen = async (e?: React.MouseEvent | React.TouchEvent) => {
    e?.stopPropagation()
    const container = containerRef.current
    if (!container) return

    if (!document.fullscreenElement) {
      try {
        if (container.requestFullscreen) {
          await container.requestFullscreen()
        } else if ((container as any).webkitRequestFullscreen) {
          await (container as any).webkitRequestFullscreen()
        }
        setIsFullscreen(true)
      } catch { }
    } else {
      try {
        if (document.exitFullscreen) {
          await document.exitFullscreen()
        } else if ((document as any).webkitExitFullscreen) {
          await (document as any).webkitExitFullscreen()
        }
        setIsFullscreen(false)
      } catch { }
    }
    resetControlsTimer()
  }

  // Scrubbing logic with smooth drag & touch support
  const calculateScrubPosition = (clientX: number): number => {
    if (!scrubberRef.current) return 0
    const rect = scrubberRef.current.getBoundingClientRect()
    return Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
  }

  const handleTimelineMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const pos = calculateScrubPosition(e.clientX)
    setHoverPosition(pos)
    const maxDur = duration || videoRef.current?.duration || 44.2
    setHoverTime(pos * maxDur)
  }

  const handleTimelineMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    setIsScrubbing(true)
    const pos = calculateScrubPosition(e.clientX)
    const maxDur = duration || videoRef.current?.duration || 44.2
    const targetTime = pos * maxDur
    if (videoRef.current) {
      videoRef.current.currentTime = targetTime
      setCurrentTime(targetTime)
    }

    const onMouseMove = (moveEvent: MouseEvent) => {
      const movePos = calculateScrubPosition(moveEvent.clientX)
      setHoverPosition(movePos)
      const currentDur = duration || videoRef.current?.duration || 44.2
      const newTarget = movePos * currentDur
      setHoverTime(newTarget)
      if (videoRef.current) {
        videoRef.current.currentTime = newTarget
        setCurrentTime(newTarget)
      }
    }

    const onMouseUp = () => {
      setIsScrubbing(false)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mouseup", onMouseUp)
      resetControlsTimer()
    }

    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mouseup", onMouseUp)
  }

  const handleTimelineTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation()
    if (!e.touches[0]) return
    setIsScrubbing(true)
    const pos = calculateScrubPosition(e.touches[0].clientX)
    const maxDur = duration || videoRef.current?.duration || 44.2
    const targetTime = pos * maxDur
    if (videoRef.current) {
      videoRef.current.currentTime = targetTime
      setCurrentTime(targetTime)
    }
  }

  const handleTimelineTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation()
    if (!e.touches[0]) return
    const pos = calculateScrubPosition(e.touches[0].clientX)
    const maxDur = duration || videoRef.current?.duration || 44.2
    const targetTime = pos * maxDur
    if (videoRef.current) {
      videoRef.current.currentTime = targetTime
      setCurrentTime(targetTime)
    }
  }

  const handleTimelineTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation()
    setIsScrubbing(false)
    resetControlsTimer()
  }

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) {
        return
      }

      const container = containerRef.current
      if (!container) return
      const rect = container.getBoundingClientRect()
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0
      if (!isVisible) return

      if (e.code === "Space" || e.key === "k") {
        e.preventDefault()
        togglePlay()
      } else if (e.key === "m") {
        e.preventDefault()
        toggleMute()
      } else if (e.key === "f") {
        e.preventDefault()
        toggleFullscreen()
      } else if (e.key === "ArrowLeft" || e.key === "j") {
        e.preventDefault()
        seekRelative(-5)
      } else if (e.key === "ArrowRight" || e.key === "l") {
        e.preventDefault()
        seekRelative(5)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [togglePlay, toggleMute, toggleFullscreen])

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  // Smart IntersectionObserver: only pause when genuinely scrolled away (< 5% visible)
  useEffect(() => {
    const container = containerRef.current
    const video = videoRef.current
    if (!container || !video) return

    let wasPlayingBeforeScroll = false

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          if (!video.paused) {
            wasPlayingBeforeScroll = true
            video.pause()
            setIsPlaying(false)
          }
        } else {
          if (wasPlayingBeforeScroll) {
            video.play().then(() => setIsPlaying(true)).catch(() => { })
            wasPlayingBeforeScroll = false
          }
        }
      },
      { threshold: 0.05 }
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  // Autoplay by default (muted)
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = true
    video.volume = 0.5
    setIsMuted(true)

    const playPromise = video.play()
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true)
        })
        .catch(() => {
          setIsPlaying(false)
        })
    }
  }, [])

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div className="relative w-full max-w-6xl mx-auto px-2 sm:px-4 mt-6 sm:mt-10 mb-8 sm:mb-16">
      {/* ========================================================================= */}
      {/* ORIGINAL THICK BEZEL STRIP — Preserved from original graphics (#ebebed)   */}
      {/* ========================================================================= */}
      <div
        ref={containerRef}
        onMouseMove={resetControlsTimer}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => {
          if (isPlaying && !isScrubbing) {
            setShowControls(false)
          }
        }}
        onDoubleClick={toggleFullscreen}
        className={`relative w-full rounded-2xl sm:rounded-[26px] lg:rounded-[30px] p-2 sm:p-2.5 lg:p-3 bg-[#ebebed] border border-black/[0.08] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.10),0_2px_8px_rgba(0,0,0,0.04)] transition-all overflow-hidden ${
          isFullscreen ? "!rounded-none !p-0 !border-none !bg-black size-full fixed inset-0 z-50 flex items-center justify-center" : ""
        }`}
      >
        {/* ======================================================================= */}
        {/* INNER VIDEO CANVAS — Smooth corners, zero dark corner bleed              */}
        {/* Clicking/tapping anywhere toggles mute / unmute                         */}
        {/* ======================================================================= */}
        <div
          onClick={handleCanvasClick}
          onTouchEnd={handleCanvasTouchEnd}
          className={`relative w-full rounded-[10px] sm:rounded-[18px] lg:rounded-[20px] overflow-hidden bg-[#fbf9f5] aspect-video group cursor-pointer select-none flex items-center justify-center isolate ${
            isFullscreen ? "!rounded-none !h-full !max-h-screen !aspect-video" : ""
          }`}
        >
          {/* Native Video Element */}
          <video
            ref={videoRef}
            src="/theirs_hero.mp4"
            poster="/theirs_hero_poster.webp"
            playsInline
            loop
            preload="metadata"
            muted={isMuted}
            onTimeUpdate={() => {
              if (videoRef.current) {
                setCurrentTime(videoRef.current.currentTime)
              }
            }}
            onDurationChange={() => {
              if (videoRef.current && videoRef.current.duration) {
                setDuration(videoRef.current.duration)
              }
            }}
            onProgress={() => {
              const video = videoRef.current
              if (video && video.buffered.length > 0) {
                const bufferedEnd = video.buffered.end(video.buffered.length - 1)
                const dur = video.duration || duration
                if (dur > 0) {
                  setBufferedPercent((bufferedEnd / dur) * 100)
                }
              }
            }}
            onWaiting={() => setIsBuffering(true)}
            onPlaying={() => {
              setIsBuffering(false)
              setIsPlaying(true)
            }}
            onPause={() => setIsPlaying(false)}
            className="size-full object-cover block rounded-[10px] sm:rounded-[18px] lg:rounded-[20px]"
          />

          {/* ===================================================================== */}
          {/* CENTER PLAY BUTTON OVERLAY (Only visible when paused)                 */}
          {/* ===================================================================== */}
          {!isPlaying && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/10 pointer-events-none">
              <button
                type="button"
                onClick={togglePlay}
                className="pointer-events-auto size-14 sm:size-18 rounded-full bg-primary hover:bg-[#d4501a] text-white flex items-center justify-center shadow-xl transition-transform hover:scale-105 active:scale-95 cursor-pointer ring-4 ring-white/30"
                aria-label="Play video"
              >
                <Play className="size-6 sm:size-8 fill-white translate-x-0.5" />
              </button>
            </div>
          )}

          {/* ===================================================================== */}
          {/* CENTER FEEDBACK BADGE (Unmute / Mute / Play / Pause indicator)         */}
          {/* ===================================================================== */}
          <AnimatePresence>
            {centerAction && (
              <motion.div
                key={centerAction}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.25 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="absolute z-30 pointer-events-none size-14 sm:size-18 rounded-full bg-black/65 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white shadow-2xl"
              >
                {centerAction === "unmute" && (
                  <Volume2 className="size-7 sm:size-9 text-white" />
                )}
                {centerAction === "mute" && (
                  <VolumeX className="size-7 sm:size-9 text-white" />
                )}
                {centerAction === "play" && (
                  <Play className="size-7 sm:size-9 fill-white translate-x-0.5" />
                )}
                {centerAction === "pause" && (
                  <Pause className="size-7 sm:size-9 fill-white" />
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Buffering Spinner */}
          {isBuffering && (
            <div className="absolute z-25 pointer-events-none size-10 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
          )}

          {/* ===================================================================== */}
          {/* CONTROL BAR — Transparent on mobile (zero background), Frosted Dock on Desktop */}
          {/* ===================================================================== */}
          <div
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            onTouchEnd={(e) => e.stopPropagation()}
            className={`absolute inset-x-2 sm:inset-x-6 bottom-1.5 sm:bottom-4 z-30 transition-all duration-300 ${
              showControls || !isPlaying
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 translate-y-2 pointer-events-none"
            }`}
          >
            <div className="bg-transparent sm:backdrop-blur-md sm:bg-neutral-950/75 sm:border sm:border-white/15 rounded-full px-1.5 py-1 sm:px-4 sm:py-2 sm:shadow-[0_8px_30px_rgba(0,0,0,0.4)] flex items-center gap-1.5 sm:gap-3 text-neutral-900 sm:text-white">
              
              {/* Dedicated Play / Pause Toggle Button */}
              <button
                type="button"
                onClick={togglePlay}
                className="size-7 sm:size-8 rounded-full bg-black/5 sm:bg-white/10 hover:bg-black/10 sm:hover:bg-white/20 active:scale-90 flex items-center justify-center transition-all cursor-pointer text-neutral-900 sm:text-white shrink-0"
                aria-label={isPlaying ? "Pause video" : "Play video"}
              >
                {isPlaying ? (
                  <Pause className="size-3.5 sm:size-4 fill-current" />
                ) : (
                  <Play className="size-3.5 sm:size-4 fill-current translate-x-0.5" />
                )}
              </button>

              {/* Current Time */}
              <span className="font-mono text-[11px] text-neutral-800 sm:text-white/90 tabular-nums shrink-0 select-none">
                {formatTime(currentTime)}
              </span>

              {/* Integrated Scrubber Timeline */}
              <div
                ref={scrubberRef}
                onMouseEnter={() => setIsHoveringTimeline(true)}
                onMouseLeave={() => setIsHoveringTimeline(false)}
                onMouseMove={handleTimelineMove}
                onMouseDown={handleTimelineMouseDown}
                onTouchStart={handleTimelineTouchStart}
                onTouchMove={handleTimelineTouchMove}
                onTouchEnd={handleTimelineTouchEnd}
                className="group/scrubber relative flex-1 h-6 flex items-center cursor-pointer select-none touch-none"
              >
                {/* Hover Time Tooltip (Desktop only) */}
                {isHoveringTimeline && hoverTime !== null && (
                  <div
                    className="hidden sm:block absolute bottom-6 -translate-x-1/2 pointer-events-none px-1.5 py-0.5 rounded bg-black/90 border border-white/20 text-white font-mono text-[10px] font-medium shadow-md whitespace-nowrap"
                    style={{ left: `${hoverPosition * 100}%` }}
                  >
                    {formatTime(hoverTime)}
                  </div>
                )}

                {/* Track Base */}
                <div className="relative w-full h-1 sm:h-1.5 group-hover/scrubber:h-2 transition-all rounded-full bg-neutral-300/80 sm:bg-white/25 overflow-hidden">
                  {/* Buffer Progress */}
                  <div
                    className="absolute inset-y-0 left-0 bg-neutral-400/40 sm:bg-white/30 rounded-full transition-[width] duration-200"
                    style={{ width: `${bufferedPercent}%` }}
                  />
                  {/* Played Progress Bar */}
                  <div
                    className="absolute inset-y-0 left-0 bg-primary rounded-full shadow-[0_0_6px_rgba(217,83,30,0.8)]"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                {/* Glowing Thumb Handle */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 size-2.5 sm:size-3 bg-primary sm:bg-white rounded-full shadow-md ring-2 ring-primary transition-transform group-hover/scrubber:scale-125"
                  style={{ left: `${progressPercent}%` }}
                />
              </div>

              {/* Total Duration (hidden on tiny screens) */}
              <span className="font-mono text-[11px] text-neutral-500 sm:text-white/50 tabular-nums shrink-0 select-none hidden xs:inline">
                {formatTime(duration)}
              </span>

              {/* Volume Control with Expandable Slider */}
              <div className="group/vol flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={toggleMute}
                  className="size-7 rounded-full hover:bg-black/5 sm:hover:bg-white/10 active:scale-90 flex items-center justify-center transition-all cursor-pointer text-neutral-800 sm:text-white/80 hover:text-neutral-900 sm:hover:text-white"
                  title={isMuted ? "Unmute" : "Mute"}
                  aria-label="Toggle mute"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="size-3.5 sm:size-4" />
                  ) : volume < 0.5 ? (
                    <Volume1 className="size-3.5 sm:size-4" />
                  ) : (
                    <Volume2 className="size-3.5 sm:size-4" />
                  )}
                </button>
                <div className="hidden xs:flex w-0 group-hover/vol:w-14 sm:group-hover/vol:w-16 transition-all duration-200 overflow-hidden items-center">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.02"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-14 sm:w-16 h-1 accent-primary cursor-pointer bg-neutral-300 sm:bg-white/30 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-2.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary sm:[&::-webkit-slider-thumb]:bg-white"
                  />
                </div>
              </div>

              {/* Playback Speed (hidden on narrow mobile to save space) */}
              <button
                type="button"
                onClick={cyclePlaybackRate}
                className="hidden xs:flex h-6 px-1.5 rounded hover:bg-black/5 sm:hover:bg-white/10 active:scale-90 items-center justify-center transition-all cursor-pointer font-mono text-[10px] sm:text-[11px] text-neutral-700 sm:text-white/80 hover:text-neutral-900 sm:hover:text-white shrink-0"
                title="Change playback speed"
              >
                {playbackRate}x
              </button>

              {/* Fullscreen Button */}
              <button
                type="button"
                onClick={toggleFullscreen}
                className="size-7 rounded-full hover:bg-black/5 sm:hover:bg-white/10 active:scale-90 flex items-center justify-center transition-all cursor-pointer text-neutral-800 sm:text-white/80 hover:text-neutral-900 sm:hover:text-white shrink-0"
                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                aria-label="Toggle fullscreen"
              >
                {isFullscreen ? (
                  <Minimize className="size-3.5 sm:size-4" />
                ) : (
                  <Maximize className="size-3.5 sm:size-4" />
                )}
              </button>

            </div>
          </div>

        </div>
      </div>

      {/* Discreet Keyboard Shortcuts Hint on Desktop */}
      <div className="hidden sm:flex items-center justify-center gap-4 mt-3 text-neutral-400 text-[11px] font-mono select-none">
        <span>Click video or M for Sound</span>
        <span>·</span>
        <span>Space to Play/Pause</span>
        <span>·</span>
        <span>F for Fullscreen</span>
      </div>
    </div>
  )
}
