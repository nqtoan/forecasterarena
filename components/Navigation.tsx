'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GITHUB_URL } from '@/lib/constants';

const navLinks = [
  { href: '/models', label: 'Models' },
  { href: '/cohorts', label: 'Weekly Arena' },
  { href: '/markets', label: 'Markets' },
  { href: '/how-it-works', label: 'How It Works' },
];

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border-subtle)]">
      {/* Blur background */}
      <div className="absolute inset-0 bg-[var(--bg-primary)]/80 backdrop-blur-xl" />
      
      <div className="container-wide mx-auto px-6 h-16 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-10">
          {/* Logo */}
          <Link 
            href="/" 
            className={`flex items-center gap-3 transition-colors ${
              pathname === '/' ? 'text-[var(--accent-purple)]' : 'hover:text-[var(--accent-purple)]'
            }`}
          >
            <img 
              src="/hypepredict-D.png" 
              alt="HYPEPREDICT" 
              className="h-8 w-auto"
            />
            <span className="font-semibold text-lg">HYPEPREDICT</span>
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link 
                key={link.href}
                href={link.href} 
                className={`nav-link ${isActive(link.href) ? 'nav-link-active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="flex items-center gap-3">
          {/* X (Twitter) button */}
          <a 
            href="https://x.com/hypepredict" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border border-[var(--border-medium)] bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)] hover:border-[var(--border-strong)] transition-all"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            <span className="hidden sm:inline"></span>
          </a>
          
          {/* Access button */}
          <Link 
            href="/access" 
            className={`px-3 py-2 text-sm font-medium rounded-lg border border-[var(--border-medium)] bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)] hover:border-[var(--border-strong)] transition-all ${isActive('/access') ? 'bg-[var(--accent-gold-dim)] border-[var(--accent-gold)]' : ''}`}
          >
            Access
          </Link>
          
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div 
        className={`md:hidden absolute top-full left-0 right-0 bg-[var(--bg-primary)]/95 backdrop-blur-xl border-b border-[var(--border-subtle)] transition-all duration-300 ${
          mobileMenuOpen 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <nav className="container-wide mx-auto px-6 py-4 flex flex-col gap-1">
          {navLinks.map(link => (
            <Link 
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-3 rounded-lg transition-colors ${
                isActive(link.href) 
                  ? 'bg-[var(--accent-gold-dim)] text-[var(--accent-purple)]' 
                  : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link 
            href="/access"
            onClick={() => setMobileMenuOpen(false)}
            className={`px-4 py-3 rounded-lg transition-colors ${
              isActive('/access') 
                ? 'bg-[var(--accent-gold-dim)] text-[var(--accent-gold)]' 
                : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]'
            }`}
          >
            Access
          </Link>
        </nav>
      </div>
    </header>
  );
}


