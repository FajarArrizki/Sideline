# Standing — My League (Select Competition)

> **Context:** This screen uses **Gameplay global Type 1** defined in [global.md](../../../../../global.md) with the **My team** sub-navigation rail. Only one step: select a competition the manager's team is participating in, then view standings. Do not show a step number or other visible step indicator.

## Purpose and Heading

Set the heading to **Select Competition**. The available options are limited to competitions the manager's current club is participating in — for example, the league and cup competitions the team is entered in this season.

## Content Structure

```text
GameplayContentSlot
├── ContentHeading: "Select Competition"
├── CompetitionSelectionDropdown
└── CompetitionSelectionRail
```

`CompetitionSelectionDropdown` and `CompetitionSelectionRail` display the same filtered competition dataset and share `selectedCompetitionId`.

## Competition Dropdown

Reuse the competition-selection pattern. The closed field displays the competition badge and name with the global trailing chevron. Before selection, display **Select Competition**. The list is pre-filtered to only show competitions the user's team is in — no continent/country step is needed.

## Centered Competition Rail

`CompetitionSelectionRail` uses the shared `CenteredSnapSelectionRail` with competition badges. Full-bleed below the dropdown, auto-select on snap.

## Navigation

The **Back** button returns to the previous screen. **Done** commits the selection and navigates to [Group Stage](../All%20League/Group%20stage/group%20stage.md). The group stage and knockout stage screens are identical to All League — they are shared, not duplicated per My League.
