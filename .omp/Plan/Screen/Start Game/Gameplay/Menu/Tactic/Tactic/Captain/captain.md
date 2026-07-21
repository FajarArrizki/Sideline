# Captain

> **Context:** This screen uses **Gameplay global Type 1** defined in [global.md](../../../../global.md) with the Tactic sub-navigation rail. It assigns the team captain and vice-captain from the squad list.

## Layout Type

**Type 1 — Sub-Navigation Rail.** Tactic sub-nav (Overview, Squad list, Tactic) remains above.

## Content: Captain Slots

Two assignment slots in a horizontal row.

### Empty Slot

```
┌──────────────────┐
│                  │
│       ( + )      │
│                  │
│     Captain      │
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
│                  │
│     [Change]     │
└──────────────────┘
```

### Slot Labels

| Slot | Label | Description |
|---|---|---|
| 1 | **Captain** | Primary captain. |
| 2 | **Vice Captain** | Secondary captain, takes over when captain is off-field. |

### Select Player Dropdown

Tapping **+** or **Change** opens a player selection dropdown sourced from the squad.

```
Select Captain
─────────────────────────
┌──────┐
│ Face │ Bruno Fernandes
│      │ CM · #8
└──────┘

┌──────┐
│ Face │ Marcus Rashford
│      │ ST · #10
└──────┘

┌──────┐
│ Face │ Casemiro
│      │ DM · #18
└──────┘

┌──────┐
│ Face │ Lisandro Martinez
│      │ CB · #6
└──────┘

┌──────┐
│ Face │ Luke Shaw
│      │ LB · #23
└──────┘
```

### Dropdown Behavior

- Sourced from the current squad players.
- Maximum 5 rows visible; scrolls if the squad has more than 5 players.
- Each row shows: player face + name + position + squad number.
- Tapping a row assigns that player to the slot and closes the dropdown.
- The same player cannot be both Captain and Vice Captain. If selected for one, they are disabled in the other.

## Data Requirements

```text
CaptainData {
  captain: PlayerInfo | null
  viceCaptain: PlayerInfo | null
}

PlayerInfo {
  id: string
  name: string
  face: ImageSource
  position: string        // e.g., "CM"
  squadNumber: number     // e.g., 8
}
```

## Reusable Components

- Shell: `GameplayScreen` Type 1 from [global.md](../../../../global.md)
- Menu index: [index.md](../../../index.md)

## Acceptance Criteria

- Two slots: Captain and Vice Captain, side by side.
- Empty slot shows **+**; tap opens player dropdown.
- Dropdown shows squad players (face + name + position + number), max 5 visible, scrolls.
- Tapping a player assigns them to the slot.
- Same player cannot occupy both slots.
- Filled slot shows player face (border-radius 0) + name + **[Change]** button.
