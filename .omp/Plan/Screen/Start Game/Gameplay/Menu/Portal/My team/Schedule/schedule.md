# Schedule (Select Competition)

> **Context:** This screen uses **Gameplay global Type 1** defined in [global.md](../../../../global.md) with the **My team** sub-navigation rail. One step: select a competition the manager's team is participating in, then view the match schedule. Do not show a step number or other visible step indicator.

## Purpose and Heading

Set the heading to **Select Competition**. The available options are limited to competitions the manager's current club is participating in.

## Content Structure

```text
GameplayContentSlot
├── ContentHeading: "Select Competition"
├── CompetitionSelectionDropdown
└── CompetitionSelectionRail
```

`CompetitionSelectionDropdown` and `CompetitionSelectionRail` display the same filtered competition dataset and share `selectedCompetitionId`.

## Competition Dropdown

The closed field displays the competition badge and name with the global trailing chevron. Before selection, display **Select Competition**. The list is pre-filtered to only show competitions the user's team is in.

## Centered Competition Rail

`CompetitionSelectionRail` uses the shared `CenteredSnapSelectionRail` with competition badges. Full-bleed below the dropdown, auto-select on snap.

## Navigation

The **Back** button returns to the previous screen. **Done** commits the selection and navigates to [Schedule List](Schedule%20list/schedule%20list.md).
