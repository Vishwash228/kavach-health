import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { useTheme } from '../theme/ThemeContext';
import Button from '../components/Button';
import Card from '../components/Card';
import StatusBanner from '../components/StatusBanner';
import HeaderBar from '../components/HeaderBar';

type OcrRegistrationScreenProps = {
  onBack?: () => void;
};

export default function OcrRegistrationScreen({
  onBack,
}: OcrRegistrationScreenProps = {}) {
  const { colors } = useTheme();

  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [idNumber, setIdNumber] = useState('');

  const [consent, setConsent] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleOcr = () => {
    if (!consent) {
      setError(
        'Please provide explicit consent before using OCR scanning.'
      );
      setMessage('');
      return;
    }

    setScanning(true);
    setError('');
    setMessage('');

    setTimeout(() => {
      setName('Aarav Sharma');
      setDob('12/08/1997');
      setGender('Male');
      setAddress('42, Green Park, Delhi');
      setIdNumber('1234-5678-9012');

      setScanning(false);
      setMessage(
        'OCR scan completed. Please review the extracted details.'
      );
    }, 1200);
  };

  const handleConsent = () => {
    setConsent((previous) => !previous);
    setError('');
  };

  const maskId = (value: string) => {
    if (!value) return '';

    return value.replace(/\d(?=\d{4})/g, '*');
  };

  const handleSave = () => {
    if (!name.trim() || !dob.trim() || !gender.trim()) {
      setError('Please review all required patient details.');
      setMessage('');
      return;
    }

    setError('');
    setMessage(
      'OCR-assisted patient registration saved successfully.'
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
        title="OCR Registration"
        onBack={onBack}
        subtitle="ID scan & smart autofill"
      />

      <ScrollView
        style={[
          styles.container,
          {
            backgroundColor: colors.background,
          },
        ]}
        contentContainerStyle={styles.content}
      >
        {error ? (
          <StatusBanner
            message={error}
            tone="error"
          />
        ) : null}

        {message ? (
          <StatusBanner
            message={message}
            tone="success"
          />
        ) : null}

        <Card style={styles.card}>
          <Text
            style={[
              styles.sectionTitle,
              { color: colors.text },
            ]}
          >
            📄 OCR Document Scan
          </Text>

          <Text
            style={[
              styles.helper,
              { color: colors.muted },
            ]}
          >
            Scan an ID document to automatically extract
            patient information.
          </Text>

          <View
            style={[
              styles.scanBox,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <Text style={styles.scanIcon}>📷</Text>

            <Text
              style={[
                styles.scanTitle,
                { color: colors.text },
              ]}
            >
              {scanning
                ? 'Scanning document...'
                : 'Ready to Scan'}
            </Text>

            <Text
              style={[
                styles.helper,
                { color: colors.muted },
              ]}
            >
              Demo OCR mode
            </Text>
          </View>

          <Button
            title={
              scanning
                ? 'Scanning...'
                : 'Run OCR Scan'
            }
            onPress={handleOcr}
          />

          <Text
            onPress={handleConsent}
            style={[
              styles.consent,
              {
                color: consent
                  ? colors.primary
                  : colors.muted,
              },
            ]}
          >
            {consent ? '☑' : '☐'} I give explicit consent
            to process this document.
          </Text>
        </Card>

        <Card style={styles.card}>
          <Text
            style={[
              styles.sectionTitle,
              { color: colors.text },
            ]}
          >
            👤 Extracted Details
          </Text>

          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Full Name"
            placeholderTextColor={colors.muted}
            style={[
              styles.input,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                color: colors.text,
              },
            ]}
          />

          <TextInput
            value={dob}
            onChangeText={setDob}
            placeholder="DOB / Age"
            placeholderTextColor={colors.muted}
            style={[
              styles.input,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                color: colors.text,
              },
            ]}
          />

          <TextInput
            value={gender}
            onChangeText={setGender}
            placeholder="Gender"
            placeholderTextColor={colors.muted}
            style={[
              styles.input,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                color: colors.text,
              },
            ]}
          />

          <TextInput
            value={address}
            onChangeText={setAddress}
            placeholder="Address"
            placeholderTextColor={colors.muted}
            multiline
            style={[
              styles.input,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                color: colors.text,
              },
            ]}
          />

          <TextInput
            value={maskId(idNumber)}
            editable={false}
            placeholder="Masked ID"
            placeholderTextColor={colors.muted}
            style={[
              styles.input,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                color: colors.text,
              },
            ]}
          />
        </Card>

        <Button
          title="Save Reviewed Details"
          onPress={handleSave}
        />

        <View style={styles.bottomSpace} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  card: {
    marginBottom: 14,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 10,
  },

  helper: {
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 10,
  },

  scanBox: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 16,
    padding: 25,
    alignItems: 'center',
    marginBottom: 15,
  },

  scanIcon: {
    fontSize: 42,
    marginBottom: 8,
  },

  scanTitle: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 4,
  },

  consent: {
    marginTop: 15,
    fontSize: 14,
    fontWeight: '600',
  },

  input: {
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 10,
    fontSize: 14,
  },

  bottomSpace: {
    height: 20,
  },
});