import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import DoctorCardView, { DoctorCardData } from '../components/DoctorCard';

const doctors: DoctorCardData[] = [
  {
    id: 'd1',
    name: 'Dr. Neha Singh',
    specialty: 'Cardiologist',
    experienceYears: 14,
    languages: ['English', 'Hindi'],
    rating: 4.9,
    reviews: 980,
    fee: 1200,
    availability: 'Today • 4:00 PM',
    hospital: 'Kavach Super Specialty',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600',
  },
  {
    id: 'd2',
    name: 'Dr. Rahul Verma',
    specialty: 'Neurologist',
    experienceYears: 11,
    languages: ['English', 'Marathi'],
    rating: 4.7,
    reviews: 760,
    fee: 900,
    availability: 'Tomorrow • 10:30 AM',
    hospital: 'City Care Government Hospital',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600',
  },
  {
    id: 'd3',
    name: 'Dr. Priya Menon',
    specialty: 'Orthopedic Surgeon',
    experienceYears: 13,
    languages: ['English', 'Tamil'],
    rating: 4.8,
    reviews: 820,
    fee: 1100,
    availability: 'Today • 7:00 PM',
    hospital: 'Arogya MultiSpecialty',
   image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600', 
  },
];

export default function DoctorMarketplaceScreen() {
  const { colors } = useTheme();
  const [query, setQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<'All' | 'Cardiologist' | 'Neurologist' | 'Orthopedic Surgeon'>('All');

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      const matchesQuery = `${doctor.name} ${doctor.specialty} ${doctor.hospital}`.toLowerCase().includes(query.toLowerCase());
      const matchesSpecialty = selectedSpecialty === 'All' || doctor.specialty === selectedSpecialty;
      return matchesQuery && matchesSpecialty;
    });
  }, [query, selectedSpecialty]);

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}> 
      <Text style={[styles.title, { color: colors.text }]}>Doctor Marketplace</Text>
      <Text style={[styles.subtitle, { color: colors.muted }]}>Search doctors, compare expertise, and book appointments with trusted specialists.</Text>

      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search doctor or specialty"
        placeholderTextColor={colors.muted}
        style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text }]}
      />

      <View style={styles.filtersRow}>
        {(['All', 'Cardiologist', 'Neurologist', 'Orthopedic Surgeon'] as const).map((item) => (
          <TouchableOpacity
            key={item}
            onPress={() => setSelectedSpecialty(item)}
            style={[styles.filterChip, selectedSpecialty === item ? { backgroundColor: colors.primary } : { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1 }]}
          >
            <Text style={[styles.filterText, selectedSpecialty === item ? { color: '#fff' } : { color: colors.text }]}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {filteredDoctors.map((doctor) => (
        <DoctorCardView key={doctor.id} doctor={doctor} />
      ))}
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
  input: {
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 12,
  },
  filtersRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 14,
  },
  filterChip: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  filterText: {
    fontWeight: '700',
  },
});
