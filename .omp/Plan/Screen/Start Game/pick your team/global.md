# Start Game Pick-Your-Team Four-Step Design

> **Note:** This document defines the reusable shell shared by all four internal Start Game setup steps. Its layout and synchronized selection behavior intentionally reuse the Favorite Team flow one-for-one, but it owns separate Start Game screen state and navigation. The interface must never display step dots, boxes, counters, progress bars, or any other explicit step indicator. Each step's heading, fields, overlays, validation, and navigation details belong in its own step document.

## Global Step-Screen Direction

All four screens must use the reusable global `StepScreenLayout` rather than creating screen-specific shells. Step behavior is an internal Start Game setup pattern only, not a visible progress component. The layout must remain portrait-first and safe-area-aware, start below the phone's native top or status-bar area, and reuse the Favorite Team flow's shared placement, spacing, header identity, content slots, and action-button rules without copying styles. Steps 2–4 additionally reuse the synchronized dropdown-and-rail selection pattern defined below.

## Layout Structure

```text
StepScreenLayout
├── SystemTopArea
├── StepHeader
│   └── HeaderIdentity
│       ├── BrandLogo
│       └── Headline
├── StepContent
│   └── ContentHeading
└── BottomActionRegion
    ├── BackButton
    └── ForwardActionButton: "Continue" on Steps 1–3, "Done" on Step 4
```

## Element Placement

| Region | Placement | Confirmed Content | Behavior |
| --- | --- | --- | --- |
| `SystemTopArea` | Native phone status-bar and top safe-area region | Operating-system content only | No custom step navigation, indicator, or duplicated app header is rendered here |
| `StepHeader` | Slightly below the native phone top area using the shared safe-area spacing | Header identity only | Never displays dots, boxes, counters, progress bars, or step numbers |
| `HeaderIdentity` | Right side of the header below the native phone top area | Generic brand logo and the text **Headline** | Keeps the logo and headline aligned as one reusable header component |
| `StepContent` | Flexible center region between the header and bottom actions | One content heading followed by the current step's content | Each step document defines its own content while the global slot preserves spacing and scrolling behavior |
| `BottomActionRegion` | Slightly above the native bottom navigation and bottom safe area | **Back** plus **Continue** on Steps 1–3 or **Done** on Step 4 | Remains visible and uses global navigation-aware spacing |

## Brand Identity

Use `assets/Generic/Logo-brand/brand-logo.png` through the reusable brand or image component and display the text **Headline** beside it. The logo and headline must use shared size, typography, color, and spacing tokens. Keep this group aligned to the right side of the header, slightly below the phone's native top safe area, and do not import or size the image independently inside individual step screens.

## Step Content

`StepContent` always begins with one reusable content heading followed by a per-step content slot. The global layout owns their spacing and scrolling boundaries, while each separate step document owns the heading copy and content details. The top `HeaderIdentity` text **Headline** and the content heading are separate elements with separate responsibilities.

## Shared Selection Pattern for Steps 2–4

Steps 2, 3, and 4 must render their primary controls in this exact vertical order:

```text
StepContent
├── ContentHeading
├── SynchronizedSelectionDropdown
└── CenteredSnapSelectionRail
```

The dropdown and horizontal rail are two synchronized ways to select the same item. Step 2 supplies countries to both controls, Step 3 supplies the selected country's leagues or divisions, and Step 4 supplies the selected league's clubs. Both controls read and write one screen-level `selectedId`; they must never maintain competing selection states.

Reuse the Step 1 country-selector visual and interaction contract for `SynchronizedSelectionDropdown`: the selected flag or badge, selected name, trailing chevron, searchable bottom sheet, sticky search region, immediate row selection, and automatic close. Generalize the reusable selector through typed data and a leading-visual renderer instead of copying the country component. Country variants render the reusable `CountryFlagIcon` wrapper around `react-native-country-flag`; league and club variants render their separate badge assets. Selecting an item in the dropdown updates `selectedId` immediately and programmatically scrolls the matching rail item into the exact center.

`CenteredSnapSelectionRail` is a reusable full-bleed horizontal list for country flags, league badges, and club badges. Step 2 must render every flag through `CountryFlagIcon`, while Steps 3 and 4 keep using their badge renderer. The rail snaps one item to the viewport center. When user-driven scrolling settles, derive the nearest centered item once, update `selectedId`, and synchronize the dropdown; selection must not require a tap. A tap may remain as an accessible alternative, but scrolling and stopping is a complete selection interaction.

The rail viewport must reach both physical screen edges and must not be clipped by the normal content gutter. Do not rely on `overflow: visible` alone: place the rail through the shared `FullBleed` layout and avoid a parent with `overflow: hidden`. Compute equal leading and trailing space from the measured viewport and item width so the first and last items can each snap to the exact center. Do not hard-code the screen width. Use an appropriate virtualized horizontal list because the club dataset may be large, with stable item IDs, deterministic item measurement, centered snapping, and indexed scrolling from dropdown selections.

Changing an upstream choice invalidates incompatible downstream choices: changing the Step 2 country clears the selected league and club; changing the Step 3 league clears the selected club. Persist valid upstream values when navigating Back so returning users see the same centered item and synchronized dropdown.

## Bottom Actions

Place two reusable buttons side by side inside `BottomActionRegion`, with **Back** on the left and the forward action on the right. Steps 1–3 label the forward action **Continue**; Step 4 labels it **Done**. **Back** uses the default secondary button variant: background `#131318`, border `#3F3F43`, and text `#FFFFFF`. **Continue** and **Done** use the active primary button variant: background `#FFFFFF`, border `#3F3F43`, and text `#131318`. These literal values document the approved design tokens; the implementation must consume the semantic button tokens defined in the shared theme instead of hard-coding the values in the screen.

The action region must account for the native bottom navigation height and bottom safe-area inset through the global layout system. Do not position it using a guessed fixed bottom value. The content region must include enough bottom inset that its final content cannot be obscured by the fixed action region. Button press feedback must use the global animation system and approved opacity tokens without gradients or locally defined colors.

## Reusable Implementation Boundary

`StepScreenLayout` owns safe-area spacing below the phone's native top area, header placement, the flexible or scrollable content slot, and the bottom action region. A reusable `StepHeader` owns only the right-aligned brand logo and **Headline** text; it must not render visible step progress. A reusable `StepActions` owns the paired Back and forward-action layout and accepts typed callbacks, labels, disabled state, and loading state. Each step supplies **Continue** or **Done** explicitly and must not recreate the global shell.

## Pending Product Decisions

Step-specific headings, content, validation, draft persistence, Back destinations, and forward destinations are defined in `step 1.md`, `step 2.md`, `step 3.md`, and `step 4.md`. Internal step metadata may control the flow but must never be rendered as dots, boxes, counts, progress bars, or other explicit progress UI. The destination after Step 4 **Done** is the planned `GameplayScreen`; the separate `Gameplay` design remains intentionally undefined.
