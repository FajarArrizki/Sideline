# Group Stage

> **Context:** This screen uses **Gameplay global Type 2** defined in [global.md](../../../../../../global.md). It keeps the top header and floating bottom navigation, and uses a GameplaySecondaryHeader (back arrow + competition name title). Reached after completing the continent → competition flow in [step 2](../step%202.md) → Done. The content slot scrolls through all group tables; per-group labels are section sub-headers inside the content.

## Layout Type

**Type 2 — Back Arrow + Title.**

## Secondary Header

- **GameplayBackButton**: left-aligned back icon. Pops back to Step 2 (Select Competition).
- **TitleText**: the competition name (e.g., **Premier League**, **Liga Champion**). This is the Type 2 header title.

## Content: Group Tables

The content slot scrolls vertically and repeats this pattern for each group:

Each group starts with a **section sub-header** (not a Type 2 header) displaying the group name, followed by its table:

```
Group A                          ← section sub-header inside content
└── Table

Group B                          ← section sub-header inside content
└── Table

...
```

Each group renders **one** `GameplayTable` from [table.md](../../../../../../Comp/table.md). Groups are configurable — the number of groups and teams per group varies by competition.

### Table Columns

```
# | Club Name | MP | W | D | L | GF | GA | GD | Pts
```

| Column | Key | Description |
|---|---|---|
| **#** | rank | Fixed width, position rank (1, 2, 3, 4, 5). |
| **Club Name** | club | Club badge + club name, semi-fixed. |
| **MP** | played | Matches played. |
| **W** | wins | Wins. |
| **D** | draws | Draws. |
| **L** | losses | Losses. |
| **GF** | goalsFor | Goals scored. |
| **GA** | goalsAgainst | Goals conceded. |
| **GD** | goalDiff | Goal difference. |
| **Pts** | points | Total points. |

### Example: Group A

```
# │ Club Name              │ MP │ W │ D │ L │ GF │ GA │ GD │ Pts
1 │ [badge] Manchester Utd │  6 │ 4 │ 1 │ 1 │ 12 │  4 │ +8 │ 13
2 │ [badge] Real Madrid    │  6 │ 3 │ 2 │ 1 │ 10 │  6 │ +4 │ 11
3 │ [badge] Ajax           │  6 │ 2 │ 1 │ 3 │  7 │ 10 │ -3 │  7
4 │ [badge] Celtic         │  6 │ 0 │ 2 │ 4 │  3 │ 12 │ -9 │  2
```

### Behavior

- `#` column is fixed at the left edge.
- **Club Name** is semi-fixed.
- Remaining columns scroll horizontally if needed.
- The user's club is visually highlighted (club-color background or indicator).
- Top N rows (qualifying positions) may use a subtle highlight for qualification zone.
- The table is read-only; no row actions.

### Config

```text
groupStageConfig {
  groups: GroupConfig[]
}

GroupConfig {
  name: string              // e.g., "Group A"
  teams: number             // e.g., 4 or 5
  qualifyPositions: number  // e.g., 2 (top 2 advance)
}
```

## Reusable Components

- Shell: Type 2 from [global.md](../../../../../../global.md)
- Table: `GameplayTable` from [table.md](../../../../../../Comp/table.md)
- Menu index: [index.md](../../../../index.md)
