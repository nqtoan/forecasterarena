import Link from 'next/link';
import { GITHUB_URL } from '@/lib/constants';

export const metadata = {
  title: 'About | HYPEPREDICT',
  description: 'About HYPEPREDICT - an academic-grade benchmark for LLM forecasting capabilities.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative border-b border-[var(--border-subtle)]">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-primary)]" />
        <div className="absolute inset-0 dot-grid opacity-30" />
        <div className="glow-orb -top-40 right-0 opacity-20" />
        
        <div className="container-medium mx-auto px-6 py-14 relative z-10">
            <p className="text-[var(--accent-purple)] font-mono text-sm tracking-wider mb-3">ABOUT</p>
          <h1 className="text-4xl md:text-6xl mb-6 max-w-3xl">
            Reality as the
            <br />
            <span className="font-serif-italic">Ultimate Benchmark</span>
          </h1>
          <p className="text-xl text-[var(--text-secondary)] max-w-2xl leading-relaxed">
            An academic-grade benchmark for evaluating AI forecasting capabilities 
            using real prediction markets.
          </p>
        </div>
      </section>

      {/* Mission - Full width statement */}
      <section className="relative py-12 overflow-hidden">
        <div className="container-medium mx-auto px-6">
          <div className="max-w-3xl">
            <div className="accent-line mb-4" />
            <h2 className="text-3xl md:text-4xl mb-6">
              Traditional benchmarks fail when models memorize answers.
              <br />
              <span className="text-[var(--text-secondary)]">We test prediction, not recall.</span>
            </h2>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
              HYPEPREDICT uses real prediction markets from Polymarket. 
              Models make forecasts about future events, outcomes that cannot exist 
              in any training data because they haven&apos;t happened yet.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy - 3 column */}
      <section className="py-12 bg-[var(--bg-secondary)] relative">
        <div className="absolute inset-0 dot-grid opacity-20" />
        <div className="container-wide mx-auto px-6 relative z-10">
          <div className="mb-8">
            <p className="text-[var(--accent-purple)] font-mono text-sm tracking-wider mb-2">PHILOSOPHY</p>
            <h2 className="text-3xl">Core Principles</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-px bg-[var(--border-subtle)] rounded-2xl overflow-hidden">
            {[
              {
                num: '01',
                title: 'Rigorous Methodology',
                desc: 'Every decision documented. Every prompt stored. Every calculation reproducible. Meeting standards for academic publication.',
                accent: 'var(--accent-gold)'
              },
              {
                num: '02', 
                title: 'Fair Comparison',
                desc: 'Identical prompts, starting capital, and constraints for all models. Temperature = 0 for reproducibility. Level playing field.',
                accent: 'var(--accent-blue)'
              },
              {
                num: '03',
                title: 'Complete Transparency',
                desc: 'Open source codebase. Public methodology documentation. Anyone can verify results or build upon our work.',
                accent: 'var(--accent-violet)'
              }
            ].map((item) => (
              <div key={item.num} className="bg-[var(--bg-secondary)] p-8 md:p-10">
                <span 
                  className="font-mono text-5xl font-bold opacity-20 block mb-6"
                  style={{ color: item.accent }}
                >
                  {item.num}
                </span>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Measure - 2x3 Grid */}
      <section className="py-12">
        <div className="container-wide mx-auto px-6">
          <div className="mb-8">
            <p className="text-[var(--accent-purple)] font-mono text-sm tracking-wider mb-2">METRICS</p>
            <h2 className="text-3xl">What We Measure</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Primary metric - Brier Score */}
            <div className="card-featured p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold">Brier Score</h3>
                <span className="font-mono text-xs text-[var(--accent-purple)] px-2 py-1 bg-[var(--accent-gold-dim)] rounded">Primary</span>
              </div>
              <p className="text-[var(--text-secondary)] mb-4">
                Measures calibration: how well confidence matches accuracy.
                The gold standard for evaluating probabilistic forecasts.
              </p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-positive)]" />
                  <span>0 = Perfect</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-negative)]" />
                  <span>1 = Worst</span>
                </div>
              </div>
            </div>
            
            {/* Portfolio P/L */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-3">Portfolio P/L</h3>
              <p className="text-[var(--text-secondary)]">
                Practical value: can the model turn predictions into profitable decisions?
              </p>
            </div>
            
            {/* Win Rate */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-3">Win Rate</h3>
              <p className="text-[var(--text-secondary)]">
                Directional accuracy when markets resolve. Simple but informative.
              </p>
            </div>
            
            {/* Consistency */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-3">Consistency</h3>
              <p className="text-[var(--text-secondary)]">
                Performance across cohorts distinguishes skill from luck.
              </p>
            </div>
            
            {/* Decision Quality */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-3">Decision Quality</h3>
              <p className="text-[var(--text-secondary)]">
                Reasoning analysis: are the models making sensible arguments?
              </p>
            </div>
            
            {/* API Efficiency */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-3">API Efficiency</h3>
              <p className="text-[var(--text-secondary)]">
                Cost per decision. Some models achieve more with fewer tokens.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-10">
        <div className="container-medium mx-auto px-6">
          <div className="card p-8 md:p-10 border-l-4 border-[var(--accent-amber)]">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[rgba(251,191,36,0.15)] flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-[var(--accent-amber)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-3">Important Disclaimer</h2>
                <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                  HYPEPREDICT is an <strong className="text-[var(--text-primary)]">educational and research project</strong>. 
                  All trading is simulated (paper trading). No real money is ever at risk.
                </p>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  This is <strong className="text-[var(--text-primary)]">not financial advice</strong>. 
                  The benchmark evaluates LLM reasoning capabilities, not investment guidance. 
                  Past performance does not predict future results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
