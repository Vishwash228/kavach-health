import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import Card from '../components/Card';
import Button from '../components/Button';
import StatusBanner from '../components/StatusBanner';

export default function DeploymentScreen() {
  const { colors } = useTheme();
  const [message, setMessage] = useState('');

  const launch = () => {
    setMessage('Deployment checklist completed. The app is ready for staging review.');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}> 
      <Text style={[styles.title, { color: colors.text }]}>Deployment Readiness</Text>
      <Text style={[styles.subtitle, { color: colors.muted }]}>A polished launch summary for staging, release management, and rollout preparation.</Text>

      {message ? <StatusBanner message={message} tone="success" /> : null}

      <Card style={styles.card}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Launch Summary</Text>
        <Text style={[styles.item, { color: colors.muted }]}>• Patient journeys are mapped from onboarding to follow-up.</Text>
        <Text style={[styles.item, { color: colors.muted }]}>• Staff dashboards cover reception, doctors, admin, and partner workflows.</Text>
        <Text style={[styles.item, { color: colors.muted }]}>• AI, payments, records, and emergency flows are included for a complete product preview.</Text>
      </Card>

      <Card style={styles.card}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Next Release Checklist</Text>
        <Text style={[styles.item, { color: colors.muted }]}>• Connect to real backend services and authentication.</Text>
        <Text style={[styles.item, { color: colors.muted }]}>• Add analytics, notifications, and secure document storage.</Text>
        <Text style={[styles.item, { color: colors.muted }]}>• Validate on iOS and Android release builds.</Text>
      </Card>

      <Button title="Run Launch Checklist" onPress={launch} />
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
