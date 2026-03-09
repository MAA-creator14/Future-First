import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { colours, spacing } from '@/constants/theme';

interface Props {
  total: number;
  current: number;
}

export function ProgressDots({ total, current }: Props) {
  return (
    <View style={styles.container}>
      {Array.from({ length: total }).map((_, i) => (
        <Dot key={i} active={i === current} passed={i < current} />
      ))}
    </View>
  );
}

function Dot({ active, passed }: { active: boolean; passed: boolean }) {
  const style = useAnimatedStyle(() => ({
    width: withSpring(active ? 20 : 8),
    opacity: withSpring(passed ? 0.4 : active ? 1 : 0.25),
  }));

  return <Animated.View style={[styles.dot, style]} />;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: colours.brand,
  },
});
