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
│  ┌──────┐   STATISTIK TIM   ┌──────┐     │
│  │ Home │                   │ Away │     │
│  │Badge │        [Home ▾]   │Badge │     │
│  └──────┘                   └──────┘     │
│  ────────────────────────────────────    │
│  Tembakan                    12  —  8   │
│  Tembakan ke arah gawang      5  —  3   │
│  Penguasaan bola            58% — 42%   │
│  Operan                     420 — 380   │
│  Akurasi operan             85% — 78%   │
│  ── scroll dalam card ──               │
│  Pelanggaran                 10  — 12   │
│  Kartu kuning                 2  —  1   │
│  Kartu merah                  0  —  0   │
│  Offside                      1  —  3   │
│  Tendangan sudut              6  —  4   │
└──────────────────────────────────────────┘
```

### Card Elements

| Element | Position | Description |
|---|---|---|
| **Home Badge** | Top-left | Home club badge. |
| **Away Badge** | Top-right | Away club badge. |
| **Title** | Center | "STATISTIK TIM" heading token. |
| **Toggle Dropdown** | Center below title | `[Home ▾]` or `[Away ▾]`. Tapping switches which team's stats are highlighted or shown first. |
| **Divider** | Full-width | Below the header. |
| **Stat Rows** | Stacked | Each row: label (left), Home value — Away value (right). |

### Stat Fields

| Field | Format |
|---|---|
| Tembakan (Shots) | `H — A` |
| Tembakan ke arah gawang (Shots on Target) | `H — A` |
| Penguasaan bola (Possession) | `H% — A%` |
| Operan (Passes) | `H — A` |
| Akurasi operan (Pass Accuracy) | `H% — A%` |
| Pelanggaran (Fouls) | `H — A` |
| Kartu kuning (Yellow Cards) | `H — A` |
| Kartu merah (Red Cards) | `H — A` |
| Offside | `H — A` |
| Tendangan sudut (Corners) | `H — A` |

### Behavior

- Only 5 rows visible; rest scroll within the card.
- Toggle `[Home ▾]` / `[Away ▾]` highlights that team's values with the club color.
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
  possession: number          // percentage
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
- Match Stats card shows home badge, title, away badge, toggle, and 10 stat rows.
- Only 5 stat rows visible; rest scroll within the card.
- Player Performance card shows 5 player rows per screen; scroll within the card.
- Toggle on both cards switches between Home and Away data.
- No dots, no "learn more" buttons on either card.
- Bottom nav shows **Next**.
