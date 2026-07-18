import React, { useState } from 'react';
import { auth, db } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import Button from '../components/Button';
import Card from '../components/Card';
import StatusBanner from '../components/StatusBanner';

export default function PatientRegistrationScreen() {
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

  const validate = () => {
    if (!name.trim()) return 'Please provide the patient name.';
    if (!dob.trim()) return 'Please provide the date of birth.';
    if (!gender.trim()) return 'Please provide the gender.';
    if (!address.trim()) return 'Please provide the address.';
    if (!emergencyContact.trim()) return 'Please provide an emergency contact.';
    return '';
  };
  const handleSubmit = async () => {
  const validationError = validate();

  if (validationError) {
    setError(validationError);
    return;
  }

  try {
    const userCredential =
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

    const user = userCredential.user;

    await setDoc(doc(db, "patients", user.uid), {
      name,
      email,
      dob,
      gender,
      address,
      emergencyContact,
      familyMember,
      history,
      createdAt: new Date(),
    });

    setError("");
    setMessage("Patient Registered Successfully ✅");

  } catch (err: any) {
    setError(err.message);
  }
};
 
  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}> 
      <Text style={[styles.title, { color: colors.text }]}>Patient Registration</Text>
      <Text style={[styles.subtitle, { color: colors.muted }]}>Create a secure patient profile with emergency and family details.</Text>

      {error ? <StatusBanner message={error} tone="error" /> : null}
      {message ? <StatusBanner message={message} tone="success" /> : null}

      <Card style={styles.card}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Patient Details</Text>
        <TextInput value={name} onChangeText={setName} placeholder="Full Name" placeholderTextColor={colors.muted} style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text }]} />
        <TextInput
  value={email}
  onChangeText={setEmail}
  placeholder="Email"
  keyboardType="email-address"
  placeholderTextColor={colors.muted}
  style={[styles.input, {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    color: colors.text
  }]}
/>

<TextInput
  value={password}
  onChangeText={setPassword}
  placeholder="Password"
  secureTextEntry
  placeholderTextColor={colors.muted}
  style={[styles.input, {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    color: colors.text
  }]}
/>
        <TextInput value={dob} onChangeText={setDob} placeholder="DOB / Age" placeholderTextColor={colors.muted} style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text }]} />
        <TextInput value={gender} onChangeText={setGender} placeholder="Gender" placeholderTextColor={colors.muted} style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text }]} />
        <TextInput value={address} onChangeText={setAddress} placeholder="Address" placeholderTextColor={colors.muted} style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text }]} />
      </Card>

      <Card style={styles.card}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Emergency & Family</Text>
        <TextInput value={emergencyContact} onChangeText={setEmergencyContact} placeholder="Emergency Contact" placeholderTextColor={colors.muted} style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text }]} />
        <TextInput value={familyMember} onChangeText={setFamilyMember} placeholder="Family Member / Relationship" placeholderTextColor={colors.muted} style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text }]} />
      </Card>

      <Card style={styles.card}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Medical History</Text>
        <TextInput value={history} onChangeText={setHistory} placeholder="Allergies, conditions, medications" placeholderTextColor={colors.muted} style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text }]} multiline />
      </Card>

      <Button title="Submit Registration" onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 14,
    lineHeight: 20,
  },
  card: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  input: {
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 10,
  },
});
