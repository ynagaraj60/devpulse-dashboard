import type { Commit } from './useGithubData';

function timeAgo(dateString: string): string {
  const seconds = Math.floor(
    (Date.now() - new Date(dateString).getTime()) / 1000
  );

  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

interface CommitCardProps {
  commit: Commit;
}

export default function CommitCard({ commit }: CommitCardProps) {
  const avatarUrl =
    commit.author.avatar_url ||
    `https://ui-avatars.com/api/?name=${commit.author.login}&background=374151&color=e5e7eb&size=32`;

  return (
    <div className="flex items-start gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-gray-800/50 cursor-default">
      <img
        src={avatarUrl}
        alt={commit.author.login}
        className="w-8 h-8 rounded-full mt-0.5 ring-2 ring-gray-700 flex-shrink-0"
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 text-sm">
          <span className="font-medium text-gray-200">
            {commit.author.login}
          </span>
          <span className="text-gray-500 text-xs">{timeAgo(commit.timestamp)}</span>
        </div>
        <p className="text-gray-400 text-sm mt-0.5 truncate">
          <code className="text-xs text-blue-400 bg-blue-400/10 px-1.5 py-0.5 rounded font-mono mr-2">
            {commit.sha.slice(0, 7)}
          </code>
          {commit.message}
        </p>
      </div>
    </div>
  );
}
