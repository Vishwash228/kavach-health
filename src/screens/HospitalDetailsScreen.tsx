import React from 'react';
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import Card from '../components/Card';
import Button from '../components/Button';
export interface HospitalDetailData {
  id: string;
  name: string;
  city: string;

  image: string;   // ✅ ADD THIS

  rating: number;
  reviews: number;
  consultationFee: number;
  distanceKm: number;
  waitingTime: number;
  emergencyAvailable: boolean;
  isGovernment: boolean;
  insuranceAccepted: boolean;
  departments: string[];
  doctors: string[];
  facilities: string[];
  timings: string;
  address: string;
}


type HospitalDetailsScreenProps = {
  hospital: HospitalDetailData;
  onBack: () => void;
};

export default function HospitalDetailsScreen({ hospital, onBack }: HospitalDetailsScreenProps) {
  const { colors } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}> 
      <View style={styles.hero}>
        <Image
         source={{ uri: hospital.image }}
         style={styles.image}
        />
        <Text style={[styles.title, { color: colors.text }]}>{hospital.name}</Text>
        <Text style={[styles.subtitle, { color: colors.muted }]}>📍 {hospital.city} • {hospital.address}</Text>
        <Text style={[styles.badge, { color: colors.primary }]}>★ {hospital.rating.toFixed(1)} ({hospital.reviews} reviews)</Text>
      </View>

      <Card style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Departments</Text>
        <View style={styles.tagRow}>
          {hospital.departments.map((item) => (
            <View key={item} style={[styles.tag, { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1 }]}> 
              <Text style={[styles.tagText, { color: colors.text }]}>{item}</Text>
            </View>
          ))}
        </View>
      </Card>

      <Card style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Doctors</Text>
        {hospital.doctors.map((doctor) => (
          <Text key={doctor} style={[styles.listItem, { color: colors.muted }]}>• {doctor}</Text>
        ))}
      </Card>

      <Card style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Facilities</Text>
        {hospital.facilities.map((facility) => (
          <Text key={facility} style={[styles.listItem, { color: colors.muted }]}>• {facility}</Text>
        ))}
      </Card>

      <Card style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Emergency & OPD</Text>
        <Text style={[styles.listItem, { color: colors.muted }]}>Emergency: {hospital.emergencyAvailable ? 'Available 24/7' : 'Not available'}</Text>
        <Text style={[styles.listItem, { color: colors.muted }]}>OPD Timings: {hospital.timings}</Text>
        <Text style={[styles.listItem, { color: colors.muted }]}>Consultation Fee: ₹{hospital.consultationFee}</Text>
      </Card>

      <View style={styles.actions}>
        <Button title="Book Appointment" onPress={() => undefined} />
        <Button title="Call Hospital" onPress={() => undefined} variant="secondary" />
      </View>
      <View style={styles.actions}>
        <Button title="Share" onPress={() => undefined} variant="secondary" />
        <Button title="Directions" onPress={() => undefined} variant="secondary" />
      </View>
      <View style={styles.actions}>
        <Button title="Back" onPress={onBack} variant="secondary" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  hero: {
    marginBottom: 14,
  },
  image: {
  width: '100%',
  height: 220,
  borderRadius: 16,
  marginBottom: 15,
 },
  title: {
    fontSize: 24,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 6,
    marginBottom: 6,
  },
  badge: {
    fontSize: 14,
    fontWeight: '700',
  },
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '700',
  },
  listItem: {
    fontSize: 14,
    marginBottom: 6,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
});
