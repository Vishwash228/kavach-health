import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import Button from '../components/Button';

type WelcomeScreenProps = {
  onContinue: () => void;
};

export default function WelcomeScreen({ onContinue }: WelcomeScreenProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}> 
      <View style={styles.hero}>
        <Text style={[styles.title, { color: colors.text }]}>Welcome to Kavach Health</Text>
        <Text style={[styles.subtitle, { color: colors.muted }]}>Secure healthcare access, hospital marketplace, smart OPD, and AI-driven support.</Text>
      </View>
      <Button title="Get Started" onPress={onContinue} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  hero: {
    marginBottom: 28,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
  },
});
