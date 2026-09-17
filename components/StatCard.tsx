import { StyleSheet, Text, View } from 'react-native';

export function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <View style={styles.card}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#1E293B', padding: 16, borderRadius: 8, flex: 1 },
  value: { fontSize: 20, fontWeight: 'bold', color: '#F8FAFC' },
  label: { fontSize: 12, color: '#94A3B8', marginTop: 4 },
});