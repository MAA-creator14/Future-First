import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteIn } from '@/types';
import { colours, fontSize, radii, spacing, shadows } from '@/constants/theme';

interface Props {
  routes: RouteIn[];
}

export function RoutesInSection({ routes }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>How to get there</Text>
      <Text style={styles.subheading}>Routes in Europe and the US</Text>
      <View style={styles.routes}>
        {routes.map((route, i) => (
          <RouteCard key={i} route={route} />
        ))}
      </View>
    </View>
  );
}

function RouteCard({ route }: { route: RouteIn }) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.label}>{route.label}</Text>
        <Text style={styles.years}>{route.years}</Text>
      </View>
      <Text style={styles.description}>{route.description}</Text>
      {route.typical_subjects && (
        <Text style={styles.subjects}>
          📚 {route.typical_subjects.join(', ')}
        </Text>
      )}
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
    marginBottom: 2,
  },
  subheading: {
    fontSize: fontSize.sm,
    color: colours.textMuted,
    marginBottom: spacing.md,
  },
  routes: {
    gap: spacing.sm,
  },
  card: {
    backgroundColor: colours.surface,
    borderRadius: radii.md,
    padding: spacing.md,
    ...shadows.card,
    borderLeftWidth: 4,
    borderLeftColor: colours.brand,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  label: {
    fontSize: fontSize.md,
    fontWeight: '700',
    color: colours.text,
    flex: 1,
  },
  years: {
    fontSize: fontSize.sm,
    color: colours.brand,
    fontWeight: '700',
  },
  description: {
    fontSize: fontSize.sm,
    color: colours.textMuted,
    lineHeight: 20,
  },
  subjects: {
    fontSize: fontSize.xs,
    color: colours.textMuted,
    marginTop: spacing.xs,
  },
});
