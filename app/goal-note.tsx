import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { getProfile, saveProfile } from '@/storage/profile';
import { colours, fontSize, radii, spacing, shadows } from '@/constants/theme';

const MAX_CHARS = 200;

export default function GoalNoteScreen() {
  const [text, setText] = useState('');

  function handleContinue() {
    const profile = getProfile();
    saveProfile({ ...profile, goalNote: text.trim() });
    router.push('/profile-summary');
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.kav}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.step}>Step 3 of 3</Text>
          <Text style={styles.title}>
            Is there anything you already know you're curious about?
          </Text>
          <Text style={styles.subtitle}>
            A job you've heard of, something you saw on YouTube, a subject at school that lights you up — anything goes.
          </Text>

          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={text}
              onChangeText={(t) => setText(t.slice(0, MAX_CHARS))}
              placeholder="e.g. I watched a documentary about architects and it looked amazing..."
              placeholderTextColor={colours.textLight}
              multiline
              returnKeyType="done"
              blurOnSubmit
            />
            <Text style={styles.charCount}>{text.length}/{MAX_CHARS}</Text>
          </View>

          <TouchableOpacity
            style={styles.ctaButton}
            onPress={handleContinue}
            activeOpacity={0.85}
          >
            <Text style={styles.ctaText}>Continue →</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleContinue} style={styles.skipButton}>
            <Text style={styles.skipText}>Skip this step</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.bg,
  },
  kav: {
    flex: 1,
  },
  scroll: {
    padding: spacing.xl,
    gap: spacing.lg,
  },
  step: {
    fontSize: fontSize.xs,
    color: colours.brand,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: '900',
    color: colours.text,
    lineHeight: 34,
  },
  subtitle: {
    fontSize: fontSize.md,
    color: colours.textMuted,
    lineHeight: 22,
  },
  inputWrapper: {
    backgroundColor: colours.surface,
    borderRadius: radii.lg,
    ...shadows.card,
    padding: spacing.md,
  },
  input: {
    fontSize: fontSize.md,
    color: colours.text,
    minHeight: 120,
    textAlignVertical: 'top',
    lineHeight: 22,
  },
  charCount: {
    fontSize: fontSize.xs,
    color: colours.textLight,
    textAlign: 'right',
    marginTop: spacing.xs,
  },
  ctaButton: {
    backgroundColor: colours.brand,
    borderRadius: radii.xl,
    paddingVertical: spacing.md + 2,
    alignItems: 'center',
    ...shadows.card,
  },
  ctaText: {
    fontSize: fontSize.lg,
    fontWeight: '800',
    color: '#fff',
  },
  skipButton: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  skipText: {
    fontSize: fontSize.md,
    color: colours.textMuted,
    fontWeight: '600',
  },
});
