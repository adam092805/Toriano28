import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { EventCard } from '@/components/EventCard';
import { INITIAL_EVENTS } from '@/constants/mockData';

const CATEGORIES = ['All', 'Academic', 'Sports', 'Social', 'Cultural'];

export default function EventsScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredEvents = INITIAL_EVENTS.filter((event) => {
    if (selectedCategory === 'All') return true;
    return event.category === selectedCategory;
  });

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        {CATEGORIES.map((category) => (
          <Pressable
            key={category}
            style={[
              styles.filterChip,
              selectedCategory === category && styles.selectedFilterChip,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.filterText,
                selectedCategory === category && styles.selectedFilterText,
              ]}
            >
              {category}
            </Text>
          </Pressable>
        ))}
      </View>

      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EventCard
            event={item}
            onPress={() => router.push(`/event/${item.id}` as any)}
          />
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  filterContainer: {
    flexDirection: 'row',
    padding: 12,
    gap: 8,
    flexWrap: 'wrap',
  },
  filterChip: {
    backgroundColor: '#1E293B',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  selectedFilterChip: { backgroundColor: '#38BDF8' },
  filterText: { color: '#94A3B8', fontSize: 12 },
  selectedFilterText: { color: '#0F172A', fontWeight: 'bold' },
  listContent: { padding: 12 },
});