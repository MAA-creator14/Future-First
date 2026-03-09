import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import {
  QuizCard,
  InterestDomain,
  SkillDomain,
  InterestScores,
  SkillScores,
} from '@/types';
import { SwipeCard } from './SwipeCard';
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

const MAX_SCORE = 10;
const SWIPE_INCREMENT = 2;
const VISIBLE_CARDS = 3;
const { width: SCREEN_WIDTH } = Dimensions.get('window');

export function SwipeCardDeck({ cards, onComplete }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [interestScores, setInterestScores] = useState<InterestScores>({});
  const [skillScores, setSkillScores] = useState<SkillScores>({});
  const [liked_interests, setLikedInterests] = useState<InterestDomain[]>([]);
  const [liked_skills, setLikedSkills] = useState<SkillDomain[]>([]);
  const [disliked_interests, setDislikedInterests] = useState<InterestDomain[]>([]);
  const [disliked_skills, setDislikedSkills] = useState<SkillDomain[]>([]);

  const handleSwipe = useCallback(
    (swipedRight: boolean) => {
      const card = cards[currentIndex];
      if (!card) return;

      if (card.type === 'interest') {
        const cat = card.category as InterestDomain;
        if (swipedRight) {
          setInterestScores((prev) => ({
            ...prev,
            [cat]: Math.min((prev[cat] ?? 0) + SWIPE_INCREMENT, MAX_SCORE),
          }));
          setLikedInterests((prev) =>
            prev.includes(cat) ? prev : [...prev, cat]
          );
        } else {
          setDislikedInterests((prev) =>
            prev.includes(cat) ? prev : [...prev, cat]
          );
        }
      } else {
        const cat = card.category as SkillDomain;
        if (swipedRight) {
          setSkillScores((prev) => ({
            ...prev,
            [cat]: Math.min((prev[cat] ?? 0) + SWIPE_INCREMENT, MAX_SCORE),
          }));
          setLikedSkills((prev) =>
            prev.includes(cat) ? prev : [...prev, cat]
          );
        } else {
          setDislikedSkills((prev) =>
            prev.includes(cat) ? prev : [...prev, cat]
          );
        }
      }

      const nextIndex = currentIndex + 1;
      if (nextIndex >= cards.length) {
        setInterestScores((latestInterest) => {
          setSkillScores((latestSkill) => {
            setLikedInterests((li) => {
              setLikedSkills((ls) => {
                setDislikedInterests((di) => {
                  setDislikedSkills((ds) => {
                    onComplete(latestInterest, latestSkill, li, ls, di, ds);
                    return ds;
                  });
                  return di;
                });
                return ls;
              });
              return li;
            });
            return latestSkill;
          });
          return latestInterest;
        });
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
        return (
          <SwipeCard
            key={card.id}
            card={card}
            isTop={reverseIndex === 0}
            stackIndex={reverseIndex}
            onSwipeLeft={() => handleSwipe(false)}
            onSwipeRight={() => handleSwipe(true)}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  deck: {
    width: SCREEN_WIDTH - spacing.lg * 2,
    height: 420,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
