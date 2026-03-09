import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colours, fontSize, radii, spacing } from '@/constants/theme';

interface Props {
  text: string;
}

export function DayInTheLifeSection({ text }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>A day in the life</Text>
      <View style={styles.blockquote}>
        <View style={styles.bar} />
        <Text style={styles.body}>{text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  heading: {
    fontSize: fontSize.xl,
    fontWeight: '800',
    color: colours.text,
    marginBottom: spacing.sm,
  },
  blockquote: {
    flexDirection: 'row',
    backgroundColor: colours.bg,
    borderRadius: radii.md,
    padding: spacing.md,
    gap: spacing.sm,
  },
  bar: {
    width: 4,
    borderRadius: 2,
    backgroundColor: colours.brand,
  },
  body: {
    flex: 1,
    fontSize: fontSize.md,
    color: colours.textMuted,
    fontStyle: 'italic',
    lineHeight: 24,
  },
});
