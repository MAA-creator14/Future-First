import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { SwipeCardDeck, SwipeCardDeckRef } from '@/components/cards/SwipeCardDeck';
import { ProgressDots } from '@/components/ui/ProgressDots';
import { SKILL_CARDS } from '@/constants/quizCards';
import { InterestScores, SkillScores, InterestDomain, SkillDomain } from '@/types';
import { getProfile, saveProfile } from '@/storage/profile';
import { colours, fontSize, radii, spacing } from '@/constants/theme';

export default function SkillsQuizScreen() {
  const [showComplete, setShowComplete] = useState(false);
  const [currentIndex] = useState(0);
  const deckRef = useRef<SwipeCardDeckRef>(null);
  const scale = useSharedValue(0);

  const celebrateStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: scale.value,
  }));

  function handleComplete(
    _interestScores: InterestScores,
    skillScores: SkillScores,
    _liked_interests: InterestDomain[],
    liked_skills: SkillDomain[],
    _disliked_interests: InterestDomain[],
    disliked_skills: SkillDomain[]
  ) {
    const profile = getProfile();
    saveProfile({ ...profile, skillScores, liked_skills, disliked_skills });
    setShowComplete(true);
    scale.value = withSpring(1, { damping: 10, stiffness: 200 });
    setTimeout(() => {
      router.push('/goal-note');
    }, 800);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.step}>Step 2 of 3</Text>
        <Text style={styles.title}>What are you good at?</Text>
        <Text style={styles.subtitle}>Be honest — this helps us match you better</Text>
        <View style={styles.dots}>
          <ProgressDots total={SKILL_CARDS.length} current={currentIndex} />
        </View>
      </View>

      <View style={styles.deckContainer}>
        <SwipeCardDeck ref={deckRef} cards={SKILL_CARDS} onComplete={handleComplete} />
      </View>

      <View style={styles.hints}>
        <TouchableOpacity onPress={() => deckRef.current?.swipeLeft()}>
          <Text style={styles.hintText}>👈 Not really</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deckRef.current?.swipeRight()}>
          <Text style={styles.hintText}>Definitely me 👉</Text>
        </TouchableOpacity>
      </View>

      {showComplete && (
        <View style={styles.celebrateOverlay} pointerEvents="none">
          <Animated.View style={[styles.celebrateBox, celebrateStyle]}>
            <Text style={styles.celebrateEmoji}>🎉</Text>
            <Text style={styles.celebrateText}>Done!</Text>
          </Animated.View>
        </View>
      )}
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
    textAlign: 'center',
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
  celebrateOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  celebrateBox: {
    backgroundColor: colours.brand,
    borderRadius: radii.xl,
    padding: spacing.xl,
    alignItems: 'center',
    gap: spacing.sm,
  },
  celebrateEmoji: {
    fontSize: 64,
  },
  celebrateText: {
    fontSize: fontSize.xxl,
    fontWeight: '900',
    color: '#fff',
  },
});
