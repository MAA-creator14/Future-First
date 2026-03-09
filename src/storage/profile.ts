import { UserProfile } from '@/types';
import { storage } from './mmkv';

const PROFILE_KEY = 'user_profile';

export const DEFAULT_PROFILE: UserProfile = {
  interestScores: {},
  skillScores: {},
  liked_interests: [],
  liked_skills: [],
  disliked_interests: [],
  disliked_skills: [],
  goalNote: '',
  savedCareers: [],
  dismissedCareerIds: [],
  quizCompletedAt: null,
};

export function getProfile(): UserProfile {
  const raw = storage.getString(PROFILE_KEY);
  if (!raw) return { ...DEFAULT_PROFILE };
  try {
    const parsed = JSON.parse(raw) as UserProfile;
    // Ensure liked/disliked arrays exist (backwards compat)
    return {
      ...DEFAULT_PROFILE,
      ...parsed,
      liked_interests: parsed.liked_interests ?? [],
      liked_skills: parsed.liked_skills ?? [],
      disliked_interests: parsed.disliked_interests ?? [],
      disliked_skills: parsed.disliked_skills ?? [],
    };
  } catch {
    return { ...DEFAULT_PROFILE };
  }
}

export function saveProfile(profile: UserProfile): void {
  storage.set(PROFILE_KEY, JSON.stringify(profile));
}
