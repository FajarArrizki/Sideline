# Gameplay Global Design

> **Note:** This document defines the persistent global chrome for Gameplay screens: the top header, the floating bottom navigation, and the content slot boundary. Specific screen content for Portal, Tactic, Transfer, and Management is defined in their own screen plans. The Gameplay destination itself remains intentionally undefined beyond this chrome.

## Purpose

`GameplayScreen` is the planned destination after the user completes the Start Game pick-your-team flow. Its global chrome mirrors the Home shell pattern but uses gameplay-specific header actions and bottom navigation. The chrome is safe-area-aware, uses shared tokens, and leaves all gameplay content to child screen plans.

## Global Layout

`GameplayScreen` uses the shared portrait `AppShell` and separates the fixed top header, the flexible content region, and the fixed bottom navigation into distinct layout regions. The header and bottom navigation remain outside the content scroller. `ScreenLayout` derives the content insets from their real rendered heights and the device safe-area insets so future content cannot be hidden behind either navigation region, the status bar, a display cutout, the home indicator, or Android system navigation.

The chrome has two layout types. The consuming screen plan declares which type it uses.

### Type 1 — Sub-Navigation Rail

Used by screens that need secondary section switching inside a menu.

```text
GameplayScreen (Type 1)
└── AppShell
    ├── GameplayTopBar
    │   ├── BrandLockup (left)
    │   │   ├── BrandIcon
    │   │   └── Text: "Sideline"
    │   └── GameplayTopActionGroup (right)
    │       ├── CoinBalanceCard
    │       ├── ClubBudgetCard
    │       └── MoreMenuButton
    ├── GameplaySubNavigation
    │   └── ScrollRail of text tabs
    ├── GameplayContentSlot
    │   └── CurrentGameplayScreen content
    └── GameplayBottomNavigation
        ├── Portal / Tactic / Transfer / Management / Next-Match
```

### Type 2 — Back Arrow + Title

Used by deeper screens reached from a menu section, where there is no secondary tab rail. The area normally occupied by the sub-navigation rail instead shows a back arrow and a screen title.

```text
GameplayScreen (Type 2)
└── AppShell
    ├── GameplayTopBar
    │   ├── BrandLockup (left)
    │   │   ├── BrandIcon
    │   │   └── Text: "Sideline"
    │   └── GameplayTopActionGroup (right)
    │       ├── CoinBalanceCard
    │       ├── ClubBudgetCard
    │       └── MoreMenuButton
    ├── GameplaySecondaryHeader
    │   ├── GameplayBackButton
    │   └── TitleText
    ├── GameplayContentSlot
    │   └── CurrentGameplayScreen content
    └── GameplayBottomNavigation
        ├── Portal / Tactic / Transfer / Management / Next-Match
```

Type 2 is used by detail and sub-pages that are children of a dropdown option, such as the `Contract detail` screen reached from `Contract offer`. Type 1 is used by top-level menu screens that supply their own sub-navigation tabs.

## Top Header

Place `GameplayTopBar` slightly below the native top safe area using the shared safe-area and spacing system rather than a guessed fixed offset. The left side displays `BrandLockup`, and the right side displays `GameplayTopActionGroup`.

### Brand Lockup

`BrandLockup` combines `assets/Generic/Logo-brand/brand-logo.png` with the exact text **Sideline**. It is identical to the Home brand lockup and uses the global brand asset wrapper and typography token. Tapping the brand lockup performs no navigation unless a screen plan explicitly defines an action.

### Top Action Group

Render the action group on the right side, with controls aligned to the same shared header-action height and separated by the global header-action gap.

#### Coin Balance Card

`CoinBalanceCard` is one rounded horizontal card containing a semantic coin icon followed by the formatted numeric coin balance. Source the balance from the authoritative wallet or coin-ledger boundary rather than screen-local Gameplay state. Format it through one shared coin-balance formatter; do not hard-code a demo balance, mutate the balance on press, or convert missing data into a false zero. Loading and unavailable states must reserve the card's measured dimensions so adjacent controls do not shift.

Tapping `CoinBalanceCard` activates the canonical `TokoScreen` destination with its **Purchase Coin** section active, identical to the Home coin card behavior.

#### Club Budget Card

`ClubBudgetCard` is a second rounded horizontal card immediately to the right of the coin card. It contains a semantic money/banknote icon followed by the formatted club budget value. Source the budget from the authoritative club-economy boundary; do not hard-code "000" or invent a demo value. Use the shared number-formatting primitive and reserve the card's measured dimensions during loading or unavailable states so the more-menu control does not shift.

The club budget card is read-only in this chrome. Tapping it opens a pending club-budget detail or management surface; do not invent that surface here. Record the exact action in the consuming screen plan when it is defined.

#### More Menu Button

`MoreMenuButton` is an icon-only three-dot control immediately to the right of the budget card. It uses the global icon registry, has an accessible label, visible press feedback, and at least the global minimum touch target. Its menu contents and resulting actions remain undefined and must not be inferred.

## Sub-Navigation (Type 1 Only)

Place `GameplaySubNavigation` directly below `GameplayTopBar`. It is the reusable horizontal text-tab rail defined in [navigasi.md](Comp/navigasi.md). It spans the full screen width, scrolls horizontally when tab labels overflow, and communicates active/default states through color and/or opacity using shared tokens.

Use this rail for secondary section switching inside a gameplay screen. The tab set is **different in every menu**: for example, Portal may use **Overview / Standings / Schedule / Squad**, while Tactic, Transfer, and Management each supply their own distinct tab labels. The component does not own the tab labels; each consuming screen plan supplies its own `tabs` array, `activeTabId`, and `onTabChange` handler. Do not hard-code tab labels, default selection, or resulting content inside the global chrome.

The sub-navigation is present only in **Type 1** layouts. Its bottom edge becomes the top boundary of `GameplayContentSlot` for inset calculation.

## Secondary Header (Type 2 Only)

In **Type 2** layouts, the sub-navigation rail is replaced by a secondary header directly below `GameplayTopBar`.

### Back Arrow + Title

- **GameplayBackButton**: left-aligned icon button using the global back-arrow icon. Tapping it performs the canonical back navigation (pop the current route).
- **TitleText**: centered or left-of-center text that describes the current screen. For detail screens reached from a list, the title is typically the name of the selected item (for example, the offering club name on `Contract detail`).
- The secondary header uses the same horizontal content gutter as the rest of the screen.
- Its bottom edge becomes the top boundary of `GameplayContentSlot` for inset calculation, identical to the sub-navigation rail in Type 1.
- Do not add a sub-navigation rail, search bar, or actions inside this header unless a screen plan explicitly requires them.
### Screen-Level Action Buttons

A screen plan may place a row of action buttons directly below the secondary header before the content slot begins. The button group is not part of the global `GameplaySecondaryHeader`; each screen plan defines its own buttons, labels, and behavior. The content slot insets below this button row.

## Floating Bottom Navigation

Place `GameplayBottomNavigation` slightly above the native bottom safe area and Android system navigation or iOS home indicator. It is one floating, horizontally elongated capsule with rounded ends, identical in structural treatment to `HomeBottomNavigation`. The capsule remains inset from the physical left, right, and bottom edges and uses shared semantic navigation and layout tokens for position, height, corner radius, border, surface, shadow/elevation, and internal padding.

The capsule contains five controls in this fixed left-to-right order:

1. **Portal** — primary gameplay hub;
2. **Tactic** — tactical setup;
3. **Transfer** — player transfer market;
4. **Management** — club management;
5. **Next / Match** — time-advance action button.

The first four items behave like standard navigation items: each uses the reusable icon-plus-text composition, preserves the global minimum touch target, and exposes an accessible label. They activate their canonical gameplay screen identifiers (`PortalScreen`, `TacticScreen`, `TransferScreen`, `ManagementScreen`). Do not open inline overlays or duplicate routes.

### Time-Advance Action Button

The fifth control is **not** a standard navigation destination. It is a primary action button rendered inside the same capsule surface for visual continuity.

- Default label: **Next** with a semantic advance/time icon.
- On match day / when a scheduled match is the next event, the label changes to **Match** with a semantic match/ball icon.
- Tapping the control presents a time-advance sheet or modal (not a route push) defined in the consuming screen plan. The sheet handles the selected skip duration, confirms the action, and advances the game clock.
- The control does not maintain a "selected" state and must not be styled as an active navigation item when pressed. Use the shared pressable primitive and primary action color token.
- The exact conditions that switch the label between **Next** and **Match**, the available skip durations, the confirmation copy, and the resulting state update remain pending and must be defined in a dedicated gameplay-system plan.

## Reserved Gameplay Content

`GameplayContentSlot` fills the flexible area between the top header (plus sub-navigation rail or secondary header) and bottom navigation. Its approved sections are defined in separate screen plans for Portal, Tactic, Transfer, and Management, plus detail screens reached from those menus. The shell must keep the active section unobscured while preserving flexible space for future content. Do not add placeholder cards, empty-state copy, decorative content, or guessed feature modules outside the dedicated content contracts.

### Layout Type Usage

| Screen Category | Layout Type | chrome Feature Below Top Bar |
| --- | --- | --- |
| Top-level menu screens (Portal, Tactic, Transfer, Management and their tabbed sub-sections) | Type 1 | `GameplaySubNavigation` rail |
| Detail / sub-pages reached from a dropdown option or list item (e.g., `Contract detail`) | Type 2 | `GameplaySecondaryHeader` with back arrow + title |

## Reusable Implementation Boundary

`GameplayScreen` composes the existing shared `AppShell`, `ScreenLayout`, brand asset wrapper, global icon component, typography, card surface, number formatting, spacing, color, motion, and pressable primitives. Add Gameplay-specific composition only where the contract is unique: `GameplayTopBar`, `GameplayTopActionGroup`, `CoinBalanceCard`, `ClubBudgetCard`, `GameplaySubNavigation`, `GameplayContentSlot`, `GameplayBottomNavigation`, and `TimeActionButton`. Do not duplicate safe-area math, wallet state, coin formatting, club-budget formatting, icon-plus-text press behavior, brand rendering, Toko routing, navigation insets, or the Home bottom-navigation capsule logic inside the screen.

## Acceptance Criteria

- The Gameplay chrome renders below the top safe area and above the bottom safe area.
- The left side of the top bar displays the brand icon plus **Sideline**.
- The right side displays the coin-balance card, the club-budget card, and the three-dot more button at the same vertical height.
- Type 1 screens render the reusable `GameplaySubNavigation` rail from [navigasi.md](Comp/navigasi.md) directly below the top bar; it spans full width and scrolls horizontally when tabs overflow.
- Type 2 screens render a `GameplaySecondaryHeader` with a back arrow and a title directly below the top bar; they do not render the sub-navigation rail.
- Tapping the coin card activates the canonical `TokoScreen` with **Purchase Coin** active.
- One floating capsule contains **Portal**, **Tactic**, **Transfer**, **Management**, and **Next/Match** from left to right.
- The first four items activate their canonical gameplay screens without duplicate routes or inline overlays.
- The fifth item is a time-advance action that presents a sheet/modal, not a route; its label switches between **Next** and **Match** based on pending match-day conditions.
- All gameplay content lives in dedicated child screen plans indexed in [Menu/index.md](Menu/index.md); this file does not invent Portal, Tactic, Transfer, Management, sub-navigation labels, match-day behavior, or detail-screen content.
- The layout type for each gameplay screen is declared in its screen plan.
