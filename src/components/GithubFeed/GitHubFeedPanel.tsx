import { useGithubData } from './useGithubData';
import CommitCard from './CommitCard';
import PrBadge from './PrBadge';

function LoadingSkeleton() {
  return (
    <div className="space-y-3 px-4 py-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-start gap-3 animate-pulse">
          <div className="w-8 h-8 rounded-full bg-gray-700" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-700 rounded w-1/3" />
            <div className="h-3 bg-gray-700 rounded w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function GitHubFeedPanel() {
  const { commits, pullRequests, isLoading, error, refetch } = useGithubData();

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          <h2 className="text-lg font-semibold text-white">GitHub Activity</h2>
        </div>
        <button
          onClick={refetch}
          disabled={isLoading}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-400 bg-gray-800 rounded-lg hover:bg-gray-700 hover:text-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg
            className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Refresh
        </button>
      </div>

      {/* Error banner */}
      {error && (
        <div className="mx-4 mt-3 px-3 py-2 text-xs text-amber-400 bg-amber-400/10 rounded-lg border border-amber-400/20">
          API unavailable — showing mock data
        </div>
      )}

      {/* Scrollable feed */}
      <div className="max-h-[600px] overflow-y-auto">
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <>
            {/* Pull Requests Section */}
            {pullRequests.length > 0 && (
              <div className="px-4 pt-4 pb-2">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Pull Requests
                </h3>
                <div className="space-y-2">
                  {pullRequests.map((pr) => (
                    <PrBadge
                      key={pr.number}
                      number={pr.number}
                      title={pr.title}
                      status={pr.status}
                      author={pr.author}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Commits Section */}
            {commits.length > 0 && (
              <div className="px-4 pt-4 pb-4">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Recent Commits
                </h3>
                <div className="space-y-1">
                  {commits.map((commit) => (
                    <CommitCard key={commit.sha} commit={commit} />
                  ))}
                </div>
              </div>
            )}

            {/* Empty state */}
            {commits.length === 0 && pullRequests.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                <svg
                  className="w-10 h-10 mb-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
                <p className="text-sm">No activity yet</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
