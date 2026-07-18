import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function AppHeader() {
  return (
    <LinearGradient
      colors={["#2563EB", "#3B82F6"]}
      style={styles.container}
    >
      <View style={styles.left}>
        <Text style={styles.greeting}>👋 Good Morning</Text>
        <Text style={styles.name}>Vishwash</Text>

        <View style={styles.locationRow}>
          <Ionicons name="location" size={16} color="#E0F2FE" />
          <Text style={styles.location}>Sirsa, Haryana</Text>
        </View>
      </View>

      <View style={styles.right}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="notifications-outline" size={24} color="#fff" />
        </TouchableOpacity>

        <Image
          source={{
            uri: "https://i.pravatar.cc/150?img=12",
          }}
          style={styles.avatar}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 55,
    paddingBottom: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  left: {
    flex: 1,
  },

  greeting: {
    color: "#DBEAFE",
    fontSize: 15,
  },

  name: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
    marginTop: 5,
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  location: {
    color: "#E0F2FE",
    marginLeft: 5,
    fontSize: 14,
  },

  right: {
    alignItems: "center",
  },

  iconButton: {
    marginBottom: 15,
  },

  avatar: {
    width: 55,
    height: 55,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#fff",
  },
});