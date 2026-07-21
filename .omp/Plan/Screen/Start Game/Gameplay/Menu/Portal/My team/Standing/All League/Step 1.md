# Standing — All League (Step 1: Select Benua)

> **Context:** This screen uses **Gameplay global Type 1** defined in [global.md](../../../../../global.md) with the **My team** sub-navigation rail. It is the first of two steps: first select a continent, then select a competition to view standings. Do not show a step number, dots, boxes, counters, progress bar, or other visible step indicator.

## Purpose and Heading

Set the heading to **Select Benua**. The selected continent determines which competitions are available in Step 2.

## Content Structure

Render the controls directly below the heading in this exact order:

```text
GameplayContentSlot
├── ContentHeading: "Select Benua"
├── ContinentSelectionDropdown
└── ContinentSelectionRail
```

`ContinentSelectionDropdown` and `ContinentSelectionRail` display the same continent dataset and share one `selectedContinentId`. Neither control owns a second local selection value.

## Continent Dropdown

Reuse the country-selection dropdown pattern adapted for continents. Its closed state displays a continent icon or label and the selected continent name with the global trailing chevron. Before selection, display **Select Benua**. Pressing it opens the searchable continent picker.

Each dropdown row contains the continent name. Selecting a continent immediately updates `selectedContinentId`, updates the closed field, and scrolls the matching item in `ContinentSelectionRail` into the exact viewport center.

## Centered Continent Rail

`ContinentSelectionRail` uses the shared `CenteredSnapSelectionRail`. Each item displays the continent name or icon. The rail is full-bleed below the dropdown. Use the global `FullBleed` layout.

Every item must be able to stop exactly at the viewport center. When user-driven scrolling stops, the centered continent is selected automatically; no tap is required.

## Navigation

The **Back** button returns to the previous screen. **Continue** advances to Step 2 (Select Competition) after a continent has been selected. Changing the continent clears any incompatible selected competition.

## Pending Decisions

The authoritative continent dataset, sort order, and persistence remain undefined.
