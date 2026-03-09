import { CareerCluster } from '@/types';

export interface ClusterMeta {
  id: CareerCluster;
  label: string;
  emoji: string;
  colour: string;
  description: string;
}

export const CLUSTERS: ClusterMeta[] = [
  {
    id: 'stem',
    label: 'STEM',
    emoji: '🔬',
    colour: '#00B4D8',
    description: 'Science, tech, engineering, maths',
  },
  {
    id: 'creative-arts',
    label: 'Creative Arts',
    emoji: '🎨',
    colour: '#FF6B9D',
    description: 'Design, art, film, music, fashion',
  },
  {
    id: 'healthcare',
    label: 'Healthcare',
    emoji: '🏥',
    colour: '#06D6A0',
    description: 'Medicine, nursing, therapy, wellbeing',
  },
  {
    id: 'business',
    label: 'Business',
    emoji: '💼',
    colour: '#FFB703',
    description: 'Marketing, finance, entrepreneurship',
  },
  {
    id: 'social-education',
    label: 'Social & Education',
    emoji: '🤝',
    colour: '#A8DADC',
    description: 'Teaching, social work, community, youth',
  },
  {
    id: 'trades-technical',
    label: 'Trades & Technical',
    emoji: '🔧',
    colour: '#F4A261',
    description: 'Electrical, construction, engineering',
  },
  {
    id: 'environment',
    label: 'Environment',
    emoji: '🌿',
    colour: '#70C95E',
    description: 'Conservation, ecology, sustainability',
  },
  {
    id: 'law-public-service',
    label: 'Law & Public Service',
    emoji: '⚖️',
    colour: '#9B72CF',
    description: 'Law, policing, journalism, diplomacy',
  },
];

export const CLUSTER_MAP = Object.fromEntries(
  CLUSTERS.map((c) => [c.id, c])
) as Record<CareerCluster, ClusterMeta>;
