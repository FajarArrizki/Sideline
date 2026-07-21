# Statistic

> **Context:** This screen uses **Gameplay global Type 2** defined in [global.md). It keeps the top header and floating bottom navigation. The content slot contains match statistics cards in the same card style as the Portal [Home screen](../../Portal/Home/home.md). Reached after the match ends, before league results.

## Layout Type

**Type 2 — Back Arrow + Title.**

## Secondary Header

- **GameplayBackButton**: left-aligned back icon.
- **TitleText**: **Statistic**.

## Bottom Navigation

While this screen is active, the 5th button shows **Next**. Tapping **Next** advances to [End](../end/end.md).

---

## Content: Statistics Cards

Same card pattern as Portal Home — rounded cards with dividers and key-value rows. Each card is independently scrollable; only 5 rows are visible at a time, the rest scroll within the card.

---

## 1. Match Stats Card

```
┌──────────────────────────────────────────┐
│  ┌──────┐  Manchester United  [Home ▾]   │
│  │ Badge │                               │
│  └──────┘                                │
│  ────────────────────────────────────    │
│  Tembakan                          12    │
│  Tembakan ke arah gawang            5    │
│  Penguasaan bola                  58%    │
│  Operan                           420    │
│  Akurasi operan                   85%    │
│  ── scroll ↓ ──                         │
│  Pelanggaran                       10    │
│  Kartu kuning                       2    │
│  Kartu merah                        0    │
│  Offside                            1    │
│  Tendangan sudut                    6    │
└──────────────────────────────────────────┘
```

### Card Elements

| Element | Position | Description |
|---|---|---|
| **Club Badge** | Top-left | Single club badge. |
| **Club Name** | Top-left, next to badge | Club name in heading token. |
| **Dropdown** | Top-right | `[Home ▾]` or `[Away ▾]`. Switches which team's stats are shown. |
| **Divider** | Full-width | Below the header. |
| **Stat Rows** | Stacked | Each row: label (left), value (right). |

### Stat Fields

| Field | Format |
|---|---|
| Tembakan (Shots) | Number |
| Tembakan ke arah gawang (Shots on Target) | Number |
| Penguasaan bola (Possession) | Percentage |
| Operan (Passes) | Number |
| Akurasi operan (Pass Accuracy) | Percentage |
| Pelanggaran (Fouls) | Number |
| Kartu kuning (Yellow Cards) | Number |
| Kartu merah (Red Cards) | Number |
| Offside | Number |
| Tendangan sudut (Corners) | Number |

### Behavior

- Only 5 rows visible; rest scroll within the card.
- Toggle `[Home ▾]` / `[Away ▾]` switches badge, name, and all stat values to the selected team.
- No dots, no "learn more" button.

---

## 2. Player Performance Card

```
┌──────────────────────────────────────────┐
│  Performa Pemain              [Home ▾]   │
│  ────────────────────────────────────    │
│  ┌──────┐                               │
│  │ Face │ Bruno Fernandes    90'   8.4  │
│  └──────┘                               │
│  ┌──────┐                               │
│  │ Face │ Marcus Rashford    85'   7.8  │
│  └──────┘                               │
│  ┌──────┐                               │
│  │ Face │ Casemiro           90'   7.5  │
│  └──────┘                               │
│  ┌──────┐                               │
│  │ Face │ Lisandro Martinez  90'   7.2  │
│  └──────┘                               │
│  ┌──────┐                               │
│  │ Face │ Luke Shaw          78'   6.9  │
│  └──────┘                               │
│  ── scroll dalam card ──               │
│  ┌──────┐                               │
│  │ Face │ Antony             65'   6.5  │
│  └──────┘                               │
└──────────────────────────────────────────┘
```

### Card Elements

| Element | Position | Description |
|---|---|---|
| **Title** | Top-left | "Performa Pemain" heading token. |
| **Toggle** | Top-right | `[Home ▾]` / `[Away ▾]`. Switches between teams. |
| **Divider** | Full-width | Below the header. |
| **Player Rows** | Stacked | Face icon + player name + minutes + rating. |

### Player Row Format

```
┌──────┐
│ Face │ Player Name     90'    8.4
└──────┘
```

| Element | Description |
|---|---|
| **Face** | Small player avatar. |
| **Name** | Player full name. |
| **Minutes** | Minutes played (e.g., "90'", "65'"). |
| **Rating** | Match rating (0.0–10.0). Bold token. |

### Behavior

- 5 players visible; scroll within the card for substitutes and remaining squad.
- Toggle switches between Home and Away team player list.
- Sorted by rating descending.
- No dots, no "learn more" button.

---

## Data Requirements

```text
StatisticData {
  homeTeam: TeamStats
  awayTeam: TeamStats
}

TeamStats {
  clubName: string
  clubBadge: ImageSource
  matchStats: MatchStats
  playerRatings: PlayerRating[]
}

MatchStats {
  shots: number
  shotsOnTarget: number
  passes: number
  passAccuracy: number        // percentage
  fouls: number
  yellowCards: number
  redCards: number
  offsides: number
  corners: number
}

PlayerRating {
  id: string
  name: string
  face: ImageSource
  minutesPlayed: number
  rating: number             // 0.0–10.0
}
```

## Reusable Components

- Shell: `GameplayScreen` Type 2 from [global.md)
- Cards: same pattern as Portal [Home screen](../../Portal/Home/home.md)
- Menu index: [index.md](../../index.md)

## Acceptance Criteria

- Type 2 layout: back arrow + "Statistic" title.
- Match Stats card shows single club badge + name + dropdown; stats show only the selected team's values.
- Only 5 stat rows visible; rest scroll within the card.
- Player Performance card shows 5 player rows per screen; scroll within the card.
- Toggle on both cards switches between Home and Away data.
- No dots, no "learn more" buttons on either card.
- Bottom nav shows **Next**.
