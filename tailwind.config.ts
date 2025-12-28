import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Background colors
        'bg-primary': 'var(--bg-primary)',
        'bg-secondary': 'var(--bg-secondary)',
        'bg-tertiary': 'var(--bg-tertiary)',
        'bg-card': 'var(--bg-card)',
        'bg-elevated': 'var(--bg-elevated)',
        'bg-hover': 'var(--bg-hover)',
        // Text colors
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
        // Accent colors
        'accent-gold': 'var(--accent-gold)',
        'accent-purple': 'var(--accent-purple)',
        'accent-primary': 'var(--accent-primary)',
        // Status colors
        'positive': 'var(--color-positive)',
        'negative': 'var(--color-negative)',
        'neutral': 'var(--color-neutral)',
        // Border colors
        'border-subtle': 'var(--border-subtle)',
        'border-medium': 'var(--border-medium)',
        'border-strong': 'var(--border-strong)',
        'border-accent': 'var(--border-accent)',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-hero": "var(--gradient-hero)",
        "gradient-card": "var(--gradient-card)",
        "gradient-shine": "var(--gradient-shine)",
      },
      borderRadius: {
        'card': '16px',
      },
      boxShadow: {
        'glow-purple': '0 0 20px rgba(202, 172, 210, 0.3)',
        'glow-purple-lg': '0 0 40px rgba(202, 172, 210, 0.5)',
      },
    },
  },
  plugins: [],
};
export default config;
