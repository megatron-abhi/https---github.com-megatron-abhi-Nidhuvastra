
import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        body: ['Inter', 'sans-serif'],
        headline: ['Playfair Display', 'serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'marquee': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'heart-float': {
            '0%': { transform: 'translateY(0) scale(1)', opacity: '1' },
            '100%': { transform: 'translateY(-60px) scale(1.5)', opacity: '0' },
        },
        'fade-in-delayed': {
          '0%': { opacity: '0' },
          '50%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
         'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'package-to-truck': {
            '0%': { transform: 'translateX(0)', opacity: '1' },
            '20%': { transform: 'translateX(-60px) rotate(-20deg)', opacity: '1' },
            '40%': { transform: 'translateX(-60px) rotate(-20deg)', opacity: '0' },
            '100%': { transform: 'translateX(-60px) rotate(-20deg)', opacity: '0' },
        },
        'truck-drive': {
            '0%, 40%': { transform: 'translateX(0)' },
            '60%': { transform: 'translateX(20px)' },
            '100%': { transform: 'translateX(300px)' },
        },
        'road-lines': {
            '0%, 50%': { backgroundPosition: '0% 0' },
            '100%': { backgroundPosition: '-200% 0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in-up': 'fade-in-up 0.8s ease-out both',
        'marquee': 'marquee 25s linear infinite',
        'heart-float': 'heart-float 0.8s ease-out forwards',
        'fade-in-delayed': 'fade-in-delayed 0.8s ease-out both',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'fade-out': 'fade-out 1s ease-out forwards',
        'package-to-truck': 'package-to-truck 3s ease-in-out forwards',
        'truck-drive': 'truck-drive 3s ease-in-out forwards',
        'road-lines': 'road-lines 1.5s linear infinite forwards',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
