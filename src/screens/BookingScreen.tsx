import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

export default function BookingScreen() {
  const [name, setName] = useState('');
  const [doctor, setDoctor] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const bookAppointment = () => {
    if (!name || !doctor || !date || !time) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    Alert.alert(
      'Appointment Booked ✅',
      `Patient: ${name}\nDoctor: ${doctor}\nDate: ${date}\nTime: ${time}\n\nToken No: KAV-${Math.floor(
        Math.random() * 900 + 100
      )}`
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📅 Book Appointment</Text>

      <TextInput
        style={styles.input}
        placeholder="Patient Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Doctor Name"
        value={doctor}
        onChangeText={setDoctor}
      />

      <TextInput
        style={styles.input}
        placeholder="Appointment Date (DD/MM/YYYY)"
        value={date}
        onChangeText={setDate}
      />

      <TextInput
        style={styles.input}
        placeholder="Time (10:30 AM)"
        value={time}
        onChangeText={setTime}
      />

      <TouchableOpacity style={styles.button} onPress={bookAppointment}>
        <Text style={styles.buttonText}>Confirm Appointment</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});