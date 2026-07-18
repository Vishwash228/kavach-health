import React, { useEffect, useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import SplashScreen from './src/screens/SplashScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import AuthScreen from './src/screens/AuthScreen';
import HomeScreen from './src/screens/HomeScreen';
import MarketplaceScreen from './src/screens/MarketplaceScreen';
import HospitalDetailsScreen, { HospitalDetailData } from './src/screens/HospitalDetailsScreen';
import DoctorMarketplaceScreen from './src/screens/DoctorMarketplaceScreen';
import PatientRegistrationScreen from './src/screens/PatientRegistrationScreen';
import OcrRegistrationScreen from './src/screens/OcrRegistrationScreen';
import AppointmentBookingScreen from './src/screens/AppointmentBookingScreen';
import DigitalTokenScreen from './src/screens/DigitalTokenScreen';
import LiveQueueScreen from './src/screens/LiveQueueScreen';
import ReceptionDashboardScreen from './src/screens/ReceptionDashboardScreen';
import DoctorDashboardScreen from './src/screens/DoctorDashboardScreen';
import HospitalAdminDashboardScreen from './src/screens/HospitalAdminDashboardScreen';
import PartnerPortalScreen from './src/screens/PartnerPortalScreen';
import SuperAdminScreen from './src/screens/SuperAdminScreen';
import HealthRecordsScreen from './src/screens/HealthRecordsScreen';
import PaymentsScreen from './src/screens/PaymentsScreen';
import AiAssistantScreen from './src/screens/AiAssistantScreen';
import EmergencyScreen from './src/screens/EmergencyScreen';
import DeploymentScreen from './src/screens/DeploymentScreen';
import ModuleHubScreen from './src/screens/ModuleHubScreen';
import { ThemeProvider } from './src/theme/ThemeContext';
import { authService } from './src/services/auth';

export default function App() {
  const [screen, setScreen] = useState<
  | 'splash'
  | 'welcome'
  | 'auth'
  | 'home'
  | 'marketplace'
  | 'hospitalDetails'
  | 'doctors'
  | 'registration'
  | 'ocr'
  | 'booking'
  | 'token'
  | 'queue'
  | 'reception'
  | 'doctorDashboard'
  | 'hospitalAdmin'
  | 'partner'
  | 'superAdmin'
  | 'records'
  | 'payments'
  | 'ai'
  | 'emergency'
  | 'deployment'
  | 'moduleHub'
  | 'patientDashboard'
>('splash');
  const [selectedHospital, setSelectedHospital] = useState<HospitalDetailData | null>(null);
  const [sessionReady, setSessionReady] = useState(false);

  useEffect(() => {
    const loadSession = async () => {
      const session = await authService.getSession();
      if (session) {
        setScreen('home');
      } else {
        setScreen('welcome');
      }
      setSessionReady(true);
    };

    loadSession();
  }, []);

  if (!sessionReady && screen === 'splash') {
    return (
      <ThemeProvider>
        <StatusBar style="light" />
        <SplashScreen onComplete={() => setScreen('welcome')} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <StatusBar style="light" />
      {screen === 'welcome' && <WelcomeScreen onContinue={() => setScreen('auth')} />}
      {screen === 'auth' && <AuthScreen onSuccess={() => setScreen('patientDashboard')} />}
      {screen === 'home' && <HomeScreen onSignOut={() => setScreen('auth')} onOpenMarketplace={() => setScreen('marketplace')} onOpenDoctors={() => setScreen('doctors')} onOpenRegistration={() => setScreen('registration')} onOpenOcr={() => setScreen('ocr')} onOpenBooking={() => setScreen('booking')} onOpenToken={() => setScreen('token')} onOpenQueue={() => setScreen('queue')} onOpenReception={() => setScreen('reception')} onOpenDoctorDashboard={() => setScreen('doctorDashboard')} onOpenHospitalAdmin={() => setScreen('hospitalAdmin')} onOpenPartner={() => setScreen('partner')} onOpenSuperAdmin={() => setScreen('superAdmin')} onOpenRecords={() => setScreen('records')} onOpenPayments={() => setScreen('payments')} onOpenAi={() => setScreen('ai')} onOpenEmergency={() => setScreen('emergency')} onOpenDeployment={() => setScreen('deployment')} onOpenModuleHub={() => setScreen('moduleHub')} />}
      <AuthScreen onSuccess={() => setScreen('home')} />
      {screen === 'marketplace' && <MarketplaceScreen onSelectHospital={(hospital) => { setSelectedHospital(hospital); setScreen('hospitalDetails'); }} />}
      {screen === 'hospitalDetails' && selectedHospital ? <HospitalDetailsScreen hospital={selectedHospital} onBack={() => setScreen('marketplace')} /> : null}
      {screen === 'doctors' && <DoctorMarketplaceScreen />}
      {screen === 'registration' && <PatientRegistrationScreen />}
      {screen === 'ocr' && <OcrRegistrationScreen />}
      {screen === 'booking' && (
       <AppointmentBookingScreen 
         onOpenToken={() => setScreen('token')}
  />
)}
      {screen === 'token' && <DigitalTokenScreen />}
      {screen === 'queue' && <LiveQueueScreen />}
      {screen === 'reception' && <ReceptionDashboardScreen />}
      {screen === 'doctorDashboard' && <DoctorDashboardScreen />}
      {screen === 'hospitalAdmin' && <HospitalAdminDashboardScreen />}
      {screen === 'partner' && <PartnerPortalScreen />}
      {screen === 'superAdmin' && <SuperAdminScreen />}
      {screen === 'records' && <HealthRecordsScreen />}
      {screen === 'payments' && <PaymentsScreen />}
      {screen === 'ai' && <AiAssistantScreen />}
      {screen === 'emergency' && <EmergencyScreen />}
      {screen === 'deployment' && <DeploymentScreen />}
      {screen === 'moduleHub' && <ModuleHubScreen onBack={() => setScreen('home')} onOpenMarketplace={() => setScreen('marketplace')} onOpenDoctors={() => setScreen('doctors')} onOpenRegistration={() => setScreen('registration')} onOpenOcr={() => setScreen('ocr')} onOpenBooking={() => setScreen('booking')} onOpenToken={() => setScreen('token')} onOpenQueue={() => setScreen('queue')} onOpenReception={() => setScreen('reception')} onOpenDoctorDashboard={() => setScreen('doctorDashboard')} onOpenHospitalAdmin={() => setScreen('hospitalAdmin')} onOpenPartner={() => setScreen('partner')} onOpenSuperAdmin={() => setScreen('superAdmin')} onOpenRecords={() => setScreen('records')} onOpenPayments={() => setScreen('payments')} onOpenAi={() => setScreen('ai')} onOpenEmergency={() => setScreen('emergency')} onOpenDeployment={() => setScreen('deployment')} />}
    </ThemeProvider>
  );
}
