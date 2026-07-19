import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Card from "./Card";
import { useTheme } from "../theme/ThemeContext";

export default function InsuranceCard() {
  const { colors } = useTheme();

  return (
    <Card style={{ marginBottom: 20 }}>
      <Text style={[styles.title, { color: colors.text }]}>
        🛡 Health Insurance
      </Text>

      <View style={styles.row}>
        <Text style={[styles.label, { color: colors.muted }]}>Provider</Text>
        <Text style={[styles.value, { color: colors.text }]}>
          Star Health
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={[styles.label, { color: colors.muted }]}>Status</Text>
        <Text style={[styles.active]}>
          ✅ Active
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={[styles.label, { color: colors.muted }]}>Coverage</Text>
        <Text style={[styles.value, { color: colors.text }]}>
          ₹5,00,000
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={[styles.label, { color: colors.muted }]}>Expiry</Text>
        <Text style={[styles.value, { color: colors.text }]}>
          12 Dec 2027
        </Text>
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  label: {
    fontSize: 15,
  },
  value: {
    fontSize: 15,
    fontWeight: "600",
  },
  active: {
    color: "#2E7D32",
    fontWeight: "700",
  },
});