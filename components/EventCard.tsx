import { Pressable, StyleSheet, Text } from 'react-native';

export function EventCard({ event, onPress }: { event: any; onPress: () => void }) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.category}>{event.category}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#1E293B', padding: 16, borderRadius: 8, marginBottom: 12 },
  title: { fontSize: 16, fontWeight: 'bold', color: '#F8FAFC' },
  category: { fontSize: 12, color: '#38BDF8', marginTop: 4 },
});