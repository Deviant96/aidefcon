import { useEffect, useState } from 'react'

function getAnnouncementsEndpoint() {
  const apiUrl = window?.aidefconConfig?.apiUrl
  if (typeof apiUrl === 'string' && apiUrl.trim() !== '') {
    return `${apiUrl.replace(/\/$/, '')}/announcements`
  }

  const wpJsonUrl = window?.aidefconConfig?.wpJsonUrl
  if (typeof wpJsonUrl === 'string' && wpJsonUrl.trim() !== '') {
    return `${wpJsonUrl.replace(/\/$/, '')}/aidefcon/v1/announcements`
  }

  return '/wp-json/aidefcon/v1/announcements'
}

function normalizeAnnouncement(raw) {
  return {
    id: Number(raw?.id || 0),
    title: String(raw?.title || ''),
    content: String(raw?.content || ''),
    time: String(raw?.time || ''),
    pinned: Boolean(raw?.pinned),
    urgent: Boolean(raw?.urgent),
  }
}

export default function useAnnouncements() {
  const [announcements, setAnnouncements] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function loadAnnouncements() {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(getAnnouncementsEndpoint(), {
          method: 'GET',
          signal: controller.signal,
          headers: {
            Accept: 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error(`Failed to load announcements (${response.status})`)
        }

        const payload = await response.json()
        const items = Array.isArray(payload?.items) ? payload.items : []
        setAnnouncements(items.map(normalizeAnnouncement))
      } catch (err) {
        if (err.name === 'AbortError') {
          return
        }

        setAnnouncements([])
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    loadAnnouncements()

    return () => controller.abort()
  }, [])

  return { announcements, loading, error }
}