import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  collection,
  getDocs,
  orderBy,
  query,
  limit,
} from "firebase/firestore";

import { db } from "../services/firebase";
import { useTheme } from "../theme/ThemeContext";

import Card from "../components/Card";
import Button from "../components/Button";
import StatusBanner from "../components/StatusBanner";
import HeaderBar from "../components/HeaderBar";

type Props = {
  onBack?: () => void;
};

export default function LiveQueueScreen({ onBack }: Props = {}) {
  const { colors } = useTheme();

  const [appointment, setAppointment] = useState<any>(null);
  const [queuePosition, setQueuePosition] = useState(1);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const loadQueue = async () => {
    try {
      setLoading(true);

      const q = query(
        collection(db, "appointments"),
        orderBy("createdAt", "desc"),
        limit(20)
      );

      const snapshot = await getDocs(q);

      const appointments = snapshot.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }));

      if (appointments.length > 0) {
        const latest = appointments[0];

        setAppointment(latest);

        const position =
          appointments.findIndex(
            (item) => item.id === latest.id
          ) + 1;

        setQueuePosition(position || 1);

        setMessage("✅ Live queue updated.");
      } else {
        setMessage("No active appointments found.");
      }
    } catch (error) {
      console.log("Queue error:", error);
      setMessage("❌ Unable to load live queue.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQueue();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <HeaderBar
        title="Live Queue"
        subtitle="Track your OPD position"
        onBack={onBack}
      />

      <ScrollView
        style={[
          styles.container,
          {
            backgroundColor: colors.background,
          },
        ]}
      >
        {message ? (
          <StatusBanner
            message={message}
            tone="info"
          />
        ) : null}

        {loading ? (
          <Text
            style={[
              styles.loading,
              { color: colors.muted },
            ]}
          >
            Loading live queue...
          </Text>
        ) : appointment ? (
          <>
            {/* TOKEN */}

            <Card style={styles.tokenCard}>
              <Text style={styles.tokenLabel}>
                🎟 YOUR TOKEN
              </Text>

              <Text
                style={[
                  styles.token,
                  { color: colors.primary },
                ]}
              >
                {appointment.tokenNumber || "N/A"}
              </Text>

              <Text
                style={[
                  styles.status,
                  { color: colors.primary },
                ]}
              >
                ● {appointment.status || "confirmed"}
              </Text>
            </Card>

            {/* QUEUE POSITION */}

            <Card style={styles.queueCard}>
              <Text
                style={[
                  styles.sectionTitle,
                  { color: colors.text },
                ]}
              >
                🔄 Current Queue
              </Text>

              <Text
                style={[
                  styles.position,
                  { color: colors.primary },
                ]}
              >
                #{queuePosition}
              </Text>

              <Text
                style={[
                  styles.positionLabel,
                  { color: colors.muted },
                ]}
              >
                Your Queue Position
              </Text>
            </Card>

            {/* DOCTOR */}

            <Card style={styles.card}>
              <Text
                style={[
                  styles.sectionTitle,
                  { color: colors.text },
                ]}
              >
                👨‍⚕️ Doctor Information
              </Text>

              <Text style={styles.info}>
                Doctor: {appointment.doctorName || "N/A"}
              </Text>

              <Text style={styles.info}>
                🩺 Department:{" "}
                {appointment.department || "N/A"}
              </Text>

              <Text style={styles.info}>
                🏥 Hospital:{" "}
                {appointment.hospitalName || "N/A"}
              </Text>

              <Text style={styles.info}>
                📅 Date: {appointment.date || "N/A"}
              </Text>

              <Text style={styles.info}>
                ⏰ Time: {appointment.time || "N/A"}
              </Text>
            </Card>

            {/* QUEUE STATUS */}

            <Card style={styles.card}>
              <Text
                style={[
                  styles.sectionTitle,
                  { color: colors.text },
                ]}
              >
                📢 Queue Status
              </Text>

              <Text
                style={[
                  styles.queueMessage,
                  { color: colors.text },
                ]}
              >
                Please stay available. You will be
                notified when your turn approaches.
              </Text>
            </Card>

            <Button
              title="🔄 Refresh Queue"
              onPress={loadQueue}
            />
          </>
        ) : (
          <Card style={styles.card}>
            <Text
              style={[
                styles.empty,
                { color: colors.muted },
              ]}
            >
              No active appointment found.
            </Text>
          </Card>
        )}

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  loading: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 15,
  },

  tokenCard: {
    marginTop: 20,
    alignItems: "center",
    padding: 25,
  },

  tokenLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: "#64748B",
  },

  token: {
    fontSize: 50,
    fontWeight: "900",
    marginVertical: 10,
  },

  status: {
    fontSize: 14,
    fontWeight: "700",
  },

  queueCard: {
    marginTop: 15,
    alignItems: "center",
    padding: 25,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 12,
  },

  position: {
    fontSize: 48,
    fontWeight: "900",
  },

  positionLabel: {
    fontSize: 14,
    marginTop: 4,
  },

  card: {
    marginTop: 15,
    marginBottom: 10,
  },

  info: {
    fontSize: 15,
    marginTop: 8,
    color: "#475569",
  },

  queueMessage: {
    fontSize: 14,
    lineHeight: 21,
  },

  empty: {
    textAlign: "center",
    fontSize: 15,
  },
});