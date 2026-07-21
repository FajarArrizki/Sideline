# Tactic Menu Index

> **Note:** This document indexes the sub-sections inside the Tactic menu. Each sub-section corresponds to one item in the `GameplaySubNavigation` rail defined in [../../Comp/navigasi.md](../../Comp/navigasi.md). Nested items represent dropdown options or expandable groups.

## Sub-Sections

Read sub-section plans in this order during implementation, one plan at a time:

1. [Overview](Overview/overview.md) — single tab. Content pending.
2. [Squad list](Squad list/squad list.md) — single tab. Content pending.
3. [Tactic](Tactic/tactic.md) — dropdown tab. Content pending.
  1. [Captain](Tactic/Captain/captain.md) — dropdown option. Content pending.
  2. [Pormation](Tactic/Pormation/pormation.md) — dropdown option. Content pending.
  3. [Set Pieces](Tactic/Set Pieces/set pieces.md) — expandable group. Content pending.
    1. [Corner](Tactic/Set Pieces/Corner/corner.md) — dropdown option. Content pending.
    2. [Freekick](Tactic/Set Pieces/Freekick/freekick.md) — dropdown option. Content pending.
    3. [Pinalties](Tactic/Set Pieces/Pinalties/pinalties.md) — dropdown option. Content pending.
    4. [Set Pieces Taker](Tactic/Set Pieces/Set Pieces Taker/set pieces taker.md) — dropdown option. Content pending.
    5. [Trow in](Tactic/Set Pieces/Trow in/trow in.md) — dropdown option. Content pending.

## Sub-Navigation Variants

- **Overview** and **Squad list** are single tabs (plain text, no arrow).
- **Tactic** is a dropdown tab (text + arrow icon). Its dropdown contains:
  - Captain
  - Pormation
  - Set Pieces (expandable group; expands to show Corner, Freekick, Pinalties, Set Pieces Taker, Trow in)

## Global Chrome Reference

This menu is rendered inside the `GameplayScreen` shell defined in [../../global.md](../../global.md). It must not recreate the top header, bottom navigation, safe-area handling, brand lockup, coin/budget cards, or the time-advance action button.
