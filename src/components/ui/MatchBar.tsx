import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colours, fontSize, radii, spacing } from '@/constants/theme';

interface Props {
  score: number; // 0–100
  showLabel?: boolean;
}

function scoreToColour(score: number): string {
  if (score >= 70) return colours.success;
  if (score >= 40) return colours.warning;
  return colours.textLight;
}

export function MatchBar({ score, showLabel = false }: Props) {
  const colour = scoreToColour(score);
  const clampedScore = Math.max(0, Math.min(100, score));

  return (
    <View style={styles.container}>
      <View style={styles.track}>
        <View
          style={[styles.fill, { width: `${clampedScore}%`, backgroundColor: colour }]}
        />
      </View>
      {showLabel && (
        <Text style={[styles.label, { color: colour }]}>{clampedScore}% match</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  track: {
    flex: 1,
    height: 6,
    borderRadius: radii.full,
    backgroundColor: colours.border,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: radii.full,
  },
  label: {
    fontSize: fontSize.xs,
    fontWeight: '700',
    minWidth: 60,
  },
});
