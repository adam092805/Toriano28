import { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

import { EventCard } from '@/components/EventCard';
import { INITIAL_EVENTS } from '@/constants/mockData';

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = INITIAL_EVENTS.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Search Events</Text>
      
      <TextInput
        style={styles.searchInput}
        placeholder="Search by title or category..."
        placeholderTextColor="#94A3B8"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EventCard event={item} onPress={() => {}} />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No events found.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A', padding: 16 },
  header: { fontSize: 24, fontWeight: 'bold', color: '#F8FAFC', marginBottom: 12 },
  searchInput: {
    backgroundColor: '#1E293B',
    color: '#F8FAFC',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 14,
  },
  listContent: { paddingBottom: 16 },
  emptyText: { color: '#94A3B8', textAlign: 'center', marginTop: 20 },
});
