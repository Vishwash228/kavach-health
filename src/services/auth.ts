import AsyncStorage from '@react-native-async-storage/async-storage';

export type AuthRole = 'patient' | 'doctor' | 'receptionist' | 'hospital_admin' | 'super_admin';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: AuthRole;
}

export interface AuthSession {
  token: string;
  user: AuthUser;
  provider: 'firebase-demo' | 'jwt-demo';
  expiresAt: string;
}

const SESSION_KEY = 'kavach-health-session';
const OTP_KEY = 'kavach-health-otp';

const buildSession = (user: AuthUser): AuthSession => ({
  token: `jwt-demo-${user.id}-${Date.now()}`,
  user,
  provider: 'firebase-demo',
  expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 8).toISOString(),
});

export const authService = {
  async signIn(email: string, password: string): Promise<AuthSession> {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error('Please enter a valid email address.');
    }
    if (!password || password.length < 6) {
      throw new Error('Password must be at least 6 characters long.');
    }

    const user: AuthUser = {
      id: `patient-${Date.now()}`,
      name: email.split('@')[0],
      email,
      role: 'patient',
    };

    const session = buildSession(user);
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return session;
  },

  async signUp(name: string, email: string, password: string): Promise<AuthSession> {
    if (!name || name.trim().length < 2) {
      throw new Error('Name must be at least 2 characters long.');
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error('Please enter a valid email address.');
    }
    if (!password || password.length < 6) {
      throw new Error('Password must be at least 6 characters long.');
    }

    const user: AuthUser = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      email,
      role: 'patient',
    };

    const session = buildSession(user);
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return session;
  },

  async requestOtp(email: string): Promise<string> {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error('Please enter a valid email address.');
    }

    const otp = '123456';
    await AsyncStorage.setItem(OTP_KEY, otp);
    return otp;
  },

  async verifyOtp(email: string, otp: string): Promise<AuthSession> {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error('Please enter a valid email address.');
    }
    if (!otp) {
      throw new Error('Please enter the OTP sent to your email.');
    }

    const savedOtp = await AsyncStorage.getItem(OTP_KEY);
    if (savedOtp !== otp) {
      throw new Error('The OTP entered is invalid.');
    }

    const user: AuthUser = {
      id: `otp-${Date.now()}`,
      name: email.split('@')[0],
      email,
      role: 'patient',
    };

    const session = buildSession(user);
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return session;
  },

  async resetPassword(email: string, newPassword: string): Promise<AuthSession> {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error('Please enter a valid email address.');
    }
    if (!newPassword || newPassword.length < 6) {
      throw new Error('Password must be at least 6 characters long.');
    }

    const user: AuthUser = {
      id: `reset-${Date.now()}`,
      name: email.split('@')[0],
      email,
      role: 'patient',
    };

    const session = buildSession(user);
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return session;
  },

  async getSession(): Promise<AuthSession | null> {
    const stored = await AsyncStorage.getItem(SESSION_KEY);
    return stored ? (JSON.parse(stored) as AuthSession) : null;
  },

  async clearSession(): Promise<void> {
    await AsyncStorage.removeItem(SESSION_KEY);
    await AsyncStorage.removeItem(OTP_KEY);
  },
};
