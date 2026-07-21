# Home Saved-Game Rail Design

> **Note:** This document defines the saved-game card rail positioned at the bottom of `HomeContentSlot`, immediately above the floating Home navigation. It covers only the rail, card content, load activation, delete request, responsive sizing, and consistency rules. Other Home content, save ordering, empty-state presentation, the destination after a successful load, and storage implementation remain undefined until their dedicated plans are written.

## Purpose and Placement

`SavedGameRailSection` gives the user direct access to game saves that have already been created. Place it at the bottom of the flexible `HomeContentSlot`, above `HomeBottomNavigation`, with a predictable gap from the shared navigation and layout spacing tokens. It must remain a Home content region rather than becoming part of the floating navigation capsule.

The shell must reserve the bottom navigation's measured height and safe-area inset before positioning the rail. Do not use a guessed bottom offset. Future Home content occupies the space above this section and must not push the rail behind the navigation or system home indicator.

```text
HomeContentSlot
├── FutureHomeContent: pending
└── SavedGameRailSection
    └── SavedGameRail
        └── SavedGameCard(s)
```

Do not invent a visible section heading, counter, filter, pagination control, add-save card, or other decoration around the rail until those requirements are defined.

## Centered Rail Behavior

`SavedGameRail` is a full-bleed horizontal virtualized list that reuses the measured viewport, symmetric leading and trailing inset, and one-card center snapping behavior established by the onboarding rails. Every card, including the first and last card, must be able to stop at the exact viewport center. Adjacent cards should remain partially visible when the measured viewport and approved card-width tokens permit it.

The saved-game rail intentionally does **not** reuse the onboarding selection behavior. When user-driven scrolling settles, snap the nearest card to the center for visual alignment only. Do not create or update `selectedSaveId`, do not mark the centered card as selected, and do not load a game automatically. A save loads only after the user explicitly taps its card.

A drag, fling, momentum stop, snap correction, or programmatic recenter must never activate a save. If the current `CenteredSnapSelectionRail` implementation couples snapping to selection, extract and reuse a presentation-neutral `CenteredSnapRail` geometry primitive, then keep onboarding selection and Home press-to-load behavior in separate wrappers. Do not copy the viewport measurement or first-and-last centering math into Home.

## Saved-Game Card Structure

Each `SavedGameCard` uses this fixed internal hierarchy:

```text
SavedGameCard
├── SaveMetadataRow
│   ├── DeleteSaveButton: semantic close icon
│   └── SaveFileSize
├── SaveIdentityRow
│   ├── CountryFlagIcon
│   ├── VerticalDivider
│   └── ClubBadge
├── SavedClubName
├── SavedManagerName
└── LastSavedDateTime
```

### Top Metadata Row

Align `SaveMetadataRow` to the card's top-right region. `SaveFileSize` is the rightmost item and displays the formatted size of the persisted save file, such as `24.8 MB`. `DeleteSaveButton` sits immediately to its left and displays only the semantic **close** icon that visually represents `×`; do not render a literal text character or emoji as the icon.

The visible icon may remain compact, but its pressable wrapper must preserve at least the global minimum touch target without overlapping the file-size label or card activation area. Give it a contextual accessibility label such as **Delete save for {clubName}**.

### Center Identity Row

Center `SaveIdentityRow` horizontally in the card. Render the club country's flag through the reusable `CountryFlagIcon`, followed by a vertical divider, followed by the club badge renderer. The flag and badge use approved semantic size variants, preserve their aspect ratios, and reserve stable dimensions while loading or when an asset fails. Club badges must not be routed through the country-flag component.

The divider is structural separation only. Its thickness, height, color, and surrounding gaps come from shared divider and spacing tokens. Do not approximate the divider with a text glyph.

### Save Labels

Below the identity row, display the official club name as the card heading. Display the manager name beneath it, followed by the last-save timestamp containing both the calendar date and clock time. All three labels use the shared typography hierarchy, semantic text colors, and vertical spacing tokens.

Reserve consistent line counts for every card so long names cannot move the timestamp or change card height. Apply the shared one-line truncation behavior to the club and manager names, while preserving their complete values in accessibility labels. Format the timestamp through the centralized date-time formatter rather than concatenating screen-local strings. The exact locale and date-time pattern remain product decisions, but both date and time must be visible.

## Data Contract

Each card receives a typed, persisted save summary with at least:

- stable `saveId`;
- `fileSizeBytes`;
- club country ISO 3166-1 alpha-2 code;
- club badge reference and fallback metadata;
- official club name;
- manager name;
- `lastSavedAt` timestamp.

Format `fileSizeBytes` through one shared byte-size formatter with consistent units and precision. Format `lastSavedAt` through one shared date-time formatter. Do not store preformatted display strings as the source of truth and do not infer a country from the club name inside the card.

The rail receives save summaries from the authoritative save-management or storage layer. The exact persistence technology, save schema, sorting order, and synchronization behavior remain pending.

## Load Interaction

The complete card surface, excluding `DeleteSaveButton`, is one accessible press target. Tapping it requests a load by stable `saveId`. The delete control must consume its own press and must never bubble into the card's load action. Prevent duplicate load requests while the same save is already being opened.

Successful-load destination and transition behavior belong to the future game-loading flow. Loading progress and recoverable load-error presentation must reuse shared application feedback components once those contracts are defined; do not invent a Home-local spinner, route, or fallback game state in this plan.

## Delete Interaction

Tapping `DeleteSaveButton` opens a confirmation dialog or sheet for that exact `saveId`. The save and its card remain intact until the user explicitly confirms. Cancelling closes the confirmation surface without changing rail position or triggering a load.

After confirmed deletion succeeds, remove the matching card and recenter the nearest surviving card without selecting or loading it. If deletion fails, retain the card and surface the error through the shared feedback system. Deleting the final save must leave the rail structurally valid, but the visible empty-state design and copy remain pending.

## Proportional Sizing and Spacing

All saved-game cards use one shared responsive size contract. Derive card width from the measured rail viewport through an approved width ratio constrained by shared minimum and maximum width tokens. Use one shared aspect-ratio or height token so every card has identical outer dimensions. Never hard-code a device width or calculate a different size from each card's content.

Use semantic tokens for card padding, corner radius, border, surface, shadow or elevation, internal row gaps, icon sizes, divider dimensions, typography, and the vertical gap above `HomeBottomNavigation`. Keep each internal region in the same position across all cards:

- the metadata row reserves the same top area;
- the flag-divider-badge row uses the same visual center and dimensions;
- the club, manager, and timestamp labels reserve the same line slots;
- longer content truncates instead of pushing another region.

Compute the rail's leading and trailing space from `(viewportWidth - cardWidth) / 2` so the first and last cards can center exactly. Use the measured item width and approved inter-card gap for snap offsets. Do not reuse the onboarding rail's smaller flag or badge item dimensions as the saved-card dimensions; reuse its geometry rules through a card-specific size variant.

## Accessibility

Each card exposes a concise combined label containing the club, manager, last-saved date and time, and file size, plus a load-save action hint. `DeleteSaveButton` remains a separate accessible control with a destructive-action label. Focus order follows the visible card order and must not jump to off-screen cards unexpectedly after snapping or deletion.

Country flags and badges need accessible names and stable fallbacks, but duplicated nested image labels must not cause the same club information to be announced repeatedly. Color, center position, and partial-card visibility must never be the only indicators that a card is actionable.

## Reusable Implementation Boundary

Reuse the global `FullBleed`, virtualized horizontal-list, safe-area, icon, country-flag, badge, divider, typography, pressable, confirmation, feedback, color, spacing, radius, and motion systems. Home owns only the saved-game composition and its explicit press-to-load interaction. Do not duplicate onboarding selection state, safe-area offsets, byte formatting, date formatting, asset fallbacks, or delete-confirmation primitives inside `SavedGameCard`.

## Pending Decisions

The authoritative save summary source, maximum save count, save ordering, cloud versus local status, empty-state design, initial rail position, exact byte precision, date-time locale, load destination, loading feedback, error copy, confirmation copy, and post-delete focus behavior remain undefined. Do not infer them from array order, device locale, or temporary mock data during implementation.

## Acceptance Criteria

The saved-game rail sits at the bottom of Home content above the floating navigation; each card can snap to the exact center; scrolling or settling never selects or loads a save; only an explicit card tap requests loading; the top-right row places the `×` icon immediately left of the formatted file size; the centered identity row displays country flag, real divider, and club badge; club name, manager name, and last-saved date plus time occupy consistent label regions; delete requires confirmation and cannot trigger load; and every card uses the same proportional, token-driven dimensions, padding, alignment, spacing, and truncation behavior across supported portrait viewports.
