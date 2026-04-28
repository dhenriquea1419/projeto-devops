import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useRouter, useSegments } from 'expo-router';
import { useAuth } from '../hooks/AuthContext';

export default function RootLayout() {
  const segments = useSegments();
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    const inAuthGroup = segments[0] === '(tabs)';

    if (!user && inAuthGroup) {
      requestAnimationFrame(() => {
        router.replace('/login');
      });
    } else if (user && !inAuthGroup) {
      requestAnimationFrame(() => {
        router.replace('/(tabs)');
      });
    }
  }, [user, segments, router]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
    </Stack>
  );
}