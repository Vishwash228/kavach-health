import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Card from "./Card";
import { useTheme } from "../theme/ThemeContext";

export default function HealthTips() {
  const { colors } = useTheme();

  const tips = [
    "💧 Drink at least 2–3 litres of water every day.",
    "🥗 Eat more fruits and green vegetables.",
    "🏃 Exercise for at least 30 minutes daily.",
    "😴 Sleep 7–8 hours every night.",
  ];

  return (
    <Card style={{ marginBottom: 20 }}>
      <Text style={[styles.title, { color: colors.text }]}>
        📰 Health Tips
      </Text>

      {tips.map((tip, index) => (
        <View
          key={index}
          style={[
            styles.tipBox,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
            },
          ]}
        >
          <Text style={{ color: colors.text }}>{tip}</Text>
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

  tipBox: {
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 10,
  },
});