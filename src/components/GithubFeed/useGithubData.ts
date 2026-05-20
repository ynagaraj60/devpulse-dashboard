import { useState, useEffect, useCallback } from 'react';

export interface Commit {
  sha: string;
  author: { login: string; avatar_url: string };
  message: string;
  timestamp: string;
}

export interface PullRequest {
  number: number;
  title: string;
  status: 'open' | 'merged' | 'draft';
  author: string;
}

interface GithubData {
  commits: Commit[];
  pullRequests: PullRequest[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

const MOCK_COMMITS: Commit[] = [
  {
    sha: 'abc123',
    author: { login: 'alice', avatar_url: '' },
    message: 'fix: resolve auth timeout',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    sha: 'def456',
    author: { login: 'bob', avatar_url: '' },
    message: 'feat: add dark mode toggle',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    sha: 'ghi789',
    author: { login: 'carol', avatar_url: '' },
    message: 'chore: update dependencies',
    timestamp: new Date(Date.now() - 10800000).toISOString(),
  },
];

const MOCK_PRS: PullRequest[] = [
  { number: 42, title: 'feat: GitHub Activity Feed Panel', status: 'open' as const, author: 'alice' },
  { number: 41, title: 'fix: server health endpoint', status: 'merged' as const, author: 'bob' },
  { number: 40, title: 'wip: standup notes redesign', status: 'draft' as const, author: 'carol' },
];

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
const REPO_OWNER = 'ynagaraj60';
const REPO_NAME = 'devpulse-dashboard';

export function useGithubData(): GithubData {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [pullRequests, setPullRequests] = useState<PullRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const headers: HeadersInit = {
      Accept: 'application/vnd.github.v3+json',
    };
    if (GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${GITHUB_TOKEN}`;
    }

    try {
      const [commitsRes, prsRes] = await Promise.all([
        fetch(
          `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/commits?per_page=10`,
          { headers }
        ),
        fetch(
          `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/pulls?state=all&per_page=10`,
          { headers }
        ),
      ]);

      if (!commitsRes.ok || !prsRes.ok) {
        throw new Error('GitHub API request failed');
      }

      const commitsJson = await commitsRes.json();
      const prsJson = await prsRes.json();

      const mappedCommits: Commit[] = commitsJson.map(
        (c: { sha: string; commit: { message: string; author: { date: string } }; author: { login: string; avatar_url: string } | null }) => ({
          sha: c.sha,
          author: {
            login: c.author?.login ?? 'unknown',
            avatar_url: c.author?.avatar_url ?? '',
          },
          message: c.commit.message.split('\n')[0],
          timestamp: c.commit.author.date,
        })
      );

      const mappedPrs: PullRequest[] = prsJson.map(
        (pr: { number: number; title: string; draft: boolean; merged_at: string | null; user: { login: string } }) => ({
          number: pr.number,
          title: pr.title,
          status: pr.draft ? 'draft' : pr.merged_at ? 'merged' : 'open',
          author: pr.user.login,
        })
      );

      setCommits(mappedCommits);
      setPullRequests(mappedPrs);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      // Fallback to mock data when API is unavailable
      setCommits(MOCK_COMMITS);
      setPullRequests(MOCK_PRS);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { commits, pullRequests, isLoading, error, refetch: fetchData };
}
