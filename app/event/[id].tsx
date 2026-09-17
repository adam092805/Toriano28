import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { INITIAL_EVENTS } from '../../constants/mockData';

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const eventData = INITIAL_EVENTS.find((e) => e.id === id);
  const [isJoined, setIsJoined] = useState(eventData?.isJoined ?? false);

  if (!eventData) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorTitle}>Event Not Found</Text>
        <Text style={styles.errorSubtitle}>The requested event ID is invalid.</Text>
        <Pressable style={styles.backButton} onPress={() => router.replace('/')}>
          <Text style={styles.backText}>Go Home</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.category}>{eventData.category}</Text>
      <Text style={styles.title}>{eventData.title}</Text>
      <Text style={styles.meta}>📅 {eventData.dateTime}</Text>
      <Text style={styles.meta}>📍 {eventData.venue}</Text>

      <Text style={styles.description}>{eventData.description}</Text>

      <Pressable
        style={[styles.joinButton, isJoined && styles.leaveButton]}
        onPress={() => setIsJoined(!isJoined)}
      >
        <Text style={styles.joinText}>{isJoined ? 'Leave Event' : 'Join Event'}</Text>
      </Pressable>

      {isJoined && <Text style={styles.statusText}>✓ You are attending this event</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A', padding: 20 },
  centered: { flex: 1, backgroundColor: '#0F172A', justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#F8FAFC', marginBottom: 8 },
  category: { color: '#38BDF8', fontSize: 14, fontWeight: '600', marginBottom: 4 },
  meta: { color: '#94A3B8', fontSize: 14, marginBottom: 4 },
  description: { color: '#CBD5E1', marginTop: 16, lineHeight: 22, fontSize: 15 },
  joinButton: {
    backgroundColor: '#38BDF8',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  leaveButton: { backgroundColor: '#EF4444' },
  joinText: { color: '#0F172A', fontWeight: 'bold', fontSize: 16 },
  statusText: { color: '#22C55E', textAlign: 'center', marginTop: 12, fontSize: 13 },
  errorTitle: { color: '#EF4444', fontSize: 20, fontWeight: 'bold' },
  errorSubtitle: { color: '#94A3B8', marginTop: 8, marginBottom: 16 },
  backButton: { backgroundColor: '#38BDF8', padding: 10, borderRadius: 6 },
  backText: { color: '#0F172A', fontWeight: 'bold' },
});