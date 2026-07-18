import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

type StatusBannerProps = {
  message: string;
  tone?: 'success' | 'error' | 'info';
};

export default function StatusBanner({ message, tone = 'info' }: StatusBannerProps) {
  const { colors } = useTheme();

  const backgroundColor =
    tone === 'success' ? '#DDF7E8' : tone === 'error' ? '#FDE7E7' : '#EAF3FF';
  const textColor = tone === 'success' ? '#176C3A' : tone === 'error' ? '#A11C1C' : colors.primary;

  return (
    <View style={[styles.banner, { backgroundColor }]}> 
      <Text style={[styles.text, { color: textColor }]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  text: {
    fontSize: 13,
    fontWeight: '600',
  },
});
