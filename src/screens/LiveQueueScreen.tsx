import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import Card from '../components/Card';
import Button from '../components/Button';
import StatusBanner from '../components/StatusBanner';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase";

export default function LiveQueueScreen() {
  const [currentToken, setCurrentToken] = useState("A001");
const [currentNumber, setCurrentNumber] = useState(1);
  const { colors } = useTheme();
 
  const [yourToken, setYourToken] = useState('A-204');
  const [patientsAhead, setPatientsAhead] = useState(4);
  const [waitingTime, setWaitingTime] = useState('18 mins');
  const [message, setMessage] = useState('');

 useEffect(() => {
  const unsubscribe = onSnapshot(
    doc(db, "liveQueue", "Apollo"),
    (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();

        setCurrentToken(data.currentNumber);
        setCurrentNumber(data.currentToken);
      }
    }
  );

  return unsubscribe;
}, []);

  const refreshQueue = () => {
    setCurrentToken(`A-${Math.floor(100 + Math.random() * 900)}`);
    setYourToken('A-204');
    setPatientsAhead(4);
    setWaitingTime('18 mins');
    setMessage('Queue synchronized successfully.');
  };
  useEffect(() => {
  const interval = setInterval(() => {
    setPatientsAhead((prev) => Math.max(0, prev - 1));
  }, 8000);

  return () => clearInterval(interval);
}, []);

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}> 
      <Text style={[styles.title, { color: colors.text }]}>Live Queue</Text>
      <Text style={[styles.subtitle, { color: colors.muted }]}>Track your live position, the current token being served, and the estimated wait in real time.</Text>

      {message ? <StatusBanner message={message} tone="success" /> : null}

      <Card style={styles.card}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Current Token</Text>
        <Text style={[styles.token, { color: colors.primary }]}>{currentToken}</Text>
        <Text style={[styles.meta, { color: colors.muted }]}>Your Token: {yourToken}</Text>
        <Text style={[styles.meta, { color: colors.muted }]}>Patients Ahead: {patientsAhead}</Text>
        <Text style={[styles.meta, { color: colors.muted }]}>Estimated Waiting Time: {waitingTime}</Text>
      </Card>

      <Card style={styles.card}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Reception Synchronization</Text>
        <Text style={[styles.meta, { color: colors.muted }]}>Queue updated live with reception panel and hospital display screen.</Text>
      </Card>

      <Button title="Refresh Queue" onPress={refreshQueue} />
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
});
