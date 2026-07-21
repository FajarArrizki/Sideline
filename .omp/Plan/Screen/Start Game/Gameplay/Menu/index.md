# Gameplay Menu Index

> **Note:** This document is the central index for all Gameplay menu screens. Each menu corresponds to one item in the floating `GameplayBottomNavigation` defined in [../global.md](../global.md). Specific screen content, sub-navigation tabs, table columns, and interactions are documented inside each menu folder.

## Menu Screens

Read menu plans in this order during implementation, one plan at a time:

1. [Portal menu index](Portal/index.md) — Primary gameplay hub with sub-sections: Home (single), **My team** (dropdown), **My career** (dropdown), **Social** (dropdown).
2. [Tactic menu index](Tactic/index.md) — Tactical setup with sub-sections: Overview, Squad List, **Tactic** (dropdown with Set Pieces expandable group).
3. [Transfer menu index](Transfer/index.md) — Player transfer market with sub-sections: Overview, Search Player, Search Staff, Wishlist.
4. [Management menu index](Management/index.md) — Club management with sub-sections: Overview (single tab) and Scouting Center (dropdown tab).

## Sub-Navigation Contract

Every menu screen that needs secondary section switching must reuse the shared `GameplaySubNavigation` component documented in [../Comp/navigasi.md](../Comp/navigasi.md). Each menu supplies its own tab set. Tabs can be either:

- **Single** — plain text only, switches to a section when pressed.
- **Dropdown** — text + arrow icon, opens a dropdown menu when pressed. A dropdown menu may contain **DropdownOption** leaf items and **DropdownGroup** expandable groups; a group toggles its children in place and does not navigate to a screen.

| Menu | Sub-Navigation Tabs | Tab Variant | Dropdown Options / Nested Groups | Status |
| --- | --- | --- | --- | --- |
| Portal | Home, My team, My career, Social | Single + Dropdown | My team → Schedule, Standing (All League, My League), Stats (All League, My League); My career → My carrer, My contract (Contract detail, Contract offer); Social → All, My team | Pending |
| Tactic | Overview, Squad list, Tactic | Single + Dropdown | Tactic → Captain, Pormation, Set Pieces group; Set Pieces → Corner, Freekick, Pinalties, Set Pieces Taker, Trow in | Pending |
| Transfer | Serch Player, Serch Staf, Wishlist | Single | None | Pending |
| Management with Scounting focus | Pending |

## Table Contract

Every menu screen that displays structured gameplay data should reuse the shared `GameplayTable` component documented in [../Comp/table.md](../Comp/table.md). The table container spans the full screen width and scrolls horizontally when columns overflow. Specific column definitions, row data, and row actions are documented in the consuming menu screen plan.

## Global Chrome Reference

All menu screens are rendered inside the `GameplayScreen` shell defined in [../global.md](../global.md). They must not recreate the top header, bottom navigation, safe-area handling, brand lockup, coin/budget cards, or the time-advance action button.

## Acceptance Criteria

- Each menu screen plan defines its own sub-navigation tabs (if any) and table columns/data (if any).
- No menu screen duplicates the global Gameplay chrome.
- All menu screens link back to this index and to the relevant reusable components in `../Comp/`.
