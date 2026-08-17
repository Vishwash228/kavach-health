import React, { useState } from 'react';
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
} from "firebase/firestore";

import { db } from "../services/firebase";
type PartnerItem = {
  name: string;
  type: string;
  status: 'Connected' | 'Pending';
};

type PartnerPortalScreenProps = {
  onBack?: () => void;
};

export default function PartnerPortalScreen({ onBack }: PartnerPortalScreenProps = {}) {
  const { colors } = useTheme();
  const [message, setMessage] = useState('');
  const [partners, setPartners] = useState<any[]>([]);
  useEffect(() => {
  const loadPartners = async () => {
    try {
      const snapshot = await getDocs(
        collection(db, "partners")
      );

      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPartners(list);
    } catch (error) {
      console.log(error);
    }
  };

  loadPartners();
}, []);
  const togglePartner = (name: string) => {
    setPartners((current) =>
      current.map((partner) => {
        if (partner.name !== name) return partner;
        const nextStatus = partner.status === 'Connected' ? 'Pending' : 'Connected';
        return { ...partner, status: nextStatus };
      })
    );
    setMessage(`${name} partnership status updated.`);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <HeaderBar title="Partner Portal" onBack={onBack} subtitle="Clinics, labs & pharmacy network" />
      <ScrollView style={[styles.container, { backgroundColor: colors.background }]}> 
      <Text style={[styles.title, { color: colors.text }]}>Partner Portal</Text>
      <Text style={[styles.subtitle, { color: colors.muted }]}>Coordinate partner clinics, labs, and pharmacies through shared care referrals.</Text>

      {message ? <StatusBanner message={message} tone="success" /> : null}

      <Card style={styles.card}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Partner Network</Text>
        {partners.map((partner) => (
          <View key={partner.id} style={styles.partnerRow}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.partnerName, { color: colors.text }]}>{partner.name}</Text>
              <Text style={[styles.partnerMeta, { color: colors.muted }]}>{partner.city}</Text>
              <Text style={[styles.status, { color: colors.primary }]}>Status: {partner.status||"pending"}</Text>
            </View>
            <Button title="Toggle" onPress={() => togglePartner(partner.name)} variant="secondary" />
          </View>
        ))}
      </Card>
      <Card style={styles.card}>
  <Text
    style={[
      styles.sectionTitle,
      { color: colors.text },
    ]}
  >
    Total Partners
  </Text>

  <Text
    style={{
      fontSize: 34,
      fontWeight: "800",
      color: colors.primary,
    }}
  >
    {partners.length}
  </Text>
</Card>
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
  partnerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#eef2f7',
  },
  partnerName: {
    fontSize: 15,
    fontWeight: '700',
  },
  partnerMeta: {
    fontSize: 12,
    marginTop: 2,
  },
  status: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '700',
  },
});
