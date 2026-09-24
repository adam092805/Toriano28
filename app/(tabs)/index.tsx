import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { getCurrentUser, loginUser } from '../../src/services/authService';
import { deleteToken, getToken, saveToken } from '../../src/storage/tokenStorage';

export default function HomeScreen() {
  const [username, setUsername] = useState('emilys');
  const [password, setPassword] = useState('emilyspass');
  const [showPassword, setShowPassword] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function restoreSession() {
      try {
        const storedToken = await getToken();
        if (storedToken) {
          const userProfile = await getCurrentUser(storedToken);
          setProfile(userProfile);
        }
      } catch (err) {
        await deleteToken();
        setProfile(null);
      } finally {
        setInitializing(false);
      }
    }

    restoreSession();
  }, []);

  async function handleLogin() {
    setError('');
    setLoading(true);

    try {
      const data = await loginUser(username, password);
      await saveToken(data.accessToken);
      setProfile(data);
    } catch (err: any) {
      setError(err.message || 'Login failed. Check your username and password.');
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    await deleteToken();
    setProfile(null);
    setError('');
  }

  if (initializing) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.loadingText}>Restoring session...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Top Header Navigation */}
      <View style={styles.headerNav}>
        <Text style={styles.brandTitle}>Expo Starter</Text>
        <View style={styles.navLinks}>
          <Text style={[styles.navLink, styles.activeNavLink]}>Home</Text>
          <Text style={styles.navLink}>Explore</Text>
          <Text style={styles.navLink}>Docs 🔗</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.mainContainer}>
          {profile ? (
            /* Authenticated Profile View */
            <View style={styles.cardFrame}>
              <View style={styles.profileBox}>
                {profile.image ? (
                  <Image source={{ uri: profile.image }} style={styles.avatar} />
                ) : (
                  <View style={[styles.avatar, styles.placeholderAvatar]}>
                    <Text style={styles.avatarText}>{profile.firstName?.[0]}</Text>
                  </View>
                )}

                <Text style={styles.title}>{profile.firstName} {profile.lastName}</Text>
                <Text style={styles.subtitle}>@{profile.username}</Text>

                <View style={styles.infoBox}>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>User ID</Text>
                    <Text style={styles.infoValue}>{profile.id}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Email</Text>
                    <Text style={styles.infoValue}>{profile.email}</Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={[styles.button, styles.logoutButton]}
                  onPress={handleLogout}
                >
                  <Text style={styles.buttonText}>Log out</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            /* Styled Login Card Box Frame */
            <View style={styles.cardFrame}>
              
              {/* Badge Icon 'S' */}
              <View style={styles.badgeIcon}>
                <Text style={styles.badgeText}>S</Text>
              </View>

              {/* Sub-header */}
              <Text style={styles.badgeSubHeader}>PRIVATE BY DESIGN</Text>

              {/* Title & Subtitle */}
              <Text style={styles.title}>Secure Profile</Text>
              <Text style={styles.subtitle}>
                Sign in to access your personal profile.
              </Text>

              {/* Error Message */}
              {error ? <Text style={styles.errorText}>{error}</Text> : null}

              {/* Username Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Username</Text>
                <TextInput
                  style={styles.input}
                  value={username}
                  onChangeText={setUsername}
                  placeholder="Enter username"
                  autoCapitalize="none"
                />
              </View>

              {/* Password Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.passwordWrapper}>
                  <TextInput
                    style={styles.passwordInput}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Enter your password"
                    placeholderTextColor="#9CA3AF"
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Text style={styles.showText}>
                      {showPassword ? 'Hide' : 'Show'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Log in Button with Vibrant/Clear Blue Color */}
              <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleLogin}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.buttonText}>Log in</Text>
                )}
              </TouchableOpacity>

              {/* Security Footer Note */}
              <Text style={styles.footerNote}>
                Your credentials are sent secure and never displayed.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F5F9', // Subtle background color para umangat ang card
  },
  headerNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#F1F5F9',
  },
  brandTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  navLinks: {
    flexDirection: 'row',
    gap: 20,
  },
  navLink: {
    fontSize: 14,
    color: '#64748B',
  },
  activeNavLink: {
    color: '#0F172A',
    fontWeight: '600',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 30,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 15,
    color: '#64748B',
  },
  mainContainer: {
    width: '100%',
    maxWidth: 420,
  },
  /* Magandang Card Frame Box */
  cardFrame: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 28,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    // Shadow for iOS/Web
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    // Elevation for Android
    elevation: 3,
  },
  badgeIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  badgeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2563EB',
  },
  badgeSubHeader: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2563EB',
    letterSpacing: 1.1,
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 26,
  },
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 15,
    backgroundColor: '#FFFFFF',
    color: '#0F172A',
  },
  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  passwordInput: {
    flex: 1,
    fontSize: 15,
    color: '#0F172A',
  },
  showText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2563EB',
  },
  /* Solid, Malinaw at Vibrant na Blue Button */
  button: {
    height: 48,
    backgroundColor: '#2563EB', // Solid vibrant blue color
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#93C5FD',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerNote: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    color: '#DC2626',
    backgroundColor: '#FEE2E2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 14,
    textAlign: 'center',
  },
  profileBox: {
    width: '100%',
    alignItems: 'center',
  },
  avatar: {
    width: 86,
    height: 86,
    borderRadius: 43,
    marginBottom: 12,
  },
  placeholderAvatar: {
    backgroundColor: '#DBEAFE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 34,
    color: '#2563EB',
    fontWeight: 'bold',
  },
  infoBox: {
    width: '100%',
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 16,
    marginVertical: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  infoRow: {
    paddingVertical: 6,
  },
  infoLabel: {
    fontSize: 12,
    color: '#64748B',
    textTransform: 'uppercase',
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0F172A',
    marginTop: 2,
  },
  logoutButton: {
    backgroundColor: '#EF4444',
    width: '100%',
  },
});