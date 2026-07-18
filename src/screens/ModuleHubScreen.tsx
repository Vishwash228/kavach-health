import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import Card from '../components/Card';
import Button from '../components/Button';

type ModuleHubScreenProps = {
  onBack: () => void;
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
};

const modules = [
  { title: 'Marketplace', description: 'Browse hospitals and services.', action: 'openMarketplace' },
  { title: 'Doctors', description: 'Discover doctors and specialists.', action: 'openDoctors' },
  { title: 'Registration', description: 'Complete patient registration.', action: 'openRegistration' },
  { title: 'OCR Register', description: 'Use assisted registration.', action: 'openOcr' },
  { title: 'Book Appointment', description: 'Schedule a visit.', action: 'openBooking' },
  { title: 'Digital Token', description: 'Generate your queue slip.', action: 'openToken' },
  { title: 'Live Queue', description: 'Track current queue status.', action: 'openQueue' },
  { title: 'Reception Desk', description: 'Monitor front-desk queue flow.', action: 'openReception' },
  { title: 'Doctor Dashboard', description: 'Update appointment progress.', action: 'openDoctorDashboard' },
  { title: 'Hospital Admin', description: 'View ward capacity and demand.', action: 'openHospitalAdmin' },
  { title: 'Partner Portal', description: 'Coordinate partners and referrals.', action: 'openPartner' },
  { title: 'Super Admin', description: 'Monitor governance and metrics.', action: 'openSuperAdmin' },
  { title: 'Health Records', description: 'Review medical history.', action: 'openRecords' },
  { title: 'Payments', description: 'Check invoices and payments.', action: 'openPayments' },
  { title: 'AI Assistant', description: 'Ask for support guidance.', action: 'openAi' },
  { title: 'Emergency', description: 'Use urgent-care instructions.', action: 'openEmergency' },
  { title: 'Deployment', description: 'Review release readiness.', action: 'openDeployment' },
];

export default function ModuleHubScreen(props: ModuleHubScreenProps) {
  const { colors } = useTheme();

  const actions: Record<string, () => void> = {
    openMarketplace: props.onOpenMarketplace,
    openDoctors: props.onOpenDoctors,
    openRegistration: props.onOpenRegistration,
    openOcr: props.onOpenOcr,
    openBooking: props.onOpenBooking,
    openToken: props.onOpenToken,
    openQueue: props.onOpenQueue,
    openReception: props.onOpenReception,
    openDoctorDashboard: props.onOpenDoctorDashboard,
    openHospitalAdmin: props.onOpenHospitalAdmin,
    openPartner: props.onOpenPartner,
    openSuperAdmin: props.onOpenSuperAdmin,
    openRecords: props.onOpenRecords,
    openPayments: props.onOpenPayments,
    openAi: props.onOpenAi,
    openEmergency: props.onOpenEmergency,
    openDeployment: props.onOpenDeployment,
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}> 
      <Text style={[styles.title, { color: colors.text }]}>Module Hub</Text>
      <Text style={[styles.subtitle, { color: colors.muted }]}>Browse every core feature of the Kavach Health experience from one place.</Text>

      <Button title="Back to Home" onPress={props.onBack} />

      {modules.map((module) => (
        <Card key={module.title} style={styles.card}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>{module.title}</Text>
          <Text style={[styles.cardText, { color: colors.muted }]}>{module.description}</Text>
          <Button title="Open" onPress={actions[module.action]} variant="secondary" />
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 14,
    lineHeight: 20,
  },
  card: {
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  cardText: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 10,
  },
});
