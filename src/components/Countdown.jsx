import { useState, useEffect } from 'react'
import { COMPETITION_END_DATE } from '../data/mockData'

function pad(n) {
  return String(n).padStart(2, '0')
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft())

  function getTimeLeft() {
    const diff = COMPETITION_END_DATE - Date.now()
    if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0 }
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)
    return { hours, minutes, seconds }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const units = [
    { label: 'HRS', value: pad(timeLeft.hours) },
    { label: 'MIN', value: pad(timeLeft.minutes) },
    { label: 'SEC', value: pad(timeLeft.seconds) },
  ]

  return (
    <div className="flex items-center gap-2 sm:gap-4">
      {units.map(({ label, value }, i) => (
        <div key={label} className="flex items-center gap-2 sm:gap-4">
          <div className="text-center">
            <div className="countdown-digit text-gray-900">{value}</div>
            <div className="text-xs font-medium text-gray-400 tracking-widest mt-1">
              {label}
            </div>
          </div>
          {i < units.length - 1 && (
            <span className="countdown-digit text-gray-300 mb-5">:</span>
          )}
        </div>
      ))}
    </div>
  )
}
