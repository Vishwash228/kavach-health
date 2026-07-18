import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function HeroBanner() {
  return (
    <LinearGradient
      colors={["#2563EB", "#38BDF8"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.left}>
        <Text style={styles.title}>Your Health,{"\n"}Our Priority 💙</Text>

        <Text style={styles.subtitle}>
          Book appointments, consult doctors and manage your health in one place.
        </Text>

        <TouchableOpacity style={styles.button}>
          <Ionicons name="calendar-outline" size={18} color="#2563EB" />
          <Text style={styles.buttonText}>Book Appointment</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.right}>
        <Ionicons name="medkit" size={90} color="white" />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 24,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  left: {
    flex: 1,
  },

  title: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "700",
  },

  subtitle: {
    color: "#E0F2FE",
    marginTop: 10,
    fontSize: 14,
    lineHeight: 20,
  },

  button: {
    marginTop: 20,
    backgroundColor: "#fff",
    alignSelf: "flex-start",
    borderRadius: 50,
    paddingHorizontal: 18,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  buttonText: {
    color: "#2563EB",
    fontWeight: "700",
    marginLeft: 8,
  },

  right: {
    marginLeft: 15,
  },
});