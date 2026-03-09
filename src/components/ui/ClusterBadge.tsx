import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CareerCluster } from '@/types';
import { CLUSTER_MAP } from '@/constants/clusters';
import { fontSize, radii, spacing } from '@/constants/theme';

interface Props {
  cluster: CareerCluster;
  size?: 'sm' | 'md';
}

export function ClusterBadge({ cluster, size = 'md' }: Props) {
  const meta = CLUSTER_MAP[cluster];
  if (!meta) return null;

  const isSmall = size === 'sm';

  return (
    <View
      style={[
        styles.pill,
        { backgroundColor: meta.colour },
        isSmall && styles.pillSm,
      ]}
    >
      <Text style={[styles.label, isSmall && styles.labelSm]}>
        {meta.emoji} {meta.label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xs,
    borderRadius: radii.full,
    alignSelf: 'flex-start',
  },
  pillSm: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
  },
  label: {
    color: '#fff',
    fontSize: fontSize.sm,
    fontWeight: '700',
  },
  labelSm: {
    fontSize: fontSize.xs,
  },
});
