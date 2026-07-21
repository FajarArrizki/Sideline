# Serch Player

> **Context:** This screen uses **Gameplay global Type 1** defined in [global.md](../../../global.md) with the Transfer sub-navigation rail. It displays a searchable, filterable table of players. The same layout applies to **Serch Staf**; only the filter overlay fields and the Position column values differ.

## Layout Type

**Type 1 — Sub-Navigation Rail.** Transfer sub-nav (Overview, Serch Player, Serch Staf, Wishlist) remains above.

## Content Structure

```text
GameplayContentSlot
├── StickyTopCard (club badge + budget, fixed)
├── FilterRow (search input + filter button)
├── PlayerTable (GameplayTable, scrollable)
```

---

## 1. Sticky Top Card

A horizontal card pinned at the top of the scroll. Does not scroll away.

```
┌──────────────────────────────────────────┐
│  ┌───────┐                               │
│  │ Club  │     Transfer Budget            │
│  │ Badge │     $12,500,000               │
│  └───────┘                               │
└──────────────────────────────────────────┘
```

| Element | Description |
|---|---|
| **Club Badge** | Current club badge, small avatar token. |
| **Label** | "Transfer Budget" in caption token. |
| **Amount** | Budget value in heading token, formatted currency. |

The card uses `color.surface.card`, `radius.card`, and sticks to the top via `position: sticky` or equivalent.

---

## 2. Filter Row

Below the sticky card, a horizontal bar with search input and filter button. This row is also sticky and does not scroll away.

```
┌──────────────────────────────────────────┐
│  🔍 Search players...             [Filter]│
└──────────────────────────────────────────┘
```

| Element | Description |
|---|---|
| **Search Input** | Text field with search icon. Filters the table by name as the user types. |
| **Filter Button** | Right-aligned button with icon + "Filter". Opens the filter overlay from the right. |

---

## 3. Filter Overlay

A side panel that slides in from the right. Contains position filters, age range, rating range, and additional filters.

```
┌──────────────────────┐
│  Filter          ✕   │
│  ───────────────────  │
│                      │
│  Position            │
│  ☐ Goalkeeper        │
│  ☐ Centre Back       │
│  ☐ Full Back         │
│  ☐ Midfielder        │
│  ☐ Winger            │
│  ☐ Striker           │
│                      │
│  Age Range           │
│  16 ────●──── 40     │
│                      │
│  Rating              │
│  Min: 60  Max: 99    │
│                      │
│  Contract            │
│  ☐ Expiring < 6mo    │
│  ☐ Free Agent        │
│                      │
│  [Reset]    [Apply]  │
└──────────────────────┘
```

### Player Filter Fields

| Field | Type | Description |
|---|---|---|
| **Position** | Checkboxes | Multi-select: Goalkeeper, Centre Back, Full Back, Defensive Midfielder, Central Midfielder, Attacking Midfielder, Winger, Striker. |
| **Age Range** | Dual slider | 16–40. Select min and max age. |
| **Rating** | Two inputs | Min rating (default 0), Max rating (default 99). |
| **Contract** | Checkboxes | "Expiring < 6 months", "Free Agent". |

Additional filters can be added via config without changing the UI.

### Serch Staf Differences

Staf filter overlay replaces the **Position** field with staff-specific roles and drops the **Contract** section:

| Field | Type | Description |
|---|---|---|
| **Position** | Checkboxes | Assistant Manager, Goalkeeping Coach, Attacking Coach, Defensive Coach, Technical Coach, Fitness Coach, Set Piece Coach, Scout, Head of Youth, Physio. |
| **Age Range** | Dual slider | Same as Player. |
| **Rating** | Two inputs | Same as Player. |

---

## 4. Player Table

A `GameplayTable` from [table.md](../../../Comp/table.md) below the filter row.

### Columns

```
★ │ Name Player │ Position │ Age │ Rating
```

| Column | Key | Description |
|---|---|---|
| **★** | wishlist | Toggle star icon. Filled = on wishlist. Tap to toggle. Fixed width, non-scrolling. |
| **Name Player** | name | Player face + full name. Semi-fixed. |
| **Position** | position | Player's primary position (e.g., ST, CM, CB). |
| **Age** | age | Numeric, sortable. |
| **Rating** | rating | Numeric 0–99, sortable. Visual bar or color may accompany the number. |

### Example

```
★ │ Name Player          │ Position │ Age │ Rating
──┼──────────────────────┼──────────┼─────┼───────
★ │ [face] Mbappe        │ ST       │ 25  │ 91
☆ │ [face] Haaland       │ ST       │ 24  │ 91
★ │ [face] Bellingham    │ CM       │ 21  │ 88
☆ │ [face] Vinicius Jr   │ LW       │ 24  │ 89
```

### Behavior

- ★ column fixed left. Name Player semi-fixed. Other columns scroll.
- Tap ★ to add/remove from wishlist. Wishlist state persisted across sessions.
- Tap row → [Player Detail](../Player%20detail/player%20detail.md) screen.
- Search input filters by name in real-time as user types.
- Filter overlay applies all selected filters when "Apply" is tapped. "Reset" clears all filters.
- Sorting: tap column header to sort ascending/descending.

### Serch Staf Differences

Staf table uses the same columns but Position displays staff roles:

```
★ │ Name Staf            │ Position             │ Age │ Rating
──┼──────────────────────┼──────────────────────┼─────┼───────
★ │ [face] Pep Guardiola │ Assistant Manager    │ 54  │ 92
☆ │ [face] Xabi Alonso   │ Attacking Coach      │ 42  │ 88
```

---

## Data Requirements

```text
PlayerSearchData {
  clubBudget: number
  players: PlayerRow[]
}

PlayerRow {
  id: string
  name: string
  face: ImageSource
  position: string         // e.g., "ST", "CM", "CB"
  age: number
  rating: number
  wishlisted: boolean
}

FilterState {
  positions: string[]      // selected position filters
  ageMin: number
  ageMax: number
  ratingMin: number
  ratingMax: number
  contractExpiring: boolean
  freeAgent: boolean
  searchQuery: string
}
```

## Reusable Components

- Shell: `GameplayScreen` Type 1 from [global.md](../../../global.md)
- Table: `GameplayTable` from [table.md](../../../Comp/table.md)
- Menu index: [index.md](../index.md)

## Acceptance Criteria

- Type 1 layout with Transfer sub-nav intact.
- Sticky card shows club badge + formatted transfer budget; does not scroll away.
- Search input filters table by name in real-time.
- Filter button opens right-side overlay with position, age, rating, and contract filters.
- Table columns: ★ (wishlist toggle), Name Player (face+name), Position, Age, Rating.
- Tapping ★ toggles wishlist state; persisted.
- Serch Staf reuses the same layout with staff-specific position filter and role display.
- "Apply" commits filters; "Reset" clears them.
