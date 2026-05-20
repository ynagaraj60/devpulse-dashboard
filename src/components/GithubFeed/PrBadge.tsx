interface PrBadgeProps {
  title: string;
  status: 'open' | 'merged' | 'draft';
  author: string;
  number: number;
}

const STATUS_STYLES: Record<PrBadgeProps['status'], { bg: string; text: string; dot: string; label: string }> = {
  open: {
    bg: 'bg-green-400/10 border-green-400/30',
    text: 'text-green-400',
    dot: 'bg-green-400',
    label: 'Open',
  },
  merged: {
    bg: 'bg-purple-400/10 border-purple-400/30',
    text: 'text-purple-400',
    dot: 'bg-purple-400',
    label: 'Merged',
  },
  draft: {
    bg: 'bg-gray-400/10 border-gray-400/30',
    text: 'text-gray-400',
    dot: 'bg-gray-500',
    label: 'Draft',
  },
};

export default function PrBadge({ title, status, author, number }: PrBadgeProps) {
  const style = STATUS_STYLES[status];

  return (
    <div
      className={`flex items-start gap-3 px-4 py-3 rounded-lg border transition-colors hover:bg-gray-800/50 ${style.bg}`}
    >
      <div className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ${style.dot}`} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-xs font-semibold ${style.text}`}>
            #{number}
          </span>
          <span className="text-sm text-gray-200 font-medium truncate">
            {title}
          </span>
        </div>
        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
          <span>{author}</span>
          <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide ${style.text} ${style.bg}`}>
            {style.label}
          </span>
        </div>
      </div>
    </div>
  );
}
