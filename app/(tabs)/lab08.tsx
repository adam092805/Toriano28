import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// 1. Uri ng Student type para sa TypeScript
type Student = {
  id: string;
  name: string;
  status: 'Present' | 'Absent' | null;
};

const initialStudents: Student[] = [
  { id: '1', name: 'Juan Dela Cruz', status: null },
  { id: '2', name: 'Maria Clara', status: null },
  { id: '3', name: 'Jose Rizal', status: null },
];

export default function Lab08() {
  // Explicitly type the useState as Student[]
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [presentCount, setPresentCount] = useState<number>(0);
  const [absentCount, setAbsentCount] = useState<number>(0);

  useEffect(() => {
    const present = students.filter((s) => s.status === 'Present').length;
    const absent = students.filter((s) => s.status === 'Absent').length;

    setPresentCount(present);
    setAbsentCount(absent);
  }, [students]);

  const toggleAttendance = (id: string, status: 'Present' | 'Absent') => {
    setStudents((prev) =>
      prev.map((student) => {
        if (student.id === id) {
          // Kapag pinindot uli ang kaparehong status, nag-u-undo/toggle back to null
          const newStatus = student.status === status ? null : status;
          return { ...student, status: newStatus };
        }
        return student;
      })
    );
  };

  return (
    <View style={styles.container}>
      {/* Summary Cards */}
      <View style={styles.summaryContainer}>
        <View style={[styles.card, styles.presentCard]}>
          <Text style={styles.cardTitle}>P</Text>
          <Text style={styles.cardCount}>{presentCount}</Text>
        </View>
        <View style={[styles.card, styles.absentCard]}>
          <Text style={styles.cardTitle}>A</Text>
          <Text style={styles.cardCount}>{absentCount}</Text>
        </View>
      </View>

      {/* Student List */}
      <FlatList
        data={students}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.studentRow}>
            <Text style={styles.studentName}>{item.name}</Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.btn,
                  item.status === 'Present' ? styles.btnPresentActive : styles.btnInactive,
                ]}
                onPress={() => toggleAttendance(item.id, 'Present')}
              >
                <Text
                  style={[
                    styles.btnText,
                    item.status === 'Present' && styles.btnTextActive,
                  ]}
                >
                  P
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.btn,
                  item.status === 'Absent' ? styles.btnAbsentActive : styles.btnInactive,
                ]}
                onPress={() => toggleAttendance(item.id, 'Absent')}
              >
                <Text
                  style={[
                    styles.btnText,
                    item.status === 'Absent' && styles.btnTextActive,
                  ]}
                >
                  A
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 40,
  },
  card: {
    flex: 1,
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  presentCard: {
    backgroundColor: '#e6fffa',
    borderColor: '#319795',
    borderWidth: 1,
  },
  absentCard: {
    backgroundColor: '#fff5f5',
    borderColor: '#e53e3e',
    borderWidth: 1,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  cardCount: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  studentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  studentName: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  btn: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  btnInactive: {
    backgroundColor: '#e2e8f0',
  },
  btnPresentActive: {
    backgroundColor: '#319795',
  },
  btnAbsentActive: {
    backgroundColor: '#e53e3e',
  },
  btnText: {
    color: '#000',
    fontWeight: 'bold',
  },
  btnTextActive: {
    color: '#fff',
  },
});