import type { ServerStatus } from './useHealthData';

interface StatusIndicatorProps {
  status: ServerStatus;
}

const colorMap: Record<ServerStatus, { bg: string; ring: string }> = {
  healthy: {
    bg: 'bg-emerald-500',
    ring: 'bg-emerald-500',
  },
  degraded: {
    bg: 'bg-yellow-500',
    ring: 'bg-yellow-500',
  },
  down: {
    bg: 'bg-red-500',
    ring: 'bg-red-500',
  },
};

export default function StatusIndicator({ status }: StatusIndicatorProps) {
  const colors = colorMap[status];

  return (
    <span className="relative inline-flex h-3 w-3">
      {status === 'healthy' && (
        <span
          className={`absolute inline-flex h-full w-full animate-ping rounded-full ${colors.ring} opacity-75`}
        />
      )}
      <span
        className={`relative inline-flex h-3 w-3 rounded-full ${colors.bg}`}
      />
    </span>
  );
}
