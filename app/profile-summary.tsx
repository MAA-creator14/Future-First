import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { getProfile, saveProfile } from '@/storage/profile';
import { InterestDomain } from '@/types';
import { useCareers } from '@/hooks/useCareers';
import { MatchBar } from '@/components/ui/MatchBar';
import { ClusterBadge } from '@/components/ui/ClusterBadge';
import { colours, fontSize, radii, spacing, shadows } from '@/constants/theme';

const INTEREST_LABELS: Record<InterestDomain, string> = {
  technology: '💻 Technology',
  creative: '🎨 Creative',
  science: '🔬 Science',
  people: '🤝 People',
  business: '💼 Business',
  nature: '🌿 Nature',
  language: '🗺️ Language',
  health: '🏥 Health',
};

const INTEREST_COLOURS: Record<InterestDomain, string> = {
  technology: '#00B4D8',
  creative: '#FF6B9D',
  science: '#7B5EA7',
  people: '#A8DADC',
  business: '#FFB703',
  nature: '#70C95E',
  language: '#F4A261',
  health: '#06D6A0',
};

export default function ProfileSummaryScreen() {
  const profile = getProfile();
  const rankedCareers = useCareers(profile);
  const top5Careers = rankedCareers.slice(0, 5);

  const top3Interests = (Object.entries(profile.interestScores) as [InterestDomain, number][])
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  function handleSeeMatches() {
    saveProfile({ ...profile, quizCompletedAt: new Date().toISOString() });
    router.replace('/(main)/home');
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.heading}>Here's what makes you tick 🧠</Text>
        <Text style={styles.subtitle}>Based on your quiz answers</Text>

        {/* Top interests breakdown */}
        {top3Interests.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your top interests</Text>
            {top3Interests.map(([cat, score]) => (
              <View key={cat} style={styles.interestRow}>
                <Text style={styles.interestEmoji}>
                  {INTEREST_LABELS[cat].split(' ')[0]}
                </Text>
                <View style={styles.interestInfo}>
                  <Text style={styles.interestLabel}>
                    {INTEREST_LABELS[cat].split(' ').slice(1).join(' ')}
                  </Text>
                  <View style={styles.scoreBar}>
                    <View
                      style={[
                        styles.scoreFill,
                        {
                          width: `${(score / 10) * 100}%`,
                          backgroundColor: INTEREST_COLOURS[cat],
                        },
                      ]}
                    />
                  </View>
                </View>
                <Text style={styles.scoreText}>{score}/10</Text>
              </View>
            ))}
          </View>
        )}

        {/* Top matched careers */}
        {top5Careers.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your top career matches</Text>
            {top5Careers.map((career) => (
              <View key={career.id} style={styles.careerRow}>
                <Text style={styles.careerEmoji}>{career.emoji}</Text>
                <View style={styles.careerInfo}>
                  <Text style={styles.careerTitle}>{career.title}</Text>
                  <MatchBar score={career.matchScore} showLabel />
                </View>
                <ClusterBadge cluster={career.cluster} size="sm" />
              </View>
            ))}
          </View>
        )}

        <TouchableOpacity
          style={styles.ctaButton}
          onPress={handleSeeMatches}
          activeOpacity={0.85}
        >
          <Text style={styles.ctaText}>Explore your matches 🚀</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.bg,
  },
  scroll: {
    padding: spacing.xl,
    gap: spacing.lg,
  },
  heading: {
    fontSize: fontSize.xxl,
    fontWeight: '900',
    color: colours.text,
    lineHeight: 34,
  },
  subtitle: {
    fontSize: fontSize.md,
    color: colours.textMuted,
    marginTop: -spacing.sm,
  },
  section: {
    backgroundColor: colours.surface,
    borderRadius: radii.lg,
    padding: spacing.md,
    ...shadows.card,
    gap: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: '800',
    color: colours.text,
  },
  interestRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  interestEmoji: {
    fontSize: 24,
    width: 32,
  },
  interestInfo: {
    flex: 1,
    gap: 4,
  },
  interestLabel: {
    fontSize: fontSize.sm,
    fontWeight: '700',
    color: colours.text,
  },
  scoreBar: {
    height: 8,
    backgroundColor: colours.border,
    borderRadius: radii.full,
    overflow: 'hidden',
  },
  scoreFill: {
    height: '100%',
    borderRadius: radii.full,
  },
  scoreText: {
    fontSize: fontSize.sm,
    fontWeight: '700',
    color: colours.textMuted,
    minWidth: 36,
    textAlign: 'right',
  },
  careerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  careerEmoji: {
    fontSize: 28,
    width: 36,
  },
  careerInfo: {
    flex: 1,
    gap: 4,
  },
  careerTitle: {
    fontSize: fontSize.sm,
    fontWeight: '700',
    color: colours.text,
  },
  ctaButton: {
    backgroundColor: colours.brand,
    borderRadius: radii.xl,
    paddingVertical: spacing.md + 4,
    alignItems: 'center',
    ...shadows.cardLift,
    marginTop: spacing.sm,
  },
  ctaText: {
    fontSize: fontSize.lg,
    fontWeight: '900',
    color: '#fff',
  },
});
