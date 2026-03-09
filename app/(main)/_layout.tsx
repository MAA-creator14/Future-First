import { Stack } from 'expo-router';
import { colours } from '@/constants/theme';

export default function MainLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: colours.bg },
      }}
    />
  );
}
