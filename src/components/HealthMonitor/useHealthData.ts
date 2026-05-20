import { useState, useEffect } from 'react'

interface ServerHealth {
  name: string
  status: 'healthy' | 'degraded' | 'down'
  latency: number
  uptime: number
  latencyHistory: number[]
}

function randomLatency(): number {
  return Math.random() < 0.1 ? Math.floor(Math.random() * 300) + 200 : Math.floor(Math.random() * 150) + 10
}

function randomStatus(): 'healthy' | 'degraded' | 'down' {
  const r = Math.random()
  if (r < 0.85) return 'healthy'
  if (r < 0.95) return 'degraded'
  return 'down'
}

function randomUptime(): number {
  return parseFloat((99 + Math.random() * 0.99).toFixed(2))
}

function createInitialServer(name: string): ServerHealth {
  const history = Array.from({ length: 20 }, () => randomLatency())
  return {
    name,
    status: 'healthy',
    latency: history[history.length - 1],
    uptime: randomUptime(),
    latencyHistory: history,
  }
}

export function useHealthData() {
  const [servers, setServers] = useState<ServerHealth[]>([
    createInitialServer('API Gateway'),
    createInitialServer('Database Primary'),
    createInitialServer('Cache Layer'),
  ])
  const [lastChecked, setLastChecked] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setServers((prev) =>
        prev.map((server) => {
          const newLatency = randomLatency()
          const newHistory = [...server.latencyHistory.slice(-19), newLatency]
          return {
            ...server,
            status: randomStatus(),
            latency: newLatency,
            uptime: randomUptime(),
            latencyHistory: newHistory,
          }
        })
      )
      setLastChecked(new Date())
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return { servers, lastChecked }
}
