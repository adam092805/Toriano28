import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
     
      <Text style={styles.appTitle}>My Student Portal</Text>

      
      <Text style={styles.studentName}>Adam Toriano</Text>

      
      <Text style={styles.courseSection}>BSIT - CCE-106</Text>

      
      <Text style={styles.appBio}>
        Welcome to my first React Native app! This project displays student profile details and custom styling using Expo.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e293b',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#38bdf8',
    marginBottom: 15,
    textTransform: 'uppercase',
  },
  studentName: {
    fontSize: 22,
    fontWeight: '600',
    color: '#f8fafc',
    marginBottom: 5,
  },
  courseSection: {
    fontSize: 16,
    color: '#94a3b8',
    fontStyle: 'italic',
    marginBottom: 20,
  },
  appBio: {
    fontSize: 14,
    color: '#e2e8f0',
    textAlign: 'center',
    lineHeight: 22,
    backgroundColor: '#334155',
    padding: 15,
    borderRadius: 8,
  },
});