> **Context:** This screen uses **Gameplay global Type 1** defined in [global.md](../../../../global.md). It keeps the Portal sub-navigation rail, top header, and floating bottom navigation. The content slot contains a manager identity card, a local sub-navigation rail with dynamic per-club tabs, and statistical detail cards.

# My History

Career history and statistics for the manager. Shows aggregated stats across all clubs and per-club breakdowns via local sub-navigation tabs.

## Layout Type

**Type 1 — Sub-Navigation Rail.** The Portal sub-navigation (Home, My team, My career, Social) remains above this screen.

## Flow

```
My career dropdown → My carrer
  → tap a club tab → view that club's stats
  → tap "All" → view aggregated all-time stats
```

## 1. Manager Identity Card

A horizontal card pinned at the top of the content slot. Left-aligned text group overlays a manager photo on the right.

```
┌──────────────────────────────────────┐
│                                      │
│  Alex Ferguson           ┌──────────┐│
│  Manchester United       │  Manager ││
│                          │  Photo   ││
│                          │ (square) ││
│                          └──────────┘│
└──────────────────────────────────────┘
```

### Layout Rules

- The card fills the content width minus screen gutters.
- **Left group** (vertical, left-aligned):
  - **Manager name**: heading typography token.
  - **Current club**: caption typography token, below the name.
- **Right element**: manager profile photo.
  - **Shape**: square (border-radius 0), not circular.
  - **Size**: large avatar token or `size.avatar.manager`.
  - **Fallback**: gray placeholder silhouette when no photo exists.
- The card uses `color.surface.card` and `shadow.card`.
- Tap behavior: no action unless a future screen plan defines one.

## 2. Local Sub-Navigation

A horizontal scrollable tab rail inside the content slot, below the identity card. Reuses `GameplaySubNavigation` from [navigasi.md](../../../../Comp/navigasi.md) with `variant: 'single'`.

### Tabs

Tabs are generated dynamically from the manager's career data:

| Tab | Source | Description |
|---|---|---|
| **All** | always present | Aggregated stats across every club the manager has ever managed. |
| **Club A 2026/27** | one per club tenure | Standalone stats for that specific club and season. |
| **Club B 2024/26** | one per club tenure | ... |

The **All** tab always appears first. Subsequent tabs are ordered chronologically (most recent first). Tab labels use the format `{Club Name} {Season}` (e.g., **Manchester United 2026/27**).

Duplicate club names (multiple stints) are differentiated by season.

### Tab Config

```text
historyTabs: TabDef[] = [
  { id: 'all', label: 'All', variant: 'single' },
  ...careerEntries.map(entry => ({
    id: entry.id,
    label: `${entry.club.name} ${entry.season}`,
    variant: 'single'
  }))
]
```

The default active tab is the most recent club career. If the manager has no prior clubs, only the **All** tab appears.

## 3. Statistics Cards

Below the local sub-navigation, the content for the active tab renders. Each tab shows a vertical stack of `ContractDetailCard` components (shared with [contract detail.md](../My contract/Contract offer/contract detail.md)) driven by a per-tab data source.

### All Tab Fields

Aggregated across all clubs:

| Card Title | Fields |
|---|---|
| **Match Record** | Total Matches, Total Wins, Total Draws, Total Losses, Win Rate |
| **Goals** | Goals Scored, Goals Conceded, Goal Difference, Clean Sheets |
| **Performance** | Points Per Match, Longest Winning Streak, Biggest Win |
| **Career Overview** | Total Trophies, Seasons Managed, Clubs Managed |
| **Transfers** | Total Transfer Spending, Total Transfer Income |
| **Development** | Youth Players Promoted |
| **Honors** | Manager of the Year, Hall of Fame Rank |

### Club Tab Fields

Per-club career, same card structure but limited to that club's tenure:

| Card Title | Fields |
|---|---|
| **Match Record** | Total Matches, Total Wins, Total Draws, Total Losses, Win Rate |
| **Goals** | Goals Scored, Goals Conceded, Goal Difference, Clean Sheets |
| **Performance** | Points Per Match, Longest Winning Streak, Biggest Win |
| **Transfers** | Total Transfer Spending, Total Transfer Income |
| **Development** | Youth Players Promoted |

**Total Trophies**, **Seasons Managed**, **Clubs Managed**, **Manager of the Year**, and **Hall of Fame Rank** are only shown on the **All** tab since they are career-level metrics.

### Card Layout

Each `ContractDetailCard` follows the same pattern:

```
┌──────────────────────────────────┐
│  Match Record                    │
│  ────────────────────────────    │
│  Total Matches      350          │
│  Total Wins         210          │
│  Total Draws         85          │
│  Total Losses        55          │
│  Win Rate           60%          │
└──────────────────────────────────┘
```

## Data Requirements

```text
ManagerHistoryData {
  managerName: string
  managerPhoto: ImageSource | null
  currentClub: string
  careerEntries: CareerEntry[]
  allTimeStats: CareerStats
}

CareerEntry {
  id: string
  club: {
    name: string
    badge: ImageSource
  }
  season: string          // e.g., "2026/27"
  stats: CareerStats
}

CareerStats {
  totalMatches: number
  totalWins: number
  totalDraws: number
  totalLosses: number
  winRate: number
  goalsScored: number
  goalsConceded: number
  goalDifference: number
  cleanSheets: number
  pointsPerMatch: number
  totalTrophies: number
  seasonsManaged: number
  clubsManaged: number
  longestWinningStreak: number
  biggestWin: string
  totalTransferSpending: number
  totalTransferIncome: number
  youthPlayersPromoted: number
  managerOfTheYear: number
  hallOfFameRank: number | null
}
```

## Empty State

- If the manager has no prior career, the **All** tab shows zeros or dashes.
- No club tabs appear (only **All**).
- The manager identity card still renders with the current club.

## Reusable Components

- Shell / chrome: `GameplayScreen` Type 1 from [global.md](../../../../global.md)
- Sub-navigation: `GameplaySubNavigation` from [navigasi.md](../../../../Comp/navigasi.md) (local, dynamic tabs)
- Identity card: `ManagerIdentityCard` (new, derived from `BentoCard`)
- Detail cards: `ContractDetailCard` shared with [contract detail.md](../My contract/Contract offer/contract detail.md)
- Menu index: [index.md](../../index.md)

## Acceptance Criteria

- The screen uses global Type 1 with the Portal sub-navigation rail intact.
- The manager identity card shows name + current club on the left and a square photo on the right.
- The local sub-navigation has an **All** tab plus one tab per club career.
- Tapping **All** shows aggregated all-time statistics across all clubs.
- Tapping a club tab shows statistics scoped to that club's tenure.
- Statistics are rendered as stacked `ContractDetailCard` components grouped by category.
- Career-level fields appear only on the **All** tab.
- Empty state with no career history shows **All** tab with zero/dash values.
- All tab labels, card groupings, and fields are driven by data; no hard-coded values.
