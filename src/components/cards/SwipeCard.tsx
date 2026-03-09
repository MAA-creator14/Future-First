import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
  runOnJS,
  Extrapolation,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { QuizCard } from '@/types';
import { radii, fontSize, spacing, shadows } from '@/constants/theme';

interface Props {
  card: QuizCard;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  isTop: boolean;
  stackIndex: number; // 0 = top, 1 = second, 2 = third
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - spacing.lg * 2;
const CARD_HEIGHT = 420;
const SWIPE_THRESHOLD = 120;

export function SwipeCard({ card, onSwipeLeft, onSwipeRight, isTop, stackIndex }: Props) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const triggerHaptic = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const gesture = Gesture.Pan()
    .enabled(isTop)
    .onUpdate((e) => {
      translateX.value = e.translationX;
      translateY.value = e.translationY * 0.3;
    })
    .onEnd((e) => {
      if (e.translationX > SWIPE_THRESHOLD) {
        runOnJS(triggerHaptic)();
        translateX.value = withTiming(SCREEN_WIDTH * 1.5, { duration: 250 }, () => {
          runOnJS(onSwipeRight)();
        });
        translateY.value = withTiming(e.translationY, { duration: 250 });
      } else if (e.translationX < -SWIPE_THRESHOLD) {
        runOnJS(triggerHaptic)();
        translateX.value = withTiming(-SCREEN_WIDTH * 1.5, { duration: 250 }, () => {
          runOnJS(onSwipeLeft)();
        });
        translateY.value = withTiming(e.translationY, { duration: 250 });
      } else {
        translateX.value = withSpring(0, { damping: 15, stiffness: 200 });
        translateY.value = withSpring(0, { damping: 15, stiffness: 200 });
      }
    });

  const cardStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translateX.value,
      [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      [-12, 0, 12],
      Extrapolation.CLAMP
    );

    const scale = interpolate(
      stackIndex,
      [0, 1, 2],
      [1, 0.95, 0.9],
      Extrapolation.CLAMP
    );

    const offsetY = stackIndex * 12;

    return {
      transform: [
        { translateX: isTop ? translateX.value : 0 },
        { translateY: isTop ? translateY.value : offsetY },
        { rotate: `${rotate}deg` },
        { scale },
      ],
    };
  });

  const yesLabelStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateX.value,
      [0, SWIPE_THRESHOLD * 0.5],
      [0, 1],
      Extrapolation.CLAMP
    ),
  }));

  const nopeLabelStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateX.value,
      [-SWIPE_THRESHOLD * 0.5, 0],
      [1, 0],
      Extrapolation.CLAMP
    ),
  }));

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.card, cardStyle, { backgroundColor: card.bgColour }]}>
        {/* YES label */}
        <Animated.View style={[styles.label, styles.yesLabel, yesLabelStyle]}>
          <Text style={styles.labelText}>👍 YES</Text>
        </Animated.View>

        {/* NOPE label */}
        <Animated.View style={[styles.label, styles.nopeLabel, nopeLabelStyle]}>
          <Text style={styles.labelText}>👎 NOPE</Text>
        </Animated.View>

        <View style={styles.content}>
          <Text style={styles.emoji}>{card.emoji}</Text>
          <Text style={styles.scenario}>{card.scenario}</Text>
          <Text style={styles.hint}>Swipe right if this sounds like you ✨</Text>
        </View>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: radii.xl,
    ...shadows.cardLift,
    justifyContent: 'center',
  },
  content: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  emoji: {
    fontSize: 72,
    marginBottom: spacing.lg,
  },
  scenario: {
    fontSize: fontSize.xl,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
    lineHeight: 30,
    marginBottom: spacing.lg,
  },
  hint: {
    fontSize: fontSize.sm,
    color: 'rgba(255,255,255,0.75)',
    textAlign: 'center',
  },
  label: {
    position: 'absolute',
    top: spacing.xl,
    padding: spacing.sm,
    borderRadius: radii.md,
    borderWidth: 3,
    borderColor: '#fff',
  },
  yesLabel: {
    left: spacing.lg,
    transform: [{ rotate: '-15deg' }],
  },
  nopeLabel: {
    right: spacing.lg,
    transform: [{ rotate: '15deg' }],
  },
  labelText: {
    fontSize: fontSize.lg,
    fontWeight: '900',
    color: '#fff',
  },
});
