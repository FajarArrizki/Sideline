# Scounting Team

> **Context:** This screen uses **Gameplay global Type 1** defined in [../../../../global.md](../../../../global.md) with the Management sub-navigation rail. It displays the scouting staff assigned to the club in a table format.

## Layout Type

**Type 1 — Sub-Navigation Rail.** Management sub-nav (Overview, Scouting Center) remains above.

## Content: Scout Table

A `GameplayTable` from [table.md](../../../../Comp/table.md) listing all scouting staff.

### Columns

```
# │ Name                       │ Best For              │ Rating
```

| Column | Key | Description |
|---|---|---|
| **#** | rank | Fixed width, numeric. |
| **Name** | name | Scout face image + full name. Semi-fixed. |
| **Best For** | bestFor | Scout's specialty recommendation (e.g., "Attacking positions", "Youth prospects", "Defensive players"). |
| **Rating** | rating | Numeric 0.0–5.0. Visual bar or stars may accompany. |

### Example

```
# │ Name                      │ Best For                       │ Rating
──┼───────────────────────────┼────────────────────────────────┼───────
1 │ [face] Jorge Mendes       │ Attacking positions            │ 4.8
2 │ [face] Mino Raiola        │ Youth prospects                │ 4.5
3 │ [face] Kia Joorabchian    │ Defensive players              │ 4.2
4 │ [face] Jonathan Barnett   │ Midfield playmakers            │ 4.0
5 │ [face] Giuliano Bertolucci│ Goalkeeper scouting            │ 3.8
```

### Behavior

- `#` column fixed at left edge.
- **Name** semi-fixed.
- Rows are sorted by rating descending by default.
- Tapping a scout row opens the scout's individual detail or assignment panel (pending design).
- Tapping **Rating** column header toggles sort ascending/descending.

## Data Requirements

```text
ScoutTeamData {
  scouts: ScoutRow[]
}

ScoutRow {
  id: string
  rank: number
  name: string
  face: ImageSource
  bestFor: string       // e.g., "Attacking positions"
  rating: number        // 0.0–5.0
}
```

## Reusable Components

- Shell: `GameplayScreen` Type 1 from [../../../../global.md](../../../../global.md)
- Table: `GameplayTable` from [table.md](../../../../Comp/table.md)
- Menu index: [../../../index.md](../../../index.md)

## Acceptance Criteria

- Type 1 layout with Management sub-nav intact.
- Table shows all scouting staff with #, Name (face+name), Best For, and Rating columns.
- Sorted by rating descending by default.
- Column headers are tappable to toggle sort order.
