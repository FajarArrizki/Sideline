# Step 4 — Pick Your Favorite Team

> **Note:** This is the fourth and final internal onboarding step and uses the shared shell and synchronized selector contract in [global.md](global.md). Do not show a step number, dots, boxes, counters, progress bar, or other visible step indicator.

## Purpose and Heading

Set the `StepContent` heading to **Pick Your Favorite Team**. This step selects the user's favorite club from the league chosen in Step 3. It is the club-selection step; Step 2 selects the club's country and Step 3 selects its league or division.

## Content Structure

Render the controls directly below the heading in this exact order:

```text
StepContent
├── ContentHeading: "Pick Your Favorite Team"
├── TeamSelectionDropdown
└── TeamSelectionRail
```

`TeamSelectionDropdown` and `TeamSelectionRail` display the same league-filtered club dataset and share one `selectedTeamId`. Neither control owns a second local selection value.

## Team Dropdown

Reuse the Step 1 country-dropdown component contract with club-specific typed data. The closed field displays the selected club badge and official club name with the global trailing chevron. Before selection, display **Select Team**. Pressing it opens the same searchable bottom-sheet structure, populated with club badges and club names for `selectedLeagueId`.

Selecting a club from the dropdown immediately updates `selectedTeamId`, closes the sheet, and scrolls the matching badge in `TeamSelectionRail` into the exact viewport center. Search, sticky-header, scroll-fade, safe-area, immediate-selection, and chevron behavior must come from the reusable picker rather than a Step 4 copy.

## Centered Team Rail

`TeamSelectionRail` uses the shared `CenteredSnapSelectionRail` with club badges. It is full-bleed below the dropdown, reaches both physical screen edges, remains unclipped by the normal content gutter, and uses the global `FullBleed` layout rather than relying on `overflow: visible` alone. Use a virtualized horizontal list because supported leagues may contain many clubs.

Every badge, including the first and last badge, must be able to stop exactly at the viewport center. Compute symmetric leading and trailing rail space from the measured viewport and item width. Snap one badge to the center. When user-driven scrolling settles, automatically select the centered club, update `selectedTeamId` once, and synchronize `TeamSelectionDropdown`; the user does not need to tap a badge.

Tapping a badge may remain as an accessible alternate interaction. Each badge must expose the official club name and selected state to accessibility services. Do not use badge artwork alone as the only programmatic label.

## League Dependency

Only clubs belonging to `selectedLeagueId` from Step 3 may appear. If the user returns to Step 3 and changes the league, rebuild the Step 4 dataset and clear any incompatible `selectedTeamId`. If the user changes the Step 2 country, both the league and team selections are invalidated before returning to this step.

## Navigation and Completion

The Step 4 **Back** action returns to Step 3 with the current league still centered and selected. The final **Continue** action is enabled after a valid favorite club has been selected. After the selection is persisted successfully, **Continue** replaces the onboarding stack with `HomeScreen`; platform Back must not reopen the completed onboarding flow.

## Pending Decisions

The authoritative club dataset, badge asset source and fallback, club naming and localization, club sort order, initial selection behavior, empty and error states, search copy, and persistence mechanism remain undefined. The final Continue destination is fixed to `HomeScreen`; only its exact route path remains pending. Do not introduce a default favorite club without an explicit product rule.
