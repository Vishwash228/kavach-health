import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Card from "./Card";
import { useTheme } from "../theme/ThemeContext";

export default function MedicineReminder() {
  const { colors } = useTheme();

  const medicines = [
    { name: "💊 Paracetamol", time: "8:00 AM" },
    { name: "❤️ BP Tablet", time: "2:00 PM" },
    { name: "🌙 Vitamin D", time: "9:00 PM" },
  ];

  return (
    <Card style={{ marginBottom: 20 }}>
      <Text style={[styles.title, { color: colors.text }]}>
        💊 Medicine Reminder
      </Text>

      {medicines.map((item, index) => (
        <View
          key={index}
          style={[
            styles.row,
            {
              borderColor: colors.border,
              backgroundColor: colors.surface,
            },
          ]}
        >
          <Text style={{ color: colors.text }}>{item.name}</Text>
          <Text style={{ color: colors.primary, fontWeight: "700" }}>
            {item.time}
          </Text>
        </View>
      ))}
    </Card>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 15,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 10,
  },
});