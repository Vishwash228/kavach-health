import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Card from "./Card";
import { useTheme } from "../theme/ThemeContext";

type Props = {
  onSelect?: () => void;
};

export default function SpecialtiesGrid({ onSelect }: Props) {
  const { colors } = useTheme();

  const specialties = [
    "❤️ Cardiology",
    "🦷 Dental",
    "👁 Eye",
    "🧒 Pediatrics",
    "🧠 Neurology",
    "🦴 Orthopedic",
    "🌸 Gynecology",
    "🩺 General",
  ];

  return (
    <Card style={{ marginBottom: 20 }}>
      <Text style={[styles.title, { color: colors.text }]}>
        Medical Specialties
      </Text>

      <View style={styles.grid}>
        {specialties.map((item) => (
          <Pressable
            key={item}
            style={[
              styles.box,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
            onPress={onSelect}
          >
            <Text style={{ color: colors.text, textAlign: "center" }}>
              {item}
            </Text>
          </Pressable>
        ))}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 15,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  box: {
    width: "48%",
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 12,
    alignItems: "center",
  },
});