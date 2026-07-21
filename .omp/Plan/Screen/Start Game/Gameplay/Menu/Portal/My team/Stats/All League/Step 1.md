# Stats — All League (Step 1: Select Country)

> **Context:** This screen uses **Gameplay global Type 1** defined in [global.md](../../../../../global.md) with the **My team** sub-navigation rail. It is the first of two steps: first select a country, then select a league to view stats for all teams. Do not show a step number, dots, boxes, counters, progress bar, or other visible step indicator.

## Purpose and Heading

Set the heading to **Select Country**. The selected country determines which leagues are available in Step 2.

## Content Structure

Render the controls directly below the heading in this exact order:

```text
GameplayContentSlot
├── ContentHeading: "Select Country"
├── CountrySelectionDropdown
└── CountrySelectionRail
```

`CountrySelectionDropdown` and `CountrySelectionRail` display the same country dataset and share one `selectedCountryId`. Neither control owns a second local selection value.

## Country Dropdown

Reuse the same country-selection component and bottom-sheet behavior. Its closed state displays `CountryFlagIcon` and the selected country name with the global trailing chevron. Before selection, display **Select Country**. Pressing it opens the searchable country picker with a sticky search input, divider, virtualized country rows, immediate selection, and automatic close.

Every flag receives the country's ISO 3166-1 alpha-2 code through the reusable `CountryFlagIcon` wrapper. Selecting a country from the dropdown immediately updates `selectedCountryId`, updates the closed field, and scrolls the matching `CountryFlagIcon` in `CountrySelectionRail` into the exact viewport center. The dropdown and rail must remain synchronized after repeated changes.

## Centered Country Rail

`CountrySelectionRail` uses the shared `CenteredSnapSelectionRail` and renders every country through `CountryFlagIcon`. The rail is full-bleed below the dropdown. Use the global `FullBleed` layout.

Every `CountryFlagIcon`, including the first and last, must be able to stop exactly at the viewport center. Compute symmetric leading and trailing rail space. When user-driven scrolling stops, the centered country is selected automatically; no tap is required.

## Navigation

The **Back** button returns to the previous screen. **Continue** advances to Step 2 (Select League) after a country has been selected. Changing the country clears any incompatible selected league.

## Pending Decisions

The authoritative country dataset, localization, sort order, and persistence remain undefined.
