import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colours, fontSize, radii, spacing } from '@/constants/theme';

interface Props {
  items: string[];
}

export function TryItSection({ items }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Try it now 🚀</Text>
      <Text style={styles.subheading}>Things you can do this week</Text>
      <View style={styles.list}>
        {items.map((item, i) => (
          <View key={i} style={styles.item}>
            <View style={styles.number}>
              <Text style={styles.numberText}>{i + 1}</Text>
            </View>
            <Text style={styles.text}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colours.brandLight + '18',
    marginHorizontal: spacing.lg,
    borderRadius: radii.lg,
    marginBottom: spacing.md,
  },
  heading: {
    fontSize: fontSize.xl,
    fontWeight: '800',
    color: colours.brandDark,
    marginBottom: 2,
  },
  subheading: {
    fontSize: fontSize.sm,
    color: colours.brand,
    marginBottom: spacing.md,
  },
  list: {
    gap: spacing.sm,
  },
  item: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'flex-start',
  },
  number: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colours.brand,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
    flexShrink: 0,
  },
  numberText: {
    fontSize: fontSize.xs,
    fontWeight: '800',
    color: '#fff',
  },
  text: {
    flex: 1,
    fontSize: fontSize.sm,
    color: colours.text,
    lineHeight: 20,
  },
});
