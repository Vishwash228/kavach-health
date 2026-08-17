import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useTheme } from '../theme/ThemeContext';
import Card from '../components/Card';
import Button from '../components/Button';
import HeaderBar from '../components/HeaderBar';

export interface HospitalDetailData {
  id: string;
  name: string;
  city: string;
  image: string;
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

export default function HospitalDetailsScreen({
  hospital,
  onBack,
}: HospitalDetailsScreenProps) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.screen,
        { backgroundColor: colors.background },
      ]}
    >
      <HeaderBar
        title="Hospital Details"
        subtitle="Hospital information & services"
        onBack={onBack}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* HOSPITAL IMAGE */}
        <View style={styles.imageContainer}>
          {hospital.image ? (
            <Image
              source={{ uri: hospital.image }}
              style={styles.image}
            />
          ) : (
            <View
              style={[
                styles.imagePlaceholder,
                { backgroundColor: colors.surface },
              ]}
            >
              <Text style={styles.placeholderIcon}>🏥</Text>
            </View>
          )}

          <View style={styles.imageBadge}>
            <Text style={styles.imageBadgeText}>
              {hospital.emergencyAvailable
                ? '🚑 Emergency Available'
                : 'OPD Available'}
            </Text>
          </View>
        </View>

        {/* BASIC INFO */}
        <View style={styles.titleSection}>
          <Text
            style={[
              styles.title,
              { color: colors.text },
            ]}
          >
            {hospital.name}
          </Text>

          <Text
            style={[
              styles.address,
              { color: colors.muted },
            ]}
          >
            📍 {hospital.city} • {hospital.address}
          </Text>

          <View style={styles.ratingRow}>
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingText}>
                ★ {hospital.rating.toFixed(1)}
              </Text>
            </View>

            <Text
              style={[
                styles.reviews,
                { color: colors.muted },
              ]}
            >
              {hospital.reviews} reviews
            </Text>

            <Text
              style={[
                styles.dot,
                { color: colors.muted },
              ]}
            >
              •
            </Text>

            <Text
              style={[
                styles.distance,
                { color: colors.muted },
              ]}
            >
              📍 {hospital.distanceKm} km
            </Text>
          </View>
        </View>

        {/* QUICK INFO */}
        <View style={styles.infoGrid}>
          <View
            style={[
              styles.infoBox,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <Text style={styles.infoIcon}>⏱️</Text>

            <Text
              style={[
                styles.infoValue,
                { color: colors.text },
              ]}
            >
              {hospital.waitingTime} min
            </Text>

            <Text
              style={[
                styles.infoLabel,
                { color: colors.muted },
              ]}
            >
              Waiting
            </Text>
          </View>

          <View
            style={[
              styles.infoBox,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <Text style={styles.infoIcon}>💳</Text>

            <Text
              style={[
                styles.infoValue,
                { color: colors.text },
              ]}
            >
              ₹{hospital.consultationFee}
            </Text>

            <Text
              style={[
                styles.infoLabel,
                { color: colors.muted },
              ]}
            >
              Consultation
            </Text>
          </View>

          <View
            style={[
              styles.infoBox,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <Text style={styles.infoIcon}>🕐</Text>

            <Text
              style={[
                styles.infoValue,
                { color: colors.text },
              ]}
            >
              Open
            </Text>

            <Text
              style={[
                styles.infoLabel,
                { color: colors.muted },
              ]}
            >
              Today
            </Text>
          </View>
        </View>

        {/* BOOKING CTA */}
        <Card style={styles.bookingCard}>
          <Text
            style={[
              styles.bookingTitle,
              { color: colors.text },
            ]}
          >
            Need a doctor?
          </Text>

          <Text
            style={[
              styles.bookingText,
              { color: colors.muted },
            ]}
          >
            Book an OPD appointment and get your digital token.
          </Text>

          <View style={styles.bookingButton}>
            <Button
              title="Book OPD Appointment"
              onPress={() => {
                console.log(
                  'Booking selected for:',
                  hospital.name
                );
              }}
            />
          </View>
        </Card>

        {/* DEPARTMENTS */}
        <Card style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              { color: colors.text },
            ]}
          >
            🩺 Departments
          </Text>

          <View style={styles.tagRow}>
            {hospital.departments.map((department) => (
              <View
                key={department}
                style={[
                  styles.tag,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.tagText,
                    { color: colors.text },
                  ]}
                >
                  {department}
                </Text>
              </View>
            ))}
          </View>
        </Card>

        {/* DOCTORS */}
        <Card style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text
              style={[
                styles.sectionTitle,
                { color: colors.text },
              ]}
            >
              👨‍⚕️ Available Doctors
            </Text>

            <Text
              style={[
                styles.countText,
                { color: colors.primary },
              ]}
            >
              {hospital.doctors.length}
            </Text>
          </View>

          {hospital.doctors.map((doctor, index) => (
            <View
              key={doctor}
              style={[
                styles.doctorRow,
                {
                  borderBottomColor: colors.border,
                  borderBottomWidth:
                    index === hospital.doctors.length - 1
                      ? 0
                      : 1,
                },
              ]}
            >
              <View style={styles.doctorAvatar}>
                <Text style={styles.doctorIcon}>👨‍⚕️</Text>
              </View>

              <View style={{ flex: 1 }}>
                <Text
                  style={[
                    styles.doctorName,
                    { color: colors.text },
                  ]}
                >
                  {doctor}
                </Text>

                <Text
                  style={[
                    styles.doctorSpeciality,
                    { color: colors.muted },
                  ]}
                >
                  Specialist • Available for OPD
                </Text>
              </View>
            </View>
          ))}
        </Card>

        {/* FACILITIES */}
        <Card style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              { color: colors.text },
            ]}
          >
            🏥 Facilities
          </Text>

          <View style={styles.facilityGrid}>
            {hospital.facilities.map((facility) => (
              <View
                key={facility}
                style={styles.facilityItem}
              >
                <Text style={styles.facilityIcon}>✓</Text>

                <Text
                  style={[
                    styles.facilityText,
                    { color: colors.text },
                  ]}
                >
                  {facility}
                </Text>
              </View>
            ))}
          </View>
        </Card>

        {/* TIMINGS */}
        <Card style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              { color: colors.text },
            ]}
          >
            🕐 OPD & Emergency
          </Text>

          <View style={styles.detailRow}>
            <Text
              style={[
                styles.detailLabel,
                { color: colors.muted },
              ]}
            >
              OPD Timings
            </Text>

            <Text
              style={[
                styles.detailValue,
                { color: colors.text },
              ]}
            >
              {hospital.timings}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text
              style={[
                styles.detailLabel,
                { color: colors.muted },
              ]}
            >
              Emergency
            </Text>

            <Text
              style={[
                styles.detailValue,
                {
                  color: hospital.emergencyAvailable
                    ? '#198754'
                    : '#DC3545',
                },
              ]}
            >
              {hospital.emergencyAvailable
                ? 'Available 24/7'
                : 'Not Available'}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text
              style={[
                styles.detailLabel,
                { color: colors.muted },
              ]}
            >
              Insurance
            </Text>

            <Text
              style={[
                styles.detailValue,
                { color: colors.text },
              ]}
            >
              {hospital.insuranceAccepted
                ? 'Accepted'
                : 'Not Accepted'}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text
              style={[
                styles.detailLabel,
                { color: colors.muted },
              ]}
            >
              Hospital Type
            </Text>

            <Text
              style={[
                styles.detailValue,
                { color: colors.text },
              ]}
            >
              {hospital.isGovernment
                ? 'Government'
                : 'Private'}
            </Text>
          </View>
        </Card>

        {/* ACTIONS */}
        <View style={styles.actions}>
          <Button
            title="Call Hospital"
            onPress={() =>
              console.log('Call:', hospital.name)
            }
          />

          <Button
            title="Directions"
            onPress={() =>
              console.log('Directions:', hospital.address)
            }
            variant="secondary"
          />
        </View>

        <View style={styles.backButton}>
          <Button
            title="← Back to Hospitals"
            onPress={onBack}
            variant="secondary"
          />
        </View>
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
    paddingBottom: 35,
  },

  imageContainer: {
    position: 'relative',
    marginBottom: 16,
  },

  image: {
    width: '100%',
    height: 220,
    borderRadius: 22,
  },

  imagePlaceholder: {
    width: '100%',
    height: 220,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },

  placeholderIcon: {
    fontSize: 60,
  },

  imageBadge: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    backgroundColor: 'rgba(0,0,0,0.70)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },

  imageBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },

  titleSection: {
    marginBottom: 18,
  },

  title: {
    fontSize: 25,
    fontWeight: '900',
  },

  address: {
    fontSize: 13,
    lineHeight: 19,
    marginTop: 7,
  },

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  ratingBadge: {
    backgroundColor: '#F4B400',
    borderRadius: 7,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },

  ratingText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },

  reviews: {
    fontSize: 12,
    marginLeft: 8,
  },

  dot: {
    marginHorizontal: 6,
  },

  distance: {
    fontSize: 12,
  },

  infoGrid: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 18,
  },

  infoBox: {
    flex: 1,
    minHeight: 100,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },

  infoIcon: {
    fontSize: 20,
    marginBottom: 5,
  },

  infoValue: {
    fontSize: 14,
    fontWeight: '800',
  },

  infoLabel: {
    fontSize: 10,
    marginTop: 3,
    textAlign: 'center',
  },

  bookingCard: {
    marginBottom: 18,
  },

  bookingTitle: {
    fontSize: 19,
    fontWeight: '800',
  },

  bookingText: {
    fontSize: 13,
    lineHeight: 19,
    marginTop: 5,
  },

  bookingButton: {
    marginTop: 14,
  },

  section: {
    marginBottom: 14,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 9,
  },

  countText: {
    fontSize: 13,
    fontWeight: '800',
  },

  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  tag: {
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

  tagText: {
    fontSize: 12,
    fontWeight: '700',
  },

  doctorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 11,
  },

  doctorAvatar: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: '#EEF4FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },

  doctorIcon: {
    fontSize: 21,
  },

  doctorName: {
    fontSize: 14,
    fontWeight: '800',
  },

  doctorSpeciality: {
    fontSize: 11,
    marginTop: 3,
  },

  facilityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  facilityItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
  },

  facilityIcon: {
    fontSize: 15,
    fontWeight: '900',
    color: '#198754',
    marginRight: 7,
  },

  facilityText: {
    fontSize: 12,
    fontWeight: '600',
    flex: 1,
  },

  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 9,
  },

  detailLabel: {
    fontSize: 13,
  },

  detailValue: {
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'right',
    maxWidth: '55%',
  },

  actions: {
    gap: 10,
    marginTop: 5,
    marginBottom: 10,
  },

  backButton: {
    marginBottom: 15,
  },
});