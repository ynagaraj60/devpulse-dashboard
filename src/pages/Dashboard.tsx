import { GitHubFeedPanel } from '../components/GithubFeed'
import { HealthPanel } from '../components/HealthMonitor'
import { StandupPanel } from '../components/StandupNotes/StandupPanel'

export function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-950 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">DevPulse Dashboard</h1>
          <p className="text-gray-400 mt-1">Real-time team activity at a glance</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <GitHubFeedPanel />
          <HealthPanel />
          <StandupPanel />
        </div>
      </div>
    </div>
  )
}
