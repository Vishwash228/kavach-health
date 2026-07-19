import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import Card from '../components/Card';
import Button from '../components/Button';
import RoleChip from '../components/RoleChip';
import { authService, AuthSession } from '../services/auth';
import FeaturedDoctors from "../components/FeaturedDoctors";
import SpecialtiesGrid from "../components/SpecialtiesGrid";
import EmergencyCard from "../components/EmergencyCard";
import HealthTips from "../components/HealthTips";
import NotificationsCard from "../components/NotificationsCard";
import MedicineReminder from "../components/MedicineReminder";
import InsuranceCard from "../components/InsuranceCard";

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

export default function HomeScreen({ onSignOut, onOpenMarketplace, onOpenDoctors, onOpenRegistration, onOpenOcr, onOpenBooking, onOpenToken, onOpenQueue, onOpenReception, onOpenDoctorDashboard, onOpenHospitalAdmin, onOpenPartner, onOpenSuperAdmin, onOpenRecords, onOpenPayments, onOpenAi, onOpenEmergency, onOpenDeployment, onOpenModuleHub }: HomeScreenProps) {
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

  const moduleButtons = [
    { title: 'Marketplace', action: onOpenMarketplace },
    { title: 'Doctors', action: onOpenDoctors },
    { title: 'Registration', action: onOpenRegistration },
    { title: 'OCR Register', action: onOpenOcr },
    { title: 'Book Appointment', action: onOpenBooking },
    { title: 'Digital Token', action: onOpenToken },
    { title: 'Live Queue', action: onOpenQueue },
    { title: 'Reception Desk', action: onOpenReception },
    { title: 'Doctor Dashboard', action: onOpenDoctorDashboard },
    { title: 'Hospital Admin', action: onOpenHospitalAdmin },
    { title: 'Partner Portal', action: onOpenPartner },
    { title: 'Super Admin', action: onOpenSuperAdmin },
    { title: 'Health Records', action: onOpenRecords },
    { title: 'Payments', action: onOpenPayments },
    { title: 'AI Assistant', action: onOpenAi },
    { title: 'Emergency', action: onOpenEmergency },
    { title: 'Deployment', action: onOpenDeployment },
  ];

  return (
    <ScrollView 
  style={[
    styles.container,
    { backgroundColor: colors.background }
  ]}
>

<View
  style={[
    styles.hero,
    {
      backgroundColor: colors.primary,
    },
  ]}
>
  <Text style={styles.heroGreeting}>
    👋 Good Morning
  </Text>

  <Text style={styles.heroName}>
    {session?.user.name ?? "Patient"}
  </Text>

  <Text style={styles.heroSub}>
    Stay healthy. Your healthcare is just one tap away.
  </Text>

  <RoleChip label={session?.user.role ?? "patient"} />

</View>
<View
  style={[
    styles.searchBox,
    {
      
      backgroundColor: colors.surface,
      borderColor: colors.border,
    },
  ]}
>
  <Text style={{ color: colors.muted }}>
    🔍 Search doctors, hospitals...
  </Text>
<Card style={styles.quickCard}>

<Text style={[styles.cardTitle,{color:colors.text}]}>
  Quick Actions
</Text>

<View style={styles.grid}>

<Button 
title="📅 Book"
onPress={onOpenBooking}
/>

<Button 
title="🏥 Hospitals"
onPress={onOpenMarketplace}
/>

<Button 
title="🎟 Token"
onPress={onOpenToken}
/>

<Button 
title="🚑 Emergency"
onPress={onOpenEmergency}
/>

</View>

</Card>
<Card style={{ marginBottom: 20 }}>

  <Text style={[styles.cardTitle, { color: colors.text }]}>
    Upcoming Appointment
  </Text>

  <Text style={styles.hospitalName}>
    Dr. Neha Singh
  </Text>

  <Text style={[styles.cardText, { color: colors.muted }]}>
    🏥 Apollo Hospital
  </Text>

  <Text style={[styles.cardText, { color: colors.muted }]}>
    📅 Today • ⏰ 09:00 AM
  </Text>

  <Text style={[styles.cardText, { color: colors.muted }]}>
    🎟 Token: A001
  </Text>

  <View style={{ marginTop: 15 }}>
    <Button
      title="Join Video Consultation"
      onPress={onOpenAi}
    />
  </View>

</Card>
<Card style={{ marginBottom: 20 }}>

  <Text style={[styles.cardTitle, { color: colors.text }]}>
    📊 Health Summary
  </Text>
  <FeaturedDoctors onBook={onOpenBooking} />
  <View style={styles.statsRow}>

    <View style={styles.statBox}>
      <Text style={styles.statValue}>12</Text>
      <Text style={styles.statLabel}>Visits</Text>
    </View>

    <View style={styles.statBox}>
      <Text style={styles.statValue}>3</Text>
      <Text style={styles.statLabel}>Reports</Text>
    </View>

    <View style={styles.statBox}>
      <Text style={styles.statValue}>2</Text>
      <Text style={styles.statLabel}>Medicines</Text>
    </View>

  </View>

</Card>
      <View style={styles.actions}>
        <Button title="View Hospitals" onPress={onOpenMarketplace} />
        <Button title="Find Doctors" onPress={onOpenDoctors} variant="secondary" />
      </View>
      <View style={styles.actions}>
        <Button title="Register Patient" onPress={onOpenRegistration} variant="secondary" />
        <Button title="OCR Register" onPress={onOpenOcr} variant="secondary" />
      </View>
      <View style={styles.actions}>
        <Button title="Book Appointment" onPress={onOpenBooking} />
        <Button title="Digital Token" onPress={onOpenToken} variant="secondary" />
      </View>
      <View style={styles.actions}>
        <Button title="Live Queue" onPress={onOpenQueue} variant="secondary" />
        <Button title="Reception Desk" onPress={onOpenReception} variant="secondary" />
      </View>
      <View style={styles.actions}>
        <Button title="Doctor Dashboard" onPress={onOpenDoctorDashboard} variant="secondary" />
        <Button title="Hospital Admin" onPress={onOpenHospitalAdmin} variant="secondary" />
      </View>
      <View style={styles.actions}>
        <Button title="Partner Portal" onPress={onOpenPartner} variant="secondary" />
        <Button title="Super Admin" onPress={onOpenSuperAdmin} variant="secondary" />
      </View>
      <View style={styles.actions}>
        <Button title="Health Records" onPress={onOpenRecords} variant="secondary" />
        <Button title="Payments" onPress={onOpenPayments} variant="secondary" />
      </View>
      <View style={styles.actions}>
        <Button title="AI Assistant" onPress={onOpenAi} variant="secondary" />
        <Button title="Emergency" onPress={onOpenEmergency} variant="secondary" />
      </View>
      <View style={styles.actions}>
        <Button title="Deployment" onPress={onOpenDeployment} variant="secondary" />
        <Button title="Module Hub" onPress={onOpenModuleHub} variant="secondary" />
      </View>

      <Card style={{ marginTop: 8, marginBottom: 14 }}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>All Modules</Text>
        <Text style={[styles.cardText, { color: colors.muted }]}>Every major module is now available directly from this home screen.</Text>
        {moduleButtons.map((module) => (
          <View key={module.title} style={styles.moduleItem}>
            <Button title={module.title} onPress={module.action} variant="secondary" />
          </View>
        ))}
      </Card>
       <Card style={{ marginBottom: 20 }}>

  <Text style={[styles.cardTitle, { color: colors.text }]}>
    👨‍⚕️ Featured Doctors
  </Text>
  <SpecialtiesGrid onSelect={onOpenDoctors} />
  <Card style={styles.doctorCard}>
    <Text style={styles.doctorName}>Dr. Neha Singh</Text>
    <Text style={[styles.cardText, { color: colors.muted }]}>
      Cardiologist • ⭐ 4.9
    </Text>

    <View style={{ marginTop: 10 }}>
      <Button
        title="Book Appointment"
        onPress={onOpenBooking}
      />
    </View>
  </Card>

  <Card style={styles.doctorCard}>
    <Text style={styles.doctorName}>Dr. Raj Verma</Text>
    <Text style={[styles.cardText, { color: colors.muted }]}>
      Orthopedic • ⭐ 4.8
    </Text>

    <View style={{ marginTop: 10 }}>
      <Button
        title="Book Appointment"
        onPress={onOpenBooking}
      />
    </View>
  </Card>

</Card>
<EmergencyCard onEmergency={onOpenEmergency} />
<HealthTips />
<NotificationsCard />
<MedicineReminder />
<InsuranceCard />
      <View style={styles.actions}>
        <Button title="Sign Out" onPress={handleSignOut} variant="secondary" />
      </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  doctorCard: {
  marginTop: 15,
},

doctorName: {
  fontSize: 18,
  fontWeight: "700",
},
  hospitalName: {
  fontSize: 18,
  fontWeight: "700",
  marginBottom: 8,
},
  searchBox: {
  padding: 16,
  borderRadius: 16,
  borderWidth: 1,
  marginBottom: 20,
},
  quickCard: {
  marginBottom: 20,
},

grid: {
  gap: 12,
},
  hero: {
  borderRadius: 22,
  padding: 24,
  marginBottom: 20,
},
heroGreeting: {
  color: "#fff",
  fontSize: 18,
  fontWeight: "600",
},

heroName: {
  color: "#fff",
  fontSize: 30,
  fontWeight: "800",
  marginTop: 6,
},

heroSub: {
  color: "#fff",
  marginTop: 10,
  marginBottom: 14,
  fontSize: 15,
},
  header: {
    marginBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '800',
  },
  sub: {
    marginTop: 6,
    fontSize: 14,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  cardText: {
    fontSize: 14,
    lineHeight: 20,
  },
  actions: {
    gap: 12,
  },
  moduleItem: {
    marginTop: 8,
  },
  statsRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: 15,
},

statBox: {
  flex: 1,
  alignItems: "center",
},

statValue: {
  fontSize: 26,
  fontWeight: "800",
},

statLabel: {
  marginTop: 6,
  fontSize: 14,
},
});
