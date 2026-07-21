# Home Toko Screen Design

> **Note:** This document defines the canonical `TokoScreen` opened by the **Toko** item in `HomeBottomNavigation` and by `CoinBalanceCard` with its purchase section active. It covers the safe-area-aware shell, conventional left-aligned Back header, **Purchase Coin** content heading, one-column vertical coin-package card list, and the boundary for requesting the platform-native purchase sheet. It does not implement in-app billing, define store product identifiers, invent package values or prices, create a custom payment overlay, or define purchase verification, restoration, fulfillment, and failure behavior beyond their required safety contracts.

## Purpose and Navigation

`TokoScreen` is the single store destination for purchasing Sideline coin packages. Tapping **Toko** in `HomeBottomNavigation` activates its default entry. Tapping `CoinBalanceCard` activates the same screen with `PurchaseCoinSection` active. Because this plan currently defines only one Toko section, both entry paths display **Purchase Coin** and must not create separate `TopUpScreen`, `PurchaseCoinScreen`, or duplicate Toko routes.

Use the shared portrait `AppShell`. Derive all top and bottom spacing from the device safe-area insets and native system navigation rather than guessed status-bar, display-cutout, home-indicator, or Android system-navigation dimensions. Record the exact Expo Router path, activation or push action, section representation, and Back behavior in the screen workflow index when routing is implemented.

## Screen Structure

```text
TokoScreen
└── AppShell
    ├── SystemTopArea
    ├── TokoHeader
    │   └── TokoBackControl
    │       ├── BackArrowIcon
    │       └── ScreenName: "Toko"
    ├── PurchaseCoinContent
    │   ├── SectionHeading: "Purchase Coin"
    │   └── CoinPackageScrollView
    │       └── CoinPackageCard(s)
    └── SystemBottomArea
```

The directional layout follows the conventional mobile pattern. `TokoHeader`, `TokoBackControl`, `ScreenName`, `SectionHeading`, package titles, and reward content are left-aligned. Do not mirror them to the right because of the earlier directional wording.

## Toko Header

Place `TokoHeader` immediately below the native top safe area using the shared header inset and horizontal content gutter. `TokoBackControl` is one left-aligned pressable group containing the semantic Back arrow followed by the exact visible screen name **Toko**. Vertically center both elements and use one shared gap.

The complete arrow-and-text group is the Back target and must meet the global minimum touch size. Expose the accessible action **Back to Home** and prevent the decorative arrow from being announced separately. Pressing this control and using the supported platform Back action return to `HomeScreen` through the canonical navigation relationship; do not add a custom page transition or push another Home route. The exact top-level pop or switch action remains pending until the route structure is defined.

## Purchase Coin Content

Place the small section heading **Purchase Coin** below `TokoHeader`, left-aligned inside the shared content gutter. Use the approved compact section-heading typography rather than styling it as a second screen title.

Below the heading, render `CoinPackageScrollView` as a normal one-column vertical scroll region. It is not a horizontal rail, center-snapping rail, carousel, masonry layout, or two-column grid. Preserve the top header and native safe areas while allowing the package list to scroll when it exceeds the available viewport.

Use the shared vertical stack and content gutter for package spacing. Do not insert placeholder packages, promotional copy, category tabs, filters, pagination controls, or a purchase-history section until those requirements are approved.

## Coin Package Card

Every available product renders as one full-width `CoinPackageCard` with an identical responsive outer-width contract. The card uses the existing surface, border, radius, elevation, spacing, typography, icon, and pressable systems while adopting a simple bento-style internal composition:

```text
CoinPackageCard
├── PackageTitle
└── CoinRewardRow
    ├── CoinIcon
    └── CoinRewardText: "+{formattedCoinAmount}"
```

Place `PackageTitle` at the card's upper-left region. Place `CoinRewardRow` beneath it with deliberate vertical whitespace so the title and reward read as two clear bento regions rather than one compressed text row. The reward row contains the semantic coin icon followed by a plus-prefixed, locale-formatted amount such as `+1,000`. Example numbers communicate formatting only and must never be shipped as product data.

Keep the title and reward alignment consistent across all cards. Reserve stable title and reward regions so long product names do not change card height or move the reward. Apply the shared one-line ellipsis behavior to long visible titles while preserving their complete accessible names. The coin icon and reward amount form one semantic value and must not be announced twice.

The complete card surface is one accessible purchase target. It exposes a contextual label containing the package title and complete coin amount. A drag, scroll, momentum stop, focus change, or card visibility change must never request a purchase; only an explicit card press may do so. Prevent a second purchase request while a native purchase flow is already active.

## Package Catalog Contract

Drive every card from one typed package summary containing at least:

- stable internal package identifier;
- platform store product identifier mapping;
- product-defined package title;
- positive integer coin amount;
- availability state;
- platform product metadata required to initiate the purchase.

The authoritative product catalog owns package identity and coin quantity. Format the integer amount through the same centralized coin formatter used by `CoinBalanceCard`; do not store `+`, separators, or abbreviated display strings as source data. Do not infer coin quantity from a package title or client-side card order.

The exact package set, titles, coin amounts, localized store prices, product identifiers, catalog source, ordering, availability fallback, and whether price appears on the card remain pending. Until those contracts exist, do not ship mock purchasable cards or hard-coded production values. Native store metadata remains authoritative for localized price and purchasability.

## Platform-Native Purchase Sheet Boundary

Pressing an enabled `CoinPackageCard` requests the platform-native purchase flow for that exact product:

- Android uses the Google Play purchase sheet;
- iOS uses the App Store purchase sheet.

Do not implement a custom payment bottom sheet, modal, web form, card-number form, or imitation store overlay. The operating system and configured store SDK own payment presentation, authentication, confirmation, cancellation, and platform-required messaging.

The billing integration is intentionally pending. A card must not become a no-op, fake success interaction, or simulated purchase while integration is unavailable. Enable real purchase activation only after product loading, platform capability checks, billing configuration, transaction handling, verification, and fulfillment contracts are implemented and verified against the exact Expo SDK 54-compatible approach.

## Verification and Coin Fulfillment Safety

A card press and a native store success callback are not sufficient reasons to credit coins. The purchase boundary must use a stable platform transaction identifier, validate the transaction through the approved authoritative verification service, bind it to the expected store product, and make fulfillment idempotent so retrying the same transaction cannot credit coins twice.

Credit the user's authoritative wallet or coin ledger only after verification and fulfillment succeed. Then refresh `CoinBalanceCard` and any visible balance from that authoritative state; do not increment a screen-local number optimistically. Cancellation, pending payment, unavailable product, verification failure, duplicate transaction, or fulfillment failure must leave the confirmed coin balance unchanged.

The exact receipt or purchase-token validation service, server API, transaction state machine, acknowledgement or completion timing, idempotency storage, retry policy, pending-purchase recovery, refund or revocation policy, and wallet reconciliation behavior remain pending. These must be designed before purchase implementation; do not embed secrets or authoritative fulfillment rules in the client.

## Loading, Cancellation, and Failure Boundaries

While product metadata is loading, reserve each eventual card's approved dimensions only when the catalog contract defines a real loading presentation; do not fabricate skeleton counts. Disable unavailable products and communicate disabled state accessibly without converting missing metadata into a fake zero-price package.

If the user cancels the native store sheet, return focus to the initiating card on `TokoScreen` and preserve the authoritative balance. A store, network, configuration, verification, or fulfillment error must use the shared safe feedback system and must not expose raw receipts, purchase tokens, account identifiers, stack traces, or backend payloads. Exact loading, empty, unavailable, pending, success, and error copy remain pending.

Clean up purchase listeners and guard late callbacks when the screen unmounts. Transaction recovery must not depend on this screen remaining mounted, but its application-level owner remains pending with the billing architecture.

## Proportional Layout and Accessibility

Use semantic tokens for the native-safe-area gap, header height, content gutter, header icon and text gap, section-heading spacing, card width and minimum height, card padding, card-to-card gap, internal bento spacing, coin icon size, and reward typography. Do not hard-code screen width or position package content absolutely.

Each card fills the available content width up to the shared portrait content maximum. On narrow supported widths, preserve the Back target, coin icon, and readable reward size while truncating only the product title. On wider viewports, cap the content column instead of stretching cards and whitespace indefinitely.

Focus order follows visible order: `TokoBackControl`, **Purchase Coin**, then package cards from top to bottom. Every card announces its complete package title, formatted coin reward, enabled or unavailable state, and purchase action without relying on color or the coin artwork alone. Press, disabled, loading, store-sheet presentation, cancellation, and feedback motion reuse the global restrained-motion system and reduced-motion behavior.

## Reusable Implementation Boundary

Reuse `AppShell`, safe-area handling, `ContentContainer`, vertical scrolling and stack primitives, semantic Back and coin icons, typography, coin formatting, card surfaces, pressables, feedback, color, spacing, radius, elevation, and motion systems. `TokoScreen` owns only the route composition, `TokoHeader`, `PurchaseCoinSection`, and mapping typed package summaries into `CoinPackageCard` components.

Keep store product loading, platform capability checks, purchase requests, transaction listeners, verification, idempotent fulfillment, wallet refresh, restoration, and recovery outside base presentation components. Do not duplicate billing logic in each card, duplicate the wallet balance in Toko-local state, copy the saved-game rail's horizontal snapping behavior, or create a custom payment overlay.

## Pending Decisions

The exact Expo Router path and navigation action, Toko active-state treatment, package catalog and ordering, product titles and coin amounts, Google Play and App Store product identifiers, localized price presentation, billing library and configuration, purchase state machine, authoritative verification service, transaction acknowledgement, idempotent fulfillment storage, wallet reconciliation, restore-purchase behavior, pending-purchase recovery, refund or revocation handling, loading and empty states, feedback copy, and retry policy remain undefined. They must be documented and verified before real purchase activation is implemented.

## Acceptance Criteria

The canonical `TokoScreen` is shared by the Home **Toko** item and `CoinBalanceCard`; it respects native top and bottom safe areas; its conventional left-aligned header contains one Back arrow plus the exact text **Toko**; Back returns toward Home without creating a duplicate route; the small **Purchase Coin** heading is left-aligned; packages appear as a normal one-column vertical scroll of full-width bento-style cards rather than a horizontal rail; each card places its title above a semantic coin icon and plus-prefixed formatted reward; only an explicit card press may request a purchase; Android targets the Google Play sheet and iOS targets the App Store sheet; no custom payment overlay is created; no mock package or fake success is shipped while billing is pending; and coins are credited exactly once only after authoritative transaction verification and wallet fulfillment succeed.
