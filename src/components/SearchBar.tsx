import React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SearchBar() {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={22} color="#64748B" />

      <TextInput
        placeholder="Search doctors, hospitals, symptoms..."
        placeholderTextColor="#94A3B8"
        style={styles.input}
      />

      <TouchableOpacity style={styles.aiButton}>
        <Ionicons name="sparkles" size={18} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: -18,
    backgroundColor: "#fff",
    borderRadius: 18,
    paddingHorizontal: 16,
    height: 58,
    flexDirection: "row",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },

  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: "#0F172A",
  },

  aiButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
  },
});