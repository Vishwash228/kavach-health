import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import Card from './Card';
export interface HospitalCardData {
  id: string;
  name: string;
  city: string;
 rating: number;
  reviews: number;
  consultationFee: number;
  distanceKm: number;
  waitingTime: number;
  emergencyAvailable: boolean;
  isGovernment: boolean;
  insuranceAccepted: boolean;
  department: string;
  disease: string;

  image: string;   
}



type HospitalCardProps = {
  hospital: HospitalCardData;
  onPress?: () => void;
};

export default function HospitalCardView({ hospital, onPress }: HospitalCardProps) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card style={styles.card}>
        <Image
          source={{ uri: hospital.image }}
          style={styles.image}
        />
        <Text style={[styles.name, { color: colors.text }]}>{hospital.name}</Text>
        <Text style={[styles.meta, { color: colors.muted }]}>📍 {hospital.city} • {hospital.department}</Text>
        <View style={styles.row}>
          <Text style={[styles.badge, { color: colors.primary }]}>★ {hospital.rating.toFixed(1)} ({hospital.reviews})</Text>
          <Text style={[styles.badge, { color: colors.accent }]}>₹{hospital.consultationFee}</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.meta, { color: colors.muted }]}>Distance: {hospital.distanceKm} km</Text>
          <Text style={[styles.meta, { color: colors.muted }]}>Wait: {hospital.waitingTime} min</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.meta, { color: colors.muted }]}>{hospital.emergencyAvailable ? '🚑 Emergency Available' : 'Emergency Unavailable'}</Text>
          <Text style={[styles.meta, { color: colors.muted }]}>{hospital.isGovernment ? 'Government' : 'Private'}</Text>
        </View>
        <Text style={[styles.meta, { color: colors.muted }]}>Focus: {hospital.disease}</Text>
        {hospital.insuranceAccepted ? <Text style={[styles.meta, { color: colors.accent }]}>✓ Insurance Accepted</Text> : null}
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 14,
  },
  cover: {
    backgroundColor: '#2F80ED',
    borderRadius: 14,
    paddingVertical: 24,
    paddingHorizontal: 14,
    marginBottom: 10,
  },
  coverText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  meta: {
    fontSize: 13,
    marginTop: 4,
  },
  badge: {
    fontSize: 13,
    fontWeight: '700',
  },
  image: {
  width: '100%',
  height: 180,
  borderRadius: 12,
  marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
});
