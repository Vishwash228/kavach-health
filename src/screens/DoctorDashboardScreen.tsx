import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
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

export default function DoctorDashboardScreen({
  onBack,
}: Props = {}) {
  const { colors } = useTheme();

  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [selectedAppointment, setSelectedAppointment] =
    useState<any>(null);

  const [complaint, setComplaint] = useState("");
  const [prescription, setPrescription] = useState("");
  const [notes, setNotes] = useState("");

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
      console.log("Doctor dashboard error:", error);
      setMessage("❌ Unable to load appointments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const savePrescription = async () => {
    if (!selectedAppointment) {
      setMessage("Please select a patient first.");
      return;
    }

    if (!prescription.trim()) {
      setMessage("Please enter prescription.");
      return;
    }

    try {
      await addDoc(collection(db, "prescriptions"), {
        patientName:
          selectedAppointment.patientName || "Patient",

        token:
          selectedAppointment.tokenNumber || "N/A",

        doctor:
          selectedAppointment.doctorName || "Doctor",

        hospital:
          selectedAppointment.hospitalName || "Hospital",

        complaint:
          complaint || "Not provided",

        prescription:
          prescription,

        notes:
          notes || "No additional notes",

        appointmentId:
          selectedAppointment.id,

        createdAt: serverTimestamp(),
      });

      setMessage(
        "✅ Prescription saved successfully."
      );

      setComplaint("");
      setPrescription("");
      setNotes("");

      setSelectedAppointment(null);
    } catch (error) {
      console.log("Prescription error:", error);

      setMessage(
        "❌ Failed to save prescription."
      );
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <HeaderBar
        title="Doctor Dashboard"
        subtitle="Appointments & patient care"
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
          👨‍⚕️ Doctor Dashboard
        </Text>

        <Text
          style={[
            styles.subtitle,
            { color: colors.muted },
          ]}
        >
          Manage today's patients and create digital
          prescriptions.
        </Text>

        {message ? (
          <StatusBanner
            message={message}
            tone="success"
          />
        ) : null}

        {/* STATISTICS */}

        <Card style={styles.card}>
          <Text
            style={[
              styles.sectionTitle,
              { color: colors.text },
            ]}
          >
            📊 Today's Appointments
          </Text>

          <Text
            style={[
              styles.bigNumber,
              { color: colors.primary },
            ]}
          >
            {appointments.length}
          </Text>

          <Text
            style={{
              color: colors.muted,
            }}
          >
            Total booked appointments
          </Text>
        </Card>

        {/* APPOINTMENTS */}

        <Card style={styles.card}>
          <Text
            style={[
              styles.sectionTitle,
              { color: colors.text },
            ]}
          >
            📋 Patient Queue
          </Text>

          {loading ? (
            <Text
              style={{ color: colors.muted }}
            >
              Loading appointments...
            </Text>
          ) : appointments.length === 0 ? (
            <Text
              style={{ color: colors.muted }}
            >
              No appointments found.
            </Text>
          ) : (
            appointments.map((item) => (
              <View
                key={item.id}
                style={styles.patientRow}
              >
                <View style={{ flex: 1 }}>
                  <Text
                    style={[
                      styles.patientName,
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
                    🏥{" "}
                    {item.hospitalName || "Hospital"}
                  </Text>

                  <Text style={styles.info}>
                    🩺{" "}
                    {item.department || "Department"}
                  </Text>

                  <Text style={styles.info}>
                    ⏰{" "}
                    {item.time || "Time unavailable"}
                  </Text>
                </View>

                <Button
                  title="Open"
                  onPress={() =>
                    setSelectedAppointment(item)
                  }
                  variant="secondary"
                />
              </View>
            ))
          )}
        </Card>

        {/* PATIENT CONSULTATION */}

        {selectedAppointment && (
          <Card style={styles.card}>
            <Text
              style={[
                styles.sectionTitle,
                { color: colors.text },
              ]}
            >
              🩺 Patient Consultation
            </Text>

            <Text
              style={[
                styles.patientName,
                { color: colors.text },
              ]}
            >
              {selectedAppointment.patientName ||
                "Guest Patient"}
            </Text>

            <Text style={styles.info}>
              🎟 Token:{" "}
              {selectedAppointment.tokenNumber ||
                "N/A"}
            </Text>

            <Text style={styles.label}>
              Patient Complaint
            </Text>

            <TextInput
              placeholder="Enter patient's complaint..."
              placeholderTextColor="#94A3B8"
              value={complaint}
              onChangeText={setComplaint}
              multiline
              style={styles.input}
            />

            <Text style={styles.label}>
              Prescription
            </Text>

            <TextInput
              placeholder="Enter medicines / prescription..."
              placeholderTextColor="#94A3B8"
              value={prescription}
              onChangeText={setPrescription}
              multiline
              style={styles.input}
            />

            <Text style={styles.label}>
              Doctor Notes
            </Text>

            <TextInput
              placeholder="Enter additional notes..."
              placeholderTextColor="#94A3B8"
              value={notes}
              onChangeText={setNotes}
              multiline
              style={styles.input}
            />

            <Button
              title="💾 Save Prescription"
              onPress={savePrescription}
            />
          </Card>
        )}

        <View style={{ height: 40 }} />
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

  card: {
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 12,
  },

  bigNumber: {
    fontSize: 40,
    fontWeight: "900",
  },

  patientRow: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    paddingVertical: 12,
  },

  patientName: {
    fontSize: 16,
    fontWeight: "800",
  },

  info: {
    fontSize: 13,
    marginTop: 5,
    color: "#64748B",
  },

  label: {
    fontSize: 15,
    fontWeight: "700",
    marginTop: 15,
    marginBottom: 7,
  },

  input: {
    minHeight: 90,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 12,
    padding: 12,
    backgroundColor: "#FFFFFF",
    textAlignVertical: "top",
    fontSize: 14,
    color: "#0F172A",
  },
});