import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { CareerWithScore } from '@/types';
import { CareerCard } from '@/components/cards/CareerCard';
import { colours, fontSize, spacing } from '@/constants/theme';

interface Props {
  careers: CareerWithScore[];
}

export function RelatedCareersSection({ careers }: Props) {
  if (careers.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>You might also like</Text>
      <FlatList
        data={careers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CareerCard career={item} compact />}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.md,
  },
  heading: {
    fontSize: fontSize.xl,
    fontWeight: '800',
    color: colours.text,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  list: {
    paddingHorizontal: spacing.lg,
  },
});
