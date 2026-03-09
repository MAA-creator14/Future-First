import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ClusterMeta } from '@/constants/clusters';
import { fontSize, radii, spacing, shadows } from '@/constants/theme';

interface Props {
  cluster: ClusterMeta;
  onPress?: () => void;
}

export function ClusterTile({ cluster, onPress }: Props) {
  return (
    <TouchableOpacity
      style={[styles.tile, { backgroundColor: cluster.colour }]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Text style={styles.emoji}>{cluster.emoji}</Text>
      <Text style={styles.label}>{cluster.label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: radii.lg,
    padding: spacing.md,
    justifyContent: 'flex-end',
    ...shadows.card,
    margin: spacing.xs / 2,
  },
  emoji: {
    fontSize: 32,
    marginBottom: spacing.xs,
  },
  label: {
    fontSize: fontSize.sm,
    fontWeight: '800',
    color: '#fff',
    lineHeight: 18,
  },
});
