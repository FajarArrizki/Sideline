# Squad List

> **Note:** Same design as [Serch Player](../../Transfer/Serch%20Player/serch%20player.md). **Type 1 — Sub-Navigation Rail.** Tactic sub-nav remains above. Uses `GameplayScreen` shell from [global.md](../../../global.md). Only the data source and top controls differ.

## Differences from Serch Player

### Sticky Header

Same club badge + budget card. The budget label reads **Squad Budget** instead of "Transfer Budget".

### View Selection Dropdown

Replaces the search input. A dropdown that filters the table by squad level:

```
┌──────────────────────────────────────────┐
│  First Team                          ▾   │
└──────────────────────────────────────────┘
```

| Option | Description |
|---|---|
| **First Team** | Main senior squad. |
| **Reserve Team** | Reserve / B team players. |
| **U21** | Under-21 squad. |
| **U18** | Under-18 / academy squad. |

The dropdown sits in the same position as the search input in Serch Player. The filter button remains on the right.

### Filter Overlay

Identical to Serch Player: Position checkboxes, Age Range slider, Rating range, Contract filter. Opens from the right.

### Table Columns

Same as Serch Player:

```
★ │ Name Player │ Position │ Age │ Rating
```

### Behavior

- Switching the view dropdown rebuilds the table with the selected squad level.
- Wishlist toggle (★) works the same.
- Tapping a row navigates to [Player Detail](../../Transfer/Player%20detail/player%20detail.md) — same flow (Approach to Buy/Loan for senior squad, Free Agent for youth).
- The filter button is still available; filters apply within the currently selected squad view.

## Data Requirements

```text
SquadListData {
  clubBudget: number
  currentView: 'first_team' | 'reserve' | 'u21' | 'u18'
  players: PlayerRow[]       // same PlayerRow as Serch Player
}
```

## Reusable Components

- See [Serch Player design](../../Transfer/Serch%20Player/serch%20player.md) for full spec.
