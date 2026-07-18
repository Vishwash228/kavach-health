import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';

import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import QRCode from 'react-native-qrcode-svg';

import { useTheme } from '../theme/ThemeContext';
import Card from '../components/Card';
import Button from '../components/Button';
import StatusBanner from '../components/StatusBanner';
type RecordItem = {
  title: string;
  date: string;
  detail: string;
  doctor: string;
  hospital: string;
  type: string;
};

export default function HealthRecordsScreen() {
  const patient = {
  name: "Vishwash",
  age: 21,
  gender: "Male",
  bloodGroup: "O+",
  patientId: "KVH-100245",
  phone: "+91 9876543210",
  doctor: "Dr. Neha Singh",
  hospital: "Kavach Super Specialty Hospital",
};
  const { colors } = useTheme();
  const [message, setMessage] = useState('');
  const [records] = useState<RecordItem[]>([
    
  {
    title: 'Blood Test Report',
    date: '2026-07-10',
    detail: 'Complete blood count and sugar test report.',
    doctor: 'Dr. Neha Singh',
    hospital: 'Kavach Super Specialty',
    type: 'Lab Report',
  },
  {
    title: 'Chest X-Ray',
    date: '2026-06-22',
    detail: 'Chest imaging report uploaded.',
    doctor: 'Dr. Rahul Verma',
    hospital: 'City Care Hospital',
    type: 'X-Ray',
  },
  {
    title: 'Prescription',
    date: '2026-07-01',
    detail: 'Medication and dosage instructions.',
    doctor: 'Dr. Priya Menon',
    hospital: 'Arogya MultiSpecialty',
    type: 'Prescription',
  },
]);
  const downloadPDF = async () => {
  const html = `
    <html>
      <body style="font-family: Arial; padding:20px;">
        <h1>Kavach Health</h1>

        <h2>Patient Health Report</h2>

        <hr/>

        <p><b>Name:</b> ${patient.name}</p>
        <p><b>Patient ID:</b> ${patient.patientId}</p>
        <p><b>Age:</b> ${patient.age}</p>
        <p><b>Gender:</b> ${patient.gender}</p>
        <p><b>Blood Group:</b> ${patient.bloodGroup}</p>

        <hr/>

        <h3>Medical History</h3>

        ${records
          .map(
            (r) => `
          <h4>${r.title}</h4>
          <p>Date: ${r.date}</p>
          <p>${r.detail}</p>
        `
          )
          .join("")}

      </body>
    </html>
  `;

  const file = await Print.printToFileAsync({
    html,
  });

  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(file.uri);
  } else {
    Alert.alert("PDF Saved", file.uri);
  }
};
  const shareRecord = () => {
    setMessage('Health records summary shared securely.');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}> 
      <Text style={[styles.title, { color: colors.text }]}>Health Records</Text>
      <Text style={[styles.subtitle, { color: colors.muted }]}>Access a secure, timeline-based view of medical history and care milestones.</Text>

      {message ? <StatusBanner message={message} tone="success" /> : null}

      <Card style={styles.card}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Patient Timeline</Text>
        {records.map((record) => (
          <View key={record.title} style={styles.recordRow}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.recordTitle, { color: colors.text }]}>{record.title}</Text>
              <Text style={[styles.recordDate, { color: colors.muted }]}>{record.date}</Text>
              <Text style={[styles.recordDetail, { color: colors.muted }]}>{record.detail}</Text>
              <Text style={[styles.recordMeta, { color: colors.primary }]}>
Category: {record.type}
</Text>

<Text style={[styles.recordMeta, { color: colors.muted }]}>
Doctor: {record.doctor}
</Text>

<Text style={[styles.recordMeta, { color: colors.muted }]}>
Hospital: {record.hospital}
</Text>

<Button
  title="View Report"
  onPress={() => setMessage(`${record.title} opened securely.`)}
  variant="secondary"
/>
            </View>
          </View>
        ))}
      </Card>

      <Button
        title="📄 Download & Share PDF"
        onPress={downloadPDF}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  recordMeta: {
  fontSize: 12,
  marginTop: 4,
  fontWeight: '600',
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
  recordRow: {
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#eef2f7',
  },
  recordTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  recordDate: {
    fontSize: 12,
    marginTop: 2,
  },
  recordDetail: {
    fontSize: 13,
    marginTop: 4,
    lineHeight: 18,
  },
});
