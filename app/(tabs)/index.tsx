import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function HomeScreen() {
  const [quote, setQuote] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuote = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://dummyjson.com/quotes/random');
      if (!response.ok) {
        throw new Error('Unable to fetch quote. Please try again.');
      }
      const data = await response.json();
      setQuote(data.quote);
      setAuthor(data.author);
    } catch (err: any) {
      setError(err.message || 'Failed to connect to quote service.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Decorative ambient background accents */}
      <View style={styles.bgGlowTop} />
      <View style={styles.bgGlowBottom} />

      <View style={styles.card}>
        <Text style={styles.headerTitle}>QUOTE OF THE DAY</Text>

        <View style={styles.contentContainer}>
          {loading && (
            <ActivityIndicator size="large" color="#38ef7d" style={styles.loader} />
          )}

          {!loading && error && (
            <Text style={styles.errorText}>{error}</Text>
          )}

          {!loading && !error && (
            <>
              <Text style={styles.quoteMark}>“</Text>
              <Text style={styles.quoteText}>{quote}</Text>
              <Text style={styles.authorText}>— {author}</Text>
            </>
          )}
        </View>

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={fetchQuote}
          disabled={loading}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>
            {loading ? 'FETCHING...' : 'NEW QUOTE'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0f1d',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    position: 'relative',
    overflow: 'hidden',
  },
  // Ambient lighting effects for web polish
  bgGlowTop: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#00a8ff22',
    ...(Platform.OS === 'web' ? { filter: 'blur(80px)' } : {}),
  },
  bgGlowBottom: {
    position: 'absolute',
    bottom: -100,
    left: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#38ef7d18',
    ...(Platform.OS === 'web' ? { filter: 'blur(80px)' } : {}),
  },
  card: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    borderRadius: 24,
    padding: 36,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    ...(Platform.OS === 'web'
      ? {
          backdropFilter: 'blur(16px)',
          transition: 'all 0.3s ease',
        }
      : {}),
  },
  headerTitle: {
    color: '#38ef7d',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 2.5,
    marginBottom: 24,
    textTransform: 'uppercase',
  },
  contentContainer: {
    minHeight: 160,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
  },
  quoteMark: {
    color: '#00a8ff',
    fontSize: 48,
    lineHeight: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    opacity: 0.8,
  },
  quoteText: {
    color: '#f8fafc',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 30,
    marginBottom: 16,
    fontFamily: Platform.OS === 'web' ? 'system-ui, -apple-system, sans-serif' : undefined,
  },
  authorText: {
    color: '#94a3b8',
    fontSize: 15,
    fontWeight: '500',
    fontStyle: 'italic',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  loader: {
    marginVertical: 20,
  },
  errorText: {
    color: '#f87171',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#00a8ff',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 30,
    marginTop: 24,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#00a8ff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    ...(Platform.OS === 'web'
      ? {
          cursor: 'pointer',
          transition: 'transform 0.2s ease, background-color 0.2s ease',
        }
      : {}),
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 14,
    letterSpacing: 1.2,
  },
});