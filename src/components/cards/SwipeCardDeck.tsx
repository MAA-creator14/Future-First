import React, { useState, useCallback, useRef, forwardRef, useImperativeHandle } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import {
  QuizCard,
  InterestDomain,
  SkillDomain,
  InterestScores,
  SkillScores,
} from '@/types';
import { SwipeCard, SwipeCardRef } from './SwipeCard';
import { spacing } from '@/constants/theme';

interface Props {
  cards: QuizCard[];
  onComplete: (
    interestScores: InterestScores,
    skillScores: SkillScores,
    liked_interests: InterestDomain[],
    liked_skills: SkillDomain[],
    disliked_interests: InterestDomain[],
    disliked_skills: SkillDomain[]
  ) => void;
}

export interface SwipeCardDeckRef {
  swipeLeft: () => void;
  swipeRight: () => void;
}

const MAX_SCORE = 10;
const SWIPE_INCREMENT = 2;
const VISIBLE_CARDS = 3;
const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const SwipeCardDeck = forwardRef<SwipeCardDeckRef, Props>(
  function SwipeCardDeck({ cards, onComplete }, ref) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Use refs to accumulate scores synchronously.
    // Calling setState inside a setState updater violates React's rules —
    // updaters must be pure and React may skip or repeat them in concurrent
    // mode. Refs give us reliable synchronous accumulation without that risk.
    const interestScoresRef = useRef<InterestScores>({});
    const skillScoresRef = useRef<SkillScores>({});
    const likedInterestsRef = useRef<InterestDomain[]>([]);
    const likedSkillsRef = useRef<SkillDomain[]>([]);
    const dislikedInterestsRef = useRef<InterestDomain[]>([]);
    const dislikedSkillsRef = useRef<SkillDomain[]>([]);

    const topCardRef = useRef<SwipeCardRef>(null);

    useImperativeHandle(ref, () => ({
      swipeLeft: () => topCardRef.current?.triggerLeft(),
      swipeRight: () => topCardRef.current?.triggerRight(),
    }));

    const handleSwipe = useCallback(
      (swipedRight: boolean) => {
        const card = cards[currentIndex];
        if (!card) return;

        if (card.type === 'interest') {
          const cat = card.category as InterestDomain;
          if (swipedRight) {
            const prev = interestScoresRef.current;
            interestScoresRef.current = {
              ...prev,
              [cat]: Math.min((prev[cat] ?? 0) + SWIPE_INCREMENT, MAX_SCORE),
            };
            if (!likedInterestsRef.current.includes(cat)) {
              likedInterestsRef.current = [...likedInterestsRef.current, cat];
            }
          } else {
            if (!dislikedInterestsRef.current.includes(cat)) {
              dislikedInterestsRef.current = [...dislikedInterestsRef.current, cat];
            }
          }
        } else {
          const cat = card.category as SkillDomain;
          if (swipedRight) {
            const prev = skillScoresRef.current;
            skillScoresRef.current = {
              ...prev,
              [cat]: Math.min((prev[cat] ?? 0) + SWIPE_INCREMENT, MAX_SCORE),
            };
            if (!likedSkillsRef.current.includes(cat)) {
              likedSkillsRef.current = [...likedSkillsRef.current, cat];
            }
          } else {
            if (!dislikedSkillsRef.current.includes(cat)) {
              dislikedSkillsRef.current = [...dislikedSkillsRef.current, cat];
            }
          }
        }

        const nextIndex = currentIndex + 1;
        if (nextIndex >= cards.length) {
          onComplete(
            interestScoresRef.current,
            skillScoresRef.current,
            likedInterestsRef.current,
            likedSkillsRef.current,
            dislikedInterestsRef.current,
            dislikedSkillsRef.current
          );
        }
        setCurrentIndex(nextIndex);
      },
      [currentIndex, cards, onComplete]
    );

    const visibleCards = cards.slice(currentIndex, currentIndex + VISIBLE_CARDS).reverse();

    return (
      <View style={styles.deck}>
        {visibleCards.map((card, i) => {
          const reverseIndex = visibleCards.length - 1 - i;
          const isTop = reverseIndex === 0;
          return (
            <SwipeCard
              key={card.id}
              ref={isTop ? topCardRef : undefined}
              card={card}
              isTop={isTop}
              stackIndex={reverseIndex}
              onSwipeLeft={() => handleSwipe(false)}
              onSwipeRight={() => handleSwipe(true)}
            />
          );
        })}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  deck: {
    width: SCREEN_WIDTH - spacing.lg * 2,
    height: 420,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
