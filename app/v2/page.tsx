'use client';

import { useEffect, useState } from 'react';
import { LeaderboardEntry } from '@/lib/types';
import { MODELS } from '@/lib/constants';
import V2Header from '@/components/v2/V2Header';
import V2PortfolioChart from '@/components/v2/V2PortfolioChart';
import V2Leaderboard from '@/components/v2/V2Leaderboard';
import V2PredictionMarkets from '@/components/v2/V2PredictionMarkets';

// Empty initial state - will be populated from API when competition starts
const emptyLeaderboard: LeaderboardEntry[] = MODELS.map((model) => ({
  model_id: model.id,
  display_name: model.displayName,
  provider: model.provider,
  color: model.color,
  total_pnl: 0,
  total_pnl_percent: 0,
  avg_brier_score: null,
  num_cohorts: 0,
  num_resolved_bets: 0,
  win_rate: null,
}));

export default function V2Page() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(emptyLeaderboard);
  const [hasRealData, setHasRealData] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/leaderboard');
        if (res.ok) {
          const data = await res.json();
          if (data.leaderboard && data.leaderboard.length > 0) {
            // Check if we have actual competition data (non-zero P/L or resolved bets)
            const hasActualData = data.leaderboard.some(
              (entry: LeaderboardEntry) => entry.total_pnl !== 0 || entry.num_resolved_bets > 0
            );
            if (hasActualData) {
              setLeaderboard(data.leaderboard);
              setHasRealData(true);
            }
          }
        }
      } catch {
        console.log('No data available yet');
      }
    }
    fetchData();
  }, []);

  return (
    <main>
      <V2Header />
      <V2PortfolioChart />
      <V2Leaderboard data={leaderboard} hasRealData={hasRealData} />
      <V2PredictionMarkets />
    </main>
  );
}

