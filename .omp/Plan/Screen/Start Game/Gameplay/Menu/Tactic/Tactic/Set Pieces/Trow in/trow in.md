# Trow in

> **Context:** This screen uses **Gameplay global Type 1** defined in [global.md) with the Tactic sub-navigation rail. It assigns throw-in takers for the left and right sides.

## Layout Type

**Type 1 — Sub-Navigation Rail.** Tactic sub-nav remains above.

## Content: Trow in Slots

Two assignment slots side by side.

### Slot Labels

| Slot | Label | Description |
|---|---|---|
| 1 | **Left Throw-in** | Takes throw-ins from the left side. |
| 2 | **Right Throw-in** | Takes throw-ins from the right side. |

### Empty Slot

```
┌──────────────────┐
│                  │
│       ( + )      │
│                  │
│  Left Throw-in   │
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
│  │ Luke       │  │
│  │ Shaw       │  │
│  └────────────┘  │
│     [Change]     │
└──────────────────┘
```

### Select Player Dropdown

Same pattern as [Captain](../../Captain/captain.md): squad player list, max 5 visible, scrolls beyond. Each row: face + name + position + squad number.

### Behavior

- Same player CAN take both left and right throw-ins (unlike Captain mutual exclusion).
- Tapping a row assigns the player and closes the dropdown.
- Tapping **Change** re-opens the dropdown.

## Data Requirements

```text
TrowInData {
  left: PlayerInfo | null
  right: PlayerInfo | null
}
```

See [Captain data shape](../../Captain/captain.md) for `PlayerInfo`.

## Reusable Components

- Shell: `GameplayScreen` Type 1 from [global.md)
- Menu index: [index.md](../../../../index.md)
