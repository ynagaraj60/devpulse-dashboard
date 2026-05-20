interface StatusIndicatorProps {
  status: 'healthy' | 'degraded' | 'down'
}

const statusColors = {
  healthy: 'bg-emerald-400',
  degraded: 'bg-yellow-400',
  down: 'bg-red-500',
}

const pingColors = {
  healthy: 'bg-emerald-400',
  degraded: 'bg-yellow-400',
  down: 'bg-red-500',
}

export function StatusIndicator({ status }: StatusIndicatorProps) {
  return (
    <span className="relative flex h-3 w-3">
      {status === 'healthy' && (
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${pingColors[status]} opacity-75`} />
      )}
      <span className={`relative inline-flex rounded-full h-3 w-3 ${statusColors[status]}`} />
        <span
          className={`animate-ping absolute inline-flex h-full w-full rounded-full ${statusColors[status]} opacity-75`}
        />
      )}
      <span
        className={`relative inline-flex rounded-full h-3 w-3 ${statusColors[status]}`}
      />
    </span>
  )
}
