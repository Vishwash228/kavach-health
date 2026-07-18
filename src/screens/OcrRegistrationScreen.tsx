import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import Button from '../components/Button';
import Card from '../components/Card';
import StatusBanner from '../components/StatusBanner';

export default function OcrRegistrationScreen() {
  const { colors } = useTheme();

  const [name, setName] = useState('Aarav Sharma');
  const [dob, setDob] = useState('12/08/1997');
  const [gender, setGender] = useState('Male');
  const [address, setAddress] = useState('42, Green Park, Delhi');
  const [idNumber, setIdNumber] = useState('1234-5678-9012');
  const [consent, setConsent] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleOcr = () => {
    if (!consent) {
      setError('Please provide explicit consent before using OCR scanning.');
      setMessage('');
      return;
    }

    setError('');
    setMessage('OCR scan completed. Patient details have been prefilled for review and correction.');
  };

  const maskId = (value: string) => value.replace(/\d/g, '*');

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}> 
      <Text style={[styles.title, { color: colors.text }]}>OCR Registration</Text>
      <Text style={[styles.subtitle, { color: colors.muted }]}>Capture details with explicit consent, review the autofill, and mask sensitive identity values.</Text>

      {error ? <StatusBanner message={error} tone="error" /> : null}
      {message ? <StatusBanner message={message} tone="success" /> : null}

      <Card style={styles.card}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>OCR Capture</Text>
        <Text style={[styles.helper, { color: colors.muted }]}>This flow simulates OCR extraction from an ID document for demo purposes.</Text>
        <Button title="Run OCR Scan" onPress={handleOcr} />
        <Text style={[styles.helper, { color: colors.muted }]}>Consent: {consent ? 'Granted' : 'Not Granted'}</Text>
      </Card>

      <Card style={styles.card}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Extracted Details</Text>
        <TextInput value={name} onChangeText={setName} placeholder="Name" style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text }]} />
        <TextInput value={dob} onChangeText={setDob} placeholder="DOB / Age" style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text }]} />
        <TextInput value={gender} onChangeText={setGender} placeholder="Gender" style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text }]} />
        <TextInput value={address} onChangeText={setAddress} placeholder="Address" style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text }]} />
        <TextInput value={maskId(idNumber)} editable={false} placeholder="Masked ID" style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text }]} />
      </Card>

      <Button title="Save Review" onPress={() => setMessage('OCR-assisted registration reviewed and saved.')} />
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
    marginBottom: 8,
  },
  helper: {
    fontSize: 13,
    marginBottom: 8,
  },
  input: {
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 10,
  },
});
