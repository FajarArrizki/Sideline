# Match

> **Context:** This screen uses **Gameplay global Type 2** defined in [global.md](../../../global.md). It keeps the top header and floating bottom navigation. The content slot contains a match-time bar, a 2D pitch with animated player dots, and a bottom action bar with 3 tactical buttons.

## Layout Type

**Type 2 — Back Arrow + Title.** The floating bottom navigation is hidden during match; a custom bottom action bar replaces it.

## Content Structure

```text
GameplayContentSlot
├── MatchTimeBar (timer + progress + settings)
├── 2D Pitch (vertical, home vs away)
└── MatchActionBar (3 buttons)
```

---

## 1. Match Time Bar

A horizontal bar at the top of the content slot.

```
┌──────────────────────────────────────────────┐
│ ⏱  ──────────────●──────────────  20'    ⚙  │
└──────────────────────────────────────────────┘
```

| Element | Position | Description |
|---|---|---|
| **Timer Icon** | Left | ⏱ icon. |
| **Progress Bar** | Center, full remaining width | Match time progress. Filled portion = elapsed. Marker shows current minute. |
| **Minute** | Right of progress | e.g., "20'". Updates live. |
| **Settings Icon** | Right | ⚙ icon. Tapping opens a dropdown with match controls. |

### Settings Dropdown

```
⚙
─────────────
Waktu Pertandingan
Pause
End
```

| Option | Action |
|---|---|
| **Waktu Pertandingan** | Opens the time control panel (see below). |
| **Pause** | Pauses the match. Opens a confirmation modal. |
| **End** | Ends the match early. Opens a confirmation modal. |

#### Time Control Panel

When **Waktu Pertandingan** is selected, a bottom sheet slides up:

```
┌──────────────────────────────────────┐
│  Waktu Pertandingan              ✕   │
│  ────────────────────────────────    │
│                                      │
│  Match Duration                      │
│  1 ────────────●─────────── 10       │
│         6 minutes                    │
│                                      │
│  ┌──────────┐   ┌──────────┐         │
│  │  Pause   │   │   End    │         │
│  └──────────┘   └──────────┘         │
└──────────────────────────────────────┘
```

| Element | Description |
|---|---|
| **Duration Slider** | Range 1–10 minutes. Default: 6. Sets how many real-time minutes the match runs. |
| **Pause Button** | Pauses the match timer. Opens confirmation modal. |
```
┌──────────────────────────────────────┐
│  Waktu Pertandingan              ✕   │
│  ────────────────────────────────    │
│                                      │
│  Duration                            │
│  1 ────────────●─────────── 10       │
│         6 minutes                    │
│                                      │
│  Speed                               │
│  ┌──────────────────────────────┐    │
│  │ x1                        ▾  │    │
│  └──────────────────────────────┘    │
│                                      │
│  ┌──────────┐   ┌──────────┐         │
│  │  Pause   │   │   End    │         │
│  └──────────┘   └──────────┘         │
└──────────────────────────────────────┘
```

| Element | Description |
|---|---|
| **Duration Slider** | Range 1–10 minutes. Default: 6. Sets how many real-time minutes the match runs. |
| **Speed Dropdown** | Simulation speed multiplier. Options: x1 (normal), x2, x3, x4, x5. Default: x1. Affects how fast the match engine simulates — at x5, 1 minute of match time passes in 12 seconds of real time. |
| **Pause Button** | Pauses the match timer. Opens confirmation modal. |
| **End Button** | Ends the match immediately. Opens confirmation modal. |

```
┌──────────────────────────┐
│  End Match?              │
│                          │
│  The match will end      │
│  immediately with the    │
│  current score.          │
│                          │
│  [Cancel]     [End]      │
└──────────────────────────┘
```

#### Auto-Pause on Tactic

When the manager opens the **Tactic** screen (Squat), the match timer **automatically pauses**. The timer resumes when the manager returns to the match.
---

## 2. 2D Pitch

A vertical pitch view rendered below the time bar. The pitch is split into Home and Away halves.

```
┌──────────────────────────────────────┐
│                                      │
│            ○    ○    ○               │  ← Away team
│         ○         ○                  │     (top half)
│      ○              ○                │
│  ○                    ○              │
│                                      │
│  ────────────────────────────────    │  ← halfway line
│                                      │
│  ○                    ○              │
│      ○              ○                │  ← Home team
│         ○         ○                  │     (bottom half)
│            ○    ○    ○               │
│                                      │
│                 ●                    │  ← Ball (small dot)
│                                      │
└──────────────────────────────────────┘
```

### Player Rendering

| Element | Description |
|---|---|
| **Player Dot** | Circle, 12-16px. Color: home = primary, away = secondary. |
| **Player Name** | Below the dot, small caption token. Truncated to last name. |
| **Ball** | Small filled circle (6-8px), distinct color (white or yellow). |

### Animation

- Players move in real-time based on match simulation, following their formation positions.
- The ball moves between players — passes, dribbles, shots.
- Movement style: **karambol (carrom)** — smooth linear movement with snap-to-player on ball reception.
- Position updates driven by the match engine at a fixed tick rate.

### Flip View

- The manager can flip the pitch view (Home top vs Home bottom) via a toggle or the settings menu.
- Default: Home at bottom (closer to the manager's perspective).

---

## 3. Match Action Bar

Three buttons pinned at the bottom of the screen, replacing the floating bottom navigation during match.

```
┌──────────────┬──────────────┬──────────────┐
│  Berteriak   │    Tactic    │  Intensitas  │
│      ▾       │              │      ▾       │
└──────────────┴──────────────┴──────────────┘
```

### Berteriak (Shout)

- **Variant**: Dropdown button (text + arrow).
- **Behavior**: Opens a dropdown with motivational shouts.

| Option | Effect |
|---|---|
| **Encourage** | Boost team morale temporarily. |
| **Push Forward** | Team pushes higher, more attacking. |
| **Calm Down** | Reduces aggression, avoids cards. |
| **Focus** | Improves passing accuracy temporarily. |
| **Demand More** | Increases work rate, drains stamina faster. |

Selecting an option applies the effect immediately and closes the dropdown.

### Tactic

- **Variant**: Single button (text only, no arrow).
- **Behavior**: Opens the full [Tactic screen](../../Tactic/Tactic/Squat/squat.md) (same as Start match). The manager can adjust formation, set pieces, subs, and captain. Changes apply immediately when returning to the match.

### Intensitas (Intensity)

- **Variant**: Dropdown button (text + arrow).
- **Behavior**: Opens a dropdown with intensity levels.

| Option | Effect |
|---|---|
| **Soft** | Low pressing, conserve energy. |
| **Heavy** | High pressing, aggressive tackling, more fouls and cards risk. |
| **Extreme** | Maximum intensity, highest stamina drain, highest card risk. |

Selecting an option applies the intensity immediately. The current intensity is shown as the button label.

---

## Data Requirements

```text
MatchData {
  minute: number                    // current match minute
  homeTeam: TeamOnPitch
  awayTeam: TeamOnPitch
  ball: BallPosition
  intensity: 'soft' | 'heavy' | 'extreme'
}

TeamOnPitch {
  clubName: string
  formation: string
  players: PlayerOnPitch[]
}

PlayerOnPitch {
  id: string
  name: string
  x: number                        // pitch coordinate 0-1
  y: number                        // pitch coordinate 0-1
  stamina: number                  // 0-100
  hasBall: boolean
}

BallPosition {
  y: number
}

- Settings dropdown includes Waktu Pertandingan, Pause, End.
- Time control panel: range slider 1-10 minutes, Pause + End buttons.
- Pause and End use confirmation modals.
- Opening Tactic screen auto-pauses the match timer.
}
```

## Reusable Components

- Shell: `GameplayScreen` Type 2 from [global.md](../../../global.md)
- Tactic: [Squat screen](../../Tactic/Tactic/Squat/squat.md) (shared)
- Menu index: [index.md](../../index.md)

## Acceptance Criteria

- Type 2 layout during match; floating bottom nav hidden, replaced by action bar.
- Match time bar shows timer icon, progress with minute marker, and settings icon.
- 2D pitch renders vertically with Home/Away halves.
- Player dots colored per team with names below; ball dot visible.
- Players animate in real-time following formation positions (karambol style).
- **Berteriak** dropdown applies motivational effects.
- **Tactic** button opens the full Squat/tactic screen.
- **Intensitas** dropdown selects Soft/Heavy/Extreme.
- Pitch view can be flipped via settings.
