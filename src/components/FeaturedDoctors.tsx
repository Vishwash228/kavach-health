import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Card from "./Card";
import Button from "./Button";
import { useTheme } from "../theme/ThemeContext";

type Props = {
  onBook: () => void;
};

export default function FeaturedDoctors({ onBook }: Props) {
  const { colors } = useTheme();

  const doctors = [
    {
      id: 1,
      name: "Dr. Neha Singh",
      specialty: "Cardiologist",
      rating: "⭐ 4.9",
    },
    {
      id: 2,
      name: "Dr. Raj Verma",
      specialty: "Orthopedic",
      rating: "⭐ 4.8",
    },
    {
      id: 3,
      name: "Dr. Priya Sharma",
      specialty: "Dermatologist",
      rating: "⭐ 4.7",
    },
  ];

  return (
    <Card style={{ marginBottom: 20 }}>
      <Text style={[styles.title, { color: colors.text }]}>
        👨‍⚕️ Featured Doctors
      </Text>

      {doctors.map((doctor) => (
        <Card key={doctor.id} style={styles.doctorCard}>
          <Text style={[styles.name, { color: colors.text }]}>
            {doctor.name}
          </Text>

          <Text style={{ color: colors.muted }}>
            {doctor.specialty}
          </Text>

          <Text style={{ color: colors.muted }}>
            {doctor.rating}
          </Text>

          <View style={{ marginTop: 10 }}>
            <Button
              title="Book Appointment"
              onPress={onBook}
            />
          </View>
        </Card>
      ))}
    </Card>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
  },

  doctorCard: {
    marginTop: 15,
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
  },
});