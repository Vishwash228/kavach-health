import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import HeaderBar from "../components/HeaderBar";

type Props = {
  onBack?: () => void;
  onBookDoctor?: () => void;
};

export default function AISymptomCheckerScreen({
  onBack,
  onBookDoctor,
}: Props) {
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState("");

  const analyzeSymptoms = () => {
    const text = symptoms.toLowerCase().trim();

    if (!text) {
      setResult("⚠️ Please enter your symptoms first.");
      return;
    }

    if (
      text.includes("chest pain") ||
      text.includes("breathing") ||
      text.includes("shortness")
    ) {
      setResult(
        "⚠️ Your symptoms may require urgent medical attention.\n\nPlease consult a doctor immediately. If symptoms are severe or sudden, seek emergency care."
      );
      return;
    }

    if (
      text.includes("fever") ||
      text.includes("cough") ||
      text.includes("cold") ||
      text.includes("headache")
    ) {
      setResult(
        "Possible condition: Common Flu / Viral Infection\n\nRecommendation:\n• Drink plenty of fluids\n• Take adequate rest\n• Monitor your temperature\n• Consult a doctor if symptoms continue or become severe."
      );
      return;
    }

    if (
      text.includes("stomach") ||
      text.includes("vomiting") ||
      text.includes("diarrhea")
    ) {
      setResult(
        "Possible condition: Gastrointestinal problem\n\nRecommendation:\n• Stay hydrated\n• Take light food\n• Avoid oily food\n• Consult a doctor if symptoms persist."
      );
      return;
    }

    setResult(
      "The symptoms need further evaluation.\n\nKavach Health recommends consulting a qualified doctor for proper diagnosis."
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <HeaderBar
        title="AI Symptom Checker"
        subtitle="Describe your symptoms"
        onBack={onBack}
      />

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>🩺 AI Health Assistant</Text>

        <Text style={styles.infoText}>
          Describe your symptoms and Kavach Health will provide
          preliminary health guidance.
        </Text>
      </View>

      <Text style={styles.label}>Enter your symptoms</Text>

      <TextInput
        placeholder="Example: Fever, cough, headache..."
        placeholderTextColor="#94A3B8"
        value={symptoms}
        onChangeText={setSymptoms}
        multiline
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={analyzeSymptoms}
      >
        <Text style={styles.buttonText}>
          🔍 Analyze Symptoms
        </Text>
      </TouchableOpacity>

      {result !== "" && (
        <View style={styles.card}>
          <Text style={styles.resultTitle}>
            🤖 AI Analysis
          </Text>

          <Text style={styles.resultText}>
            {result}
          </Text>

          <TouchableOpacity
            style={styles.doctorButton}
            onPress={onBookDoctor}
          >
            <Text style={styles.doctorButtonText}>
              👨‍⚕️ Book Doctor / OPD
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.warning}>
        <Text style={styles.warningTitle}>
          ⚠️ Medical Disclaimer
        </Text>

        <Text style={styles.warningText}>
          This tool provides preliminary guidance only and is not
          a medical diagnosis. Always consult a qualified healthcare
          professional for diagnosis and treatment.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  infoCard: {
    marginTop: 20,
    backgroundColor: "#E0F2FE",
    padding: 18,
    borderRadius: 15,
  },

  infoTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0369A1",
    marginBottom: 8,
  },

  infoText: {
    fontSize: 14,
    lineHeight: 21,
    color: "#334155",
  },

  label: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 22,
    marginBottom: 10,
    color: "#0F172A",
  },

  input: {
    minHeight: 130,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 15,
    fontSize: 16,
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    color: "#0F172A",
  },

  button: {
    marginTop: 18,
    backgroundColor: "#0EA5E9",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },

  card: {
    marginTop: 22,
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 15,
    elevation: 3,
  },

  resultTitle: {
    fontSize: 19,
    fontWeight: "800",
    marginBottom: 12,
    color: "#0F172A",
  },

  resultText: {
    fontSize: 15,
    lineHeight: 23,
    color: "#334155",
  },

  doctorButton: {
    marginTop: 18,
    backgroundColor: "#16A34A",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },

  doctorButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },

  warning: {
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#FEF3C7",
  },

  warningTitle: {
    fontWeight: "800",
    color: "#92400E",
    marginBottom: 6,
  },

  warningText: {
    fontSize: 13,
    lineHeight: 20,
    color: "#78350F",
  },
});