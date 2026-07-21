# Home

> **Context:** This screen uses **Gameplay global Type 1** defined in [global.md](../../../global.md) with the Portal sub-navigation rail. It is the primary landing screen for the Portal menu. The content slot contains a horizontal carousel, standing snapshots, and stats snapshots.

## Layout Type

**Type 1 — Sub-Navigation Rail.** Portal sub-nav (Home, My team, My career, Social) remains above.

## Content Structure

```text
GameplayContentSlot (scrollable vertical)
├── ScheduleCarousel (horizontal, full-bleed)
├── Trending Banner (horizontal card)
├── Standing Cards (vertical stack)
└── Stats Cards (vertical stack)
```

---

## 1. Schedule Carousel

A horizontal auto-scrolling carousel that shows upcoming match cards. Full-bleed: items reach the screen edges, overflow visible.

### Card Layout

```
┌──────────────────┐  ┌──────────────────┐
│ [badge] VS [badge]│  │ [badge] VS [badge]│
│  Man Utd   Arsenal│  │  Chelsea  Liverpool│
└──────────────────┘  └──────────────────┘
     ← scroll →

### Card Elements

| Element | Description |
|---|---|
| **Club Badge + Name** | Home club badge + short name on left. |
| **VS** | Centered divider text. |
| **Club Badge + Name** | Away club badge + short name on right. |

### Behavior

- Scrolls horizontally automatically (marquee/carousel).
- Items reach the physical screen edges (full-bleed, `overflow: visible`).
- Tapping a card opens nothing by default; future spec may link to match detail.
- Cards are generated from the upcoming match schedule for competitions the user's team participates in.
---

## 2. Trending Banner

A single horizontal card directly below the carousel. It surfaces a trending social topic — like a breaking news headline or hot discussion. Tapping the banner navigates to the Social feed.

```
┌──────────────────────────────────────────┐
│  🔥 Trending                    ● ● ○    │
│                                          │
│  "Man Utd completes shock signing of     │
│   Mbappe for record £200M fee"           │
│                                          │
│  234 replies · 1.2K likes · 2h ago      │
└──────────────────────────────────────────┘
```

### Elements

| Element | Description |
|---|---|
| **Trending Badge** | 🔥 icon + "Trending" label, top-left. |
| **Dots** | Right-aligned dots showing how many trending posts exist. Filled dot = current, empty = others. Cycles through posts. |
| **Headline** | The trending post body, truncated to 2 lines. |
| **Stats** | Reply count, like count, and time ago from the post. |

### Behavior

- Pulls the top N trending posts from the Social feed data (same `SocialPost` type as [All feed](../Social/All/all.md)).
- Dots cycle through trending items. Tapping a dot shows the corresponding post headline.
- Auto-advances every few seconds.
- Tapping anywhere on the card navigates to the Social All feed, scrolled to the current trending post.
- Only one banner card; dots handle multiple items.

### Empty State

- If no trending posts exist, the banner is hidden entirely.

---

## 3. Standing Cards


A vertical stack of cards, one per competition the user's team participates in. Each card shows a summary of the top 5 teams.

### Card Structure

```
┌──────────────────────────────────────────┐
│  Premier League              ● ● ● ○     │
│  ────────────────────────────────────    │
│  # │ Club Name         │ MP │ Pts        │
│  1 │ [badge] Arsenal   │ 30 │ 72         │
│  2 │ [badge] Man City  │ 30 │ 68         │
│  3 │ [badge] Liverpool │ 30 │ 65         │
│  4 │ [badge] Chelsea   │ 30 │ 60         │
│  5 │ [badge] Tottenham │ 30 │ 58         │
│  ────────────────────────────────────    │
│                          [→ more]        │
└──────────────────────────────────────────┘
```

### Card Elements

| Element | Description |
|---|---|
| **Competition Name** | Left-aligned heading on the top row. |
| **Dots** | Right-aligned dots representing the number of followed competitions. Filled dot = current card, empty dot = other competitions. Loop dots horizontally. |
| **Divider** | Full-width below the header row. |
| **Table** | Top 5 rows from `GameplayTable`. Columns: `#`, Club Name, MP, Pts. Read-only. |
| **More Button** | Bottom-right: icon (→) + text "more". Tapping navigates to the full Standings screen for that competition. |

### Behavior

- One card per competition the user's team participates in.
- Cards are stacked vertically with `spacing.stack.medium` between them.
- The dots on the top row show how many competition cards exist. Tapping a dot scrolls to that card (optional; pending implementation).
- The user's club is highlighted (club-color background or indicator).
- Tapping the table does nothing. Only the "more" button navigates.

---

## 4. Stats Cards

Same structure as Standing cards, but showing stats leaderboard snapshots.

### Card Structure

```
┌──────────────────────────────────────────┐
│  Premier League              ● ● ● ○     │
│  ────────────────────────────────────    │
│  # │ Player            │ Goals │ Mat     │
│  1 │ [face] Haaland    │  28   │ 30      │
│  2 │ [face] Salah      │  24   │ 30      │
│  3 │ [face] Kane       │  22   │ 29      │
│  4 │ [face] Son        │  20   │ 30      │
│  5 │ [face] Rashford   │  18   │ 28      │
│  ────────────────────────────────────    │
│                          [→ more]        │
└──────────────────────────────────────────┘
```

### Card Elements

| Element | Description |
|---|---|
| **Competition Name** | Same as Standing card header. |
| **Dots** | Same dot navigation pattern. |
| **Table** | Top 5 from the default stat category (Top Scorer). Columns: `#`, Player (face + name), Goals, Matches. |
| **More Button** | Icon + "more" → navigates to Pick Stats for that competition. |

### Behavior

- One card per competition. Default stat shown: Top Scorer.
- "more" navigates to the full Stats → Pick Stats → Stats Detail flow.
- Same dot pattern and highlight rules as Standing cards.

---

## Data Requirements

```text
HomeData {
  upcomingMatches: MatchCard[]
  standingCards: StandingSnapshot[]
  statsCards: StatsSnapshot[]
}

MatchCard {
  id: string
  home: ClubSummary
  away: ClubSummary
}

ClubSummary {
  name: string
  badge: ImageSource
}

StandingSnapshot {
  competitionId: string
  competitionName: string
  top5: StandingRow[]
}

StandingRow {
  rank: number
  clubName: string
  clubBadge: ImageSource
  played: number
  points: number
  isUserClub: boolean
}

StatsSnapshot {
  competitionId: string
  competitionName: string
  top5: StatsRow[]
}

StatsRow {
  rank: number
  playerName: string
  playerFace: ImageSource
  goals: number
  matches: number
}
```

## Reusable Components

- Shell: `GameplayScreen` Type 1 from [global.md](../../../global.md)
- Carousel: shared horizontal scroll component (use `ScrollView horizontal` + `FullBleed`)
- Table: `GameplayTable` from [table.md](../../../Comp/table.md)
- Dots: shared pagination dot component
- Menu index: [index.md](../index.md)

## Acceptance Criteria

- Type 1 layout with Portal sub-nav intact.
- Carousel scrolls horizontally with match cards; auto-advances; full-bleed.
- Each match card shows home badge+name, VS, away badge+name.
- One Standing card per competition showing top 5 with #, Club, MP, Pts columns.
- One Stats card per competition showing top 5 goalscorers with #, Player, Goals, Matches.
- Dots on each card represent the number of competition cards; loop horizontally.
- "more" button on Standing cards navigates to full Standings.
- "more" button on Stats cards navigates to full Stats.
- User's club/players highlighted in all cards.
