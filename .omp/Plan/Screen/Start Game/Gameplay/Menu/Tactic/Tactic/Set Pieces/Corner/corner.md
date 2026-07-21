# Corner

> **Context:** This screen uses **Gameplay global Type 1** defined in [global.md](../../../../../global.md) with the Tactic sub-navigation rail. It assigns corner kick takers for the left and right sides.

## Layout Type

**Type 1 — Sub-Navigation Rail.** Tactic sub-nav remains above.

## Content: Corner Slots

Two assignment slots side by side.

### Slot Labels

| Slot | Label | Description |
|---|---|---|
| 1 | **Left Corner** | Takes corners from the left side. |
| 2 | **Right Corner** | Takes corners from the right side. |

### Empty Slot

```
┌──────────────────┐
│                  │
│       ( + )      │
│                  │
│   Left Corner    │
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

- The same player CAN take both left and right corners (unlike Captain/Vice Captain mutual exclusion).
- Tapping a row assigns the player and closes the dropdown.
- Tapping **Change** re-opens the dropdown.

## Data Requirements

```text
CornerData {
  leftCorner: PlayerInfo | null
  rightCorner: PlayerInfo | null
}
```

See [Captain data shape](../../Captain/captain.md) for `PlayerInfo`.

## Reusable Components

- Shell: `GameplayScreen` Type 1 from [global.md](../../../../../global.md)
- Menu index: [index.md](../../../../index.md)
