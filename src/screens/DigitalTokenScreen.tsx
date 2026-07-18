import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import Card from '../components/Card';
import Button from '../components/Button';
import StatusBanner from '../components/StatusBanner';
import { collection, getDocs, orderBy, query, limit } from "firebase/firestore";
import { db } from "../services/firebase";
import { useEffect } from "react";

export default function DigitalTokenScreen() {
const [appointment, setAppointment] = useState<any>(null);
const [loading, setLoading] = useState(true);
  const { colors } = useTheme();
  const [tokenNumber, setTokenNumber] = useState('A-204');
  const [queueNumber, setQueueNumber] = useState('12');
  const [waitingTime, setWaitingTime] = useState('18 mins');
  const [message, setMessage] = useState('');

  const generatedSlip = useMemo(() => `Token ${tokenNumber}
Queue ${queueNumber}
Estimated Wait ${waitingTime}
Patient: Aarav Sharma`, [tokenNumber, queueNumber, waitingTime]);

  const generateToken = () => {
    setTokenNumber(`A-${Math.floor(100 + Math.random() * 900)}`);
    setQueueNumber(String(Math.floor(1 + Math.random() * 20)));
    setWaitingTime(`${Math.floor(10 + Math.random() * 30)} mins`);
    setMessage('Digital token generated successfully.');
    useEffect(() => {
  const loadLatestAppointment = async () => {
    try {
      const q = query(
        collection(db, "appointments"),
        orderBy("createdAt", "desc"),
        limit(1)
      );

      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        setAppointment(snapshot.docs[0].data());
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  loadLatestAppointment();
}, []);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}> 
      <Text style={[styles.title, { color: colors.text }]}>Digital Token</Text>
      <Text style={[styles.subtitle, { color: colors.muted }]}>Generate your queue token, review your slip, and share or print it securely.</Text>

      {message ? <StatusBanner message={message} tone="success" /> : null}
      {loading ? (
  <Text>Loading...</Text>
) : appointment ? (
  <Card style={styles.card}>
    <Text style={[styles.sectionTitle, { color: colors.text }]}>
      Latest Appointment
    </Text>

    <Text style={styles.token}>
      🎟 {appointment.tokenNumber}
    </Text>

    <Text>🏥 {appointment.hospitalName}</Text>

    <Text>👨‍⚕️ {appointment.doctorName}</Text>

    <Text>📍 Queue: {appointment.queueNumber}</Text>

    <Text>📅 {appointment.date}</Text>

    <Text>🕒 {appointment.time}</Text>

    <Text>⏳ {appointment.status}</Text>
  </Card>
) : (
  <Text>No appointment found.</Text>
)}

      <Card style={styles.card}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Your Token</Text>
        <Text style={[styles.token, { color: colors.primary }]}>{tokenNumber}</Text>
        <Text style={[styles.meta, { color: colors.muted }]}>Queue Position: {queueNumber}</Text>
        <Text style={[styles.meta, { color: colors.muted }]}>Estimated Waiting Time: {waitingTime}</Text>
      </Card>

      <Card style={styles.card}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>PDF Slip Preview</Text>
        <Text style={[styles.slip, { color: colors.text }]}>{generatedSlip}</Text>
      </Card>

      <View style={styles.actions}>
        <Button title="Generate Token" onPress={generateToken} />
        <Button title="Share Slip" onPress={() => setMessage('Slip shared successfully.')} variant="secondary" />
      </View>
      <View style={styles.actions}>
        <Button title="Print Slip" onPress={() => setMessage('Print request sent to reception.')} variant="secondary" />
      </View>
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
  token: {
    fontSize: 30,
    fontWeight: '800',
    marginBottom: 6,
  },
  meta: {
    fontSize: 14,
    marginTop: 4,
  },
  slip: {
    fontSize: 15,
    lineHeight: 22,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
});
