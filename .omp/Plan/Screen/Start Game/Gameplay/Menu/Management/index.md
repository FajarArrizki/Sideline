# Management Menu Index

> **Note:** This document indexes the sub-sections inside the Management menu. Each sub-section corresponds to one item in the `GameplaySubNavigation` rail defined in [../../Comp/navigasi.md](../../Comp/navigasi.md). Nested items represent dropdown options or expandable groups.

## Sub-Sections

Read sub-section plans in this order during implementation, one plan at a time:

1. [Scounting Center](Scounting Center/scounting center.md) — dropdown tab. Content pending.
  1. [Scounting report](Scounting Center/Scounting report/scounting report.md) — dropdown option. Content pending.
  2. [Scounting focus](Scounting Center/Scounting focus/scounting focus.md) — dropdown option. Content pending.
  3. [Scounting team](Scounting Center/Scounting team/scounting team.md) — dropdown option. Content pending.

## Sub-Navigation Variants

- **Scouting Center** is a dropdown tab (text + arrow icon). Its dropdown contains:
  - Scouting report
  - Scouting focus
  - Scouting team

## Global Chrome Reference

This menu is rendered inside the `GameplayScreen` shell defined in [../../global.md](../../global.md). It must not recreate the top header, bottom navigation, safe-area handling, brand lockup, coin/budget cards, or the time-advance action button.
