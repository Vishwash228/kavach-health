import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { useTheme } from '../theme/ThemeContext';
import HospitalCardView, {
  HospitalCardData,
} from '../components/HospitalCard';

import { HospitalDetailData } from './HospitalDetailsScreen';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import HeaderBar from '../components/HeaderBar';

type SortOption = 'distance' | 'rating' | 'waiting';
type FilterOption = 'all' | 'government' | 'private' | 'insurance';

type MarketplaceScreenProps = {
  onSelectHospital: (hospital: HospitalDetailData) => void;
  onBack?: () => void;
};

export default function MarketplaceScreen({
  onSelectHospital,
  onBack,
}: MarketplaceScreenProps) {
  const { colors } = useTheme();

  const [hospitals, setHospitals] = useState<HospitalCardData[]>([]);
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('distance');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadHospitals();
  }, []);

  const loadHospitals = async () => {
    try {
      setLoading(true);
      setError(false);

      const snapshot = await getDocs(collection(db, 'hospitals'));

      const data: HospitalCardData[] = snapshot.docs.map((doc) => {
        const item = doc.data();

        return {
          id: doc.id,
          name: item.hospitalName || 'Hospital',
          city: item.city || 'Unknown City',
          rating: Number(item.rating) || 4.5,
          image: item.image,

          speciality: item.speciality || 'General Care',

          reviews: Number(item.reviews) || 1000,
          consultationFee: Number(item.consultationFee) || 500,
          distanceKm: Number(item.distanceKm) || 2.5,
          waitingTime: Number(item.waitingTime) || 15,

          emergencyAvailable:
            item.emergencyAvailable !== false,

          isGovernment: item.isGovernment === true,

          insuranceAccepted:
            item.insuranceAccepted !== false,

          department: item.speciality || 'General Care',
          disease: item.disease || 'General Care',
        };
      });

      setHospitals(data);
    } catch (err) {
      console.log('Hospital loading error:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const filteredHospitals = useMemo(() => {
    const search = query.trim().toLowerCase();

    const next = hospitals.filter((hospital) => {
      const searchableText = `
        ${hospital.name}
        ${hospital.city}
        ${hospital.department}
        ${hospital.disease}
      
      `.toLowerCase();

      const matchesQuery =
        search.length === 0 || searchableText.includes(search);

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

    return [...next].sort((a, b) => {
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }

      if (sortBy === 'waiting') {
        return a.waitingTime - b.waitingTime;
      }

      return a.distanceKm - b.distanceKm;
    });
  }, [hospitals, filterBy, query, sortBy]);

  const openHospital = (hospital: HospitalCardData) => {
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

      departments: [
        'Cardiology',
        'Neurology',
        'Orthopedics',
        'General Medicine',
      ],

      doctors: [
        'Dr. Neha Singh',
        'Dr. Rahul Verma',
        'Dr. Priya Menon',
      ],

      facilities: [
        'Emergency Care',
        'Pharmacy',
        'Laboratory',
        'Parking',
      ],

      timings: '8:00 AM - 8:00 PM',
      address: `${hospital.city}, Healthcare District`,
    });
  };

  return (
    <View
      style={[
        styles.screen,
        { backgroundColor: colors.background },
      ]}
    >
      <HeaderBar
        title="Hospital Marketplace"
        subtitle="Find and compare hospitals"
        onBack={onBack}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* SEARCH */}
        <View
          style={[
            styles.searchContainer,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
            },
          ]}
        >
          <Text style={styles.searchIcon}>🔍</Text>

          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search hospitals, doctors..."
            placeholderTextColor={colors.muted}
            style={[
              styles.input,
              { color: colors.text },
            ]}
          />

          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Text
                style={[
                  styles.clearText,
                  { color: colors.primary },
                ]}
              >
                ✕
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* LOCATION */}
        <View style={styles.locationRow}>
          <Text style={styles.locationIcon}>📍</Text>

          <View style={{ flex: 1 }}>
            <Text
              style={[
                styles.locationLabel,
                { color: colors.muted },
              ]}
            >
              Your location
            </Text>

            <Text
              style={[
                styles.locationText,
                { color: colors.text },
              ]}
            >
              Nearby hospitals
            </Text>
          </View>

          <Text
            style={[
              styles.changeText,
              { color: colors.primary },
            ]}
          >
            Change
          </Text>
        </View>

        {/* FILTERS */}
        <Text
          style={[
            styles.sectionTitle,
            { color: colors.text },
          ]}
        >
          Filter
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScroll}
        >
          {(
            ['all', 'government', 'private', 'insurance'] as FilterOption[]
          ).map((option) => {
            const selected = filterBy === option;

            const label =
              option === 'all'
                ? 'All'
                : option === 'government'
                  ? 'Government'
                  : option === 'private'
                    ? 'Private'
                    : 'Insurance';

            return (
              <TouchableOpacity
                key={option}
                onPress={() => setFilterBy(option)}
                style={[
                  styles.filterChip,
                  selected
                    ? {
                        backgroundColor: colors.primary,
                        borderColor: colors.primary,
                      }
                    : {
                        backgroundColor: colors.surface,
                        borderColor: colors.border,
                      },
                ]}
              >
                <Text
                  style={[
                    styles.chipText,
                    {
                      color: selected
                        ? '#FFFFFF'
                        : colors.text,
                    },
                  ]}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* SORT */}
        <View style={styles.resultHeader}>
          <Text
            style={[
              styles.resultCount,
              { color: colors.text },
            ]}
          >
            {filteredHospitals.length} Hospitals
          </Text>

          <Text
            style={[
              styles.sortLabel,
              { color: colors.muted },
            ]}
          >
            Sort by
          </Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScroll}
        >
          {(
            ['distance', 'rating', 'waiting'] as SortOption[]
          ).map((option) => {
            const selected = sortBy === option;

            const label =
              option === 'distance'
                ? '📍 Distance'
                : option === 'rating'
                  ? '⭐ Rating'
                  : '⏱ Waiting';

            return (
              <TouchableOpacity
                key={option}
                onPress={() => setSortBy(option)}
                style={[
                  styles.sortChip,
                  selected
                    ? {
                        backgroundColor: colors.accent,
                        borderColor: colors.accent,
                      }
                    : {
                        backgroundColor: colors.surface,
                        borderColor: colors.border,
                      },
                ]}
              >
                <Text
                  style={[
                    styles.chipText,
                    {
                      color: selected
                        ? '#FFFFFF'
                        : colors.text,
                    },
                  ]}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* LOADING */}
        {loading && (
          <View style={styles.stateContainer}>
            <ActivityIndicator
              size="large"
              color={colors.primary}
            />

            <Text
              style={[
                styles.stateText,
                { color: colors.muted },
              ]}
            >
              Finding hospitals...
            </Text>
          </View>
        )}

        {/* ERROR */}
        {!loading && error && (
          <View
            style={[
              styles.emptyCard,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <Text style={styles.emptyIcon}>⚠️</Text>

            <Text
              style={[
                styles.emptyTitle,
                { color: colors.text },
              ]}
            >
              Unable to load hospitals
            </Text>

            <Text
              style={[
                styles.emptyText,
                { color: colors.muted },
              ]}
            >
              Please check your internet connection and try again.
            </Text>

            <View style={styles.retryButton}>
              <TouchableOpacity
                onPress={loadHospitals}
                style={[
                  styles.retry,
                  { backgroundColor: colors.primary },
                ]}
              >
                <Text style={styles.retryText}>
                  Try Again
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* EMPTY */}
        {!loading &&
          !error &&
          filteredHospitals.length === 0 && (
            <View
              style={[
                styles.emptyCard,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                },
              ]}
            >
              <Text style={styles.emptyIcon}>🏥</Text>

              <Text
                style={[
                  styles.emptyTitle,
                  { color: colors.text },
                ]}
              >
                No hospitals found
              </Text>

              <Text
                style={[
                  styles.emptyText,
                  { color: colors.muted },
                ]}
              >
                Try another search or change your filters.
              </Text>
            </View>
          )}

        {/* HOSPITAL LIST */}
        {!loading &&
          !error &&
          filteredHospitals.map((hospital) => (
            <View
              key={hospital.id}
              style={styles.hospitalWrapper}
            >
              <HospitalCardView
                hospital={hospital}
                onPress={() => openHospital(hospital)}
              />
            </View>
          ))}

        {/* FOOTER */}
        {!loading &&
          filteredHospitals.length > 0 && (
            <Text
              style={[
                styles.footerText,
                { color: colors.muted },
              ]}
            >
              Showing the best available hospitals for you
            </Text>
          )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  content: {
    padding: 16,
    paddingBottom: 30,
  },

  searchContainer: {
    minHeight: 54,
    borderRadius: 17,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    marginBottom: 15,
  },

  searchIcon: {
    fontSize: 18,
    marginRight: 9,
  },

  input: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 10,
  },

  clearText: {
    fontSize: 16,
    fontWeight: '700',
    paddingLeft: 8,
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
    paddingHorizontal: 3,
  },

  locationIcon: {
    fontSize: 20,
    marginRight: 9,
  },

  locationLabel: {
    fontSize: 11,
  },

  locationText: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 2,
  },

  changeText: {
    fontSize: 12,
    fontWeight: '700',
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 10,
  },

  horizontalScroll: {
    marginBottom: 18,
  },

  filterChip: {
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 999,
    borderWidth: 1,
    marginRight: 8,
  },

  sortChip: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 999,
    borderWidth: 1,
    marginRight: 8,
  },

  chipText: {
    fontSize: 12,
    fontWeight: '700',
  },

  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
    marginBottom: 10,
  },

  resultCount: {
    flex: 1,
    fontSize: 18,
    fontWeight: '800',
  },

  sortLabel: {
    fontSize: 12,
  },

  hospitalWrapper: {
    marginBottom: 14,
  },

  stateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },

  stateText: {
    fontSize: 14,
    marginTop: 12,
  },

  emptyCard: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 25,
    alignItems: 'center',
    marginTop: 10,
  },

  emptyIcon: {
    fontSize: 40,
    marginBottom: 10,
  },

  emptyTitle: {
    fontSize: 17,
    fontWeight: '800',
  },

  emptyText: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 19,
    marginTop: 7,
  },

  retryButton: {
    marginTop: 16,
  },

  retry: {
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 12,
  },

  retryText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },

  footerText: {
    textAlign: 'center',
    fontSize: 11,
    marginTop: 8,
    marginBottom: 10,
  },
});