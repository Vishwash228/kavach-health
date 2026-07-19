import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Card from "./Card";
import Button from "./Button";
import { useTheme } from "../theme/ThemeContext";

type Props = {
  onEmergency: () => void;
};

export default function EmergencyCard({ onEmergency }: Props) {
  const { colors } = useTheme();

  return (
   <Card
  style={{
    ...styles.card,
    backgroundColor: "#E53935",
  }}
>
      <Text style={styles.title}>🚨 Emergency Help</Text>

      <Text style={styles.subtitle}>
        Need immediate medical assistance?
      </Text>

      <View style={{ marginTop: 15 }}>
        <Button
          title="Call Emergency"
          onPress={onEmergency}
          variant="secondary"
        />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    borderRadius: 18,
  },

  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },

  subtitle: {
    color: "#fff",
    marginTop: 8,
    fontSize: 15,
  },
});