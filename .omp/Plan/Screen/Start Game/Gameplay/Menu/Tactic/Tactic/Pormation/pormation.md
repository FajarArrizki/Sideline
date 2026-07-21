# Pormation

> **Context:** This screen uses **Gameplay global Type 1** defined in [global.md](../../../../global.md) with the Tactic sub-navigation rail. It lets the manager select and preview formations with a pitch diagram and dot layout. A dropdown and a horizontal scrolling rail both control the formation selection.

## Layout Type

**Type 1 — Sub-Navigation Rail.** Tactic sub-nav remains above.

## Content Structure

```text
GameplayContentSlot
├── FormationDropdown
├── PitchDiagram (dot formation preview)
├── FormationName (title below pitch)
└── FormationRail (horizontal scroll)
```

---

## 1. Formation Dropdown

A dropdown at the top of the content slot.

```
┌──────────────────────────────────────┐
│  4-3-3 Attack                     ▾  │
└──────────────────────────────────────┘
```

### Options

```
4-3-3 Attack
4-3-3 Defend
4-4-2 Classic
4-4-2 Diamond
4-2-3-1 Wide
3-5-2
3-4-3
5-3-2
4-1-4-1
```

Selecting a formation updates the pitch diagram, the formation name, and the rail below.

---

## 2. Pitch Diagram

A pitch rendering using [mplsoccer](https://pypi.org/project/mplsoccer/0.0.3/). Shows the selected formation as dots.

```
┌──────────────────────────────────────┐
│            ●                         │
│     ●              ●                 │
│          ●     ●                     │
│    ●                   ●             │
│  ●     ●           ●     ●           │
│             ●                        │
└──────────────────────────────────────┘
```

- Dots colored per position: GK (yellow), DEF (blue), MID (green), FWD (red).
- If the formation is active, dots show assigned player names below.

---

## 3. Formation Name

Below the pitch, centered heading + short description.

```
4-3-3 Attack
Winger-focused attacking formation.
```

---

## 4. Formation Rail

Below the formation name, a horizontal scrolling rail of formation cards. Same pattern as the Squat card rail.

```
← ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ →
   │  ●  ●    │ │  ● ● ●   │ │  ●   ●   │ │ ● ● ● ●  │
   │    ●     │ │   ● ●    │ │    ● ●   │ │    ●      │
   │  ●   ●   │ │ ● ● ● ●  │ │ ● ● ● ●  │ │ ●   ●     │
   │ ●     ●  │ │ ●     ●  │ │ ●     ●  │ │           │
   │          │ │          │ │          │ │           │
   │ 4-3-3 Att│ │ 4-4-2    │ │ 3-5-2    │ │ 4-2-3-1   │
   └──────────┘ └──────────┘ └──────────┘ └──────────┘
```

- Miniature pitch + dots + formation name.
- Active formation has highlighted border.
- Tapping a card updates the pitch diagram, formation name, and dropdown.
- Horizontal scroll, full-bleed, overflow visible.

---

## Data Requirements

```text
FormationData {
  activeFormationId: string
  formations: Formation[]
}

Formation {
  id: string
  name: string
  description: string
  positions: FormationDot[]
}

FormationDot {
  position: string
  x: number
  y: number
  playerName?: string
}
```

## Reusable Components

- Shell: `GameplayScreen` Type 1 from [global.md](../../../../global.md)
- Pitch: [mplsoccer](https://pypi.org/project/mplsoccer/0.0.3/)
- Menu index: [index.md](../../../index.md)

## Acceptance Criteria

- Type 1 layout with Tactic sub-nav intact.
- Dropdown + horizontal rail both control formation selection; synchronized.
- Pitch shows dots at correct positions, colored per position type.
- Formation name + description centered below pitch.
- Horizontal rail cards show mini pitch + name; tap to switch.
- Active formation card highlighted.
