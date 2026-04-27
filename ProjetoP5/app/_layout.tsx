import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { AuthProvider, useAuth } from '../hooks/AuthContext';

function RootLayoutNav() {
  const { user } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === '(tabs)';

    if (!user) {
      // Sem usuário logado, sempre vai para login
      if (inAuthGroup) {
        router.replace('/login');
      }
    } else {
      // Com usuário logado, vai para tabs
      if (!inAuthGroup && segments[0] === 'login') {
        router.replace('/(tabs)');
      }
    }
  }, [user, segments]);

  return (
    <Stack screenOptions={{}}>
      <Stack.Screen 
        name="login" 
        options={{ 
          headerShown: false,
        }} 
      />
      <Stack.Screen 
        name="(tabs)" 
        options={{ 
          headerShown: false,
        }} 
      />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}