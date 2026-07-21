# WATCHDOG — Implementation Consistency Guard

> **Note:** Read before writing any code. Enforces token, component, asset, animation, layout, and navigation consistency. Every implementation MUST pass the checklist.

## Title
**Sideline Implementation Watchdog**

## Description
Guard rules for Sideline implementation. Every screen, component, token, animation, asset, and navigation decision must stay consistent with the design system plan files under `.omp/Plan/`. This file is the enforcement layer — the plan files are the source of truth.

---

## Token & Styling

All colors and typography come from [Color/color.md](Plan/Color/color.md) — never hard-code hex values or font sizes. Spacing, safe-area handling, content gutters, and full-bleed layout come from [layout/layout.md](Plan/layout/layout.md). Border radius and shadow tokens are shared across components; do not inline `borderRadius` or `elevation` values. Use the same `SF Pro Text` font family with Regular and Bold weights from the typography system. Extend existing tokens instead of creating new ones.

## Component

Organize components using atomic design under `components/base/`, `components/groups/`, `components/sections/`, and `components/layouts/` as defined in [AGENTS.md](AGENTS.md). Dependency flows upward only — lower levels never import higher levels. No business logic, data fetching, or navigation state in base components. Reusable gameplay components include `GameplaySubNavigation` from [Comp/navigasi.md](Plan/Screen/Start%20Game/Gameplay/Comp/navigasi.md), `GameplayTable` from [Comp/table.md](Plan/Screen/Start%20Game/Gameplay/Comp/table.md), `BentoGrid`, `BentoCard`, and `OfferCard` from [Comp/bento.md](Plan/Screen/Start%20Game/Gameplay/Comp/bento.md), `ContractDetailCard`, `CenteredSnapSelectionRail` from the pick-your-team flow, and `CountryFlagIcon` from [icon.md](Plan/Asset/icon.md). Always search for an existing component before creating a new one; extend variants rather than adding boolean props.

## Screen

Every screen must declare its layout type — Type 1 (sub-navigation rail) or Type 2 (back arrow + title) — from [Gameplay/global.md](Plan/Screen/Start%20Game/Gameplay/global.md). Content lives in `GameplayContentSlot` only; never recreate the top header (brand lockup, coin/budget cards, more menu), the floating bottom navigation (Portal/Tactic/Transfer/Management/Next-Match), or the safe-area handling. The bottom navigation's fifth button is a state machine: **Next** (time advance) → **Match** (match day) → **Kick-Off** (Start screen) → **Next** (Statistic) → **Done** (End), as defined in [Next atau match](Plan/Screen/Start%20Game/Gameplay/Menu/Next%20atau%20match/next%20atau%20match.md). Never show step indicators — no dots, counters, progress bars, or numbered labels — in any multi-step flow. Every screen plan links to its menu index, its reusable components, and its global shell.

## Asset

Brand assets use `assets/Generic/Logo-brand/brand-logo.png` as specified in [asset.md](Plan/Asset/asset.md). Icons come from Expo Vector Icons through the global icon registry defined in [icon.md](Plan/Asset/icon.md). Country flags use the reusable `CountryFlagIcon` wrapper backed by `react-native-country-flag` — never import PNG or SVG flags directly. Player faces use small avatar tokens with zero border radius when flush to cards. Club badges and league logos come from the data layer. Always provide a gray placeholder silhouette fallback for missing images.

## Animation

All motion follows the restrained Apple-inspired system in [Animation/animation.md](Plan/Animation/animation.md). Interactive press feedback uses **opacity-only** visual state changes — no scale transforms, no bounce, no custom spring animations. Group expand/collapse uses shared height and opacity tokens only. Native navigation transitions only. The Match screen uses karambol-style linear movement with snap-to-player on ball reception — no physics simulation.

## Data & Config

Coin balances come from the authoritative wallet boundary; club budgets from the club-economy boundary — never hard-code "000" or demo values. Dropdown options always come from config objects: `contractActionConfig`, `replyTemplateConfig`, `playerActionConfig`. Stat card schemas come from config: `clubConfig` per tab. Scout filter fields are conditional per focus type. Every config is editable without changing UI code.

## Checklist

Before submitting any implementation: colors and typography from [Color/color.md](Plan/Color/color.md); spacing and safe-area from [layout/layout.md](Plan/layout/layout.md); existing component reused or new one justified with atomic structure; screen declares Type and does not duplicate chrome; no step indicators; assets from icon registry in [icon.md](Plan/Asset/icon.md); animation is opacity-only from [Animation/animation.md](Plan/Animation/animation.md); dropdowns and schemas from config objects; all plan `.md` links resolve; [todo.md](Plan/Screen/todo.md) status is updated.

## Reference

- [AGENTS.md](AGENTS.md) — Project architecture, reusable UI rules
- [WATCHDOG.md](WATCHDOG.md) — This file, implementation consistency guard
- [Plan/Color/color.md](Plan/Color/color.md) — Color and typography tokens
- [Plan/Asset/asset.md](Plan/Asset/asset.md) — Asset usage rules
- [Plan/Asset/icon.md](Plan/Asset/icon.md) — Icon system and flag wrapper
- [Plan/layout/layout.md](Plan/layout/layout.md) — Layout, safe-area, full-bleed
- [Plan/Animation/animation.md](Plan/Animation/animation.md) — Animation rules
- [Plan/Screen/todo.md](Plan/Screen/todo.md) — Screen design status tracker
