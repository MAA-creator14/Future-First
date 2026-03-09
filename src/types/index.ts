// Interest domains matching quiz cards
export type InterestDomain =
  | 'technology'
  | 'creative'
  | 'science'
  | 'people'
  | 'business'
  | 'nature'
  | 'language'
  | 'health';

// Skill domains matching skills quiz
export type SkillDomain =
  | 'problem_solving'
  | 'creativity'
  | 'people_skills'
  | 'detail_oriented'
  | 'leadership'
  | 'technical'
  | 'communication'
  | 'physical'
  | 'empathy'
  | 'organisation';

// Career cluster IDs
export type CareerCluster =
  | 'stem'
  | 'creative-arts'
  | 'healthcare'
  | 'business'
  | 'social-education'
  | 'trades-technical'
  | 'environment'
  | 'law-public-service';

// A route into a career
export interface RouteIn {
  label: string;
  description: string;
  years: string;
  typical_subjects?: string[];
}

// Dual-market salary range (USD + EUR)
export interface SalaryRange {
  entry_usd: string;
  experienced_usd: string;
  entry_eur: string;
  experienced_eur: string;
  source: string;
}

// Full career profile
export interface Career {
  id: string;
  title: string;
  cluster: CareerCluster;
  emoji: string;
  color: string; // hex card tint
  one_liner: string;
  what_is_it: string;
  day_in_the_life: string;
  interest_tags: InterestDomain[];
  skill_tags: SkillDomain[];
  routes_in: RouteIn[];
  salary: SalaryRange;
  try_it: string[];
  related_career_ids: string[];
  tags: string[];
}

// Career enriched with match score for display
export interface CareerWithScore extends Career {
  matchScore: number; // 0–100
}

// A career saved by the user
export interface SavedCareer {
  career_id: string;
  saved_at: string; // ISO timestamp
}

// Interest score map — keyed by InterestDomain, value 0–10
export type InterestScores = Partial<Record<InterestDomain, number>>;

// Skill score map — keyed by SkillDomain, value 0–10
export type SkillScores = Partial<Record<SkillDomain, number>>;

// Full user profile (stored on device)
export interface UserProfile {
  interestScores: InterestScores;
  skillScores: SkillScores;
  liked_interests: InterestDomain[];
  liked_skills: SkillDomain[];
  disliked_interests: InterestDomain[];
  disliked_skills: SkillDomain[];
  goalNote: string;
  savedCareers: SavedCareer[];
  dismissedCareerIds: string[];
  quizCompletedAt: string | null; // ISO timestamp, null = not completed
}

// A quiz swipe card
export interface QuizCard {
  id: string;
  scenario: string;
  emoji: string;
  category: InterestDomain | SkillDomain;
  type: 'interest' | 'skill';
  bgColour: string; // hex
}
