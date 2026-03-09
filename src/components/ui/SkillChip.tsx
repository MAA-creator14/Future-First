import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colours, fontSize, radii, spacing } from '@/constants/theme';

interface Props {
  label: string;
  highlighted?: boolean;
}

export function SkillChip({ label, highlighted = false }: Props) {
  return (
    <View
      style={[
        styles.chip,
        highlighted && styles.chipHighlighted,
      ]}
    >
      <Text style={[styles.label, highlighted && styles.labelHighlighted]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radii.full,
    borderWidth: 1.5,
    borderColor: colours.border,
    backgroundColor: colours.surface,
  },
  chipHighlighted: {
    borderColor: colours.brand,
    backgroundColor: colours.brandLight + '22',
  },
  label: {
    fontSize: fontSize.xs,
    color: colours.textMuted,
    fontWeight: '600',
  },
  labelHighlighted: {
    color: colours.brandDark,
  },
});
