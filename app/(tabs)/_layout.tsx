import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Tinatagho nito ang "Dashboard" top header
      }}
    />
  );
}