import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import Card from '../components/Card';
import Button from '../components/Button';
import StatusBanner from '../components/StatusBanner';

type WardItem = {
  name: string;
  occupancy: number;
  capacity: number;
  status: 'Stable' | 'High Demand';
};

export default function HospitalAdminDashboardScreen() {
  const { colors } = useTheme();
  const [message, setMessage] = useState('');
  const [wards, setWards] = useState<WardItem[]>([
    { name: 'ICU', occupancy: 6, capacity: 8, status: 'High Demand' },
    { name: 'General Ward', occupancy: 18, capacity: 24, status: 'Stable' },
    { name: 'Pediatrics', occupancy: 10, capacity: 12, status: 'Stable' },
  ]);

  const summary = useMemo(() => {
    const totalOccupied = wards.reduce((sum, ward) => sum + ward.occupancy, 0);
    const totalCapacity = wards.reduce((sum, ward) => sum + ward.capacity, 0);
    return { totalOccupied, totalCapacity, highDemand: wards.filter((ward) => ward.status === 'High Demand').length };
  }, [wards]);

  const toggleDemand = (wardName: string) => {
    setWards((current) =>
      current.map((ward) => {
        if (ward.name !== wardName) return ward;
        const nextStatus = ward.status === 'Stable' ? 'High Demand' : 'Stable';
        return { ...ward, status: nextStatus };
      })
    );
    setMessage(`${wardName} status updated.`);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}> 
      <Text style={[styles.title, { color: colors.text }]}>Hospital Admin Dashboard</Text>
      <Text style={[styles.subtitle, { color: colors.muted }]}>Manage capacity, monitor wards, and respond to demand in real time.</Text>

      {message ? <StatusBanner message={message} tone="success" /> : null}

      <Card style={styles.card}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Capacity Overview</Text>
        <Text style={[styles.meta, { color: colors.primary }]}>Occupied: {summary.totalOccupied} / {summary.totalCapacity}</Text>
        <Text style={[styles.meta, { color: colors.muted }]}>High Demand Wards: {summary.highDemand}</Text>
      </Card>

      <Card style={styles.card}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Ward Status</Text>
        {wards.map((ward) => (
          <View key={ward.name} style={styles.wardRow}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.wardName, { color: colors.text }]}>{ward.name}</Text>
              <Text style={[styles.wardMeta, { color: colors.muted }]}>Occupied {ward.occupancy} / {ward.capacity}</Text>
              <Text style={[styles.status, { color: colors.primary }]}>Status: {ward.status}</Text>
            </View>
            <Button title="Toggle" onPress={() => toggleDemand(ward.name)} variant="secondary" />
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
  meta: {
    fontSize: 14,
    marginTop: 4,
  },
  wardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#eef2f7',
  },
  wardName: {
    fontSize: 15,
    fontWeight: '700',
  },
  wardMeta: {
    fontSize: 12,
    marginTop: 2,
  },
  status: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '700',
  },
});
