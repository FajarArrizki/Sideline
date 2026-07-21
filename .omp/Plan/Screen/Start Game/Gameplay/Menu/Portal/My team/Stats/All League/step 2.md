# Stats — All League (Step 2: Select League)

> **Context:** This screen uses **Gameplay global Type 1** defined in [global.md](../../../../../global.md) with the **My team** sub-navigation rail. This is the second of two steps. After selecting a league, the screen shows stats for all teams in that league. Do not show a step number, dots, boxes, counters, progress bar, or other visible step indicator.

## Purpose and Heading

Set the heading to **Select League**. The available options belong to the country selected in Step 1 and include that country's supported league levels or divisions.

## Content Structure

Render the controls directly below the heading in this exact order:

```text
GameplayContentSlot
├── ContentHeading: "Select League"
├── LeagueSelectionDropdown
└── LeagueSelectionRail
```

`LeagueSelectionDropdown` and `LeagueSelectionRail` display the same country-filtered league dataset and share one `selectedLeagueId`. Neither control owns a second local selection value.

## League Dropdown

Reuse the league-selection component and bottom-sheet behavior. The closed field displays the selected league badge and official league name with the global trailing chevron. Before selection, display **Select League**. Pressing it opens the searchable league picker.

Each dropdown row contains the league badge and official name. Include tier or division information when required to distinguish competitions. Selecting a league immediately updates `selectedLeagueId`, closes the sheet, and scrolls the matching badge in `LeagueSelectionRail` into the exact viewport center.

## Centered League Rail

`LeagueSelectionRail` uses the shared `CenteredSnapSelectionRail` with league badges. It is full-bleed below the dropdown and uses the global `FullBleed` layout.

Every badge must be able to stop exactly at the viewport center. When user-driven scrolling settles, automatically select the centered league. Each badge must expose the full league name and selected state to accessibility services.

## Country Dependency

Only leagues belonging to `selectedCountryId` from Step 1 may appear. If the user returns to Step 1 and changes the country, rebuild the dataset and clear any incompatible `selectedLeagueId`.

## Navigation

The **Back** button returns to Step 1 (Select Country) with the current country still selected. **Done** commits the selection and navigates to [Pick Stats](Pick stats/pick stats.md).
