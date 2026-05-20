interface LatencyChartProps {
  data: number[];
}

export default function LatencyChart({ data }: LatencyChartProps) {
  const width = 200;
  const height = 40;
  const padding = 2;

  const maxVal = Math.max(...data, 1);
  const minVal = Math.min(...data, 0);
  const range = maxVal - minVal || 1;

  // Build SVG polyline points
  const points = data.map((value, i) => {
    const x = padding + (i / (data.length - 1)) * (width - padding * 2);
    const y = padding + (1 - (value - minVal) / range) * (height - padding * 2);
    return `${x},${y}`;
  });

  const polylinePoints = points.join(' ');

  // Closed polygon for the gradient fill area
  const firstX = padding;
  const lastX = padding + ((data.length - 1) / (data.length - 1)) * (width - padding * 2);
  const fillPoints = `${firstX},${height} ${polylinePoints} ${lastX},${height}`;

  // Determine color based on average latency
  const avg = data.reduce((sum, v) => sum + v, 0) / data.length;
  let strokeColor: string;
  let gradientId: string;

  if (avg < 100) {
    strokeColor = '#34d399'; // emerald-400
    gradientId = 'gradGreen';
  } else if (avg < 250) {
    strokeColor = '#facc15'; // yellow-400
    gradientId = 'gradYellow';
  } else {
    strokeColor = '#f87171'; // red-400
    gradientId = 'gradRed';
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="flex-shrink-0"
    >
      <defs>
        <linearGradient id="gradGreen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="gradYellow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#facc15" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#facc15" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="gradRed" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f87171" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#f87171" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Gradient fill below the line */}
      <polygon points={fillPoints} fill={`url(#${gradientId})`} />

      {/* Sparkline */}
      <polyline
        points={polylinePoints}
        fill="none"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
