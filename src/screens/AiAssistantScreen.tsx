import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import Card from '../components/Card';
import Button from '../components/Button';
import StatusBanner from '../components/StatusBanner';

type ChatMessage = {
  role: 'assistant' | 'user';
  text: string;
};

export default function AiAssistantScreen() {
  const { colors } = useTheme();
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<ChatMessage[]>([
    { role: 'assistant', text: 'Hello! I can help summarize symptoms, suggest next steps, and guide you to the right department.' },
  ]);

  const askAssistant = () => {
    const nextMessage = chat.length % 2 === 0
      ? 'You may need to schedule a consultation for this concern.'
      : 'Please rest and hydrate while keeping monitoring your symptoms.';
    setChat((current) => [...current, { role: 'user', text: 'I have a mild fever and fatigue.' }, { role: 'assistant', text: nextMessage }]);
    setMessage('AI guidance generated.');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}> 
      <Text style={[styles.title, { color: colors.text }]}>AI Health Assistant</Text>
      <Text style={[styles.subtitle, { color: colors.muted }]}>Get instant support for common health questions, triage suggestions, and next-step guidance.</Text>

      {message ? <StatusBanner message={message} tone="success" /> : null}

      <Card style={styles.card}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Conversation</Text>
        {chat.map((item, index) => (
          <View key={`${item.role}-${index}`} style={[styles.bubble, item.role === 'assistant' ? styles.assistant : styles.user]}>
            <Text style={[styles.bubbleText, { color: item.role === 'assistant' ? colors.text : '#fff' }]}>{item.text}</Text>
          </View>
        ))}
      </Card>

      <Button title="Ask Assistant" onPress={askAssistant} />
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
    marginBottom: 10,
  },
  bubble: {
    padding: 10,
    borderRadius: 12,
    marginBottom: 8,
  },
  assistant: {
    backgroundColor: '#eef4ff',
    alignSelf: 'flex-start',
  },
  user: {
    backgroundColor: '#1f5cff',
    alignSelf: 'flex-end',
  },
  bubbleText: {
    fontSize: 13,
    lineHeight: 18,
  },
});
