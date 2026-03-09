export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const fontSize = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 18,
  xl: 22,
  xxl: 28,
  hero: 36,
} as const;

export const radii = {
  sm: 6,
  md: 12,
  lg: 20,
  xl: 28,
  full: 999,
} as const;

export const colours = {
  brand: '#FF6B6B',      // coral-red — energetic, teen-friendly
  brandLight: '#FF9B9B',
  brandDark: '#E04040',
  accent: '#FFC947',     // warm yellow — CTAs
  bg: '#FFF9F9',         // warm white background
  surface: '#FFFFFF',
  text: '#1A1A2E',
  textMuted: '#6B6B8A',
  textLight: '#ABABC4',
  border: '#F0E8E8',
  success: '#06D6A0',
  warning: '#FFC947',
  danger: '#FF6B6B',
} as const;

export const shadows = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  cardLift: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
} as const;
