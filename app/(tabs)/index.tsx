import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SimpleCalculator() {
  const [displayValue, setDisplayValue] = useState('0');
  const [firstValue, setFirstValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForNextValue, setWaitingForNextValue] = useState(false);

  const handleNumber = (num: string) => {
    if (waitingForNextValue) {
      setDisplayValue(num);
      setWaitingForNextValue(false);
    } else {
      setDisplayValue(displayValue === '0' ? num : displayValue + num);
    }
  };

  const handleOperator = (nextOperator: string) => {
    const inputValue = parseFloat(displayValue);

    if (firstValue === null) {
      setFirstValue(inputValue);
    } else if (operator) {
      const result = calculate(firstValue, inputValue, operator);
      setDisplayValue(String(result));
      setFirstValue(result);
    }

    setWaitingForNextValue(true);
    setOperator(nextOperator);
  };

  const calculate = (first: number, second: number, op: string) => {
    switch (op) {
      case '+': return first + second;
      case '-': return first - second;
      case '×': return first * second;
      case '÷': return second === 0 ? 0 : first / second;
      default: return second;
    }
  };

  const handleEqual = () => {
    const inputValue = parseFloat(displayValue);

    if (firstValue !== null && operator) {
      const result = calculate(firstValue, inputValue, operator);
      setDisplayValue(String(result));
      setFirstValue(null);
      setOperator(null);
      setWaitingForNextValue(true);
    }
  };

  const handleClear = () => {
    setDisplayValue('0');
    setFirstValue(null);
    setOperator(null);
    setWaitingForNextValue(false);
  };

  return (
    <View style={styles.container}>
      {/* Screen Display */}
      <View style={styles.displayContainer}>
        <Text style={styles.subDisplayText}>
          {firstValue !== null ? `${firstValue} ${operator || ''}` : ''}
        </Text>
        <Text style={styles.displayText} numberOfLines={1} adjustsFontSizeToFit>
          {displayValue}
        </Text>
      </View>

      {/* Keypad Grid */}
      <View style={styles.keypad}>
        <View style={styles.row}>
          <TouchableOpacity style={[styles.button, styles.clearBtn]} onPress={handleClear}>
            <Text style={[styles.buttonText, styles.clearBtnText]}>AC</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.operatorBtn]} onPress={() => handleOperator('÷')}>
            <Text style={styles.operatorText}>÷</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => handleNumber('7')}>
            <Text style={styles.buttonText}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleNumber('8')}>
            <Text style={styles.buttonText}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleNumber('9')}>
            <Text style={styles.buttonText}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.operatorBtn]} onPress={() => handleOperator('×')}>
            <Text style={styles.operatorText}>×</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => handleNumber('4')}>
            <Text style={styles.buttonText}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleNumber('5')}>
            <Text style={styles.buttonText}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleNumber('6')}>
            <Text style={styles.buttonText}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.operatorBtn]} onPress={() => handleOperator('-')}>
            <Text style={styles.operatorText}>−</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => handleNumber('1')}>
            <Text style={styles.buttonText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleNumber('2')}>
            <Text style={styles.buttonText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleNumber('3')}>
            <Text style={styles.buttonText}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.operatorBtn]} onPress={() => handleOperator('+')}>
            <Text style={styles.operatorText}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={[styles.button, styles.zeroBtn]} onPress={() => handleNumber('0')}>
            <Text style={styles.buttonText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleNumber('.')}>
            <Text style={styles.buttonText}>.</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.equalBtn]} onPress={handleEqual}>
            <Text style={styles.equalText}>=</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    justifyContent: 'flex-end',
    padding: 20,
  },
  displayContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    padding: 20,
    marginBottom: 10,
  },
  subDisplayText: {
    fontSize: 24,
    color: '#64748b',
    marginBottom: 5,
  },
  displayText: {
    fontSize: 56,
    color: '#f8fafc',
    fontWeight: '300',
  },
  keypad: {
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  button: {
    flex: 1,
    height: 70,
    backgroundColor: '#1e293b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  zeroBtn: {
    flex: 2.1,
  },
  operatorBtn: {
    backgroundColor: '#334155',
  },
  equalBtn: {
    backgroundColor: '#06b6d4',
  },
  clearBtn: {
    flex: 3.2,
    backgroundColor: '#f43f5e',
  },
  buttonText: {
    fontSize: 26,
    color: '#f8fafc',
    fontWeight: '500',
  },
  operatorText: {
    fontSize: 28,
    color: '#38bdf8',
    fontWeight: '600',
  },
  clearBtnText: {
    fontWeight: 'bold',
  },
  equalText: {
    fontSize: 32,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});