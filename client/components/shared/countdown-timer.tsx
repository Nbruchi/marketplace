"use client"

import { useState, useEffect } from "react"

interface CountdownTimerProps {
  targetDate: Date
  compact?: boolean
}

export function CountdownTimer({ targetDate, compact = false }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime()

      if (difference <= 0) {
        return {
          hours: 0,
          minutes: 0,
          seconds: 0,
        }
      }

      return {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    setTimeLeft(calculateTimeLeft())

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  const formatTime = (value: number) => {
    return value.toString().padStart(2, "0")
  }

  if (compact) {
    return (
      <div className="flex items-center gap-1 text-sm font-medium">
        <span>{formatTime(timeLeft.hours)}h</span>
        <span>{formatTime(timeLeft.minutes)}m</span>
        <span>{formatTime(timeLeft.seconds)}s</span>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <div className="bg-black text-white dark:bg-white dark:text-black px-2 py-1 rounded">
        {formatTime(timeLeft.hours)}
      </div>
      <span>:</span>
      <div className="bg-black text-white dark:bg-white dark:text-black px-2 py-1 rounded">
        {formatTime(timeLeft.minutes)}
      </div>
      <span>:</span>
      <div className="bg-black text-white dark:bg-white dark:text-black px-2 py-1 rounded">
        {formatTime(timeLeft.seconds)}
      </div>
    </div>
  )
}
