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
  updateDoc,
  doc,
  orderBy,
  query,
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

export default function ReceptionDashboardScreen({
  onBack,
}: Props = {}) {
  const { colors } = useTheme();

  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const loadAppointments = async () => {
    try {
      setLoading(true);

      const q = query(
        collection(db, "appointments"),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }));

      setAppointments(data);
    } catch (error) {
      console.log("Reception error:", error);
      setMessage("❌ Unable to load appointments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const checkInPatient = async (id: string) => {
    try {
      await updateDoc(
        doc(db, "appointments", id),
        {
          status: "checked-in",
        }
      );

      setAppointments((current) =>
        current.map((item) =>
          item.id === id
            ? {
                ...item,
                status: "checked-in",
              }
            : item
        )
      );

      setMessage("✅ Patient checked in successfully.");
    } catch (error) {
      console.log("Check-in error:", error);
      setMessage("❌ Failed to check in patient.");
    }
  };

  const completeAppointment = async (id: string) => {
    try {
      await updateDoc(
        doc(db, "appointments", id),
        {
          status: "completed",
        }
      );

      setAppointments((current) =>
        current.map((item) =>
          item.id === id
            ? {
                ...item,
                status: "completed",
              }
            : item
        )
      );

      setMessage("✅ Appointment marked completed.");
    } catch (error) {
      console.log("Complete error:", error);
      setMessage("❌ Failed to update appointment.");
    }
  };

  const checkedIn = appointments.filter(
    (item) => item.status === "checked-in"
  ).length;

  const completed = appointments.filter(
    (item) => item.status === "completed"
  ).length;

  const pending = appointments.filter(
    (item) =>
      item.status === "confirmed" ||
      !item.status
  ).length;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <HeaderBar
        title="Reception Dashboard"
        subtitle="Patient check-in & OPD management"
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
        <Text
          style={[
            styles.title,
            { color: colors.text },
          ]}
        >
          🏥 Reception Dashboard
        </Text>

        <Text
          style={[
            styles.subtitle,
            { color: colors.muted },
          ]}
        >
          Manage appointments, patient check-in
          and OPD flow.
        </Text>

        {message ? (
          <StatusBanner
            message={message}
            tone="success"
          />
        ) : null}

        {/* STATISTICS */}

        <View style={styles.statsRow}>
          <Card style={styles.statCard}>
            <Text
              style={[
                styles.number,
                { color: colors.primary },
              ]}
            >
              {appointments.length}
            </Text>

            <Text style={styles.statLabel}>
              Total
            </Text>
          </Card>

          <Card style={styles.statCard}>
            <Text
              style={[
                styles.number,
                { color: "#F59E0B" },
              ]}
            >
              {pending}
            </Text>

            <Text style={styles.statLabel}>
              Waiting
            </Text>
          </Card>

          <Card style={styles.statCard}>
            <Text
              style={[
                styles.number,
                { color: "#16A34A" },
              ]}
            >
              {checkedIn}
            </Text>

            <Text style={styles.statLabel}>
              Checked-in
            </Text>
          </Card>
        </View>

        {/* APPOINTMENTS */}

        <Card style={styles.card}>
          <Text
            style={[
              styles.sectionTitle,
              { color: colors.text },
            ]}
          >
            📋 Appointment Queue
          </Text>

          {loading ? (
            <Text style={styles.empty}>
              Loading appointments...
            </Text>
          ) : appointments.length === 0 ? (
            <Text style={styles.empty}>
              No appointments found.
            </Text>
          ) : (
            appointments.map((item) => (
              <View
                key={item.id}
                style={styles.appointment}
              >
                <View style={{ flex: 1 }}>
                  <Text
                    style={[
                      styles.patient,
                      { color: colors.text },
                    ]}
                  >
                    👤{" "}
                    {item.patientName ||
                      "Guest Patient"}
                  </Text>

                  <Text style={styles.info}>
                    🎟 Token:{" "}
                    {item.tokenNumber || "N/A"}
                  </Text>

                  <Text style={styles.info}>
                    👨‍⚕️{" "}
                    {item.doctorName || "N/A"}
                  </Text>

                  <Text style={styles.info}>
                    🏥{" "}
                    {item.hospitalName || "N/A"}
                  </Text>

                  <Text style={styles.info}>
                    ⏰{" "}
                    {item.time || "N/A"}
                  </Text>

                  <Text
                    style={[
                      styles.status,
                      {
                        color:
                          item.status ===
                          "completed"
                            ? "#16A34A"
                            : item.status ===
                              "checked-in"
                            ? "#2563EB"
                            : "#F59E0B",
                      },
                    ]}
                  >
                    Status:{" "}
                    {item.status ||
                      "confirmed"}
                  </Text>
                </View>

                <View style={styles.buttons}>
                  {item.status !==
                    "checked-in" &&
                    item.status !==
                      "completed" && (
                      <Button
                        title="Check-in"
                        onPress={() =>
                          checkInPatient(
                            item.id
                          )
                        }
                        variant="secondary"
                      />
                    )}

                  {item.status ===
                    "checked-in" && (
                    <Button
                      title="Complete"
                      onPress={() =>
                        completeAppointment(
                          item.id
                        )
                      }
                    />
                  )}
                </View>
              </View>
            ))
          )}
        </Card>

        <Button
          title="🔄 Refresh Appointments"
          onPress={loadAppointments}
        />

        <View style={{ height: 35 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 25,
    fontWeight: "800",
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 15,
  },

  statsRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 15,
  },

  statCard: {
    flex: 1,
    alignItems: "center",
    padding: 14,
  },

  number: {
    fontSize: 28,
    fontWeight: "900",
  },

  statLabel: {
    fontSize: 12,
    marginTop: 3,
    color: "#64748B",
  },

  card: {
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 10,
  },

  appointment: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    paddingVertical: 14,
  },

  patient: {
    fontSize: 16,
    fontWeight: "800",
  },

  info: {
    fontSize: 13,
    marginTop: 5,
    color: "#64748B",
  },

  status: {
    fontSize: 13,
    fontWeight: "800",
    marginTop: 7,
  },

  buttons: {
    justifyContent: "center",
    marginLeft: 8,
  },

  empty: {
    color: "#64748B",
    paddingVertical: 15,
  },
});