# Freekick

> **Context:** This screen uses **Gameplay global Type 1** defined in [global.md) with the Tactic sub-navigation rail. It assigns freekick takers for three types of freekicks.

## Layout Type

**Type 1 — Sub-Navigation Rail.** Tactic sub-nav remains above.

## Content: Freekick Slots

Three assignment slots.

### Slot Labels

| Slot | Label | Description |
|---|---|---|
| 1 | **Direct Free Kick** | Takes direct freekicks (shooting on goal). |
| 2 | **Long Free Kick** | Takes long-range freekicks (crosses into the box). |
| 3 | **Indirect Free Kick** | Takes indirect freekicks (short pass to a teammate). |

### Empty Slot

```
┌──────────────────┐
│                  │
│       ( + )      │
│                  │
│ Direct Free Kick │
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

- Same player CAN take multiple freekick roles (unlike Captain/Pinalties mutual exclusion).
- Tapping a row assigns the player and closes the dropdown.
- Tapping **Change** re-opens the dropdown.

## Data Requirements

```text
FreekickData {
  direct: PlayerInfo | null
  long: PlayerInfo | null
  indirect: PlayerInfo | null
}
```

See [Captain data shape](../../Captain/captain.md) for `PlayerInfo`.

## Reusable Components

- Shell: `GameplayScreen` Type 1 from [global.md)
- Menu index: [index.md](../../../../index.md)
