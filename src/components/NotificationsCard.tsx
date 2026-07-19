import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Card from "./Card";
import { useTheme } from "../theme/ThemeContext";

export default function NotificationsCard() {
  const { colors } = useTheme();

  const notifications = [
    {
      id: 1,
      title: "📅 Appointment Reminder",
      message: "Your appointment with Dr. Neha Singh is today at 3:00 PM.",
    },
    {
      id: 2,
      title: "🎫 Token Update",
      message: "Your token A-204 is now only 3 patients away.",
    },
    {
      id: 3,
      title: "💳 Payment Successful",
      message: "Your OPD payment has been received successfully.",
    },
  ];

  return (
    <Card style={{ marginBottom: 20 }}>
      <Text style={[styles.title, { color: colors.text }]}>
        🔔 Notifications
      </Text>

      {notifications.map((item) => (
        <View
          key={item.id}
          style={[
            styles.notificationBox,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
            },
          ]}
        >
          <Text style={[styles.notificationTitle, { color: colors.text }]}>
            {item.title}
          </Text>

          <Text style={{ color: colors.muted }}>
            {item.message}
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

  notificationBox: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },

  notificationTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
});