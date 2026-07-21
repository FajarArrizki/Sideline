# Stats Detail

> **Context:** This screen uses **Gameplay global Type 2** defined in [global.md](../../../../../../global.md). It keeps the top header and floating bottom navigation, and uses a GameplaySecondaryHeader (back arrow + stat category title). Reached by tapping a stat card on [Pick stats](../Pick%20stats/pick%20stats.md). The content slot contains a leaderboard table built with `GameplayTable`.

## Layout Type

**Type 2 — Back Arrow + Title.**

## Secondary Header

- **GameplayBackButton**: left-aligned back icon. Pops back to Pick Stats.
- **TitleText**: the stat category name (e.g., **Top Scorer**, **Top Assists**).

## Content: Leaderboard Table

A single `GameplayTable` from [table.md](../../../../../../Comp/table.md) that fills the content slot. The table scrolls horizontally when columns overflow.

### Columns

Columns vary by stat category. Common columns across all categories:

```
# | Name Player | [Stat-Specific Columns...]
```

#### # (Rank)

- Fixed width, numeric.
- Displays the rank number (1, 2, 3, ...).
- Top 3 ranks may use gold/silver/bronze visual treatment if the design system defines a rank token.

#### Name Player

- Displays the player's face icon + full name.
- Uses the same face-plus-name composition as the pick-your-team player rows.
- Face icon uses a small avatar token.

#### Stat-Specific Columns

Columns added based on the selected stat category:

| Stat Category | Extra Columns |
|---|---|
| **Top Scorer** | Goals, Matches, Goals Per Match |
| **Top Assists** | Assists, Matches, Assists Per Match |
| **Most Clean Sheets** | Clean Sheets, Matches, Goals Conceded |
| **Most Chances Created** | Chances Created, Assists, Matches |
| **Most Tackles** | Tackles Won, Tackles, Success % |
| **Most Interceptions** | Interceptions, Matches |
| **Most Saves** | Saves, Matches, Save Percentage |
| **Best Young Player** | Age, Goals, Assists, Matches, Rating |
| **Best Player (MVP)** | Goals, Assists, Rating, Matches |
| **Most Yellow Cards** | Yellow Cards, Matches, Fouls |
| **Most Red Cards** | Red Cards, Yellow Cards, Matches |

## Top Scorer

| # | Player | Goals | Matches | G/M |
|---:|---|---:|---:|---:|
| 1 | [face] Bruno Fernandes | 18 | 30 | 0.60 |
| 2 | [face] Marcus Rashford | 15 | 28 | 0.54 |
| 3 | [face] Erling Haaland | 14 | 22 | 0.64 |

---

## Top Assists

| # | Player | Assists | Matches | A/M |
|---:|---|---:|---:|---:|
| 1 | [face] Kevin De Bruyne | 18 | 30 | 0.60 |
| 2 | [face] Bruno Fernandes | 12 | 30 | 0.40 |
| 3 | [face] Martin Ødegaard | 11 | 29 | 0.38 |

---

## Most Clean Sheets

| # | Goalkeeper | Clean Sheets | Matches | Goals Conceded |
|---:|---|---:|---:|---:|
| 1 | [face] André Onana | 16 | 30 | 24 |
| 2 | [face] Alisson Becker | 15 | 29 | 22 |
| 3 | [face] Ederson | 14 | 28 | 21 |

---

## Most Chances Created

| # | Player | Chances Created | Assists | Matches |
|---:|---|---:|---:|---:|
| 1 | [face] Kevin De Bruyne | 96 | 18 | 30 |
| 2 | [face] Bruno Fernandes | 91 | 12 | 30 |
| 3 | [face] Martin Ødegaard | 82 | 11 | 29 |

---

## Most Tackles

| # | Player | Tackles Won | Tackles | Success % |
|---:|---|---:|---:|---:|
| 1 | [face] Declan Rice | 88 | 102 | 86.3% |
| 2 | [face] Rodri | 82 | 97 | 84.5% |
| 3 | [face] João Palhinha | 79 | 95 | 83.2% |

---

## Most Interceptions

| # | Player | Interceptions | Matches | Per Match |
|---:|---|---:|---:|---:|
| 1 | [face] Rodri | 61 | 30 | 2.03 |
| 2 | [face] Declan Rice | 58 | 29 | 2.00 |
| 3 | [face] William Saliba | 54 | 30 | 1.80 |

---

## Most Saves

| # | Goalkeeper | Saves | Save % | Matches |
|---:|---|---:|---:|---:|
| 1 | [face] Jordan Pickford | 118 | 78% | 31 |
| 2 | [face] André Onana | 106 | 76% | 30 |
| 3 | [face] Alisson Becker | 99 | 80% | 29 |

---

## Best Young Player

| # | Player | Age | Goals | Assists | Rating |
|---:|---|---:|---:|---:|---:|
| 1 | [face] Jude Bellingham | 21 | 12 | 10 | 8.42 |
| 2 | [face] Jamal Musiala | 21 | 11 | 9 | 8.29 |
| 3 | [face] Florian Wirtz | 22 | 10 | 11 | 8.21 |

---

## Best Player (MVP)

| # | Player | Goals | Assists | Rating | Matches |
|---:|---|---:|---:|---:|---:|
| 1 | [face] Bruno Fernandes | 18 | 12 | 8.42 | 30 |
| 2 | [face] Kevin De Bruyne | 10 | 18 | 8.31 | 30 |
| 3 | [face] Erling Haaland | 14 | 5 | 8.18 | 22 |

---

## Most Yellow Cards

| # | Player | Yellow Cards | Matches | Fouls |
|---:|---|---:|---:|---:|
| 1 | [face] João Palhinha | 12 | 29 | 63 |
| 2 | [face] Cristian Romero | 10 | 27 | 57 |
| 3 | [face] Declan Rice | 9 | 30 | 48 |

---

## Most Red Cards

| # | Player | Red Cards | Yellow Cards | Matches |
|---:|---|---:|---:|---:|
| 1 | [face] Cristian Romero | 2 | 10 | 27 |
| 2 | [face] Casemiro | 2 | 8 | 24 |
| 3 | [face] Fabian Schär | 1 | 7 | 29 |


### Table Behavior

- The `#` column is always fixed (non-scrolling) at the left edge.
- **Name Player** is semi-fixed: stays visible during horizontal scroll as long as the design system permits.
- All stat-specific columns scroll horizontally.
- Rows are sorted by the primary stat descending (most goals, most assists, etc.).
- The player from the user's club is visually highlighted using the club-color token or an indicator badge.
- Tapping a row has no action by default; a future screen plan may define one.

## Data Requirements

```text
StatTableData {
  category: string                    // e.g., "topScorer"
  columns: TableColumn[]
  rows: StatRow[]
}

TableColumn {
  key: string                         // data key
  label: string                       // column header label
  width?: number
  align?: 'left' | 'right' | 'center'
  format?: 'text' | 'number' | 'decimal' | 'percent'
  fixed?: boolean                     // true for # and Name Player
}

StatRow {
  rank: number
  playerId: string
  playerName: string
  playerFace: ImageSource
  isUserClubPlayer: boolean
  stats: Record<string, string | number>
}
```

## Reusable Components

- Shell: Type 2 from [global.md](../../../../../../global.md)
- Table: `GameplayTable` from [table.md](../../../../../../Comp/table.md)
- Menu index: [index.md](../../../../index.md)
- Source screen: [Pick stats](../Pick%20stats/pick%20stats.md)
