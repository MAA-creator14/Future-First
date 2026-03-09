import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { SwipeCardDeck } from '@/components/cards/SwipeCardDeck';
import { ProgressDots } from '@/components/ui/ProgressDots';
import { INTEREST_CARDS } from '@/constants/quizCards';
import { InterestScores, SkillScores, InterestDomain, SkillDomain } from '@/types';
import { getProfile, saveProfile } from '@/storage/profile';
import { colours, fontSize, spacing } from '@/constants/theme';

export default function InterestQuizScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);

  function handleComplete(
    interestScores: InterestScores,
    _skillScores: SkillScores,
    liked_interests: InterestDomain[],
    _liked_skills: SkillDomain[],
    disliked_interests: InterestDomain[],
    _disliked_skills: SkillDomain[]
  ) {
    const profile = getProfile();
    saveProfile({ ...profile, interestScores, liked_interests, disliked_interests });
    router.push('/skills-quiz');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.step}>Step 1 of 3</Text>
        <Text style={styles.title}>What are you into?</Text>
        <Text style={styles.subtitle}>Swipe right if it sounds like you</Text>
        <View style={styles.dots}>
          <ProgressDots total={INTEREST_CARDS.length} current={currentIndex} />
        </View>
      </View>

      <View style={styles.deckContainer}>
        <SwipeCardDeck
          cards={INTEREST_CARDS}
          onComplete={handleComplete}
        />
      </View>

      <View style={styles.hints}>
        <Text style={styles.hintText}>👈 Not me</Text>
        <Text style={styles.hintText}>That's me 👉</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.bg,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    paddingTop: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
    gap: spacing.xs,
  },
  step: {
    fontSize: fontSize.xs,
    color: colours.brand,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: '900',
    color: colours.text,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: fontSize.sm,
    color: colours.textMuted,
  },
  dots: {
    marginTop: spacing.xs,
  },
  deckContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hints: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
  },
  hintText: {
    fontSize: fontSize.sm,
    color: colours.textMuted,
    fontWeight: '600',
  },
});
