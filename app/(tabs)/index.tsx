import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface CounterProps {
  step?: number;
}

export default function CounterApp({ step = 1 }: CounterProps) {
  const [count, setCount] = useState<number>(0);

  const handleIncrease = () => {
    setCount(prev => prev + step);
  };

  const handleDecrease = () => {
    setCount(prev => (prev - step < 0 ? 0 : prev - step));
  };

  const handleReset = () => {
    setCount(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Guided Mini Project: Counter App</Text>
      <Text style={styles.subtitle}>
        A simple app that proves students understand state and events.
      </Text>

      <View style={styles.displayBox}>
        <Text style={styles.countText}>{count}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.increaseBtn]} onPress={handleIncrease}>
          <Text style={styles.buttonText}>Increase</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.decreaseBtn]} onPress={handleDecrease}>
          <Text style={styles.buttonText}>Decrease</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.resetBtn]} onPress={handleReset}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
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
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 12,
    color: '#94a3b8',
    marginBottom: 30,
    textAlign: 'center',
  },
  displayBox: {
    width: 220,
    height: 140,
    backgroundColor: '#0f172a',
    borderWidth: 1,
    borderColor: '#334155',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 30,
  },
  countText: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    minWidth: 85,
    alignItems: 'center',
  },
  increaseBtn: {
    backgroundColor: '#86efac',
  },
  decreaseBtn: {
    backgroundColor: '#fde047',
  },
  resetBtn: {
    backgroundColor: '#93c5fd',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0f172a',
  },
});