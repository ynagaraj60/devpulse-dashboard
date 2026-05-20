import { useHealthData } from './useHealthData'
import { StatusIndicator } from './StatusIndicator'
import { LatencyChart } from './LatencyChart'

export function HealthPanel() {
  const { servers, lastChecked } = useHealthData()

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Server Health
        </h2>
        <span className="text-xs text-gray-500">
          Last checked: {lastChecked.toLocaleTimeString()}
        </span>
      </div>
      <div className="space-y-4">
        {servers.map((server) => (
          <div key={server.name} className="flex items-center gap-4 p-3 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-colors">
            <StatusIndicator status={server.status} />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white">{server.name}</div>
              <div className="text-xs text-gray-400">{server.latency}ms · {server.uptime}% uptime</div>
            </div>
            <LatencyChart data={server.latencyHistory} />
          </div>
        ))}
      </div>
    </div>
  )
}
