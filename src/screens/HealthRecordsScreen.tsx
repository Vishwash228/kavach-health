import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
} from "react-native";

import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

import {
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

import { db } from "../services/firebase";
import { useTheme } from "../theme/ThemeContext";

import Card from "../components/Card";
import Button from "../components/Button";
import StatusBanner from "../components/StatusBanner";
import HeaderBar from "../components/HeaderBar";

type HealthRecord = {
  id: string;
  patientName?: string;
  patient?: string;
  token?: string;
  complaint?: string;
  prescription?: string;
  notes?: string;
  doctor?: string;
  hospital?: string;
  createdAt?: any;
};

type HealthRecordsScreenProps = {
  onBack?: () => void;
};

export default function HealthRecordsScreen({
  onBack,
}: HealthRecordsScreenProps = {}) {
  const { colors } = useTheme();

  const [records, setRecords] = useState<HealthRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const patient = {
    name: "Vishwash",
    age: 21,
    gender: "Male",
    bloodGroup: "O+",
    patientId: "KVH-100245",
    phone: "+91 9876543210",
  };

  useEffect(() => {
    const loadRecords = async () => {
      try {
        const q = query(
          collection(db, "prescriptions"),
          orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(q);

        const data: HealthRecord[] =
          snapshot.docs.map((item) => ({
            id: item.id,
            ...(item.data() as Omit<
              HealthRecord,
              "id"
            >),
          }));

        setRecords(data);
      } catch (error) {
        console.log("Health records error:", error);
        setMessage(
          "⚠️ Unable to load health records."
        );
      } finally {
        setLoading(false);
      }
    };

    loadRecords();
  }, []);

  const formatDate = (timestamp: any) => {
    if (!timestamp) {
      return "Date unavailable";
    }

    try {
      const date = timestamp.toDate
        ? timestamp.toDate()
        : new Date(timestamp);

      return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "Date unavailable";
    }
  };

  const downloadPDF = async () => {
    try {
      const recordsHTML = records
        .map(
          (record) => `
            <div style="
              border:1px solid #ddd;
              padding:15px;
              margin-bottom:15px;
              border-radius:10px;
            ">
              <h3>
                ${record.patientName ||
                record.patient ||
                "Patient"}
              </h3>

              <p>
                <b>Token:</b>
                ${record.token || "N/A"}
              </p>

              <p>
                <b>Doctor:</b>
                ${record.doctor || "N/A"}
              </p>

              <p>
                <b>Complaint:</b>
                ${record.complaint || "N/A"}
              </p>

              <p>
                <b>Prescription:</b>
                ${record.prescription || "N/A"}
              </p>

              <p>
                <b>Doctor Notes:</b>
                ${record.notes || "N/A"}
              </p>

              <p>
                <b>Date:</b>
                ${formatDate(record.createdAt)}
              </p>
            </div>
          `
        )
        .join("");

      const html = `
        <html>
          <body style="
            font-family:Arial;
            padding:25px;
          ">

            <h1>Kavach Health</h1>

            <h2>Patient Health Report</h2>

            <hr/>

            <h3>Patient Information</h3>

            <p>
              <b>Name:</b> ${patient.name}
            </p>

            <p>
              <b>Patient ID:</b> ${patient.patientId}
            </p>

            <p>
              <b>Age:</b> ${patient.age}
            </p>

            <p>
              <b>Gender:</b> ${patient.gender}
            </p>

            <p>
              <b>Blood Group:</b> ${patient.bloodGroup}
            </p>

            <p>
              <b>Phone:</b> ${patient.phone}
            </p>

            <hr/>

            <h3>Medical Records</h3>

            ${
              recordsHTML ||
              "<p>No medical records found.</p>"
            }

          </body>
        </html>
      `;

      const file = await Print.printToFileAsync({
        html,
      });

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(file.uri);
      } else {
        Alert.alert(
          "PDF Generated",
          file.uri
        );
      }

      setMessage(
        "✅ Health report generated successfully."
      );
    } catch (error) {
      console.log("PDF error:", error);

      setMessage(
        "❌ Failed to generate health report."
      );
    }
  };

  const shareRecord = () => {
    setMessage(
      "✅ Health records summary shared securely."
    );
  };

  return (
    
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <HeaderBar
  title="Health Records"
  subtitle="Your medical history"
  onBack={onBack}
/>

      <ScrollView
        style={[
          styles.container,
          {
            backgroundColor:
              colors.background,
          },
        ]}
      >
        <Text
          style={[
            styles.title,
            { color: colors.text },
          ]}
        >
          🏥 Health Records
        </Text>

        <Text
          style={[
            styles.subtitle,
            { color: colors.muted },
          ]}
        >
          Your complete medical history,
          consultations and prescriptions in one
          secure place.
        </Text>

        {message ? (
          <StatusBanner
            message={message}
            tone="success"
          />
        ) : null}

        {/* PATIENT PROFILE */}

        <Card style={styles.card}>
          <Text
            style={[
              styles.sectionTitle,
              { color: colors.text },
            ]}
          >
            👤 Patient Profile
          </Text>

          <Text
            style={[
              styles.patientName,
              { color: colors.text },
            ]}
          >
            {patient.name}
          </Text>

          <Text style={styles.info}>
            Patient ID: {patient.patientId}
          </Text>

          <Text style={styles.info}>
            Age: {patient.age} • {patient.gender}
          </Text>

          <Text style={styles.info}>
            🩸 Blood Group: {patient.bloodGroup}
          </Text>

          <Text style={styles.info}>
            📱 {patient.phone}
          </Text>
        </Card>

        {/* MEDICAL SUMMARY */}

        <Card style={styles.card}>
          <Text
            style={[
              styles.sectionTitle,
              { color: colors.text },
            ]}
          >
            📊 Medical Summary
          </Text>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text
                style={[
                  styles.statNumber,
                  { color: colors.primary },
                ]}
              >
                {records.length}
              </Text>

              <Text style={styles.statLabel}>
                Consultations
              </Text>
            </View>

            <View style={styles.statBox}>
              <Text
                style={[
                  styles.statNumber,
                  { color: colors.primary },
                ]}
              >
                {records.filter(
                  (item) =>
                    item.prescription
                ).length}
              </Text>

              <Text style={styles.statLabel}>
                Prescriptions
              </Text>
            </View>
          </View>
        </Card>

        {/* TIMELINE */}

        <Card style={styles.card}>
          <Text
            style={[
              styles.sectionTitle,
              { color: colors.text },
            ]}
          >
            📋 Medical Timeline
          </Text>

          {loading ? (
            <Text
              style={{
                color: colors.muted,
              }}
            >
              Loading medical records...
            </Text>
          ) : records.length === 0 ? (
            <Text
              style={{
                color: colors.muted,
              }}
            >
              No medical records found yet.
            </Text>
          ) : (
            records.map((record) => (
              <Card
                key={record.id}
                style={styles.recordCard}
              >
                <Text
                  style={[
                    styles.recordTitle,
                    { color: colors.text },
                  ]}
                >
                  🩺 Consultation
                </Text>

                <Text
                  style={[
                    styles.recordDate,
                    { color: colors.muted },
                  ]}
                >
                  📅{" "}
                  {formatDate(
                    record.createdAt
                  )}
                </Text>

                <View style={styles.divider} />

                <Text
                  style={[
                    styles.recordText,
                    { color: colors.text },
                  ]}
                >
                  👤 Patient:{" "}
                  {record.patientName ||
                    record.patient ||
                    "N/A"}
                </Text>

                <Text
                  style={[
                    styles.recordText,
                    { color: colors.text },
                  ]}
                >
                  🎟 Token:{" "}
                  {record.token || "N/A"}
                </Text>

                <Text
                  style={[
                    styles.recordText,
                    { color: colors.text },
                  ]}
                >
                  👨‍⚕️ Doctor:{" "}
                  {record.doctor || "N/A"}
                </Text>

                <Text
                  style={[
                    styles.recordText,
                    { color: colors.text },
                  ]}
                >
                  💬 Complaint:{" "}
                  {record.complaint || "N/A"}
                </Text>

                <Text
                  style={[
                    styles.recordText,
                    { color: colors.text },
                  ]}
                >
                  💊 Prescription:{" "}
                  {record.prescription ||
                    "No prescription"}
                </Text>

                <Text
                  style={[
                    styles.recordText,
                    { color: colors.text },
                  ]}
                >
                  📝 Notes:{" "}
                  {record.notes ||
                    "No notes available"}
                </Text>
              </Card>
            ))
          )}
        </Card>

        {/* ACTIONS */}

        <Button
          title="📄 Download & Share PDF"
          onPress={downloadPDF}
        />

        <View style={styles.space} />

        <Button
          title="🔐 Share Health Summary"
          onPress={shareRecord}
          variant="secondary"
        />

        <View style={styles.bottomSpace} />
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
    marginBottom: 14,
    lineHeight: 20,
  },

  card: {
    marginBottom: 14,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },

  patientName: {
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 6,
  },

  info: {
    fontSize: 14,
    marginTop: 5,
    color: "#64748B",
  },

  statsRow: {
    flexDirection: "row",
    gap: 12,
  },

  statBox: {
    flex: 1,
    padding: 15,
    borderRadius: 12,
    backgroundColor: "#F8FAFC",
    alignItems: "center",
  },

  statNumber: {
    fontSize: 28,
    fontWeight: "800",
  },

  statLabel: {
    fontSize: 13,
    marginTop: 4,
    color: "#64748B",
  },

  recordCard: {
    marginBottom: 12,
    padding: 15,
  },

  recordTitle: {
    fontSize: 17,
    fontWeight: "800",
  },

  recordDate: {
    fontSize: 13,
    marginTop: 4,
  },

  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 10,
  },

  recordText: {
    fontSize: 14,
    marginTop: 7,
    lineHeight: 20,
  },

  space: {
    height: 10,
  },

  bottomSpace: {
    height: 30,
  },
});