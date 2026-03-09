import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { CareerWithScore } from '@/types';
import { CLUSTER_MAP } from '@/constants/clusters';
import { MatchBar } from '@/components/ui/MatchBar';
import { SkillChip } from '@/components/ui/SkillChip';
import { colours, fontSize, radii, spacing, shadows } from '@/constants/theme';

interface Props {
  career: CareerWithScore;
  compact?: boolean;
}

export function CareerCard({ career, compact = false }: Props) {
  const cluster = CLUSTER_MAP[career.cluster];
  const cardColor = career.color || cluster?.colour || colours.brand;

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: cardColor }, compact && styles.cardCompact]}
      onPress={() => router.push(`/career/${career.id}` as any)}
      activeOpacity={0.85}
    >
      <Text style={styles.emoji}>{career.emoji}</Text>
      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={1}>{career.title}</Text>
        <Text style={styles.oneLiner} numberOfLines={2}>{career.one_liner}</Text>
        <View style={styles.chips}>
          {career.interest_tags.slice(0, 2).map((tag) => (
            <SkillChip key={tag} label={tag} />
          ))}
        </View>
        <MatchBar score={career.matchScore} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 200,
    minHeight: 160,
    borderRadius: radii.lg,
    padding: spacing.md,
    marginRight: spacing.sm,
    ...shadows.card,
  },
  cardCompact: {
    width: 160,
  },
  emoji: {
    fontSize: 36,
    marginBottom: spacing.xs,
  },
  body: {
    flex: 1,
    gap: spacing.xs,
  },
  title: {
    fontSize: fontSize.md,
    fontWeight: '800',
    color: '#fff',
  },
  oneLiner: {
    fontSize: fontSize.xs,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 16,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
});
