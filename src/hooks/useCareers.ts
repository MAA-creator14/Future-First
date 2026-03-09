import { useMemo } from 'react';
import { CareerWithScore, UserProfile } from '@/types';
import { matchScore } from '@/utils/matching';
import careersData from '@/data/careers.json';

export function useCareers(profile: UserProfile): CareerWithScore[] {
  return useMemo(() => {
    const dismissed = new Set(profile.dismissedCareerIds);
    return (careersData as CareerWithScore[])
      .filter((c) => !dismissed.has(c.id))
      .map((c) => ({ ...c, matchScore: matchScore(c, profile) }))
      .sort((a, b) => b.matchScore - a.matchScore);
  }, [profile]);
}
