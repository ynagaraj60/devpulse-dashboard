import StatusIndicator from './StatusIndicator';
import LatencyChart from './LatencyChart';
import { useHealthData } from './useHealthData';

export default function HealthPanel() {
  const { servers, lastChecked } = useHealthData();

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-white">Server Health</h2>
        <span className="text-xs text-gray-500">
          Last checked:{' '}
          {lastChecked.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          })}
        </span>
      </div>

      {/* Server rows */}
      <div className="space-y-4">
        {servers.map((server) => (
          <div
            key={server.name}
            className="flex items-center gap-4 rounded-lg bg-gray-800/50 px-4 py-3"
          >
            {/* Status dot */}
            <StatusIndicator status={server.status} />

            {/* Server name & status label */}
            <div className="min-w-[140px]">
              <p className="text-sm font-medium text-white">{server.name}</p>
              <p className="text-xs capitalize text-gray-400">{server.status}</p>
            </div>

            {/* Sparkline */}
            <LatencyChart data={server.latencyHistory} />

            {/* Latency value */}
            <div className="min-w-[70px] text-right">
              <p className="text-sm font-mono text-gray-300">
                {server.latency}
                <span className="text-gray-500 ml-0.5">ms</span>
              </p>
            </div>

            {/* Uptime */}
            <div className="min-w-[70px] text-right">
              <p className="text-sm font-mono text-emerald-400">
                {server.uptime}
                <span className="text-gray-500 ml-0.5">%</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
