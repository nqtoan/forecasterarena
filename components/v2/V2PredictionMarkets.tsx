'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Market {
  id: string;
  question: string;
  category: string | null;
  current_price: number | null;
  volume: number | null;
  status: string;
  positions_count: number;
}

export default function V2PredictionMarkets() {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMarkets() {
      try {
        const params = new URLSearchParams();
        params.set('status', 'active');
        params.set('sort', 'volume');
        params.set('limit', '10');
        params.set('offset', '0');

        const res = await fetch(`/api/markets?${params}`);
        if (res.ok) {
          const data = await res.json();
          // Maximum 10 items - slice to ensure we never exceed
          const marketsData = (data.markets || []).slice(0, 10);
          setMarkets(marketsData);
        }
      } catch {
        console.log('Error fetching markets');
      } finally {
        setLoading(false);
      }
    }
    fetchMarkets();
  }, []);

  function formatVolume(volume: number | null): string {
    if (!volume) return 'N/A';
    if (volume >= 1000000) return `${(volume / 1000000).toFixed(1)}M USDT`;
    if (volume >= 1000) return `${(volume / 1000).toFixed(0)}K USDT`;
    return `${volume.toFixed(0)} USDT`;
  }

  function formatPrice(price: number | null): string {
    if (price === null) return '50%';
    return `${(price * 100).toFixed(0)}%`;
  }

  return (
    <section className="container-wide mx-auto px-6 py-12 md:py-16">
      <div className="mb-8">
        <p className="text-[var(--accent-gold)] font-mono text-sm tracking-wider mb-2">PREDICTION MARKETS</p>
        <h2 className="text-2xl md:text-3xl">Active Markets</h2>
      </div>

      {/* Fixed-height scrollable panel */}
      <div className="border border-[var(--border-subtle)] rounded-lg bg-[var(--bg-card)] overflow-hidden flex flex-col" style={{ height: '520px' }}>
        {/* Scrollable content area - shows exactly 4 items initially */}
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="p-4 space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="flex items-center gap-4 p-4 border-b border-[var(--border-subtle)]">
                    <div className="w-10 h-10 rounded-full bg-[var(--bg-tertiary)]" />
                    <div className="flex-1 h-6 bg-[var(--bg-tertiary)] rounded" />
                    <div className="w-16 h-6 bg-[var(--bg-tertiary)] rounded" />
                    <div className="w-16 h-8 bg-[var(--bg-tertiary)] rounded" />
                    <div className="w-16 h-8 bg-[var(--bg-tertiary)] rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : markets.length > 0 ? (
            <div className="divide-y divide-[var(--border-subtle)]">
              {markets.map((market) => {
                const yesPrice = market.current_price ?? 0.5;
                const noPrice = 1 - yesPrice;
                
                return (
                  <div key={market.id} className="p-4 hover:bg-[var(--bg-secondary)] transition-colors">
                    <Link href={`/markets/${market.id}`} className="block">
                      {/* Main row: Icon | Question | Probability | YES/NO buttons */}
                      <div className="flex items-center gap-4">
                        {/* Left: Market icon/avatar */}
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] flex items-center justify-center">
                            {market.status === 'active' ? (
                              <span className="w-2 h-2 rounded-full bg-[var(--color-positive)]" />
                            ) : (
                              <span className="text-xs text-[var(--text-muted)]">M</span>
                            )}
                          </div>
                        </div>
                        
                        {/* Center: Market question text */}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm leading-snug line-clamp-2">
                            {market.question}
                          </p>
                        </div>
                        
                        {/* Right: Probability percentage and YES/NO buttons */}
                        <div className="flex-shrink-0 flex items-center gap-3">
                          <span className="text-sm font-mono text-[var(--text-secondary)] w-12 text-right">
                            {formatPrice(yesPrice)}
                          </span>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              window.location.href = `/markets/${market.id}`;
                            }}
                            className="px-3 py-1.5 text-xs font-medium bg-[var(--color-positive)]/20 text-[var(--color-positive)] border border-[var(--color-positive)]/30 rounded hover:bg-[var(--color-positive)]/30 transition-colors"
                          >
                            YES
                          </button>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              window.location.href = `/markets/${market.id}`;
                            }}
                            className="px-3 py-1.5 text-xs font-medium bg-[var(--color-negative)]/20 text-[var(--color-negative)] border border-[var(--color-negative)]/30 rounded hover:bg-[var(--color-negative)]/30 transition-colors"
                          >
                            NO
                          </button>
                        </div>
                      </div>
                      
                      {/* Below: Volume text */}
                      <div className="mt-2 ml-14">
                        <span className="text-xs text-[var(--text-muted)]">
                          Vol. {formatVolume(market.volume)}
                        </span>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-12 text-center">
              <p className="text-[var(--text-muted)]">No markets available</p>
            </div>
          )}
        </div>
        
        {/* "View more" button at bottom - always visible */}
        <div className="flex-shrink-0 border-t border-[var(--border-subtle)] bg-[var(--bg-card)] p-4">
          <Link 
            href="/markets" 
            className="block w-full text-center px-4 py-2.5 bg-[var(--accent-gold)] text-[var(--bg-primary)] font-medium rounded hover:bg-[#ff6b1a] transition-colors"
          >
            View more
          </Link>
        </div>
      </div>
    </section>
  );
}
