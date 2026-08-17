import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import { useTheme } from '../theme/ThemeContext';
import Card from '../components/Card';
import Button from '../components/Button';
import RoleChip from '../components/RoleChip';
import { authService, AuthSession } from '../services/auth';

import FeaturedDoctors from '../components/FeaturedDoctors';
import SpecialtiesGrid from '../components/SpecialtiesGrid';
import EmergencyCard from '../components/EmergencyCard';
import HealthTips from '../components/HealthTips';
import NotificationsCard from '../components/NotificationsCard';
import MedicineReminder from '../components/MedicineReminder';
import InsuranceCard from '../components/InsuranceCard';

type HomeScreenProps = {
  onSignOut: () => void;
  onOpenMarketplace: () => void;
  onOpenDoctors: () => void;
  onOpenRegistration: () => void;
  onOpenOcr: () => void;
  onOpenBooking: () => void;
  onOpenToken: () => void;
  onOpenQueue: () => void;
  onOpenReception: () => void;
  onOpenDoctorDashboard: () => void;
  onOpenHospitalAdmin: () => void;
  onOpenPartner: () => void;
  onOpenSuperAdmin: () => void;
  onOpenRecords: () => void;
  onOpenPayments: () => void;
  onOpenAi: () => void;
  onOpenEmergency: () => void;
  onOpenDeployment: () => void;
  onOpenModuleHub: () => void;
};

export default function HomeScreen({
  onSignOut,
  onOpenMarketplace,
  onOpenDoctors,
  onOpenRegistration,
  onOpenOcr,
  onOpenBooking,
  onOpenToken,
  onOpenQueue,
  onOpenReception,
  onOpenDoctorDashboard,
  onOpenHospitalAdmin,
  onOpenPartner,
  onOpenSuperAdmin,
  onOpenRecords,
  onOpenPayments,
  onOpenAi,
  onOpenEmergency,
  onOpenDeployment,
  onOpenModuleHub,
}: HomeScreenProps) {
  const { colors } = useTheme();
  const [session, setSession] = useState<AuthSession | null>(null);

  useEffect(() => {
    const loadSession = async () => {
      const currentSession = await authService.getSession();
      setSession(currentSession);
    };

    loadSession();
  }, []);

  const handleSignOut = async () => {
    await authService.clearSession();
    onSignOut();
  };

  const name = session?.user.name || 'Patient';

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* HERO */}
        <View
          style={[
            styles.hero,
            { backgroundColor: colors.primary },
          ]}
        >
          <View style={styles.heroTop}>
            <View style={{ flex: 1 }}>
              <Text style={styles.greeting}>👋 Welcome back</Text>

              <Text style={styles.heroName}>
                {name}
              </Text>
            </View>

            <View style={styles.notificationButton}>
              <Text style={styles.notificationIcon}>🔔</Text>
            </View>
          </View>

          <Text style={styles.heroSub}>
            Your healthcare, simplified.
          </Text>

          <RoleChip label={session?.user.role ?? 'patient'} />
        </View>

        {/* SEARCH */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onOpenMarketplace}
          style={[
            styles.searchBox,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
            },
          ]}
        >
          <Text style={styles.searchIcon}>🔍</Text>

          <Text
            style={[
              styles.searchText,
              { color: colors.muted },
            ]}
          >
            Search doctors, hospitals or specialties
          </Text>
        </TouchableOpacity>

        {/* QUICK ACTIONS */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Quick Actions
          </Text>

          <TouchableOpacity onPress={onOpenModuleHub}>
            <Text style={[styles.seeAll, { color: colors.primary }]}>
              See All
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.quickGrid}>
          <TouchableOpacity
            style={[
              styles.quickItem,
              { backgroundColor: colors.surface },
            ]}
            onPress={onOpenBooking}
          >
            <Text style={styles.quickIcon}>📅</Text>
            <Text style={[styles.quickTitle, { color: colors.text }]}>
              Book OPD
            </Text>
            <Text style={[styles.quickSub, { color: colors.muted }]}>
              Appointment
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.quickItem,
              { backgroundColor: colors.surface },
            ]}
            onPress={onOpenMarketplace}
          >
            <Text style={styles.quickIcon}>🏥</Text>
            <Text style={[styles.quickTitle, { color: colors.text }]}>
              Hospitals
            </Text>
            <Text style={[styles.quickSub, { color: colors.muted }]}>
              Find nearby
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.quickItem,
              { backgroundColor: colors.surface },
            ]}
            onPress={onOpenDoctors}
          >
            <Text style={styles.quickIcon}>👨‍⚕️</Text>
            <Text style={[styles.quickTitle, { color: colors.text }]}>
              Doctors
            </Text>
            <Text style={[styles.quickSub, { color: colors.muted }]}>
              Find specialist
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.quickItem,
              { backgroundColor: colors.surface },
            ]}
            onPress={onOpenAi}
          >
            <Text style={styles.quickIcon}>🤖</Text>
            <Text style={[styles.quickTitle, { color: colors.text }]}>
              AI Assistant
            </Text>
            <Text style={[styles.quickSub, { color: colors.muted }]}>
              Check symptoms
            </Text>
          </TouchableOpacity>
        </View>

        {/* UPCOMING APPOINTMENT */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Upcoming Appointment
          </Text>
        </View>

        <Card style={styles.appointmentCard}>
          <View style={styles.appointmentTop}>
            <View style={styles.doctorAvatar}>
              <Text style={styles.avatarText}>👩‍⚕️</Text>
            </View>

            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text
                style={[
                  styles.doctorName,
                  { color: colors.text },
                ]}
              >
                Dr. Neha Singh
              </Text>

              <Text
                style={[
                  styles.cardText,
                  { color: colors.muted },
                ]}
              >
                Cardiologist
              </Text>
            </View>

            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Confirmed</Text>
            </View>
          </View>

          <View
            style={[
              styles.appointmentInfo,
              { borderTopColor: colors.border },
            ]}
          >
            <Text style={[styles.infoText, { color: colors.muted }]}>
              🏥 Apollo Hospital
            </Text>

            <Text style={[styles.infoText, { color: colors.muted }]}>
              📅 Today • 09:00 AM
            </Text>

            <Text style={[styles.infoText, { color: colors.muted }]}>
              🎟 Token A001
            </Text>
          </View>

          <Button
            title="View Digital Token"
            onPress={onOpenToken}
          />
        </Card>

        {/* AI ASSISTANT */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={onOpenAi}
          style={[
            styles.aiCard,
            { backgroundColor: colors.surface },
          ]}
        >
          <View style={styles.aiIconBox}>
            <Text style={styles.aiIcon}>🤖</Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text
              style={[
                styles.aiTitle,
                { color: colors.text },
              ]}
            >
              AI Health Assistant
            </Text>

            <Text
              style={[
                styles.aiText,
                { color: colors.muted },
              ]}
            >
              Describe your symptoms and get quick guidance.
            </Text>
          </View>

          <Text
            style={[
              styles.arrow,
              { color: colors.primary },
            ]}
          >
            ›
          </Text>
        </TouchableOpacity>

        {/* LIVE QUEUE */}
        <Card style={styles.queueCard}>
          <View style={styles.queueHeader}>
            <View>
              <Text
                style={[
                  styles.cardTitle,
                  { color: colors.text },
                ]}
              >
                🎟 Live OPD Queue
              </Text>

              <Text
                style={[
                  styles.cardText,
                  { color: colors.muted },
                ]}
              >
                Apollo Hospital • Cardiology
              </Text>
            </View>

            <View style={styles.queueBadge}>
              <Text style={styles.queueBadgeText}>
                LIVE
              </Text>
            </View>
          </View>

          <View style={styles.queueNumber}>
            <Text
              style={[
                styles.queueBig,
                { color: colors.primary },
              ]}
            >
              A001
            </Text>

            <Text
              style={[
                styles.queueWaiting,
                { color: colors.muted },
              ]}
            >
              Your token
            </Text>
          </View>

          <Button
            title="Track Live Queue"
            onPress={onOpenQueue}
            variant="secondary"
          />
        </Card>

        {/* HEALTH SUMMARY */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Health Summary
          </Text>

          <TouchableOpacity onPress={onOpenRecords}>
            <Text style={[styles.seeAll, { color: colors.primary }]}>
              Records
            </Text>
          </TouchableOpacity>
        </View>

        <Card style={styles.healthCard}>
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text
                style={[
                  styles.statValue,
                  { color: colors.primary },
                ]}
              >
                12
              </Text>

              <Text
                style={[
                  styles.statLabel,
                  { color: colors.muted },
                ]}
              >
                Visits
              </Text>
            </View>

            <View
              style={[
                styles.statDivider,
                { backgroundColor: colors.border },
              ]}
            />

            <View style={styles.statBox}>
              <Text
                style={[
                  styles.statValue,
                  { color: colors.primary },
                ]}
              >
                3
              </Text>

              <Text
                style={[
                  styles.statLabel,
                  { color: colors.muted },
                ]}
              >
                Reports
              </Text>
            </View>

            <View
              style={[
                styles.statDivider,
                { backgroundColor: colors.border },
              ]}
            />

            <View style={styles.statBox}>
              <Text
                style={[
                  styles.statValue,
                  { color: colors.primary },
                ]}
              >
                2
              </Text>

              <Text
                style={[
                  styles.statLabel,
                  { color: colors.muted },
                ]}
              >
                Medicines
              </Text>
            </View>
          </View>
        </Card>

        {/* SPECIALTIES */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Explore Specialties
          </Text>

          <TouchableOpacity onPress={onOpenDoctors}>
            <Text style={[styles.seeAll, { color: colors.primary }]}>
              View All
            </Text>
          </TouchableOpacity>
        </View>

        <SpecialtiesGrid onSelect={onOpenDoctors} />

        {/* FEATURED DOCTORS */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Top Doctors
          </Text>
        </View>

        <FeaturedDoctors onBook={onOpenBooking} />

        {/* EMERGENCY */}
        <EmergencyCard onEmergency={onOpenEmergency} />

        {/* OTHER HEALTH SERVICES */}
        <HealthTips />
        <NotificationsCard />
        <MedicineReminder />
        <InsuranceCard />

        {/* MORE FEATURES */}
        <Card style={styles.moreCard}>
          <Text
            style={[
              styles.cardTitle,
              { color: colors.text },
            ]}
          >
            More Services
          </Text>

          <View style={styles.moreGrid}>
            <TouchableOpacity
              onPress={onOpenRegistration}
              style={styles.moreItem}
            >
              <Text style={styles.moreIcon}>🧑</Text>
              <Text
                style={[
                  styles.moreText,
                  { color: colors.text },
                ]}
              >
                Patient Registration
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onOpenOcr}
              style={styles.moreItem}
            >
              <Text style={styles.moreIcon}>📷</Text>
              <Text
                style={[
                  styles.moreText,
                  { color: colors.text },
                ]}
              >
                OCR Registration
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onOpenReception}
              style={styles.moreItem}
            >
              <Text style={styles.moreIcon}>🧾</Text>
              <Text
                style={[
                  styles.moreText,
                  { color: colors.text },
                ]}
              >
                Reception
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onOpenDeployment}
              style={styles.moreItem}
            >
              <Text style={styles.moreIcon}>🚀</Text>
              <Text
                style={[
                  styles.moreText,
                  { color: colors.text },
                ]}
              >
                Deployment
              </Text>
            </TouchableOpacity>
          </View>
        </Card>

        {/* SIGN OUT */}
        <View style={styles.signOut}>
          <Button
            title="Sign Out"
            onPress={handleSignOut}
            variant="secondary"
          />
        </View>
      </ScrollView>

      {/* BOTTOM NAVIGATION */}
      <View
        style={[
          styles.bottomNav,
          {
            backgroundColor: colors.surface,
            borderTopColor: colors.border,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => {}}
        >
          <Text style={styles.navIcon}>🏠</Text>
          <Text
            style={[
              styles.navText,
              { color: colors.primary },
            ]}
          >
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={onOpenMarketplace}
        >
          <Text style={styles.navIcon}>🏥</Text>
          <Text
            style={[
              styles.navText,
              { color: colors.muted },
            ]}
          >
            Hospitals
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={onOpenBooking}
        >
          <View
            style={[
              styles.centerNav,
              { backgroundColor: colors.primary },
            ]}
          >
            <Text style={styles.centerNavIcon}>＋</Text>
          </View>
          <Text
            style={[
              styles.navText,
              { color: colors.muted },
            ]}
          >
            Book
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={onOpenRecords}
        >
          <Text style={styles.navIcon}>📋</Text>
          <Text
            style={[
              styles.navText,
              { color: colors.muted },
            ]}
          >
            Records
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={onOpenDoctors}
        >
          <Text style={styles.navIcon}>👤</Text>
          <Text
            style={[
              styles.navText,
              { color: colors.muted },
            ]}
          >
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  content: {
    padding: 16,
    paddingBottom: 110,
  },

  hero: {
    borderRadius: 24,
    padding: 22,
    marginBottom: 16,
  },

  heroTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  greeting: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },

  heroName: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
    marginTop: 4,
  },

  heroSub: {
    color: '#FFFFFF',
    opacity: 0.9,
    fontSize: 14,
    marginTop: 12,
    marginBottom: 14,
  },

  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  notificationIcon: {
    fontSize: 20,
  },

  searchBox: {
    minHeight: 54,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },

  searchIcon: {
    fontSize: 18,
    marginRight: 10,
  },

  searchText: {
    fontSize: 14,
    flex: 1,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
  },

  seeAll: {
    fontSize: 13,
    fontWeight: '700',
  },

  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 24,
  },

  quickItem: {
    width: '48%',
    minHeight: 118,
    borderRadius: 18,
    padding: 15,
    elevation: 2,
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },

  quickIcon: {
    fontSize: 27,
    marginBottom: 10,
  },

  quickTitle: {
    fontSize: 15,
    fontWeight: '800',
  },

  quickSub: {
    fontSize: 12,
    marginTop: 4,
  },

  appointmentCard: {
    marginBottom: 20,
  },

  appointmentTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },

  doctorAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#EEF4FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarText: {
    fontSize: 25,
  },

  doctorName: {
    fontSize: 17,
    fontWeight: '800',
  },

  cardText: {
    fontSize: 13,
    lineHeight: 20,
  },

  statusBadge: {
    backgroundColor: '#E7F7ED',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 20,
  },

  statusText: {
    color: '#198754',
    fontSize: 11,
    fontWeight: '700',
  },

  appointmentInfo: {
    borderTopWidth: 1,
    paddingTop: 14,
    marginBottom: 15,
    gap: 5,
  },

  infoText: {
    fontSize: 13,
  },

  aiCard: {
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 2,
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },

  aiIconBox: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: '#EEF4FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 13,
  },

  aiIcon: {
    fontSize: 26,
  },

  aiTitle: {
    fontSize: 16,
    fontWeight: '800',
  },

  aiText: {
    fontSize: 12,
    lineHeight: 18,
    marginTop: 4,
  },

  arrow: {
    fontSize: 30,
    fontWeight: '300',
    marginLeft: 8,
  },

  queueCard: {
    marginBottom: 24,
  },

  queueHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  queueBadge: {
    backgroundColor: '#FDECEC',
    borderRadius: 20,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },

  queueBadgeText: {
    color: '#DC3545',
    fontSize: 10,
    fontWeight: '800',
  },

  queueNumber: {
    alignItems: 'center',
    marginVertical: 16,
  },

  queueBig: {
    fontSize: 38,
    fontWeight: '900',
  },

  queueWaiting: {
    fontSize: 12,
    marginTop: 2,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 5,
  },

  healthCard: {
    marginBottom: 24,
  },

  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  statBox: {
    flex: 1,
    alignItems: 'center',
  },

  statValue: {
    fontSize: 25,
    fontWeight: '900',
  },

  statLabel: {
    fontSize: 12,
    marginTop: 4,
  },

  statDivider: {
    width: 1,
    height: 40,
  },

  moreCard: {
    marginTop: 24,
    marginBottom: 20,
  },

  moreGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 10,
  },

  moreItem: {
    width: '48%',
    minHeight: 80,
    borderRadius: 14,
    padding: 12,
    backgroundColor: '#F7F9FC',
  },

  moreIcon: {
    fontSize: 22,
    marginBottom: 7,
  },

  moreText: {
    fontSize: 12,
    fontWeight: '700',
  },

  signOut: {
    marginTop: 4,
    marginBottom: 20,
  },

  bottomNav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 76,
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 6,
    elevation: 10,
  },

  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 55,
  },

  navIcon: {
    fontSize: 20,
    marginBottom: 3,
  },

  navText: {
    fontSize: 10,
    fontWeight: '700',
  },

  centerNav: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -20,
    marginBottom: 1,
  },

  centerNavIcon: {
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: '400',
  },
});