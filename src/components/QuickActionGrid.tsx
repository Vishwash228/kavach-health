import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const services = [
  { title: "Doctors", icon: "medical-outline", color: "#2563EB" },
  { title: "Hospitals", icon: "business-outline", color: "#06B6D4" },
  { title: "Medicines", icon: "medkit-outline", color: "#10B981" },
  { title: "Lab Tests", icon: "flask-outline", color: "#8B5CF6" },
  { title: "Records", icon: "document-text-outline", color: "#F59E0B" },
  { title: "Video", icon: "videocam-outline", color: "#EC4899" },
  { title: "AI", icon: "sparkles-outline", color: "#6366F1" },
  { title: "SOS", icon: "warning-outline", color: "#EF4444" },
];

export default function QuickActionGrid() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Quick Services</Text>

      <View style={styles.grid}>
        {services.map((item, index) => (
          <TouchableOpacity key={index} style={styles.card}>
            <View
              style={[
                styles.iconCircle,
                { backgroundColor: item.color + "15" },
              ]}
            >
              <Ionicons
                name={item.icon as any}
                size={28}
                color={item.color}
              />
            </View>

            <Text style={styles.title}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    paddingHorizontal: 20,
  },

  heading: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 15,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    width: "23%",
    backgroundColor: "#fff",
    borderRadius: 18,
    alignItems: "center",
    paddingVertical: 18,
    marginBottom: 15,

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    marginTop: 10,
    fontSize: 13,
    fontWeight: "600",
    color: "#334155",
    textAlign: "center",
  },
});