import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import HospitalCardView, { HospitalCardData } from '../components/HospitalCard';
import { HospitalDetailData } from './HospitalDetailsScreen';

const hospitals: HospitalCardData[] = [
 {
  id: '1',
  name: 'Kavach Super Specialty',
  city: 'Mumbai',
  rating: 4.8,
  reviews: 1240,
  consultationFee: 800,
  distanceKm: 3.2,
  waitingTime: 18,
  emergencyAvailable: true,
  isGovernment: false,
  insuranceAccepted: true,
  department: 'Cardiology',
  disease: 'Heart Care',
  image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=900',
},
  {
    id: '2',
    name: 'City Care Government Hospital',
    city: 'Delhi',
    rating: 4.5,
    reviews: 890,
    consultationFee: 300,
    distanceKm: 7.5,
    waitingTime: 27,
    emergencyAvailable: true,
    isGovernment: true,
    insuranceAccepted: false,
    department: 'Neurology',
    disease: 'Stroke Recovery',
  },
  {
    id: '3',
    name: 'Arogya MultiSpecialty',
    city: 'Bengaluru',
    rating: 4.7,
    reviews: 610,
    consultationFee: 650,
    distanceKm: 2.1,
    waitingTime: 12,
    emergencyAvailable: true,
    isGovernment: false,
    insuranceAccepted: true,
    department: 'Orthopedics',
    disease: 'Joint Care',
  },
];

type SortOption = 'distance' | 'rating' | 'waiting';

type FilterOption = 'all' | 'government' | 'private' | 'insurance';

type MarketplaceScreenProps = {
  onSelectHospital: (hospital: HospitalDetailData) => void;
};

export default function MarketplaceScreen({ onSelectHospital }: MarketplaceScreenProps) {
  const { colors } = useTheme();
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('distance');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');

  const filteredHospitals = useMemo(() => {
    const next = hospitals.filter((hospital) => {
      const matchesQuery = `${hospital.name} ${hospital.city} ${hospital.department} ${hospital.disease}`.toLowerCase().includes(query.toLowerCase());
      const matchesFilter =
        filterBy === 'all'
          ? true
          : filterBy === 'government'
            ? hospital.isGovernment
            : filterBy === 'private'
              ? !hospital.isGovernment
              : hospital.insuranceAccepted;
      return matchesQuery && matchesFilter;
    });

    return next.sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'waiting') return a.waitingTime - b.waitingTime;
      return a.distanceKm - b.distanceKm;
    });
  }, [filterBy, query, sortBy]);

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}> 
      <Text style={[styles.title, { color: colors.text }]}>Hospital Marketplace</Text>
      <Text style={[styles.subtitle, { color: colors.muted }]}>Search hospitals, compare doctors, and discover the best care near you.</Text>

      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search hospital, doctor, department or disease"
        placeholderTextColor={colors.muted}
        style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text }]}
      />

      <View style={styles.chipsRow}>
        {(['all', 'government', 'private', 'insurance'] as FilterOption[]).map((option) => (
          <TouchableOpacity
            key={option}
            onPress={() => setFilterBy(option)}
            style={[styles.chip, filterBy === option ? { backgroundColor: colors.primary } : { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1 }]}
          >
            <Text style={[styles.chipText, filterBy === option ? { color: '#fff' } : { color: colors.text }]}>
              {option === 'all' ? 'All' : option === 'government' ? 'Government' : option === 'private' ? 'Private' : 'Insurance'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.row}>
        {(['distance', 'rating', 'waiting'] as SortOption[]).map((option) => (
          <TouchableOpacity
            key={option}
            onPress={() => setSortBy(option)}
            style={[styles.sortButton, sortBy === option ? { backgroundColor: colors.accent } : { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1 }]}
          >
            <Text style={[styles.sortText, sortBy === option ? { color: '#fff' } : { color: colors.text }]}>
              {option === 'distance' ? 'Distance' : option === 'rating' ? 'Rating' : 'Waiting'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {filteredHospitals.map((hospital) => (
        <HospitalCardView
          key={hospital.id}
          hospital={hospital}
          onPress={() =>
            onSelectHospital({
             id: hospital.id,
             name: hospital.name,
             city: hospital.city,
             image: hospital.image,
             rating: hospital.rating,
             reviews: hospital.reviews,
             consultationFee: hospital.consultationFee,
             distanceKm: hospital.distanceKm,
             waitingTime: hospital.waitingTime,
             emergencyAvailable: hospital.emergencyAvailable,
             isGovernment: hospital.isGovernment,
             insuranceAccepted: hospital.insuranceAccepted,
             departments: ['Cardiology', 'Neurology', 'ICU'],
             doctors: ['Dr. Neha Singh', 'Dr. Rahul Verma', 'Dr. Priya Menon'],
             facilities: ['Emergency Care', 'Pharmacy', 'Laboratory', 'Parking'],
             timings: '8:00 AM - 8:00 PM',
             address: 'Main Road, Healthcare District',
            })
          }
        />
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
    marginBottom: 16,
    lineHeight: 20,
  },
  input: {
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 12,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  chip: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  chipText: {
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  sortButton: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  sortText: {
    fontWeight: '700',
  },
});
