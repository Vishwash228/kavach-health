import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import Card from '../components/Card';
import Button from '../components/Button';
import StatusBanner from '../components/StatusBanner';

export default function EmergencyScreen() {
  const { colors } = useTheme();
  const [message, setMessage] = useState('');

  const triggerEmergency = () => {
    setMessage('Emergency support request initiated. Please contact local emergency services immediately if symptoms are severe.');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}> 
      <Text style={[styles.title, { color: colors.text }]}>Emergency Support</Text>
      <Text style={[styles.subtitle, { color: colors.muted }]}>Quick access to urgent care steps, guidance, and escalation actions during critical moments.</Text>

      {message ?<StatusBanner message={message} tone="info" /> : null}

      <Card style={styles.card}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Immediate Actions</Text>
        <Text style={[styles.item, { color: colors.muted }]}>• Call emergency services if there is chest pain, severe breathing trouble, loss of consciousness, or heavy bleeding.</Text>
        <Text style={[styles.item, { color: colors.muted }]}>• Move the patient to a safe area and keep them calm.</Text>
        <Text style={[styles.item, { color: colors.muted }]}>• Share location, symptoms, and medical history with responders.</Text>
      </Card>

      <Card style={styles.card}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Rapid Escalation</Text>
        <Text style={[styles.item, { color: colors.muted }]}>The app can alert nearby emergency support and guide dispatch with your reported condition.</Text>
      </Card>

      <Button title="Trigger Emergency Support" onPress={triggerEmergency} />
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
  item: {
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 6,
  },
});
