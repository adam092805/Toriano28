import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import { StatCard } from '@/components/StatCard';
import { INITIAL_EVENTS } from '@/constants/mockData';

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const isWide = width > 500;

  const totalEvents = INITIAL_EVENTS.length;
  const joinedEvents = INITIAL_EVENTS.filter((e) => e.isJoined).length;
  const upcomingEvents = INITIAL_EVENTS.length;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.welcome}>Welcome back, Alex 👋</Text>
      <Text style={styles.subtitle}>Campus Event Explorer Dashboard</Text>

      <View style={[styles.statsContainer, { flexDirection: isWide ? 'row' : 'column' }]}>
        <StatCard label="Total Events" value={totalEvents} />
        <StatCard label="Joined Events" value={joinedEvents} />
        <StatCard label="Upcoming" value={upcomingEvents} />
      </View>

      <View style={styles.actionContainer}>
        <Link href={"/events" as any} style={styles.linkButton}>
  Browse All Events →
</Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  content: { padding: 16 },
  welcome: { fontSize: 24, fontWeight: 'bold', color: '#F8FAFC' },
  subtitle: { fontSize: 14, color: '#94A3B8', marginBottom: 20 },
  statsContainer: { gap: 8, marginBottom: 24 },
  actionContainer: { marginTop: 10, alignItems: 'center' },
  linkButton: {
    color: '#38BDF8',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 12,
  },
});