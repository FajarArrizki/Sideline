# Next / Match

> **Note:** This is not a screen. It is a time-advance action button in the floating bottom navigation defined in [global.md](../../global.md). It does not have a content slot, sub-navigation, or screen layout.

| No match scheduled | **Next** | Opens time-advance sheet. |
| Match day | **Match** | Navigates to [Play](../Play/play.md). |
| On Start screen | **Kick-Off** | Starts the match. Goes to [Match](../Play/match/match.md). |
| On Statistic screen | **Next** | Advances to [End](../Play/end/end.md) for league results. |
| On End screen | **Done** | Returns to gameplay hub. Resets to **Next** state. |

When no match is scheduled and **Next** is tapped:

```
┌──────────────────────────────────────┐
│  Advance Time                        │
│  ────────────────────────────────    │
│                                      │
│  ┌──────────────────────────────┐    │
│  │ Skip 1 Day                   │    │
│  └──────────────────────────────┘    │
│  ┌──────────────────────────────┐    │
│  │ Skip 3 Days                  │    │
│  └──────────────────────────────┘    │
│  ┌──────────────────────────────┐    │
│  │ Skip 1 Week                  │    │
│  └──────────────────────────────┘    │
│  ┌──────────────────────────────┐    │
│  │ Advance to Next Match        │    │
│  └──────────────────────────────┘    │
│                                      │
│  [Cancel]                            │
└──────────────────────────────────────┘
```

- Each option shows a confirmation before advancing.
- "Advance to Next Match" skips directly to the next match day.
- During time advance, the game simulates days (transfers, scouting results, inbox messages update).

## Match Day → Play

When the current day has a scheduled match, the button label changes to **Match** and tapping it navigates to [Play](../Play/play.md).

The Play screen is intentionally undefined — it will contain the match engine, live commentary, tactics adjustments, and result flow.

## Pending

- Time-advance simulation logic.
- Play screen design and match engine.
- Transition animation between Next sheet and Match → Play.
