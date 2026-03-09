import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colours, fontSize, spacing } from '@/constants/theme';

interface Props {
  text: string;
}

export function WhatIsItSection({ text }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>What is it?</Text>
      <Text style={styles.body}>{text}</Text>
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
  body: {
    fontSize: fontSize.md,
    color: colours.textMuted,
    lineHeight: 24,
  },
});
