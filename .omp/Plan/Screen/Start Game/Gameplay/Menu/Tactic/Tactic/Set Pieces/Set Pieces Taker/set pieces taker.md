# Set Pieces Taker

> **Context:** This screen uses **Gameplay global Type 1** defined in [global.md) with the Tactic sub-navigation rail. It assigns the general set-piece taker.

## Layout Type

**Type 1 — Sub-Navigation Rail.** Tactic sub-nav remains above.

## Content: Set Pieces Taker Slot

One assignment slot.

### Slot Label

| Slot | Label | Description |
|---|---|---|
| 1 | **Set Pieces Taker** | General set-piece taker (covers all indirect set pieces, short freekicks, and routine set pieces). |

### Empty Slot

```
┌──────────────────┐
│                  │
│       ( + )      │
│                  │
│ Set Pieces Taker │
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

## Data Requirements

```text
SetPiecesTakerData {
  taker: PlayerInfo | null
}
```

See [Captain data shape](../../Captain/captain.md) for `PlayerInfo`.

## Reusable Components

- Shell: `GameplayScreen` Type 1 from [global.md)
- Menu index: [index.md](../../../../index.md)
