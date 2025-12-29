'use client';

import Link from 'next/link';
import Image from 'next/image';
import { LeaderboardEntry } from '@/lib/types';
import { getModelIconPath } from '@/lib/modelIcons';

function formatPnL(value: number | null, hasData: boolean): string {
  if (!hasData || value === null) return 'N/A';
  const sign = value >= 0 ? '+' : '';
  return `${sign}$${Math.abs(value).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

interface V2LeaderboardProps {
  data: LeaderboardEntry[];
  hasRealData: boolean;
}

export default function V2Leaderboard({ data, hasRealData }: V2LeaderboardProps) {
  const top3 = data.slice(0, 3);
  const rest = data.slice(3);
  
  return (
    <section className="container-wide mx-auto px-6 py-12 md:py-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <div>
          <p className="text-[var(--accent-purple)] font-mono text-sm tracking-wider mb-2">LEADERBOARD</p>
          <h2 className="text-2xl md:text-3xl">Current Standings</h2>
        </div>
        <Link href="/models" className="btn btn-ghost group">
          View All
          <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
      
      {/* Top 3 - Featured cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        {top3.map((entry, index) => (
          <Link 
            href={`/models/${entry.model_id}`} 
            key={entry.model_id}
            className={`card-featured p-6 group cursor-pointer animate-fade-in`}
            style={{ animationDelay: `${(index + 1) * 100}ms` }}
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold relative overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-secondary)]"
                    style={{ 
                      backgroundColor: `${entry.color}15`,
                      color: entry.color
                    }}
                  >
                    <span className="absolute top-0 left-0 w-6 h-6 bg-[var(--bg-primary)] flex items-center justify-center text-xs font-bold z-10 rounded-br-xl border-r border-b border-[var(--border-subtle)]">
                      {index + 1}
                    </span>
                    <Image
                      src={getModelIconPath(entry.model_id)}
                      alt={entry.display_name}
                      width={48}
                      height={48}
                      className="w-full h-full object-contain p-1.5"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{entry.display_name}</h3>
                  <p className="text-sm text-[var(--text-muted)]">{entry.provider}</p>
                </div>
              </div>
              <svg className="w-5 h-5 text-[var(--text-muted)] transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-[var(--text-muted)] mb-1">Total P/L</p>
                <p className={`text-2xl font-bold ${!hasRealData ? 'text-[var(--text-muted)]' : entry.total_pnl >= 0 ? 'text-positive' : 'text-negative'}`}>
                  {formatPnL(entry.total_pnl, hasRealData)}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[var(--border-subtle)]">
                <div>
                  <p className="text-xs text-[var(--text-muted)] mb-1">Brier Score</p>
                  <p className="font-mono text-sm">{entry.avg_brier_score?.toFixed(3) || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-[var(--text-muted)] mb-1">Win Rate</p>
                  <p className="font-mono text-sm">{entry.win_rate ? `${(entry.win_rate * 100).toFixed(0)}%` : 'N/A'}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {/* Rest - Compact list */}
      <div className="card p-4">
        <div className="divide-y divide-[var(--border-subtle)]">
          {rest.map((entry, index) => (
            <Link 
              href={`/models/${entry.model_id}`}
              key={entry.model_id}
              className="flex items-center justify-between py-4 first:pt-0 last:pb-0 group"
            >
              <div className="flex items-center gap-4">
                <span className="w-8 text-center font-mono text-[var(--text-muted)]">{index + 4}</span>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">
                  <Image
                    src={getModelIconPath(entry.model_id)}
                    alt={entry.display_name}
                    width={32}
                    height={32}
                    className="w-full h-full object-contain p-1"
                  />
                </div>
                <div>
                  <p className="font-medium group-hover:text-[var(--accent-purple)] transition-colors">{entry.display_name}</p>
                  <p className="text-sm text-[var(--text-muted)]">{entry.provider}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-mono ${!hasRealData ? 'text-[var(--text-muted)]' : entry.total_pnl >= 0 ? 'text-positive' : 'text-negative'}`}>
                  {formatPnL(entry.total_pnl, hasRealData)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

