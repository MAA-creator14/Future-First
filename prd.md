# Future First — Product Requirements Document

## Vision
A mobile-first Progressive Web App that helps 15–16 year olds in Europe and the US
discover careers and study paths that match who they are — through a swipe-based quiz
experience that feels more like TikTok than a school worksheet.

## Target Users
- Age: 15–16
- Geography: Europe (UK, DE, FR, NL, Nordics) and United States
- Context: Exploring options before GCSE/A-Level choices (UK), before AP/college prep (US)
- Device: Mobile browser (iOS Safari, Chrome Android), installable as PWA

## Core User Journey
1. **Welcome** — brief value prop, single CTA
2. **Interest Quiz** — 20 swipe cards (right = like, left = skip)
3. **Skills Quiz** — 10 swipe cards (right = confident, left = not really)
4. **Goal Note** — optional free-text ("anything else you want us to know?")
5. **Profile Summary** — top matched careers with match scores, cluster breakdown
6. **Home Feed** — browse careers ranked by match, filter by cluster
7. **Career Detail** — full profile: what it is, a day in the life, routes in, salary, try it now, related careers

## Data Model

### Career Clusters (8)
| Cluster ID | Label | Emoji | Colour |
|---|---|---|---|
| stem | STEM | 🔬 | #00B4D8 |
| creative-arts | Creative Arts | 🎨 | #FF6B9D |
| healthcare | Healthcare | 🏥 | #06D6A0 |
| business | Business | 💼 | #FFB703 |
| social-education | Social & Education | 🤝 | #A8DADC |
| trades-technical | Trades & Technical | 🔧 | #F4A261 |
| environment | Environment | 🌿 | #70C95E |
| law-public-service | Law & Public Service | ⚖️ | #9B72CF |

### Interest Domains (8, 20 quiz cards)
technology · creative · science · people · business · nature · language · health

### Skill Domains (10, 1 card each)
problem_solving · creativity · people_skills · detail_oriented · leadership · technical · communication · physical · empathy · organisation

## Matching Algorithm
- Interest tags: 2× weight
- Skill tags: 1× weight
- Dislike penalty: -0.5 raw points per disliked domain overlapping a career tag
- Result clamped to 0–100

## Design Tokens
```
brand:     #FF6B6B  (coral-red)
accent:    #FFC947  (warm yellow)
bg:        #FFF9F9  (warm white)
surface:   #FFFFFF
text:      #1A1A2E
textMuted: #6B6B8A
success:   #06D6A0
warning:   #FFC947
```

## PWA Configuration
- web.output: "static", web.bundler: "metro"
- public/manifest.json: standalone display, theme #FF6B6B
- public/service-worker.js: cache-first for assets
- Service worker registered in app/_layout.tsx (web platform only)
- web/index.html: apple-mobile-web-app-capable meta tags

## File Structure
```
app/
├── _layout.tsx              # Root layout — GestureHandler + SafeAreaProvider + storage init
├── index.tsx                # Redirect: quizCompletedAt? → /(main)/home : /welcome
├── welcome.tsx
├── interest-quiz.tsx        # 20 swipe cards
├── skills-quiz.tsx          # 10 swipe cards
├── goal-note.tsx            # Optional free-text
├── profile-summary.tsx      # Top matches + interest breakdown
└── (main)/
    ├── _layout.tsx
    ├── home.tsx             # Career feed ranked by match + cluster filter
    └── career/
        └── [id].tsx         # Career detail

src/
├── types/index.ts
├── constants/
│   ├── theme.ts
│   ├── clusters.ts
│   └── quizCards.ts
├── storage/
│   ├── mmkv.ts              # AsyncStorage shim (web-compatible)
│   └── profile.ts
├── hooks/
│   ├── useProfile.ts
│   ├── useCareers.ts
│   └── useQuiz.ts
├── utils/
│   └── matching.ts
├── data/
│   └── careers.json         # 37 careers across 8 clusters
└── components/
    ├── ui/
    │   ├── ClusterBadge.tsx
    │   ├── MatchBar.tsx
    │   ├── SkillChip.tsx
    │   └── ProgressDots.tsx
    ├── cards/
    │   ├── SwipeCard.tsx
    │   ├── SwipeCardDeck.tsx
    │   ├── CareerCard.tsx
    │   └── ClusterTile.tsx
    └── sections/
        ├── WhatIsItSection.tsx
        ├── DayInTheLifeSection.tsx
        ├── RoutesInSection.tsx
        ├── SalarySection.tsx
        ├── TryItSection.tsx
        └── RelatedCareersSection.tsx

public/
├── manifest.json
└── service-worker.js
web/
└── index.html
```
