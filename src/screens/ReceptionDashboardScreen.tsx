import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import Card from '../components/Card';
import Button from '../components/Button';
import StatusBanner from '../components/StatusBanner';

type PatientItem = {
  token: string;
  name: string;
  status: 'Waiting' | 'Checked In' | 'In Consultation';
  eta: string;
};

export default function ReceptionDashboardScreen() {
  const { colors } = useTheme();
  const [message, setMessage] = useState('');
  const [patients, setPatients] = useState<PatientItem[]>([
    { token: 'A-204', name: 'Aarav Sharma', status: 'Waiting', eta: '18 mins' },
    { token: 'A-205', name: 'Neha Rao', status: 'Checked In', eta: '10 mins' },
    { token: 'A-206', name: 'Kiran Patel', status: 'In Consultation', eta: 'Now' },
  ]);

  const summary = useMemo(() => ({
    waiting: patients.filter((item) => item.status === 'Waiting').length,
    checkedIn: patients.filter((item) => item.status === 'Checked In').length,
    consult: patients.filter((item) => item.status === 'In Consultation').length,
  }), [patients]);

  const advancePatient = (token: string) => {
    setPatients((current) =>
      current.map((patient) => {
        if (patient.token !== token) return patient;
        if (patient.status === 'Waiting') {
          return { ...patient, status: 'Checked In', eta: '10 mins' };
        }
        if (patient.status === 'Checked In') {
          return { ...patient, status: 'In Consultation', eta: 'Now' };
        }
        return patient;
      })
    );
    setMessage(`Updated ${token} to the next stage.`);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}> 
      <Text style={[styles.title, { color: colors.text }]}>Reception Dashboard</Text>
      <Text style={[styles.subtitle, { color: colors.muted }]}>Monitor arrivals, queue health, and patient progress from the front desk.</Text>

      {message ? <StatusBanner message={message} tone="success" /> : null}

      <Card style={styles.card}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Queue Snapshot</Text>
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={[styles.statValue, { color: colors.primary }]}>{summary.waiting}</Text>
            <Text style={[styles.statLabel, { color: colors.muted }]}>Waiting</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={[styles.statValue, { color: colors.primary }]}>{summary.checkedIn}</Text>
            <Text style={[styles.statLabel, { color: colors.muted }]}>Checked In</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={[styles.statValue, { color: colors.primary }]}>{summary.consult}</Text>
            <Text style={[styles.statLabel, { color: colors.muted }]}>In Consultation</Text>
          </View>
        </View>
      </Card>

      <Card style={styles.card}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Live Patient List</Text>
        {patients.map((patient) => (
          <View key={patient.token} style={styles.patientRow}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.patientName, { color: colors.text }]}>{patient.name}</Text>
              <Text style={[styles.patientMeta, { color: colors.muted }]}>Token {patient.token} • {patient.status} • ETA {patient.eta}</Text>
            </View>
            <Button title="Advance" onPress={() => advancePatient(patient.token)} variant="secondary" />
          </View>
        ))}
      </Card>
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  statBox: {
    flex: 1,
    padding: 10,
    borderRadius: 12,
    backgroundColor: '#f7f9fc',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  patientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#eef2f7',
  },
  patientName: {
    fontSize: 15,
    fontWeight: '700',
  },
  patientMeta: {
    fontSize: 12,
    marginTop: 2,
  },
});
