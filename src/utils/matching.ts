import { Career, UserProfile } from '@/types';

/**
 * Returns a match score 0–100 for a career against the user's profile.
 * Interest tag overlaps: 2× weight (score / 10 * 2)
 * Skill tag overlaps: 1× weight (score / 10)
 * Dislike penalty: -0.5 raw points per disliked domain overlapping career tags
 * Result clamped to 0–100.
 */
export function matchScore(career: Career, profile: UserProfile): number {
  let raw = 0;
  let maxPossible = 0;

  // Interest tags — weighted at 2×
  for (const tag of career.interest_tags) {
    const score = profile.interestScores[tag] ?? 0;
    raw += (score / 10) * 2;
    maxPossible += 2;
  }

  // Skill tags — weighted at 1×
  for (const tag of career.skill_tags) {
    const score = profile.skillScores[tag] ?? 0;
    raw += score / 10;
    maxPossible += 1;
  }

  // Dislike penalty: -0.5 per disliked domain that overlaps a career tag
  for (const disliked of profile.disliked_interests) {
    if (career.interest_tags.includes(disliked)) {
      raw -= 0.5;
    }
  }
  for (const disliked of profile.disliked_skills) {
    if (career.skill_tags.includes(disliked)) {
      raw -= 0.5;
    }
  }

  if (maxPossible === 0) return 0;

  return Math.max(0, Math.min(100, Math.round((raw / maxPossible) * 100)));
}
