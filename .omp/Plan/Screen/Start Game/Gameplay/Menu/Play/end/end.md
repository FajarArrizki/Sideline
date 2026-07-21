# End

> **Context:** This screen uses **Gameplay global Type 2** defined in [global.md](../../../global.md). It keeps the top header and floating bottom navigation, and uses a GameplaySecondaryHeader (back arrow + "End" title). Reached from [Statistic](../Statistic/statistic.md) after the user's match statistics. Shows other league results.

## Layout Type

**Type 2 — Back Arrow + Title.**

## Secondary Header

- **GameplayBackButton**: left-aligned back icon. Returns to Statistic.
- **TitleText**: **End**.

## Flow

```
Statistic → Next (bottom nav)
  → End (other league results)
  → Done (bottom nav) → gameplay hub
```

---

## Content: League Results

A league dropdown and matchweek cards.

### League Dropdown

```
┌──────────────────────────────────────┐
│  Premier League                   ▾  │
└──────────────────────────────────────┘
```

- Default: the league your team plays in.
- Tapping opens a dropdown listing all leagues. Selecting a different league reloads the matchweek cards.

### Matchweek Cards

One card per matchweek. Vertical stack, scrollable.

```
┌──────────────────────────────────────────────┐
│  Pekan 30                       14 Apr 2026 │
│  ─────────────────────────────────────────── │
│                                              │
│  ┌──────────┐                 ┌──────────┐  │
│  │  Club    │  2 - 1           │  Club    │  │
│  │  Badge   │                 │  Badge   │  │
│  └──────────┘                 └──────────┘  │
│  Arsenal                    Chelsea         │
│                                              │
│  ┌──────────┐                 ┌──────────┐  │
│  │  Club    │  0 - 0           │  Club    │  │
│  │  Badge   │                 │  Badge   │  │
│  └──────────┘                 └──────────┘  │
│  Liverpool                  Man City        │
│                                              │
└──────────────────────────────────────────────┘
```

### Card Structure

| Element | Position | Description |
|---|---|---|
| **Pekan XX** | Top-left | Matchweek number. |
| **Date** | Top-right | `DD Mon YYYY`. |
| **Divider** | Full-width | Below the header. |
| **Match Rows** | Stacked | Home badge+name, score, away badge+name. |

### Match Row

```
┌──────────┐                 ┌──────────┐
│  Club    │  2 - 1           │  Club    │
│  Badge   │                 │  Badge   │
└──────────┘                 └──────────┘
Arsenal                    Chelsea
```

- Home badge+club, centered score `H - A`, away badge+club.
- User's club match row highlighted.

## Bottom Navigation

The 5th button shows **Done**. Tapping **Done** returns to the gameplay hub and resets the bottom nav to **Next** (time advance).

---

## Data Requirements

```text
EndData {
  leagueId: string
  leagueName: string
  matchweeks: MatchweekCard[]
}

MatchweekCard {
  weekNumber: number
  date: string
  matches: LeagueMatch[]
}

LeagueMatch {
  home: ClubSummary
  away: ClubSummary
  homeScore: number
  awayScore: number
  isUserClub: boolean
}
```

## Reusable Components

- Shell: `GameplayScreen` Type 2 from [global.md](../../../global.md)
- Menu index: [index.md](../../index.md)
