# Squat

> **Context:** This screen uses **Gameplay global Type 1** defined in [global.md) with the Tactic sub-navigation rail. It shows the current formation on a pitch diagram, a local sub-navigation, and a horizontal scrolling rail of related cards.

## Layout Type

**Type 1 — Sub-Navigation Rail.** Tactic sub-nav (Overview, Squad list, Tactic) remains above.

## Content Structure

```text
GameplayContentSlot
├── PitchDiagram (formation preview)
├── LocalSubNavigation (Squad | Pormation | Set Pieces | Captain)
└── CardRail (horizontal scroll)
```

---

## 1. Pitch Diagram

A football pitch rendered in the top half of the content slot. The pitch shows the team's current formation with player positions.

### Pitch Library

Uses [mplsoccer](https://pypi.org/project/mplsoccer/0.0.3/) for rendering. The pitch is drawn as a static image or SVG generated from the current formation data.

### Player Component (on pitch)

Each player is rendered as a compact component at their position:

```
       [Pace 93] [#7]
       ┌──────────┐
       │  Player  │
       │  Face    │
       ├──────────┤
       │ ████████ │  ← Stamina bar
       │ Mbappe   │
       └──────────┘
```

| Element | Description |
|---|---|
| **Pace Rating** | Top-left: player's pace attribute (small number badge). |
| **Squad Number** | Top-right: player's jersey number. |
| **Player Face** | Centered, circular or small avatar. |
| **Stamina Bar** | Thin colored bar below the face. Green (>75%), Yellow (50-75%), Red (<50%). |
| **Player Name** | Below the stamina bar, small caption token. |

### Formation Layout

The pitch uses the standard 4-4-2, 4-3-3, 3-5-2, etc. layout. Player components are positioned per the active formation. The goalkeeper is at the bottom; strikers at the top.

### Interaction

- Tap a player on the pitch to open substitution or player detail.
- Tap an empty position to open player picker to assign a player from the squad.

### Dropdown Variant on Set Pieces

The **Set Pieces** tab uses the dropdown variant (text + arrow icon), not a single tab. Tapping it opens a dropdown menu listing all set piece types:

```
Set Pieces ▾
─────────────
Corner
Freekick
Pinalties
Set Pieces Taker
Trow in
```

Selecting a type updates the rail below to show the assigned taker cards for that set piece. Each card shows the taker in the same compact player card format.
## 2. Local Sub-Navigation

A horizontal tab rail below the pitch. Reuses `GameplaySubNavigation` from [navigasi.md](../../../../Comp/navigasi.md). Three tabs use `single` variant; **Set Pieces** uses `dropdown` variant.

```
[Squad] [Pormation] [Set Pieces] [Captain]
```

| Tab | Content in Rail Below |
|---|---|
| **Squad** | Substitute / bench players. Horizontal scroll cards. |
| **Pormation** | Formation templates (4-4-2, 4-3-3, etc.). Tap to switch. |
| **Set Pieces** | Dropdown tab (text + arrow). Opens dropdown: Corner, Freekick, Pinalties, Set Pieces Taker, Trow in. Selecting one shows the assigned taker cards in the rail below. |
| **Captain** | Captain and Vice Captain cards. |

---

## 3. Card Rail

Below the local sub-navigation, a horizontal scrolling rail of cards. Each card uses the same player component as the pitch but in a wider card format:

```
┌──────────────────┐
│  [93]      [#11] │
│  ┌────────────┐  │
│  │  Player    │  │
│  │  Face      │  │
│  ├────────────┤  │
│  │ ██████████ │  │
│  │ Marcus     │  │
│  │ Rashford   │  │
│  └────────────┘  │
│     [Sub On]     │
└──────────────────┘
```

### Squad Tab — Bench Players

- Horizontal scroll of substitute players.
- Each card shows the player + **[Sub On]** button.
- Tapping **[Sub On]** initiates a substitution: prompts the manager to select a player on the pitch to replace.
- Empty bench slot shows **(+)** to add a player from the reserve squad.

### Pormation Tab — Formation Options

- Horizontal scroll of formation cards.
- Each card shows a miniature pitch diagram with player dots and the formation name (e.g., "4-3-3 Attack").
- Current active formation has a highlighted border.
- Tapping a different formation switches the pitch diagram.

### Set Pieces Tab — Assignment Quick View

- Horizontal scroll of set piece assignment cards.
- Each card shows the set piece type + assigned taker.
- Example card: "Corner Left — Bruno Fernandes", "Penalties — Marcus Rashford".
- Tapping opens the full Set Pieces screen for editing.

### Captain Tab — Leadership Cards

- Horizontal scroll with Captain and Vice Captain cards.
- Same player component format.
- Tap to open the Captain assignment screen.

---

## Data Requirements

```text
SquatData {
  formation: FormationSetup
  benchPlayers: PlayerInfo[]
  setPieceAssignments: SetPieceSummary[]
}

FormationSetup {
  name: string           // e.g., "4-3-3 Attack"
  positions: PlayerPosition[]
}

PlayerPosition {
  position: string        // e.g., "ST", "CM", "GK"
  x: number              // pitch coordinate
  y: number              // pitch coordinate
  player: PlayerOnPitch | null  // null = empty slot
}

PlayerOnPitch {
  id: string
  name: string
  face: ImageSource
  pace: number
  squadNumber: number
  stamina: number        // 0–100
}

PlayerInfo {
  id: string
  name: string
  face: ImageSource
  pace: number
  squadNumber: number
  stamina: number        // 0–100
}

SetPieceSummary {
  type: string            // "Corner Left", "Corner Right", "Freekick", "Penalties"
  taker: string           // player name
}
```

## Reusable Components

- Shell: `GameplayScreen` Type 1 from [global.md)
- Sub-navigation: `GameplaySubNavigation` from [navigasi.md](../../../../Comp/navigasi.md)
- Pitch: [mplsoccer](https://pypi.org/project/mplsoccer/0.0.3/) for pitch rendering
- Menu index: [index.md](../../../index.md)

## Acceptance Criteria

- Type 1 layout with Tactic sub-nav intact.
- Pitch diagram renders the current formation with player components at each position.
- Player component shows pace rating (top-left), squad number (top-right), face, stamina bar, and name.
- Local sub-nav has 4 tabs: Squad, Pormation, Set Pieces, Captain.
- Squad tab shows bench players in a horizontal rail with **[Sub On]** buttons.
- Tapping **[Sub On]** opens substitution picker (select pitch player to replace).
- Pormation tab shows formation options; tapping switches the pitch.
- Set Pieces tab shows quick-access assignment cards; tapping opens full Set Pieces editor.
- Captain tab shows captain/vice cards.
- Stamina bar colors: green >75%, yellow 50-75%, red <50%.
