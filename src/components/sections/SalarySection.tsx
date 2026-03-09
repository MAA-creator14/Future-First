import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SalaryRange } from '@/types';
import { colours, fontSize, radii, spacing } from '@/constants/theme';

interface Props {
  salary: SalaryRange;
}

export function SalarySection({ salary }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>What could you earn?</Text>

      <Text style={styles.marketLabel}>🇺🇸 United States</Text>
      <View style={styles.row}>
        <SalaryBox label="Starting out" value={salary.entry_usd} colour="#A29BFE" />
        <SalaryBox label="Experienced" value={salary.experienced_usd} colour={colours.success} />
      </View>

      <Text style={[styles.marketLabel, styles.marketLabelEU]}>🇪🇺 Europe</Text>
      <View style={styles.row}>
        <SalaryBox label="Starting out" value={salary.entry_eur} colour="#A29BFE" />
        <SalaryBox label="Experienced" value={salary.experienced_eur} colour={colours.success} />
      </View>

      <Text style={styles.source}>Source: {salary.source}</Text>
    </View>
  );
}

function SalaryBox({ label, value, colour }: { label: string; value: string; colour: string }) {
  return (
    <View style={[styles.box, { borderTopColor: colour }]}>
      <Text style={styles.boxLabel}>{label}</Text>
      <Text style={[styles.boxValue, { color: colour }]}>{value}</Text>
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
    marginBottom: spacing.md,
  },
  marketLabel: {
    fontSize: fontSize.sm,
    fontWeight: '700',
    color: colours.textMuted,
    marginBottom: spacing.xs,
  },
  marketLabelEU: {
    marginTop: spacing.md,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  box: {
    flex: 1,
    backgroundColor: colours.surface,
    borderRadius: radii.md,
    borderTopWidth: 4,
    padding: spacing.md,
  },
  boxLabel: {
    fontSize: fontSize.xs,
    color: colours.textMuted,
    fontWeight: '600',
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  boxValue: {
    fontSize: fontSize.lg,
    fontWeight: '800',
    lineHeight: 24,
  },
  source: {
    fontSize: fontSize.xs,
    color: colours.textLight,
    marginTop: spacing.sm,
  },
});
