# Step 3 — Select League

> **Note:** This is the third of four internal onboarding steps and uses the shared shell and synchronized selector contract in [global.md](global.md). Do not show a step number, dots, boxes, counters, progress bar, or other visible step indicator.

## Purpose and Heading

Set the `StepContent` heading to **Select League**. The available options belong to the country selected in Step 2 and include that country's supported league levels or divisions, such as the first tier, second tier, and subsequent tiers. Treat each tier or division as a distinct league option with a stable ID, official name, badge, country ID, and tier metadata.

## Content Structure

Render the controls directly below the heading in this exact order:

```text
StepContent
├── ContentHeading: "Select League"
├── LeagueSelectionDropdown
└── LeagueSelectionRail
```

`LeagueSelectionDropdown` and `LeagueSelectionRail` display the same country-filtered league dataset and share one `selectedLeagueId`. Neither control owns a second local selection value.

## League Dropdown

Reuse the Step 1 country-dropdown component contract with league-specific typed data instead of copying its styles or bottom sheet. The closed field displays the selected league badge and official league or division name with the global trailing chevron. Before selection, display **Select League**. Pressing it opens the same searchable bottom-sheet structure, now populated with league rows and league-specific search copy.

Each dropdown row contains the league badge and official name. Include tier or division information when it is required to distinguish competitions with similar names, but do not invent presentation copy or numbering that is absent from the authoritative data source. Selecting a league immediately updates `selectedLeagueId`, closes the sheet, and scrolls the matching badge in `LeagueSelectionRail` into the exact viewport center.

## Centered League Rail

`LeagueSelectionRail` uses the shared `CenteredSnapSelectionRail` with league or division badges. It is full-bleed below the dropdown, reaches both physical screen edges, remains unclipped by the regular content gutter, and uses the global `FullBleed` layout rather than relying on `overflow: visible` alone.

Every badge, including the first and last badge, must be able to stop exactly at the viewport center. Compute symmetric leading and trailing rail space from the measured viewport and item width. Snap one badge to the center. When user-driven scrolling settles, automatically select the centered league, update `selectedLeagueId` once, and synchronize `LeagueSelectionDropdown`; no tap is required.

Tapping a badge may remain as an accessible alternate interaction. Each badge must expose the full league name, country, tier or division where available, and selected state to accessibility services.

## Country Dependency

Only leagues belonging to `selectedCountryId` from Step 2 may appear. If the user returns to Step 2 and changes the country, rebuild the Step 3 dataset and clear any incompatible `selectedLeagueId` and favorite-club selection. Do not silently retain a league from another country.

## Navigation

The Step 3 **Back** action returns to Step 2 with the current country still centered and selected. **Continue** advances to Step 4 after a valid league has been selected because Step 4 club options depend on `selectedLeagueId`.

## Pending Decisions

The authoritative competition and tier dataset, inclusion rules for cups or non-league competitions, badge asset source, league naming and localization, tier sort order, initial selection behavior, empty and error states, search copy, and persistence mechanism remain undefined. Do not infer that every country has the same number of tiers.
