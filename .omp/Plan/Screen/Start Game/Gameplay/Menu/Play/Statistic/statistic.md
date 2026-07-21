# Statistic

> **Context:** This screen uses **Gameplay global Type 2** defined in [global.md](../../../global.md). It keeps the top header and floating bottom navigation, and uses a GameplaySecondaryHeader (back arrow + "Statistic" title). Reached after the match engine completes. Shows the user's team match statistics.

## Layout Type

**Type 2 — Back Arrow + Title.**

## Secondary Header

- **GameplayBackButton**: left-aligned back icon.
- **TitleText**: **Statistic**.

## Flow

```
Match ends
  → Statistic (your team's match stats)
  → tap Next (bottom nav)
  → End (other league results)
```

## Content: Your Match Result

> **Note:** Intentionally pending. Detailed design will be done in a future pass. Will include: score, goal scorers, key stats, player ratings summary, match events.

## Bottom Navigation

While this screen is active, the 5th button in the floating bottom nav shows **Next**. Tapping **Next** advances to [End](../end/end.md) for other league results.

## Reusable Components

- Shell: `GameplayScreen` Type 2 from [global.md](../../../global.md)
- Menu index: [index.md](../../index.md)
