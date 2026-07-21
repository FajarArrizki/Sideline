# Expo Reusable UI Architecture

Treat this repository as an Expo SDK 54 and React Native project, consult the exact versioned Expo documentation at https://docs.expo.dev/versions/v54.0.0/ before implementing Expo-specific behavior, and keep route or screen files focused on composition, navigation, and feature orchestration rather than reusable presentation details.

Build every recurring visual or interactive pattern as a reusable component and never duplicate colors, typography, spacing, sizing, border widths, border radii, shadows, opacity values, icon sizing, or other design decisions inline when they can be represented by centralized semantic design tokens, shared variants, or an existing component API; extend the shared token or component system instead of introducing one-off styles, and use React Native StyleSheet or the styling approach already established by the repository consistently.

Organize reusable UI with atomic design semantics without naming folders atoms, molecules, organisms, or templates: use components/base for atoms, components/groups for molecules, components/sections for organisms, and components/layouts for templates, then always subdivide each level by responsibility so files are never placed loosely or mixed together, for example components/base/text for typography primitives, components/base/buttons for button primitives, components/base/inputs for input primitives, components/base/icons for icon wrappers, components/base/surfaces for cards and containers, components/groups/forms for composed form controls, components/groups/navigation for compact navigation assemblies, components/groups/feedback for alerts and status groups, components/sections/headers for page-level headers, components/sections/lists for substantial list regions, components/sections/forms for complete form sections, components/layouts/screens for reusable screen shells, and components/layouts/auth for authentication layouts; create another clearly named functional subfolder when none of these categories fits rather than placing a file directly inside base, groups, sections, or layouts.

Keep dependency flow strictly upward so base components depend only on platform primitives, tokens, and low-level utilities, groups may compose base components, sections may compose base and groups, layouts may compose base, groups, and sections, and lower levels must never import higher levels; keep business logic, data fetching, navigation state, and feature-specific side effects outside base components, expose typed and minimal props, prefer composition and explicit variants over copied components or boolean-prop sprawl, give each component a focused responsibility and a stable public export, colocate component-specific styles, types, and tests within that component's functional folder when appropriate, use consistent PascalCase component filenames and names, and search for an existing token, primitive, variant, or component before creating a new one so the design system remains reusable, predictable, and free of duplicate implementations.

## Also Read

### Instructions — Read Before Work

Instruction documents are always authoritative. Read the relevant instruction documents before planning or implementation, and continue following them while working through any plan.

[Reusable UI rules](instructions/Rules/rules.md) — Project-wide reusable UI and styling rules.
[Implementation Watchdog](WATCHDOG.md) — Token, component, asset, animation, layout, screen chrome, and navigation consistency guard. Read before writing any implementation code.
[Sideline project onboarding](instructions/Onbording%20to%20the%20project/project-overview.md) — Product vision, gameplay pillars, and portrait-first direction.

### Plans — Read One at a Time During Implementation

> **Implementation note:** Enter this section only when creating or executing an implementation plan. Read exactly one relevant Plan document at a time. For each loop: read one plan, inspect the existing components and tokens it depends on, reuse or extend them instead of creating a duplicate, implement only that plan's current scope, verify the result, and only then read the next Plan document. Never batch-read several Plan documents before implementation, never implement multiple plan scopes as one uncontrolled change, and never create a second component, token, selector, layout, or interaction when an existing shared contract can be reused or extended.

Follow the applicable plans sequentially. Shared-system plans come before screen-specific plans; only read plans relevant to the implementation being performed.

[Color and typography system plan](Plan/Color/color.md) — Shared color tokens, button states, and typography usage.
[Generic asset usage plan](Plan/Asset/asset.md) — Generic wireframe assets and their intended usage.
[Global icon system plan](Plan/Asset/icon.md) — Expo Vector Icons plus the reusable `react-native-country-flag` wrapper, dependency checks, and global icon architecture.
[Global mobile layout plan](Plan/layout/layout.md) — Expo-native screen shell, navigation-aware spacing, content gutters, and full-bleed horizontal scrolling.
[Global animation system plan](Plan/Animation/animation.md) — Restrained Apple-inspired motion, native navigation transitions, reusable interaction feedback, and opacity-only visual state changes.
[Screen workflow and navigation plan](Plan/Screen/index.md) — Source of truth for screen flows, button destinations, navigation actions, and back behavior.
[Splash screen implementation design](Plan/Screen/Splash%20screen/splash%20screen.md) — Centered brand logo, safe-area-aware version label, and Expo native-to-React splash behavior.
[Global four-step screen design](Plan/Screen/favorit%20Team/global.md) — Shared no-indicator shell plus the synchronized dropdown and centered full-bleed selection rail for Steps 2–4.
[Step 1 Manager Information design](Plan/Screen/favorit%20Team/step%201.md) — Manager identity, reusable country and fluent-language pickers, and the pushed coaching-style attribute editor.
[Step 2 country selection design](Plan/Screen/favorit%20Team/step%202.md) — Synchronized searchable country dropdown and auto-selecting centered flag rail.
[Step 3 league selection design](Plan/Screen/favorit%20Team/step%203.md) — Country-filtered league and division selection through a dropdown and centered badge rail.
[Step 4 favorite team design](Plan/Screen/favorit%20Team/step%204.md) — League-filtered favorite-club selection through a dropdown and centered badge rail.
[Home global design](Plan/Screen/Home/global.md) — Safe-area-aware Home shell with coin balance and overflow header actions, reserved content regions, and floating Toko / Start Game / Download navigation.
[Home manager summary design](Plan/Screen/Home/manager%20summary.md) — Profile-photo card, persisted manager identity, and favorite-club badge group directly below the Home top bar.
[Home saved-game rail design](Plan/Screen/Home/saved%20game%20rail.md) — Center-snapping saved-game cards that load only on explicit tap and require confirmation before deletion.
[Home download screen design](Plan/Screen/Home/download.md) — Safe-area-aware league-package catalog, far-right row download actions, full-width Download All control, and one two-mode progress bottom sheet.
[Home Toko screen design](Plan/Screen/Home/toko.md) — Conventional left-aligned Back header, one-column vertical coin-package cards, and platform-native Google Play or App Store purchase boundary.
[Start Game workflow and navigation plan](Plan/Screen/Start%20Game/index.md) — Central Start Game index linking the pick-your-team flow and the planned Gameplay destination.
[Start Game pick-your-team global design](Plan/Screen/Start%20Game/pick%20your%20team/global.md) — Favorite-Team-equivalent four-step shell with separate Start Game state and final Done behavior.
[Start Game Step 1 Manager Information design](Plan/Screen/Start%20Game/pick%20your%20team/step%201.md) — Draft-only manager data prefilled from the persisted onboarding result.
[Start Game Step 2 country selection design](Plan/Screen/Start%20Game/pick%20your%20team/step%202.md) — Reused synchronized country dropdown and centered rail for new-game setup.
[Start Game Step 3 league selection design](Plan/Screen/Start%20Game/pick%20your%20team/step%203.md) — Country-filtered league selection for the Start Game draft.
[Start Game Step 4 team selection design](Plan/Screen/Start%20Game/pick%20your%20team/step%204.md) — Team selection with final Done handoff to the intentionally undefined Gameplay destination.
[Gameplay global design](Plan/Screen/Start%20Game/Gameplay/global.md) — Gameplay shell: top header with coin and club-budget cards, floating bottom navigation with Portal/Tactic/Transfer/Management/Next-Match action.
[Gameplay destination placeholder](Plan/Screen/Start%20Game/Gameplay/gameplay.md) — Intentionally undefined gameplay design anchor.
[Gameplay table component](Plan/Screen/Start%20Game/Gameplay/Comp/table.md) — Reusable full-width, horizontally-scrollable rail table for Gameplay screens.
[Gameplay sub-navigation component](Plan/Screen/Start%20Game/Gameplay/Comp/navigasi.md) — Reusable horizontal text-tab sub-navigation with active/default color or opacity states.
[Gameplay menu index](Plan/Screen/Start%20Game/Gameplay/Menu/index.md) — Central index for Portal, Tactic, Transfer, and Management menu screen plans.
