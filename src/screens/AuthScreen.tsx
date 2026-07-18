import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import InputField from '../components/InputField';
import Button from '../components/Button';
import StatusBanner from '../components/StatusBanner';
import { authService } from '../services/auth';

type AuthScreenProps = {
  onSuccess: () => void;
};

type Mode = 'login' | 'signup' | 'otp' | 'forgot';

export default function AuthScreen({ onSuccess }: AuthScreenProps) {
  const { colors } = useTheme();
  const [mode, setMode] = useState<Mode>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    try {
      setLoading(true);
      setError('');
      setMessage('');

      if (mode === 'login') {
        await authService.signIn(email, password);
        setMessage('Login successful. Welcome back to Kavach Health.');
        onSuccess();
      } else if (mode === 'signup') {
        await authService.signUp(name, email, password);
        setMessage('Account created. You can now access your healthcare dashboard.');
        onSuccess();
      } else if (mode === 'otp') {
        await authService.verifyOtp(email, otp);
        setMessage('OTP verified. You are signed in securely.');
        onSuccess();
      } else {
        await authService.resetPassword(email, password);
        setMessage('Password reset complete. Please use your new password to sign in.');
        setMode('login');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  const requestOtp = async () => {
    try {
      setLoading(true);
      setError('');
      const code = await authService.requestOtp(email);
      setMessage(`OTP sent to ${email}. Demo code: ${code}`);
      setMode('otp');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to send OTP.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}> 
      <View style={styles.card}>
        <Text style={[styles.title, { color: colors.text }]}>{mode === 'login' ? 'Welcome Back' : mode === 'signup' ? 'Create Account' : mode === 'otp' ? 'Verify OTP' : 'Reset Password'}</Text>
        <Text style={[styles.subtitle, { color: colors.muted }]}>Secure identity and role-based access for patients, doctors, receptionists, and admins.</Text>

        {error ? <StatusBanner message={error} tone="error" /> : null}
        {message ? <StatusBanner message={message} tone="success" /> : null}

        {mode === 'signup' ? <InputField label="Full Name" placeholder="Aarav Sharma" value={name} onChangeText={setName} /> : null}
        <InputField label="Email" placeholder="you@example.com" value={email} onChangeText={setEmail} />

        {mode === 'otp' ? (
          <InputField label="OTP" placeholder="123456" value={otp} onChangeText={setOtp} />
        ) : (
          <InputField label={mode === 'forgot' ? 'New Password' : 'Password'} placeholder={mode === 'forgot' ? 'Create a new password' : 'Enter password'} value={password} onChangeText={setPassword} secureTextEntry />
        )}

        <Button title={loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : mode === 'signup' ? 'Create Account' : mode === 'otp' ? 'Verify OTP' : 'Reset Password'} onPress={mode === 'otp' ? submit : mode === 'forgot' ? submit : submit} />

        <View style={styles.row}>
          <TouchableOpacity onPress={() => setMode('login')}>
            <Text style={[styles.link, { color: colors.primary }]}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setMode('signup')}>
            <Text style={[styles.link, { color: colors.primary }]}>Signup</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setMode('forgot')}>
            <Text style={[styles.link, { color: colors.primary }]}>Forgot</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={requestOtp}>
            <Text style={[styles.link, { color: colors.accent }]}>OTP</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  card: {
    marginTop: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    marginBottom: 20,
    lineHeight: 22,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 16,
    justifyContent: 'space-between',
  },
  link: {
    fontWeight: '700',
  },
});
