# Schedule List

> **Context:** This screen uses **Gameplay global Type 2** defined in [global.md](../../../../../global.md). It keeps the top header and floating bottom navigation, and uses a GameplaySecondaryHeader (back arrow + competition name). Reached after selecting a competition in [Schedule](../schedule.md) → Done. The content slot contains a date navigation bar and a vertical list of match cards.

## Layout Type

**Type 2 — Back Arrow + Title.**

## Secondary Header

- **GameplayBackButton**: left-aligned back icon. Pops back to the competition selection.
- **TitleText**: the competition name (e.g., **Premier League**).

## Date Navigation Bar

A horizontal card directly below the secondary header. It lets the user navigate between matchdays.

```
┌──────────────────────────────────────────┐
│  ←        01 - Juni        →             │
└──────────────────────────────────────────┘
```

- **Left arrow**: moves to the previous matchday. Disabled/hidden at the earliest scheduled date.
- **Center text**: date in `DD - Bulan` format (e.g., **01 - Juni**, **15 - Agustus**).
- **Right arrow**: moves to the next matchday. Disabled/hidden at the latest scheduled date.
- The card uses `color.surface.card` and the date text uses a heading token.

## Content: Match Cards

Below the date navigation bar, a vertical scrolling list of match cards for that matchday. Each card follows the same pattern as the Knockout Stage match cards.

### Match Card Layout

```
┌──────────────────────────────────────────────┐
│                                              │
│  ┌──────────┐                  ┌──────────┐  │
│  │  Club    │       VS         │  Club    │  │
│  │  Badge   │                  │  Badge   │  │
│  └──────────┘                  └──────────┘  │
│  Manchester Utd             Real Madrid      │
│                                              │
│              15:00 WIB                       │
│           Old Trafford                       │
│                                              │
└──────────────────────────────────────────────┘
```

### Card Structure

1. **Center group**: horizontal alignment with three zones.
   - **Left**: home club badge + home club name below.
   - **Center**: **VS** in bold heading token.
   - **Right**: away club badge + away club name below.
2. **Match info** (below the center group): kick-off time + stadium name, centered.
   - If the match is finished, show the score instead (e.g., **2 - 1**) with the time/stadium below.

### Match States

| State | Display |
|---|---|
| **Upcoming** | VS + time + stadium |
| **Live** | Current score + elapsed time (e.g., **2 - 1 (72')**) |
| **Finished** | Final score + **FT** badge |
| **Postponed** | VS + **Postponed** badge |

### Highlights

- The user's club is highlighted with the club-color token on its side of the card.
- Tapping a match card pushes a Match Detail screen (pending design).

## Empty State

- If no matches exist for the selected date, show a centered message: **No matches scheduled**.
- The date navigation bar remains visible so the user can navigate to another date.

## Data Requirements

```text
ScheduleData {
  competitionId: string
  competitionName: string
  matchdays: Matchday[]
}

Matchday {
  date: string             // e.g., "2026-06-01"
  matches: Match[]
}

Match {
  id: string
  home: {
    clubName: string
    clubBadge: ImageSource
    isUserClub: boolean
  }
  away: {
    clubName: string
    clubBadge: ImageSource
    isUserClub: boolean
  }
  kickoff: string          // e.g., "15:00 WIB"
  stadium: string           // e.g., "Old Trafford"
  status: 'upcoming' | 'live' | 'finished' | 'postponed'
  homeScore?: number
  awayScore?: number
  elapsed?: number          // minutes, for live matches
}
```

## Reusable Components

- Shell: Type 2 from [global.md](../../../../../global.md)
- Menu index: [index.md](../../../index.md)
- Source screen: [Schedule](../schedule.md)
