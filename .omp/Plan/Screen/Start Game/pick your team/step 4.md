# Start Game Step 4 — Pick Your Team

> **Note:** This is the fourth and final internal Start Game setup step and uses the shared shell and synchronized selector contract in [global.md](global.md). Its selection UI remains identical to Favorite Team Step 4, but it selects the team for a new game rather than changing the user's persisted favorite club. Do not show a step number, dots, boxes, counters, progress bar, or other visible step indicator.

## Purpose and Heading

Set the `StepContent` heading to **Pick Your Team**. This step selects the club controlled in the new game from the league chosen in Step 3. It must not overwrite the favorite club stored by onboarding.

## Content Structure

Render the controls directly below the heading in this exact order:

```text
StepContent
├── ContentHeading: "Pick Your Team"
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

The Step 4 **Back** action returns to `StartGameLeagueSelectionStep` with the current league still centered and selected. The final **Done** action is enabled after a valid team has been selected. After the Start Game draft is ready for handoff, **Done** replaces the four-step setup stack with the planned `GameplayScreen`; platform Back must not reopen the completed pick-your-team flow. The `Gameplay` design remains intentionally empty and no gameplay UI or behavior is defined here.

## Pending Decisions

The authoritative club dataset, badge asset source and fallback, club naming and localization, club sort order, initial selection behavior, empty and error states, search copy, draft handoff contract, and exact `GameplayScreen` route remain undefined. The final action label and destination are fixed to **Done** and `GameplayScreen`. Do not introduce a default game team or overwrite the persisted favorite club without an explicit product rule.
