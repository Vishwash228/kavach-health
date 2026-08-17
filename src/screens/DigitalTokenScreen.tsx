import React, { useEffect, useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../services/firebase";

import { useTheme } from "../theme/ThemeContext";
import Card from "../components/Card";
import Button from "../components/Button";
import StatusBanner from "../components/StatusBanner";
import HeaderBar from "../components/HeaderBar";
import QRCode from "react-native-qrcode-svg";

type DigitalTokenScreenProps = {
  onBack?: () => void;
  onOpenQueue?: () => void;
};

export default function DigitalTokenScreen({
  onBack,
  onOpenQueue,
}: DigitalTokenScreenProps) {
  const { colors } = useTheme();

  const [appointment, setAppointment] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [tokenNumber, setTokenNumber] = useState("A-204");
  const [queueNumber, setQueueNumber] = useState("12");
  const [waitingTime, setWaitingTime] = useState("18 mins");

  // Load latest appointment
  useEffect(() => {
    const loadLatestAppointment = async () => {
      try {
        const q = query(
          collection(db, "appointments"),
          orderBy("createdAt", "desc"),
          limit(1)
        );

        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          const data = snapshot.docs[0].data();

          setAppointment(data);

          if (data.tokenNumber) {
            setTokenNumber(String(data.tokenNumber));
          }

          if (data.queueNumber) {
            setQueueNumber(String(data.queueNumber));
          }

          if (data.waitingTime) {
            setWaitingTime(String(data.waitingTime));
          }
        }
      } catch (error) {
        console.log("Error loading appointment:", error);
        setMessage("Unable to load appointment.");
      } finally {
        setLoading(false);
      }
    };

    loadLatestAppointment();
  }, []);

  const generatedSlip = useMemo(
    () =>
      `KAVACH HEALTH

Token: ${tokenNumber}
Queue Position: ${queueNumber}
Estimated Wait: ${waitingTime}

Hospital: ${appointment?.hospitalName || "Apollo Hospital"}
Doctor: ${appointment?.doctorName || "Doctor"}
Department: ${appointment?.department || "Department"}
Date: ${appointment?.date || "Today"}
Time: ${appointment?.time || "09:00 AM"}`,
    [
      tokenNumber,
      queueNumber,
      waitingTime,
      appointment,
    ]
  );

  const handleGenerateToken = () => {
    const newToken = `A-${Math.floor(100 + Math.random() * 900)}`;

    setTokenNumber(newToken);
    setQueueNumber(String(Math.floor(1 + Math.random() * 20)));
    setWaitingTime(`${Math.floor(10 + Math.random() * 30)} mins`);

    setMessage("Digital token generated successfully.");
  };

  const handleShare = () => {
    setMessage("Digital slip ready to share.");
  };

  const handlePrint = () => {
    setMessage("Print request sent to reception.");
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <HeaderBar
        title="Digital Token"
        subtitle="Your OPD queue token"
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
            tone="success"
          />
        ) : null}

        {loading ? (
          <Card style={styles.card}>
            <Text
              style={{
                color: colors.text,
                textAlign: "center",
              }}
            >
              Loading appointment...
            </Text>
          </Card>
        ) : appointment ? (
          <>
            {/* TOKEN */}
            <Card style={styles.tokenCard}>
              <Text
                style={[
                  styles.sectionTitle,
                  { color: colors.text },
                ]}
              >
                🎟️ Your Digital OPD Token
              </Text>

              <Text
                style={[
                  styles.token,
                  { color: colors.primary },
                ]}
              >
                {tokenNumber}
              </Text>

              <Text
                style={[
                  styles.meta,
                  { color: colors.muted },
                ]}
              >
                Queue Position: {queueNumber}
              </Text>

              <Text
                style={[
                  styles.meta,
                  { color: colors.muted },
                ]}
              >
                Estimated Waiting Time: {waitingTime}
              </Text>
            </Card>

            {/* APPOINTMENT DETAILS */}
            <Card style={styles.card}>
              <Text
                style={[
                  styles.sectionTitle,
                  { color: colors.text },
                ]}
              >
                📋 Appointment Details
              </Text>

              <View style={styles.detailBox}>
                <Text style={styles.label}>👤 Patient</Text>
                <Text style={styles.value}>
                  {appointment.patientName || "Guest User"}
                </Text>

                <Text style={styles.label}>🏥 Hospital</Text>
                <Text style={styles.value}>
                  {appointment.hospitalName || "Apollo Hospital"}
                </Text>

                <Text style={styles.label}>👨‍⚕️ Doctor</Text>
                <Text style={styles.value}>
                  {appointment.doctorName || "Doctor"}
                </Text>

                <Text style={styles.label}>🩺 Department</Text>
                <Text style={styles.value}>
                  {appointment.department || "Department"}
                </Text>

                <Text style={styles.label}>📅 Date</Text>
                <Text style={styles.value}>
                  {appointment.date || "Today"}
                </Text>

                <Text style={styles.label}>🕒 Time</Text>
                <Text style={styles.value}>
                  {appointment.time || "09:00 AM"}
                </Text>

                <Text style={styles.label}>📌 Status</Text>
                <Text
                  style={[
                    styles.value,
                    {
                      color: "green",
                      fontWeight: "700",
                    },
                  ]}
                >
                  {appointment.status || "Confirmed"}
                </Text>
              </View>
            </Card>

            {/* QR CODE */}
            <Card style={styles.card}>
              <Text
                style={[
                  styles.sectionTitle,
                  { color: colors.text },
                ]}
              >
                📱 Scan at Hospital
              </Text>

              <Text
                style={[
                  styles.qrSubtitle,
                  { color: colors.muted },
                ]}
              >
                Show this QR code at reception for quick
                check-in.
              </Text>

              <View style={styles.qrContainer}>
                <QRCode
                  value={JSON.stringify({
                    token: tokenNumber,
                    hospital:
                      appointment.hospitalName ||
                      "Apollo Hospital",
                    doctor:
                      appointment.doctorName ||
                      "Doctor",
                    patient:
                      appointment.patientName ||
                      "Guest User",
                    department:
                      appointment.department ||
                      "Department",
                    date:
                      appointment.date ||
                      "Today",
                    time:
                      appointment.time ||
                      "09:00 AM",
                  })}
                  size={200}
                  backgroundColor="white"
                />
              </View>

              <Text
                style={[
                  styles.qrToken,
                  { color: colors.primary },
                ]}
              >
                {tokenNumber}
              </Text>
            </Card>

            {/* LIVE QUEUE */}
            <Card style={styles.card}>
              <Text
                style={[
                  styles.sectionTitle,
                  { color: colors.text },
                ]}
              >
                📍 Live Queue
              </Text>

              <Text
                style={[
                  styles.serving,
                  { color: colors.primary },
                ]}
              >
                Now Serving: A-198
              </Text>

              <Text
                style={[
                  styles.queueText,
                  { color: colors.text },
                ]}
              >
                Your Token: {tokenNumber}
              </Text>

              <Text
                style={[
                  styles.queueText,
                  { color: colors.text },
                ]}
              >
                People Ahead: 6
              </Text>

              <Text style={styles.waitText}>
                Estimated Wait: {waitingTime}
              </Text>
              
            </Card>

            {/* SLIP */}
            <Card style={styles.card}>
              <Text
                style={[
                  styles.sectionTitle,
                  { color: colors.text },
                ]}
              >
                📄 Digital Slip
              </Text>

              <Text
                style={[
                  styles.slip,
                  { color: colors.text },
                ]}
              >
                {generatedSlip}
              </Text>
            </Card>

            {/* ACTIONS */}
            <View style={styles.actions}>
              <Button
                title="Share Slip"
                onPress={handleShare}
                variant="secondary"
              />

              <Button
                title="Print Slip"
                onPress={handlePrint}
                variant="secondary"
              />
            </View>
          </>
        ) : (
          <Card style={styles.card}>
            <Text
              style={{
                color: colors.text,
                textAlign: "center",
              }}
            >
              No appointment found.
            </Text>
          </Card>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  card: {
    marginBottom: 14,
  },

  tokenCard: {
    marginBottom: 14,
    alignItems: "center",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },

  token: {
    fontSize: 42,
    fontWeight: "900",
    marginVertical: 8,
  },

  meta: {
    fontSize: 15,
    marginTop: 4,
  },

  detailBox: {
    marginTop: 8,
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    padding: 15,
  },

  label: {
    fontSize: 14,
    fontWeight: "700",
    marginTop: 8,
    color: "#475569",
  },

  value: {
    fontSize: 16,
    marginTop: 3,
    color: "#111827",
  },

  qrSubtitle: {
    fontSize: 14,
    lineHeight: 20,
  },

  qrContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 16,
  },

  qrToken: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "900",
    marginTop: 12,
  },

  serving: {
    fontSize: 25,
    fontWeight: "900",
    marginVertical: 8,
  },

  queueText: {
    fontSize: 16,
    marginTop: 7,
  },

  waitText: {
    fontSize: 16,
    marginTop: 8,
    color: "green",
    fontWeight: "700",
  },

  slip: {
    fontSize: 14,
    lineHeight: 22,
  },

  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 20,
  },
});