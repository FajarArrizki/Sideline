# Pinalties

> **Context:** This screen uses **Gameplay global Type 1** defined in [global.md](../../../../../global.md) with the Tactic sub-navigation rail. It assigns penalty kick takers in priority order; player 1 takes first, then 2, then 3 if substitutions or injuries occur.

## Layout Type

**Type 1 — Sub-Navigation Rail.** Tactic sub-nav remains above.

## Content: Penalty Slots

Three assignment slots in a horizontal row or stacked vertically.

### Slot Labels

| Slot | Label | Description |
|---|---|---|
| 1 | **1st Taker** | Primary penalty taker. |
| 2 | **2nd Taker** | Takes if 1st is unavailable. |
| 3 | **3rd Taker** | Takes if 1st and 2nd are unavailable. |

### Empty Slot

```
┌──────────────────┐
│                  │
│       ( + )      │
│                  │
│    1st Taker     │
└──────────────────┘
```

### Filled Slot

```
┌──────────────────┐
│  ┌────────────┐  │
│  │  Player    │  │
│  │  Face      │  │
│  │  (br-0)    │  │
│  ├────────────┤  │
│  │ Bruno      │  │
│  │ Fernandes  │  │
│  └────────────┘  │
│     [Change]     │
└──────────────────┘
```

### Select Player Dropdown

Same pattern as [Captain](../../Captain/captain.md): squad player list, max 5 visible, scrolls beyond. Each row: face + name + position + squad number.

### Behavior

- The same player CANNOT take multiple penalty slots. If selected for slot 1, they are disabled in slots 2 and 3.
- Slot order matters: 1st takes priority.
- Tapping a row assigns the player and closes the dropdown.
- Tapping **Change** re-opens the dropdown.

## Data Requirements

```text
PenaltyData {
  firstTaker: PlayerInfo | null
  secondTaker: PlayerInfo | null
  thirdTaker: PlayerInfo | null
}
```

See [Captain data shape](../../Captain/captain.md) for `PlayerInfo`.

## Reusable Components

- Shell: `GameplayScreen` Type 1 from [global.md](../../../../../global.md)
- Menu index: [index.md](../../../../index.md)
