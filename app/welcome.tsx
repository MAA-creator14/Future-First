import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colours, fontSize, radii, spacing } from '@/constants/theme';

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.heroSection}>
          <Text style={styles.heroEmoji}>🚀</Text>
          <Text style={styles.appName}>Future{'\n'}First</Text>
          <Text style={styles.tagline}>
            Find a career that actually fits who you are
          </Text>
        </View>

        <View style={styles.featureRow}>
          <FeaturePill emoji="⚡" text="5 min quiz" />
          <FeaturePill emoji="🎯" text="Personalised" />
          <FeaturePill emoji="🌍" text="EU + US" />
        </View>

        <View style={styles.bottomSection}>
          <Text style={styles.subtitle}>
            Answer a few quick questions and we'll match you with careers that suit who you are — not just what you study.
          </Text>

          <TouchableOpacity
            style={styles.ctaButton}
            onPress={() => router.push('/interest-quiz')}
            activeOpacity={0.85}
          >
            <Text style={styles.ctaText}>Let's find your future ✨</Text>
          </TouchableOpacity>

          <Text style={styles.noAccount}>
            No account needed · 100% private
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

function FeaturePill({ emoji, text }: { emoji: string; text: string }) {
  return (
    <View style={styles.pill}>
      <Text style={styles.pillEmoji}>{emoji}</Text>
      <Text style={styles.pillText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.brand,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    justifyContent: 'space-between',
    paddingTop: spacing.xxl,
    paddingBottom: spacing.lg,
  },
  heroSection: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  heroEmoji: {
    fontSize: 80,
    marginBottom: spacing.lg,
  },
  appName: {
    fontSize: fontSize.hero,
    fontWeight: '900',
    color: '#fff',
    textAlign: 'center',
    lineHeight: 42,
    marginBottom: spacing.md,
  },
  tagline: {
    fontSize: fontSize.lg,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    fontWeight: '600',
  },
  featureRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radii.full,
  },
  pillEmoji: {
    fontSize: fontSize.md,
  },
  pillText: {
    fontSize: fontSize.sm,
    color: '#fff',
    fontWeight: '700',
  },
  bottomSection: {
    gap: spacing.md,
  },
  subtitle: {
    fontSize: fontSize.md,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    lineHeight: 22,
  },
  ctaButton: {
    backgroundColor: '#fff',
    borderRadius: radii.xl,
    paddingVertical: spacing.md + 2,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  ctaText: {
    fontSize: fontSize.lg,
    fontWeight: '800',
    color: colours.brand,
  },
  noAccount: {
    fontSize: fontSize.sm,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
  },
});
