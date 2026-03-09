import { Redirect } from 'expo-router';
import { getProfile } from '@/storage/profile';

export default function Index() {
  const profile = getProfile();
  if (profile.quizCompletedAt) {
    return <Redirect href="/(main)/home" />;
  }
  return <Redirect href="/welcome" />;
}
