# Scounting Focus

> **Context:** This screen uses **Gameplay global Type 1** defined in [../../../../global.md](../../../../global.md) with the Management sub-navigation rail. It manages active scouting assignments — up to 3 concurrent scouting focus slots. Tapping a slot opens a bottom overlay to configure the assignment.

## Layout Type

**Type 1 — Sub-Navigation Rail.** Management sub-nav (Overview, Scouting Center) remains above.

## Content: Assignment Slots

A bento grid of assignment cards. Maximum 3 slots.

### Empty Slot

```
┌──────────────────┐
│                  │
│       ( + )      │
│                  │
│   Add Focus      │
└──────────────────┘
```

- Tapping **+** opens the scout selection dropdown to pick a scout from the [Scounting Team](../Scounting%20team/scounting%20team.md).

### Select Scout Dropdown

```
Select Scout
─────────────────────────
┌──────┐
│ Face │ Jorge Mendes
│      │ Rating: 4.8
└──────┘ Best: Attacking

┌──────┐
│ Face │ Mino Raiola
│      │ Rating: 4.5
└──────┘ Best: Youth
```

After selecting a scout, a bottom overlay slides up to configure the assignment. The scout info is pre-filled and read-only in the overlay.

### Filled Slot (Active Assignment)

```
┌──────────────────────┐
│              [Flag]  │
│  ┌────────┐   (4.5)  │
│  │ Scout  │          │
│  │ Photo  │          │
│  ├────────┤          │
│  │ Name   │          │
│  └────────┘          │
│                      │
│  Searching: 🇧🇷 Brazil│
│  Position: ST, LW    │
│  Age: 16-23          │
│                      │
│         [Edit]       │
└──────────────────────┘
```

| Element | Description |
|---|---|
| **Country Flag** | Top-right: scout's country flag. |
| **Rating Circle** | Top-right inside a circle: scout rating (0–5). |
| **Scout Photo** | Full-width, border-radius 0, flush to card top. |
| **Scout Name** | Heading token, bottom-left of photo. |
| **Search Summary** | Below the divider: current filter summary (country, position, age range). |
| **Edit Button** | Opens the configuration overlay to modify the assignment. |

### Behavior

- Tapping an empty **+** slot opens the scout selection dropdown.
- After selecting a scout, the configuration overlay slides up.
- Tapping a filled slot opens the edit overlay with the same scout pre-selected.
- Maximum 3 active assignments at any time.
- Completed assignments can be cleared to free a slot.

---

## Configuration Overlay

A bottom sheet that slides up after selecting a focus type or tapping Edit. It contains the scout selection card and filter inputs.

```
┌──────────────────────────────────────┐
│  ┌──────────────────────────┐        │
│  │                    [Flag]│        │
│  │  ┌────────┐       (4.5) │        │
│  │  │ Scout  │             │        │
│  │  │ Photo  │             │        │
│  │  ├────────┤             │        │
│  │  │ Name   │             │        │
│  │  └────────┘             │        │
│  └──────────────────────────┘        │
│                                      │
│  Country                             │
│  [Dropdown: Select Country      ▾]  │
│                                      │
│  Position                            │
│  [Multi-select checkboxes]          │
│                                      │
│  Age Range                           │
│  16 ────●──── 40                     │
│                                      │
│  Playing Style                       │
│  [Dropdown: Select Style        ▾]  │
│                                      │
│  [Cancel]              [Save]        │
└──────────────────────────────────────┘
```

### Overlay Fields

Fields are conditional based on the focus type selected in the dropdown.

**All focus types:**

| Field | Type | Description |
|---|---|---|
| **Scout Card** | Read-only | Shows the assigned scout info. Tap to change scout (re-opens scout dropdown). |
| **Country** | Dropdown | Country to scout in. Single-select with search. |
| **Age Range** | Dual slider | Min 15, Max 45. Both ends adjustable. |
| **Min Rating** | Input | Numeric, default 60. |
| **Max Rating** | Input | Numeric, default 99. |
| **Contract** | Checkbox | "Only expiring < 12 months" option. |

**Player / Youth Prospect only:**

| Field | Type | Description |
|---|---|---|
| **Position** | Checkboxes | GK, CB, FB, DM, CM, AM, W, ST. Multi-select. |
| **Playing Style** | Dropdown | Attacking, Possession, Counter-attack, High press, Tiki-taka, etc. |

**Staff only:**

| Field | Type | Description |
|---|---|---|
| **Role** | Checkboxes | Assistant Manager, Goalkeeping Coach, Attacking Coach, Defensive Coach, Technical Coach, Fitness Coach, Set Piece Coach, Scout, Head of Youth, Physio. |
### Save Behavior

- Save commits the assignment. The card updates with the scout info and filter summary.
- Cancel discards changes and closes the overlay.

---

## Data Requirements

```text
ScoutingAssignment {
  id: string
  scout: ScoutInfo | null
  filters: ScoutingFilters
}

ScoutInfo {
  name: string
  photo: ImageSource
  country: string
  countryFlag: ImageSource
  rating: number           // 0.0–5.0
}

ScoutingFilters {
  country: string
  positions: string[]
  ageMin: number
  ageMax: number
  playingStyle: string
  minRating: number
  maxRating: number
  expiringOnly: boolean
}
```

## Reusable Components

- Shell: `GameplayScreen` Type 1 from [../../../../global.md](../../../../global.md)
- Grid: `BentoGrid` from [bento.md](../../../../Comp/bento.md)
- Menu index: [../../index.md](../../index.md)

## Acceptance Criteria

- Type 1 layout with Management sub-nav intact.
- Max 3 assignment slots in a bento grid.
- Empty slot shows **+** icon; tap opens focus type dropdown.
- After selecting focus type, configuration overlay slides up.
- Overlay shows scout info card + filter inputs.
- Save commits; card updates with scout name, flag, rating, and filter summary.
- Filled slot shows scout photo (border-radius 0), name, recommendation, country flag + rating circle, and filter summary.
- Tapping a filled slot opens the edit overlay.
