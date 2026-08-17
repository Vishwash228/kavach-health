import React, { useState } from 'react';
import { auth, db } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
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

type PatientRegistrationScreenProps = {
  onBack?: () => void;
};

export default function PatientRegistrationScreen({
  onBack,
}: PatientRegistrationScreenProps = {}) {
  const { colors } = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [familyMember, setFamilyMember] = useState('');
  const [history, setHistory] = useState('');

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!name.trim()) {
      return 'Please provide the patient name.';
    }

    if (!dob.trim()) {
      return 'Please provide the date of birth.';
    }

    if (!gender.trim()) {
      return 'Please provide the gender.';
    }

    if (!address.trim()) {
      return 'Please provide the address.';
    }

    if (!emergencyContact.trim()) {
      return 'Please provide an emergency contact.';
    }

    if (!email.trim()) {
      return 'Please enter your email.';
    }

    if (!password.trim()) {
      return 'Please enter a password.';
    }

    if (password.length < 6) {
      return 'Password must be at least 6 characters.';
    }

    return '';
  };

  const handleSubmit = async () => {
    const validationError = validate();

    if (validationError) {
      setError(validationError);
      setMessage('');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setMessage('');

      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email.trim(),
          password
        );

      const user = userCredential.user;

      await setDoc(doc(db, 'patients', user.uid), {
        uid: user.uid,
        name: name.trim(),
        email: email.trim(),
        dob: dob.trim(),
        gender: gender.trim(),
        address: address.trim(),
        emergencyContact: emergencyContact.trim(),
        familyMember: familyMember.trim(),
        history: history.trim(),
        createdAt: new Date(),
      });

      setMessage('Patient profile created successfully.');

      setName('');
      setEmail('');
      setPassword('');
      setDob('');
      setGender('');
      setAddress('');
      setEmergencyContact('');
      setFamilyMember('');
      setHistory('');
    } catch (err: any) {
      let errorMessage =
        'Registration failed. Please try again.';

      if (err?.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered.';
      } else if (err?.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.';
      } else if (err?.code === 'auth/weak-password') {
        errorMessage =
          'Password is too weak. Use at least 6 characters.';
      }

      setError(errorMessage);
      setMessage('');
    } finally {
      setLoading(false);
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
        title="Patient Registration"
        onBack={onBack}
        subtitle="Create secure patient profile"
      />

      <ScrollView
        style={[
          styles.container,
          { backgroundColor: colors.background },
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
            Patient Details
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
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
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
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry
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

        <Card style={styles.card}>
          <Text
            style={[
              styles.sectionTitle,
              { color: colors.text },
            ]}
          >
            Emergency & Family
          </Text>

          <TextInput
            value={emergencyContact}
            onChangeText={setEmergencyContact}
            placeholder="Emergency Contact"
            keyboardType="phone-pad"
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
            value={familyMember}
            onChangeText={setFamilyMember}
            placeholder="Family Member / Relationship"
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

        <Card style={styles.card}>
          <Text
            style={[
              styles.sectionTitle,
              { color: colors.text },
            ]}
          >
            Medical History
          </Text>

          <TextInput
            value={history}
            onChangeText={setHistory}
            placeholder="Allergies, conditions, medications"
            placeholderTextColor={colors.muted}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            style={[
              styles.input,
              styles.historyInput,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                color: colors.text,
              },
            ]}
          />
        </Card>

        <Button
          title={
            loading
              ? 'Creating Profile...'
              : 'Submit Registration'
          }
          onPress={handleSubmit}
        />
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

  input: {
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 10,
    fontSize: 14,
  },

  historyInput: {
    minHeight: 100,
  },
});