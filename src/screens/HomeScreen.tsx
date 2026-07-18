import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import Card from '../components/Card';
import Button from '../components/Button';
import RoleChip from '../components/RoleChip';
import { authService, AuthSession } from '../services/auth';

type HomeScreenProps = {
  onSignOut: () => void;
  onOpenMarketplace: () => void;
  onOpenDoctors: () => void;
  onOpenRegistration: () => void;
  onOpenOcr: () => void;
  onOpenBooking: () => void;
  onOpenToken: () => void;
  onOpenQueue: () => void;
  onOpenReception: () => void;
  onOpenDoctorDashboard: () => void;
  onOpenHospitalAdmin: () => void;
  onOpenPartner: () => void;
  onOpenSuperAdmin: () => void;
  onOpenRecords: () => void;
  onOpenPayments: () => void;
  onOpenAi: () => void;
  onOpenEmergency: () => void;
  onOpenDeployment: () => void;
  onOpenModuleHub: () => void;
};

export default function HomeScreen({ onSignOut, onOpenMarketplace, onOpenDoctors, onOpenRegistration, onOpenOcr, onOpenBooking, onOpenToken, onOpenQueue, onOpenReception, onOpenDoctorDashboard, onOpenHospitalAdmin, onOpenPartner, onOpenSuperAdmin, onOpenRecords, onOpenPayments, onOpenAi, onOpenEmergency, onOpenDeployment, onOpenModuleHub }: HomeScreenProps) {
  const { colors } = useTheme();
  const [session, setSession] = useState<AuthSession | null>(null);

  useEffect(() => {
    const loadSession = async () => {
      const currentSession = await authService.getSession();
      setSession(currentSession);
    };

    loadSession();
  }, []);

  const handleSignOut = async () => {
    await authService.clearSession();
    onSignOut();
  };

  const moduleButtons = [
    { title: 'Marketplace', action: onOpenMarketplace },
    { title: 'Doctors', action: onOpenDoctors },
    { title: 'Registration', action: onOpenRegistration },
    { title: 'OCR Register', action: onOpenOcr },
    { title: 'Book Appointment', action: onOpenBooking },
    { title: 'Digital Token', action: onOpenToken },
    { title: 'Live Queue', action: onOpenQueue },
    { title: 'Reception Desk', action: onOpenReception },
    { title: 'Doctor Dashboard', action: onOpenDoctorDashboard },
    { title: 'Hospital Admin', action: onOpenHospitalAdmin },
    { title: 'Partner Portal', action: onOpenPartner },
    { title: 'Super Admin', action: onOpenSuperAdmin },
    { title: 'Health Records', action: onOpenRecords },
    { title: 'Payments', action: onOpenPayments },
    { title: 'AI Assistant', action: onOpenAi },
    { title: 'Emergency', action: onOpenEmergency },
    { title: 'Deployment', action: onOpenDeployment },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}> 
      <View style={styles.header}>
        <Text style={[styles.greeting, { color: colors.text }]}>Hello, {session?.user.name ?? 'Patient'}</Text>
        <Text style={[styles.sub, { color: colors.muted }]}>Your secure healthcare workspace is ready.</Text>
        <RoleChip label={session?.user.role ?? 'patient'} />
      </View>

      <Card style={{ marginBottom: 14 }}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>Authentication Status</Text>
        <Text style={[styles.cardText, { color: colors.muted }]}>Signed in securely with session persistence and protected access.</Text>
      </Card>
      <Card style={{ marginBottom: 14 }}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>Smart OPD</Text>
        <Text style={[styles.cardText, { color: colors.muted }]}>Track queues, digital tokens, and live consultation data from one workspace.</Text>
      </Card>
      <View style={styles.actions}>
        <Button title="View Hospitals" onPress={onOpenMarketplace} />
        <Button title="Find Doctors" onPress={onOpenDoctors} variant="secondary" />
      </View>
      <View style={styles.actions}>
        <Button title="Register Patient" onPress={onOpenRegistration} variant="secondary" />
        <Button title="OCR Register" onPress={onOpenOcr} variant="secondary" />
      </View>
      <View style={styles.actions}>
        <Button title="Book Appointment" onPress={onOpenBooking} />
        <Button title="Digital Token" onPress={onOpenToken} variant="secondary" />
      </View>
      <View style={styles.actions}>
        <Button title="Live Queue" onPress={onOpenQueue} variant="secondary" />
        <Button title="Reception Desk" onPress={onOpenReception} variant="secondary" />
      </View>
      <View style={styles.actions}>
        <Button title="Doctor Dashboard" onPress={onOpenDoctorDashboard} variant="secondary" />
        <Button title="Hospital Admin" onPress={onOpenHospitalAdmin} variant="secondary" />
      </View>
      <View style={styles.actions}>
        <Button title="Partner Portal" onPress={onOpenPartner} variant="secondary" />
        <Button title="Super Admin" onPress={onOpenSuperAdmin} variant="secondary" />
      </View>
      <View style={styles.actions}>
        <Button title="Health Records" onPress={onOpenRecords} variant="secondary" />
        <Button title="Payments" onPress={onOpenPayments} variant="secondary" />
      </View>
      <View style={styles.actions}>
        <Button title="AI Assistant" onPress={onOpenAi} variant="secondary" />
        <Button title="Emergency" onPress={onOpenEmergency} variant="secondary" />
      </View>
      <View style={styles.actions}>
        <Button title="Deployment" onPress={onOpenDeployment} variant="secondary" />
        <Button title="Module Hub" onPress={onOpenModuleHub} variant="secondary" />
      </View>

      <Card style={{ marginTop: 8, marginBottom: 14 }}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>All Modules</Text>
        <Text style={[styles.cardText, { color: colors.muted }]}>Every major module is now available directly from this home screen.</Text>
        {moduleButtons.map((module) => (
          <View key={module.title} style={styles.moduleItem}>
            <Button title={module.title} onPress={module.action} variant="secondary" />
          </View>
        ))}
      </Card>

      <View style={styles.actions}>
        <Button title="Sign Out" onPress={handleSignOut} variant="secondary" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '800',
  },
  sub: {
    marginTop: 6,
    fontSize: 14,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  cardText: {
    fontSize: 14,
    lineHeight: 20,
  },
  actions: {
    gap: 12,
  },
  moduleItem: {
    marginTop: 8,
  },
});
