import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import Card from './Card';

export interface DoctorCardData {
  id: string;
  name: string;
  specialty: string;
  experienceYears: number;
  languages: string[];
  rating: number;
  reviews: number;
  fee: number;
  availability: string;
  hospital: string;
  image: string;
}

type DoctorCardProps = {
  doctor: DoctorCardData;
  onPress?: () => void;
};

export default function DoctorCardView({ doctor, onPress }: DoctorCardProps) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card style={styles.card}>
        <View style={styles.header}>
          <Image
            source={{ uri: doctor.image }}
            style={styles.avatar}
          />
          <View style={styles.info}>
            <Text style={[styles.name, { color: colors.text }]}>{doctor.name}</Text>
            <Text style={[styles.meta, { color: colors.muted }]}>{doctor.specialty}</Text>
            <Text style={[styles.meta, { color: colors.muted }]}>🏥 {doctor.hospital}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={[styles.badge, { color: colors.primary }]}>★ {doctor.rating.toFixed(1)} ({doctor.reviews})</Text>
          <Text style={[styles.badge, { color: colors.accent }]}>₹{doctor.fee}</Text>
        </View>
        <Text style={[styles.meta, { color: colors.muted }]}>Experience: {doctor.experienceYears} years</Text>
        <Text style={[styles.meta, { color: colors.muted }]}>Languages: {doctor.languages.join(', ')}</Text>
        <Text style={[styles.meta, { color: colors.muted }]}>Availability: {doctor.availability}</Text>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
  width: 70,
  height: 70,
  borderRadius: 35,
  marginRight: 12,
},
  info: {
    flex: 1,
  },
  name: {
    fontSize: 17,
    fontWeight: '700',
  },
  meta: {
    fontSize: 13,
    marginTop: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
    marginBottom: 4,
  },
  badge: {
    fontSize: 13,
    fontWeight: '700',
  },
});
