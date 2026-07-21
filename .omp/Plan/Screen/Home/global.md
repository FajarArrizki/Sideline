# Home Screen Global Design

> **Note:** `HomeScreen` is the destination after the user completes the four-step favorite-team onboarding flow, and onboarding reaches it with a stack replacement after the selected favorite club is persisted successfully. This document defines only the persistent global Home chrome: its safe-area-aware shell, top header, content region boundary, and floating bottom navigation. The top manager summary is defined in [manager summary.md](manager%20summary.md), the bottom saved-game rail is defined in [saved game rail.md](saved%20game%20rail.md), the canonical store is defined in [toko.md](toko.md), the Start Game setup is defined in [Start Game pick-your-team global.md](../Start%20Game/pick%20your%20team/global.md), and the Download destination and package workflow are defined in [download.md](download.md); all other Home content, menu contents, unresolved destination routes, states, and feature interactions remain intentionally undefined until their dedicated plans are written.

## Global Layout

`HomeScreen` uses the shared portrait `AppShell` and separates the fixed top header, future Home content, and fixed bottom navigation into distinct layout regions. The header and bottom navigation remain outside the content scroller. `ScreenLayout` must derive the content insets from their real rendered heights and the device safe-area insets so future content cannot be hidden behind either navigation region, the status bar, a display cutout, the home indicator, or Android system navigation.

```text
HomeScreen
└── AppShell
    ├── HomeTopBar
    │   ├── HomeTopActionGroup
    │   │   ├── CoinBalanceCard
    │   │   │   ├── CoinIcon
    │   │   │   └── CoinBalance
    │   │   └── MoreMenuButton
    │   └── BrandLockup
    │       ├── BrandIcon
    │       └── Text: "Sideline"
    ├── HomeContentSlot
    │   ├── ManagerSummaryGroup: defined in manager summary plan
    │   ├── FutureHomeContent: pending
    │   └── SavedGameRail: defined in saved game rail plan
    └── HomeBottomNavigation
        ├── HomeNavigationItem: icon + "Toko"
        ├── HomeNavigationItem: icon + "Start Game" → StartGameManagerInformationStep
        └── HomeNavigationItem: icon + "Download" → DownloadScreen
```

## Top Header

Place `HomeTopBar` slightly below the native top safe area using the shared safe-area and spacing system rather than a guessed fixed offset. `HomeTopActionGroup` occupies the left side, and `BrandLockup` occupies the right side. Inside the action group, render `CoinBalanceCard` first and `MoreMenuButton` immediately to its right. Keep both controls vertically centered and align their touch surfaces to the same shared header-action height. The brand lockup combines `assets/Generic/Logo-brand/brand-logo.png` with the exact text **Sideline**.

`CoinBalanceCard` is one rounded horizontal card containing a semantic coin icon followed by the formatted numeric coin balance. Source the balance from the authoritative wallet or coin-ledger boundary rather than screen-local Home state. Format it through one shared coin-balance formatter; do not hard-code a demo balance, mutate the balance on press, or convert missing data into a false zero. Loading and unavailable states must reserve the card's measured dimensions so the three-dot control and brand do not shift. The exact large-balance abbreviation and unavailable-state presentation remain pending.

Tapping `CoinBalanceCard` activates the canonical `TokoScreen` destination with its **Purchase Coin** section active, as defined in [toko.md](toko.md). This is the same Toko destination used by the **Toko** item in `HomeBottomNavigation`; do not create a separate `TopUpScreen` or `PurchaseCoinScreen`, open a Home overlay, or push a duplicate Toko route. The exact Expo Router path and top-level switch action remain pending and must be recorded in the screen flow index before implementation.

`MoreMenuButton` remains a separate icon-only control immediately to the right of the coin card and is backed by the semantic global icon registry. It must have an accessible label, visible press feedback, and at least the global minimum touch target even when the horizontal three-dot glyph is visually smaller. Its menu contents and resulting actions remain undefined and must not be inferred.

Reuse the global brand/image, typography, icon, card-surface, pressable, number-formatting, and spacing primitives. The coin card exposes one accessible label containing the formatted balance and the action **Open Purchase Coin in Toko**; the decorative coin glyph must not be announced twice. Do not import or size the brand or coin icon independently inside `HomeScreen`.

## Reserved Home Content

`HomeContentSlot` fills the flexible area between the top header and bottom navigation. Its approved top region is `ManagerSummaryGroup`, defined in [manager summary.md](manager%20summary.md), and its approved bottom region is `SavedGameRail`, defined in [saved game rail.md](saved%20game%20rail.md). The shell must keep both regions unobscured while preserving flexible space for future content between them. All other Home sections, data, loading and error states, and interactions remain pending. Do not add placeholder cards, empty-state copy, decorative content, or guessed feature modules outside the two dedicated content contracts.

## Floating Bottom Navigation

Place `HomeBottomNavigation` slightly above the native bottom safe area and Android system navigation or iOS home indicator. It is one floating, horizontally elongated capsule with rounded ends. The capsule must remain inset from the physical left, right, and bottom edges instead of attaching to the screen edge or visually merging with the system navigation region. Its position, height, corner radius, border, surface, shadow or elevation, and internal padding must come from shared semantic navigation and layout tokens.

The capsule contains three equal-width `HomeNavigationItem` controls in this fixed left-to-right order:

1. semantic store icon with the text **Toko**;
2. semantic start-game icon with the text **Start Game**;
3. semantic download icon with the text **Download**.

Every item uses the same reusable icon-plus-text composition, aligns its icon and label consistently, preserves at least the global minimum touch target, and exposes an accessible label. Use the centralized global icon registry rather than direct screen-level icon imports. The three items share one capsule surface; they must not become three detached pill buttons.

No bottom-navigation item is selected or visually promoted by this global plan. The **Toko** item and `CoinBalanceCard` share the canonical `TokoScreen` defined in [toko.md](toko.md); the coin card explicitly requests **Purchase Coin**, while the bottom item uses the default Toko entry. Because Purchase Coin is currently the only defined Toko section, both entries display it without creating duplicate routes. The **Start Game** item pushes the canonical `StartGameManagerInformationStep` defined by the [Start Game pick-your-team flow](../Start%20Game/pick%20your%20team/global.md). The **Download** item activates the canonical `DownloadScreen` defined in [download.md](download.md). None of these items may open an inline Home overlay or create a duplicate destination route. Exact router paths, top-level active-state treatment, switch or push actions, and gameplay handoff details remain pending.

## Reusable Implementation Boundary

`HomeScreen` composes the existing shared `AppShell`, `ScreenLayout`, brand asset wrapper, global icon component, typography, card surface, number formatting, spacing, color, motion, and pressable primitives. Add Home-specific composition only where the contract is unique: `HomeTopBar`, `HomeTopActionGroup`, `CoinBalanceCard`, `HomeContentSlot`, `HomeBottomNavigation`, and `HomeNavigationItem`. Do not duplicate safe-area math, wallet state, coin formatting, icon-plus-text press behavior, brand rendering, Toko routing, Start Game routing, Download routing, or navigation insets inside the screen.

## Acceptance Criteria

The global Home chrome renders below the top safe area and above the bottom safe area; the left header action group displays one coin-icon-plus-balance card followed immediately by the three-dot control at the same vertical height; tapping the coin card activates the canonical `TokoScreen` with **Purchase Coin** active; the **Sideline** brand lockup remains on the right; the content region reserves an unobscured top area for the separately defined manager summary and a bottom area for the separately defined saved-game rail without inventing other Home content; one detached capsule contains **Toko**, **Start Game**, and **Download** from left to right; each item activates its canonical destination; Start Game opens `StartGameManagerInformationStep`; and unresolved menu, active-state, exact route-path, and gameplay behavior is not invented by this plan.
