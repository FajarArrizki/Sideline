# Pick Stats

> **Context:** This screen uses **Gameplay global Type 2** defined in [global.md](../../../../../../global.md). It keeps the top header and floating bottom navigation, and uses a GameplaySecondaryHeader (back arrow + "Pick Stats" title). Reached after completing the country → league selection flow in [step 2](../step 2.md). The content slot contains a grid of stat-category cards; tapping one opens the [Stats detail](../Stats%20detail/stats%20detail.md) table.

## Layout Type

**Type 2 — Back Arrow + Title.**

## Secondary Header

- **GameplayBackButton**: left-aligned back icon. Pops back to Step 2 (Select League).
- **TitleText**: **Pick Stats**.

## Content: Stat Cards Grid

A vertical scrolling grid of cards, one per stat category. Each card is a pressable rounded surface.

### Card Layout

```
┌──────────────────────────────────────┐
│  ┌──────────────────────────────────┐│
│  │                                  ││
│  │          Player Photo            ││
│  │          (full-width)            ││
│  │                                  ││
│  ├──────────────────────────────────┤│
│  │  Top Assists                     ││
│  │  Bruno Fernandes                 ││
│  └──────────────────────────────────┘│
└──────────────────────────────────────┘
```

**Rules:**
- Player photo fills the card width, border-radius 0 at the top (flush to card top-edge).
- Zero vertical gap between the photo and the text group below it.
- Below the photo, a horizontal divider.
- Below the divider: **stat heading** (e.g., "Top Assists") in heading typography token, and **player name** (the current #1) in caption typography token.
- The entire card is pressable. Tapping it opens the corresponding [Stats detail](../Stats%20detail/stats%20detail.md) table for that category.

### Stat Categories

| Card | Heading | Description |
|---|---|---|
| 1 | **Top Scorer** | Most goals scored |
| 2 | **Top Assists** | Most assists |
| 3 | **Most Clean Sheets** | Goalkeeper clean sheets |
| 4 | **Most Chances Created** | Chances created |
| 5 | **Most Tackles** | Successful tackles |
| 6 | **Most Interceptions** | Interceptions made |
| 7 | **Most Saves** | Goalkeeper saves |
| 8 | **Best Young Player** | Best performing U-21 player |
| 9 | **Best Player (MVP)** | Overall best player |
| 10 | **Most Yellow Cards** | Yellow cards received |
| 11 | **Most Red Cards** | Red cards received |

The grid uses `BentoGrid` from [bento.md](../../../../../../Comp/bento.md) with `maxColumns={2}`.

### Data Shape

```text
StatCard {
  id: string
  heading: string            // e.g., "Top Assists"
  topPlayer: {
    name: string
    photo: ImageSource
  }
}
```

## Empty State

- If a category has no data (e.g., no yellow cards issued yet), show the card with a dash or "No data" placeholder instead of the top player name. Keep the heading and photo placeholder.

## Reusable Components

- Shell: Type 2 from [global.md](../../../../../../global.md)
- Grid: `BentoGrid` from [bento.md](../../../../../../Comp/bento.md)
- Menu index: [index.md](../../../../index.md)
