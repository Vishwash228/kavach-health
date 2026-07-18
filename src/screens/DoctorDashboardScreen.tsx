import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import Card from '../components/Card';
import Button from '../components/Button';
import StatusBanner from '../components/StatusBanner';
import { nextPatient } from "../services/queueService";

type VisitItem = {
  token: string;
  name: string;
  complaint: string;
  status: 'Pending' | 'In Consultation' | 'Completed';
};

export default function DoctorDashboardScreen() {
  const { colors } = useTheme();
  const [message, setMessage] = useState('');
  const [visits, setVisits] = useState<VisitItem[]>([
    { token: 'A-204', name: 'Aarav Sharma', complaint: 'Routine checkup', status: 'In Consultation' },
    { token: 'A-205', name: 'Neha Rao', complaint: 'Fever and fatigue', status: 'Pending' },
    { token: 'A-206', name: 'Kiran Patel', complaint: 'Follow-up review', status: 'Completed' },
  ]);

  const updateVisit = (token: string) => {
    setVisits((current) =>
      current.map((visit) => {
        if (visit.token !== token) return visit;
        if (visit.status === 'Pending') {
          return { ...visit, status: 'In Consultation' };
        }
        if (visit.status === 'In Consultation') {
          return { ...visit, status: 'Completed' };
        }
        return visit;
      })
    );
    setMessage(`Appointment status updated for ${token}.`);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}> 
      <Text style={[styles.title, { color: colors.text }]}>Doctor Dashboard</Text>
      <Text style={[styles.subtitle, { color: colors.muted }]}>Review today’s patients, update case progress, and manage consult workflow.</Text>

      {message ? <StatusBanner message={message} tone="success" /> : null}

      <Card style={styles.card}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Today’s Schedule</Text>
        {visits.map((visit) => (
          <View key={visit.token} style={styles.visitRow}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.patientName, { color: colors.text }]}>{visit.name}</Text>
              <Text style={[styles.patientMeta, { color: colors.muted }]}>Token {visit.token} • {visit.complaint}</Text>
              <Text style={[styles.status, { color: colors.primary }]}>Status: {visit.status}</Text>
            </View>
            <Button title="Update" onPress={() => updateVisit(visit.token)} variant="secondary" />
              <Button
  title="Next Patient"
  onPress={nextPatient}
/>
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
  visitRow: {
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
  status: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '700',
  },
});
