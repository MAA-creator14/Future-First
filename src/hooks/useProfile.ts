import { useState, useCallback } from 'react';
import { UserProfile } from '@/types';
import { getProfile, saveProfile } from '@/storage/profile';

export function useProfile(): [UserProfile, (updates: Partial<UserProfile>) => void] {
  const [profile, setProfile] = useState<UserProfile>(() => getProfile());

  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    setProfile((prev) => {
      const next = { ...prev, ...updates };
      saveProfile(next);
      return next;
    });
  }, []);

  return [profile, updateProfile];
}
