# Trow in

> **Context:** This screen uses **Gameplay global Type 1** defined in [global.md](../../../../../global.md) with the Tactic sub-navigation rail. It assigns throw-in takers for four types of throw-ins.

## Layout Type

**Type 1 — Sub-Navigation Rail.** Tactic sub-nav remains above.

## Content: Trow in Slots

Four assignment slots in a 2x2 grid or stacked.

### Slot Labels

| Slot | Label | Description |
|---|---|---|
| 1 | **Left Throw-in** | Takes throw-ins from the left side. |
| 2 | **Right Throw-in** | Takes throw-ins from the right side. |
| 3 | **Long Throw-in** | Takes long throw-ins into the box. |
| 4 | **Attacking Long Throw** | Takes attacking long throw-ins aimed at goal-scoring chances. |

### Empty Slot

```
┌──────────────────────┐
│                      │
│         ( + )        │
│                      │
│   Left Throw-in      │
└──────────────────────┘
```

### Filled Slot

```
┌──────────────────────┐
│  ┌──────────────┐    │
│  │   Player     │    │
│  │   Face       │    │
│  │   (br-0)     │    │
│  ├──────────────┤    │
│  │ Luke Shaw    │    │
│  └──────────────┘    │
│      [Change]        │
└──────────────────────┘
```

### Select Player Dropdown

Same pattern as [Captain](../../Captain/captain.md): squad player list, max 5 visible, scrolls beyond. Each row: face + name + position + squad number.

### Behavior

- Same player CAN take multiple throw-in roles.
- Tapping a row assigns the player and closes the dropdown.
- Tapping **Change** re-opens the dropdown.

## Data Requirements

```text
TrowInData {
  left: PlayerInfo | null
  right: PlayerInfo | null
  long: PlayerInfo | null
  attackingLong: PlayerInfo | null
}
```

See [Captain data shape](../../Captain/captain.md) for `PlayerInfo`.

## Reusable Components

- Shell: `GameplayScreen` Type 1 from [global.md](../../../../../global.md)
- Menu index: [index.md](../../../../index.md)
