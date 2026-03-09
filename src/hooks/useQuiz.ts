import { useState, useCallback } from 'react';
import {
  QuizCard,
  InterestDomain,
  SkillDomain,
  InterestScores,
  SkillScores,
} from '@/types';

interface QuizState {
  currentIndex: number;
  interestScores: InterestScores;
  skillScores: SkillScores;
  liked_interests: InterestDomain[];
  liked_skills: SkillDomain[];
  disliked_interests: InterestDomain[];
  disliked_skills: SkillDomain[];
  isComplete: boolean;
}

interface UseQuizReturn {
  currentCard: QuizCard | null;
  currentIndex: number;
  totalCards: number;
  interestScores: InterestScores;
  skillScores: SkillScores;
  liked_interests: InterestDomain[];
  liked_skills: SkillDomain[];
  disliked_interests: InterestDomain[];
  disliked_skills: SkillDomain[];
  isComplete: boolean;
  onSwipeRight: () => void;
  onSwipeLeft: () => void;
}

const MAX_SCORE = 10;
const SWIPE_RIGHT_INCREMENT = 2;

export function useQuiz(cards: QuizCard[]): UseQuizReturn {
  const [state, setState] = useState<QuizState>({
    currentIndex: 0,
    interestScores: {},
    skillScores: {},
    liked_interests: [],
    liked_skills: [],
    disliked_interests: [],
    disliked_skills: [],
    isComplete: false,
  });

  const advance = useCallback(
    (swipedRight: boolean) => {
      setState((prev) => {
        const card = cards[prev.currentIndex];
        if (!card) return prev;

        let newInterest = { ...prev.interestScores };
        let newSkill = { ...prev.skillScores };
        let liked_interests = [...prev.liked_interests];
        let liked_skills = [...prev.liked_skills];
        let disliked_interests = [...prev.disliked_interests];
        let disliked_skills = [...prev.disliked_skills];

        if (card.type === 'interest') {
          const cat = card.category as InterestDomain;
          if (swipedRight) {
            newInterest[cat] = Math.min(
              (newInterest[cat] ?? 0) + SWIPE_RIGHT_INCREMENT,
              MAX_SCORE
            );
            if (!liked_interests.includes(cat)) liked_interests.push(cat);
          } else {
            if (!disliked_interests.includes(cat)) disliked_interests.push(cat);
          }
        } else {
          const cat = card.category as SkillDomain;
          if (swipedRight) {
            newSkill[cat] = Math.min(
              (newSkill[cat] ?? 0) + SWIPE_RIGHT_INCREMENT,
              MAX_SCORE
            );
            if (!liked_skills.includes(cat)) liked_skills.push(cat);
          } else {
            if (!disliked_skills.includes(cat)) disliked_skills.push(cat);
          }
        }

        const nextIndex = prev.currentIndex + 1;
        return {
          currentIndex: nextIndex,
          interestScores: newInterest,
          skillScores: newSkill,
          liked_interests,
          liked_skills,
          disliked_interests,
          disliked_skills,
          isComplete: nextIndex >= cards.length,
        };
      });
    },
    [cards]
  );

  const onSwipeRight = useCallback(() => advance(true), [advance]);
  const onSwipeLeft = useCallback(() => advance(false), [advance]);

  const currentCard = cards[state.currentIndex] ?? null;

  return {
    currentCard,
    currentIndex: state.currentIndex,
    totalCards: cards.length,
    interestScores: state.interestScores,
    skillScores: state.skillScores,
    liked_interests: state.liked_interests,
    liked_skills: state.liked_skills,
    disliked_interests: state.disliked_interests,
    disliked_skills: state.disliked_skills,
    isComplete: state.isComplete,
    onSwipeRight,
    onSwipeLeft,
  };
}
