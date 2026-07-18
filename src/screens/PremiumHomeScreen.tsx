import React from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import HeroBanner from "../components/HeroBanner";
import AppHeader from "../components/AppHeader";
import QuickActionGrid from "../components/QuickActionGrid";
import NearbyHospitals from "../components/NearbyHospitals";
import SearchBar from "../components/SearchBar";

export default function PremiumHomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
  <ScrollView showsVerticalScrollIndicator={false}>
    <AppHeader />
    <SearchBar />
    <HeroBanner />
    <QuickActionGrid />

  </ScrollView>
</SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
});