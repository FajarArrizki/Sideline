# Start Game Step 2 — Select Country

> **Note:** This is the second of four internal Start Game setup steps and uses the shared shell and synchronized selector contract in [global.md](global.md). Its selection UI remains identical to Favorite Team Step 2. Do not show a step number, dots, boxes, counters, progress bar, or other visible step indicator.

## Purpose and Heading

Set the `StepContent` heading to **Select Country**. This country represents where the new game's chosen club and league system are based—for example, England for clubs in the English league system. It is independent from the manager nationality loaded into the Step 1 draft and must use its own state field.

## Content Structure

Render the controls directly below the heading in this exact order:

```text
StepContent
├── ContentHeading: "Select Country"
├── CountrySelectionDropdown
└── CountrySelectionRail
```

`CountrySelectionDropdown` and `CountrySelectionRail` display the same country dataset and share one `selectedCountryId`. Neither control owns a second local selection value.

## Country Dropdown

Reuse the Step 1 country-selection component and bottom-sheet behavior rather than creating another dropdown. Its closed state displays `CountryFlagIcon` and the selected country name with the global trailing chevron. Before selection, display **Select Country**. Pressing it opens the same searchable country picker with a sticky search input, divider, approved functional scroll-edge fade, virtualized country rows, immediate selection, and automatic close.

Every flag receives the country's ISO 3166-1 alpha-2 code through the reusable `CountryFlagIcon` wrapper defined in [../../../Asset/icon.md](../../../Asset/icon.md). Step 2 must not import `react-native-country-flag` directly or introduce local PNG or SVG country flags. Selecting a country from the dropdown immediately updates `selectedCountryId`, updates the closed field, and scrolls the matching `CountryFlagIcon` in `CountrySelectionRail` into the exact viewport center. The dropdown and rail must remain synchronized after repeated changes.

## Centered Country Rail

`CountrySelectionRail` uses the shared `CenteredSnapSelectionRail` and renders every country through `CountryFlagIcon`. The rail is full-bleed below the dropdown: its scrolling viewport reaches the physical left and right screen edges, adjacent flags remain visible where the platform permits, and no padded parent clips it. Use the global `FullBleed` layout rather than relying on `overflow: visible` alone.

Every `CountryFlagIcon`, including the first and last, must be able to stop exactly at the viewport center. Compute symmetric leading and trailing rail space from the measured viewport and item width; never hard-code the device width. Snap to one flag at a time. When user-driven scrolling stops, the centered country is selected automatically, `selectedCountryId` is updated once, and `CountrySelectionDropdown` displays the same flag and name. The user does not need to tap a flag.

Tapping a flag may remain as an accessible alternate interaction, but it must produce the same centered position and selection state. Provide each wrapper instance with its country name as an accessibility label and announce the selected state. Loading and remote-image failure must preserve the rail's measured item width so a missing network flag cannot break snapping or center alignment.

## Navigation and Dependency Behavior

The Step 2 **Back** action returns to `StartGameManagerInformationStep` and preserves the Step 1 game draft. **Continue** advances to `StartGameLeagueSelectionStep` after a country has been selected because Step 3 league options depend on `selectedCountryId`. Changing the country clears any incompatible selected league and team in this Start Game draft.

## Pending Decisions

The authoritative country dataset, localization language, sort order, initial selection behavior, empty and error states, picker search copy, draft persistence mechanism, accessible flag fallback, and offline Start Game requirement remain undefined. Country flags are sourced through `react-native-country-flag`, whose current default implementation requires FlagCDN network access. Do not assume Indonesia, the manager nationality, or the favorite club's country as the game-team default unless a later product rule defines it.
