# Knockout Stage

> **Context:** This screen uses **Gameplay global Type 2** defined in [global.md](../../../../../../global.md). It keeps the top header and floating bottom navigation, and uses a GameplaySecondaryHeader (back arrow + stage title). Reached from the Group Stage section after group tables. The content slot contains a stage navigation bar and a vertical list of match cards.

## Layout Type

**Type 2 — Back Arrow + Title.**

## Secondary Header

- **GameplayBackButton**: left-aligned back icon. Pops back to the Group Stage.
- **TitleText**: the knockout stage name (e.g., **16 Besar**, **8 Besar**, **Quarter Final**, **Semi Final**, **Final**).

## Stage Navigation Bar

A horizontal card directly below the secondary header. It lets the user navigate between knockout stages.

```
┌──────────────────────────────────────────┐
│  ←        16 Besar (4/8)        →        │
└──────────────────────────────────────────┘
```

- **Left arrow**: cycles to the previous knockout stage (e.g., 16 Besar ← Group Stage). Disabled/hidden when at the earliest stage.
- **Center text**: stage name + progress counter (e.g., "16 Besar (4/8)" meaning 4 of 8 matches played).
- **Right arrow**: cycles to the next knockout stage (e.g., 16 Besar → 8 Besar). Disabled/hidden when at the final.
- The card uses `color.surface.card` and is pressable only on the arrow areas.

## Content: Match Cards

Below the stage navigation bar, a vertical scrolling list of match cards. Each card represents one knockout tie.

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
│          1st Leg: 2-1                        │
│          2nd Leg: 1-1                        │
│          Agg: 3-2                            │
│                                              │
└──────────────────────────────────────────────┘
```

### Card Structure

1. **Center group**: horizontal alignment with three zones.
   - **Left**: home club badge + home club name below.
   - **Center**: **VS** in bold heading token.
   - **Right**: away club badge + away club name below.
2. **Match details** (below the center group): centered text showing scores.
   - For two-legged ties: 1st Leg score, 2nd Leg score, Aggregate.
   - For single-match ties (e.g., Final): no leg breakdown, just the final score.

### Match Card Behavior

- Tapping a match card pushes a Match Detail screen (pending design).
- The user's club card is highlighted with the club-color token.

### Config

```text
knockoutConfig {
  stages: KnockoutStage[]
}

KnockoutStage {
  id: string
  name: string              // e.g., "16 Besar", "8 Besar"
  legs: 1 | 2               // single leg or two legs
  matches: KnockoutMatch[]
}

KnockoutMatch {
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
  firstLeg?: {
    homeScore: number
    awayScore: number
  }
  secondLeg?: {
    homeScore: number
    awayScore: number
  }
  aggregate?: string        // e.g., "3-2" or "3-2 (aet)" or "3-2 (4-3 pens)"
  winner?: 'home' | 'away'
}
```

## Example: 16 Besar Stage

```
← 16 Besar (3/8) →

┌──────────────────────────────────────┐
│ [badge]  VS  [badge]                 │
│ Man Utd      Real Madrid             │
│ 1st Leg: 2-1  2nd Leg: 1-1  Agg: 3-2│
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│ [badge]  VS  [badge]                 │
│ Barcelona    Bayern Munich           │
│ 1st Leg: 1-0  2nd Leg: 0-3  Agg: 1-3│
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│ [badge]  VS  [badge]                 │
│ Arsenal      PSG                     │
│ 1st Leg: -   2nd Leg: -   Agg: -     │
└──────────────────────────────────────┘
```

## Reusable Components

- Shell: Type 2 from [global.md](../../../../../../global.md)
- Menu index: [index.md](../../../../index.md)
