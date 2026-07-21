# Portal Menu Index

> **Note:** This document indexes the sub-sections inside the Portal menu. Each sub-section corresponds to one item in the `GameplaySubNavigation` rail defined in [../../Comp/navigasi.md](../../Comp/navigasi.md). Nested items represent dropdown options or expandable groups.

## Sub-Sections

Read sub-section plans in this order during implementation, one plan at a time:

1. [Home](Home/home.md) — single tab. Content pending.
2. [My team](My team/my team.md) — dropdown tab. Content pending.
  1. [Schedule](My team/Schedule/schedule.md) — dropdown option. Content pending.
  2. [Standing](My team/Standing/standing.md) — expandable group. Content pending.
    1. [All League](My team/Standing/All League/all league.md) — dropdown option. Content pending.
    2. [My League](My team/Standing/My League/my league.md) — dropdown option. Content pending.
  3. [Stats](My team/Stats/stats.md) — expandable group. Content pending.
    1. [All League](My team/Stats/All League/all league.md) — dropdown option. Content pending.
    2. [My League](My team/Stats/My League/my league.md) — dropdown option. Content pending.
3. [My career](My career/my career.md) — dropdown tab. Content pending.
  1. [My carrer](My career/My carrer/my carrer.md) — dropdown option. Content pending.
  2. [My contract](My career/My contract/my contract.md) — expandable group. Content pending.
    1. [Contract detail](My career/My contract/Contract detail/contract detail.md) — dropdown option. Content pending.
    2. [Contract offer](My career/My contract/Contract offer/contract offer.md) — dropdown option. Content pending.
4. [Social](Social/social.md) — dropdown tab. Content pending.
  1. [All](Social/All/all.md) — dropdown option. Content pending.
  2. [My team](Social/My team/my team.md) — dropdown option. Content pending.

## Sub-Navigation Variants

- **Home** is a single tab (plain text, no arrow).
- **My team** is a dropdown tab (text + arrow icon). Its dropdown contains:
  - Schedule
  - Standing (expandable group; expands to show All League and My League)
- **My career** is a dropdown tab (text + arrow icon). Its dropdown contains:
  - My carrer
  - My contract (expandable group; expands to show Contract detail and Contract offer)
- **Social** is a dropdown tab (text + arrow icon). Its dropdown contains:
  - All (unfiltered feed: pundits, competitions, clubs, news)
  - My team (scoped to user's team-related content)

## Global Chrome Reference

This menu is rendered inside the `GameplayScreen` shell defined in [../../global.md](../../global.md). It must not recreate the top header, bottom navigation, safe-area handling, brand lockup, coin/budget cards, or the time-advance action button.
