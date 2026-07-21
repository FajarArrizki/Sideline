# Standing — All League (Step 2: Select Competition)

> **Context:** This screen uses **Gameplay global Type 1** defined in [global.md](../../../../../global.md) with the **My team** sub-navigation rail. This is the second of two steps. After selecting a competition, the screen shows standings. Do not show a step number, dots, boxes, counters, progress bar, or other visible step indicator.

## Purpose and Heading

Set the heading to **Select Competition**. The available options are competitions that belong to the continent selected in Step 1 — for example, "Liga Champion", "Liga Eropa", "Premier League", etc.

## Content Structure

Render the controls directly below the heading in this exact order:

```text
GameplayContentSlot
├── ContentHeading: "Select Competition"
├── CompetitionSelectionDropdown
└── CompetitionSelectionRail
```

`CompetitionSelectionDropdown` and `CompetitionSelectionRail` display the same continent-filtered competition dataset and share one `selectedCompetitionId`. Neither control owns a second local selection value.

## Competition Dropdown

Reuse the league-selection dropdown pattern adapted for competitions. The closed field displays the competition badge and official name with the global trailing chevron. Before selection, display **Select Competition**. Pressing it opens the searchable competition picker.

Each dropdown row contains the competition badge and official name. Selecting a competition immediately updates `selectedCompetitionId`, closes the sheet, and scrolls the matching badge in `CompetitionSelectionRail` into the exact viewport center.

## Centered Competition Rail

`CompetitionSelectionRail` uses the shared `CenteredSnapSelectionRail` with competition badges. It is full-bleed below the dropdown and uses the global `FullBleed` layout.

Every badge must be able to stop exactly at the viewport center. When user-driven scrolling settles, automatically select the centered competition.

## Continent Dependency

Only competitions belonging to `selectedContinentId` from Step 1 may appear. If the user returns to Step 1 and changes the continent, rebuild the dataset and clear any incompatible `selectedCompetitionId`.

## Navigation

The **Back** button returns to Step 1 (Select Benua) with the current continent still selected. **Done** commits the selection and navigates to [Group Stage](Group stage/group stage.md).
