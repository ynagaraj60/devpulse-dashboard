import { useState, useEffect, useCallback } from 'react';

export type ServerStatus = 'healthy' | 'degraded' | 'down';

export interface ServerData {
  name: string;
  status: ServerStatus;
  latency: number;
  latencyHistory: number[];
  uptime: number;
}

export interface HealthData {
  servers: ServerData[];
  lastChecked: Date;
}

const SERVER_NAMES = ['API Gateway', 'Database Primary', 'Cache Layer'];

function randomLatency(): number {
  // Mostly 10-200ms, occasionally spike to 500ms
  const spike = Math.random() < 0.1;
  if (spike) {
    return Math.floor(Math.random() * 300 + 200); // 200-500ms
  }
  return Math.floor(Math.random() * 190 + 10); // 10-200ms
}

function randomStatus(): ServerStatus {
  const roll = Math.random();
  if (roll < 0.85) return 'healthy';
  if (roll < 0.97) return 'degraded';
  return 'down';
}

function randomUptime(): number {
  // 99.0 - 99.99
  return parseFloat((99 + Math.random() * 0.99).toFixed(2));
}

function createInitialServer(name: string): ServerData {
  const history: number[] = [];
  for (let i = 0; i < 20; i++) {
    history.push(randomLatency());
  }
  return {
    name,
    status: 'healthy',
    latency: history[history.length - 1],
    latencyHistory: history,
    uptime: randomUptime(),
  };
}

export function useHealthData(): HealthData {
  const [servers, setServers] = useState<ServerData[]>(() =>
    SERVER_NAMES.map(createInitialServer)
  );
  const [lastChecked, setLastChecked] = useState<Date>(new Date());

  const tick = useCallback(() => {
    setServers((prev) =>
      prev.map((server) => {
        const newLatency = randomLatency();
        const newHistory = [...server.latencyHistory.slice(-19), newLatency];
        return {
          ...server,
          status: randomStatus(),
          latency: newLatency,
          latencyHistory: newHistory,
          uptime: randomUptime(),
        };
      })
    );
    setLastChecked(new Date());
  }, []);

  useEffect(() => {
    const id = setInterval(tick, 5000);
    return () => clearInterval(id);
  }, [tick]);

  return { servers, lastChecked };
}
