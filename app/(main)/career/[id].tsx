import React from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { useProfile } from '@/hooks/useProfile';
import { CLUSTER_MAP } from '@/constants/clusters';
import { WhatIsItSection } from '@/components/sections/WhatIsItSection';
import { DayInTheLifeSection } from '@/components/sections/DayInTheLifeSection';
import { RoutesInSection } from '@/components/sections/RoutesInSection';
import { SalarySection } from '@/components/sections/SalarySection';
import { TryItSection } from '@/components/sections/TryItSection';
import { RelatedCareersSection } from '@/components/sections/RelatedCareersSection';
import { SkillChip } from '@/components/ui/SkillChip';
import { MatchBar } from '@/components/ui/MatchBar';
import { Career, CareerWithScore } from '@/types';
import { matchScore } from '@/utils/matching';
import { colours, fontSize, radii, spacing, shadows } from '@/constants/theme';
import careersData from '@/data/careers.json';

export default function CareerScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [profile, updateProfile] = useProfile();

  const career = (careersData as Career[]).find((c) => c.id === id);
  if (!career) {
    return (
      <SafeAreaView style={styles.notFound}>
        <Text style={styles.notFoundText}>Career not found</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backLink}>← Go back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const cluster = CLUSTER_MAP[career.cluster];
  const score = matchScore(career, profile);

  const isSaved = profile.savedCareers.some((s) => s.career_id === career.id);
  const isDismissed = profile.dismissedCareerIds.includes(career.id);

  function handleSave() {
    if (isSaved) return;
    updateProfile({
      savedCareers: [
        ...profile.savedCareers,
        { career_id: career!.id, saved_at: new Date().toISOString() },
      ],
    });
  }

  function handleDismiss() {
    if (isDismissed) return;
    updateProfile({
      dismissedCareerIds: [...profile.dismissedCareerIds, career!.id],
    });
    router.back();
  }

  const relatedCareers: CareerWithScore[] = career.related_career_ids
    .map((rid) => (careersData as Career[]).find((c) => c.id === rid))
    .filter((c): c is Career => !!c && c.id !== career.id)
    .map((c) => ({ ...c, matchScore: matchScore(c, profile) }));

  const matchingInterests = career.interest_tags.filter(
    (tag) => (profile.interestScores[tag] ?? 0) >= 4
  );
  const matchingSkills = career.skill_tags.filter(
    (tag) => (profile.skillScores[tag] ?? 0) >= 4
  );

  const headerColor = career.color || cluster?.colour || colours.brand;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: headerColor }]}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerEmoji}>{career.emoji}</Text>
          <Text style={styles.headerTitle}>{career.title}</Text>
          <Text style={styles.headerOneLiner}>{career.one_liner}</Text>

          <View style={styles.headerActions}>
            <TouchableOpacity
              style={[styles.actionButton, isSaved && styles.actionButtonActive]}
              onPress={handleSave}
            >
              <Text style={styles.actionButtonText}>
                {isSaved ? '🔖 Saved' : '🔖 Save'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dismissButton}
              onPress={handleDismiss}
            >
              <Text style={styles.dismissButtonText}>✕ Not for me</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Match explanation */}
        {(matchingInterests.length > 0 || matchingSkills.length > 0) && (
          <View style={styles.matchSection}>
            <Text style={styles.matchTitle}>Why this could suit you</Text>
            <MatchBar score={score} showLabel />
            {matchingInterests.length > 0 && (
              <View style={styles.matchTags}>
                <Text style={styles.matchTagLabel}>Interests:</Text>
                <View style={styles.chips}>
                  {matchingInterests.map((t) => (
                    <SkillChip key={t} label={t} highlighted />
                  ))}
                </View>
              </View>
            )}
            {matchingSkills.length > 0 && (
              <View style={styles.matchTags}>
                <Text style={styles.matchTagLabel}>Skills:</Text>
                <View style={styles.chips}>
                  {matchingSkills.map((t) => (
                    <SkillChip key={t} label={t.replace('_', ' ')} highlighted />
                  ))}
                </View>
              </View>
            )}
          </View>
        )}

        <WhatIsItSection text={career.what_is_it} />
        <DayInTheLifeSection text={career.day_in_the_life} />
        <RoutesInSection routes={career.routes_in} />
        <SalarySection salary={career.salary} />

        {/* Skill tags */}
        <View style={styles.tagsSection}>
          <Text style={styles.tagsSectionTitle}>Skills involved</Text>
          <View style={styles.chips}>
            {career.skill_tags.map((tag) => (
              <SkillChip
                key={tag}
                label={tag.replace('_', ' ')}
                highlighted={(profile.skillScores[tag] ?? 0) >= 4}
              />
            ))}
          </View>
        </View>

        <TryItSection items={career.try_it} />
        <RelatedCareersSection careers={relatedCareers} />

        <View style={styles.bottomPad} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colours.bg,
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  notFoundText: {
    fontSize: fontSize.lg,
    color: colours.textMuted,
  },
  backLink: {
    color: colours.brand,
    fontWeight: '700',
  },
  header: {
    paddingTop: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    alignItems: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: spacing.xs,
    marginBottom: spacing.md,
  },
  backButtonText: {
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '700',
    fontSize: fontSize.md,
  },
  headerEmoji: {
    fontSize: 80,
    marginBottom: spacing.sm,
  },
  headerTitle: {
    fontSize: fontSize.xxl,
    fontWeight: '900',
    color: '#fff',
    textAlign: 'center',
  },
  headerOneLiner: {
    fontSize: fontSize.md,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    marginTop: spacing.xs,
    lineHeight: 22,
  },
  headerActions: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  actionButton: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: radii.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 2,
    borderColor: '#fff',
  },
  actionButtonActive: {
    backgroundColor: '#fff',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: fontSize.sm,
  },
  dismissButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.full,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  dismissButtonText: {
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '700',
    fontSize: fontSize.sm,
  },
  matchSection: {
    margin: spacing.lg,
    backgroundColor: colours.surface,
    borderRadius: radii.lg,
    padding: spacing.md,
    gap: spacing.sm,
    ...shadows.card,
  },
  matchTitle: {
    fontSize: fontSize.lg,
    fontWeight: '800',
    color: colours.text,
  },
  matchTags: {
    gap: spacing.xs,
  },
  matchTagLabel: {
    fontSize: fontSize.xs,
    color: colours.textMuted,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  tagsSection: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  tagsSectionTitle: {
    fontSize: fontSize.xl,
    fontWeight: '800',
    color: colours.text,
  },
  bottomPad: {
    height: spacing.xxl,
  },
});
