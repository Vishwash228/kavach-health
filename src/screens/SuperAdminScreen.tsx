import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import Card from '../components/Card';
import Button from '../components/Button';
import StatusBanner from '../components/StatusBanner';

import HeaderBar from '../components/HeaderBar';
import { useEffect } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

import { db } from "../services/firebase";
type SystemMetric = {
  label: string;
  value: string;
  tone: 'success' | 'warning' | 'info';
};

type SuperAdminScreenProps = {
  onBack?: () => void;
};

export default function SuperAdminScreen({ onBack }: SuperAdminScreenProps = {}) {
  const { colors } = useTheme();
  const [message, setMessage] = useState('');
  const [partners, setPartners] = useState<any[]>([]);
const [appointments, setAppointments] = useState<any[]>([]);
useEffect(() => {
  const loadData = async () => {
    try {
      const partnerSnapshot = await getDocs(
        collection(db, "partners")
      );

      setPartners(
        partnerSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }))
      );

      const appointmentSnapshot = await getDocs(
        collection(db, "appointments")
      );

      setAppointments(
        appointmentSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  loadData();
}, []);
const approvePartner = async (id: string) => {
  try {
    await updateDoc(
      doc(db, "partners", id),
      {
        status: "Approved",
      }
    );

    setPartners(current =>
      current.map(item =>
        item.id === id
          ? { ...item, status: "Approved" }
          : item
      )
    );

    setMessage("Partner approved successfully.");
  } catch (error) {
    console.log(error);
  }
};
  const [metrics, setMetrics] = useState<SystemMetric[]>([
    { label: 'Active Hospitals', value: '24', tone: 'success' },
    { label: 'Pending Approvals', value: '6', tone: 'warning' },
    { label: 'System Uptime', value: '99.98%', tone: 'success' },
  ]);

  const summary = useMemo(() => metrics.reduce((total, metric) => total + Number(metric.value.replace(/[^0-9.]/g, '')) , 0), [metrics]);

  const refreshMetrics = () => {
    setMetrics((current) => current.map((metric, index) => {
      if (index === 0) return { ...metric, value: String(24 + Math.floor(Math.random() * 3)) };
      if (index === 1) return { ...metric, value: String(6 + Math.floor(Math.random() * 2)) };
      return { ...metric, value: '99.98%' };
    }));
    setMessage('Admin metrics refreshed.');
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <HeaderBar title="Super Admin Console" onBack={onBack} subtitle="Platform governance & operations" />
      <ScrollView style={[styles.container, { backgroundColor: colors.background }]}> 
      <Text style={[styles.title, { color: colors.text }]}>Super Admin Console</Text>
      <Text style={[styles.subtitle, { color: colors.muted }]}>Monitor platform health, governance, and strategic operations from one control tower.</Text>

      {message ? <StatusBanner message={message} tone="success" /> : null}

      <Card style={styles.card}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Platform Overview</Text>
        <Text style={[styles.meta, { color: colors.primary }]}>Composite Score: {summary.toFixed(2)}</Text>
        <Text style={[styles.meta, { color: colors.muted }]}>Governance controls are active across connected partners.</Text>
      </Card>
      <Card style={styles.card}>
  <Text style={styles.sectionTitle}>
    📊 System Statistics
  </Text>

  <Text>🏥 Hospitals : {partners.length}</Text>

  <Text>
    📅 Appointments : {appointments.length}
  </Text>

  <Text>
    ✅ Approved Hospitals :
    {
      partners.filter(
        p => p.status === "Approved"
      ).length
    }
  </Text>

  <Text>
    ⏳ Pending Hospitals :
    {
      partners.filter(
        p => p.status !== "Approved"
      ).length
    }
  </Text>
</Card>
      <Card style={styles.card}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Live Metrics</Text>
        {metrics.map((metric) => (
          <View key={metric.label} style={styles.metricRow}>
            <Text style={[styles.metricLabel, { color: colors.text }]}>{metric.label}</Text>
            <Text style={[styles.metricValue, { color: colors.primary }]}>{metric.value}</Text>
          </View>
        ))}
      </Card>

      <Button title="Refresh Metrics" onPress={refreshMetrics} />
    </ScrollView>
    </View>
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
  meta: {
    fontSize: 14,
    marginTop: 4,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#eef2f7',
  },
  metricLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  metricValue: {
    fontSize: 15,
    fontWeight: '700',
  },
});
