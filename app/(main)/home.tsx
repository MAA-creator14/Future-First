import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useProfile } from '@/hooks/useProfile';
import { useCareers } from '@/hooks/useCareers';
import { CareerCard } from '@/components/cards/CareerCard';
import { ClusterTile } from '@/components/cards/ClusterTile';
import { CLUSTERS } from '@/constants/clusters';
import { colours, fontSize, radii, spacing, shadows } from '@/constants/theme';
import careersData from '@/data/careers.json';
import { Career, CareerWithScore, CareerCluster } from '@/types';
import { matchScore } from '@/utils/matching';

export default function HomeScreen() {
  const [profile] = useProfile();
  const rankedCareers = useCareers(profile);
  const [activeCluster, setActiveCluster] = useState<CareerCluster | null>(null);

  const savedCareerIds = new Set(profile.savedCareers.map((s) => s.career_id));
  const savedCareers: CareerWithScore[] = (careersData as Career[])
    .filter((c) => savedCareerIds.has(c.id))
    .map((c) => ({ ...c, matchScore: matchScore(c, profile) }));

  const filteredCareers = activeCluster
    ? rankedCareers.filter((c) => c.cluster === activeCluster)
    : rankedCareers;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Hey there! 👋</Text>
          <Text style={styles.title}>Your career matches</Text>
        </View>

        {/* Section 1: Matched for you */}
        <SectionHeader title="Matched for you" emoji="🎯" />
        {filteredCareers.length > 0 ? (
          <FlatList
            data={filteredCareers}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <CareerCard career={item} />}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
        ) : (
          <EmptyState text="No matches yet — complete the quiz first!" />
        )}

        {/* Section 2: Explore by cluster */}
        <SectionHeader title="Explore by field" emoji="✨" />
        <View style={styles.clusterGrid}>
          {CLUSTERS.map((cluster) => (
            <View key={cluster.id} style={styles.clusterCell}>
              <ClusterTile
                cluster={cluster}
                onPress={() =>
                  setActiveCluster(
                    activeCluster === cluster.id ? null : cluster.id
                  )
                }
              />
            </View>
          ))}
        </View>
        {activeCluster && (
          <TouchableOpacity
            style={styles.clearFilter}
            onPress={() => setActiveCluster(null)}
          >
            <Text style={styles.clearFilterText}>✕ Clear filter</Text>
          </TouchableOpacity>
        )}

        {/* Section 3: Saved careers (conditional) */}
        {savedCareers.length > 0 && (
          <>
            <SectionHeader title="Your saved careers" emoji="🔖" />
            <FlatList
              data={savedCareers}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <CareerCard career={item} />}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
            />
          </>
        )}

        <View style={styles.bottomPad} />
      </ScrollView>
    </SafeAreaView>
  );
}

function SectionHeader({ title, emoji }: { title: string; emoji: string }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionEmoji}>{emoji}</Text>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <View style={styles.emptyState}>
      <Text style={styles.emptyText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colours.bg,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingBottom: spacing.xxl,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },
  greeting: {
    fontSize: fontSize.md,
    color: colours.textMuted,
    fontWeight: '600',
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: '900',
    color: colours.text,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },
  sectionEmoji: {
    fontSize: fontSize.lg,
  },
  sectionTitle: {
    fontSize: fontSize.xl,
    fontWeight: '800',
    color: colours.text,
  },
  horizontalList: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xs,
  },
  clusterGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.md,
  },
  clusterCell: {
    width: '50%',
    padding: spacing.xs / 2,
  },
  clearFilter: {
    alignSelf: 'center',
    marginTop: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    backgroundColor: colours.surface,
    borderRadius: radii.full,
    borderWidth: 1,
    borderColor: colours.border,
  },
  clearFilterText: {
    fontSize: fontSize.sm,
    color: colours.textMuted,
    fontWeight: '700',
  },
  emptyState: {
    marginHorizontal: spacing.lg,
    padding: spacing.lg,
    backgroundColor: colours.surface,
    borderRadius: radii.lg,
    alignItems: 'center',
    ...shadows.card,
  },
  emptyText: {
    fontSize: fontSize.sm,
    color: colours.textMuted,
    textAlign: 'center',
  },
  bottomPad: {
    height: spacing.xl,
  },
});
