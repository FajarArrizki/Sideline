> **Context:** This screen uses **Gameplay global Type 2** defined in [global.md](../../../../../global.md). It keeps the global top header (brand, coin/budget, more menu) and floating bottom navigation, but replaces the sub-navigation rail with a GameplaySecondaryHeader (back arrow + club title). Below that, it adds a screen-level action button group. The content slot contains a club identity card, a local sub-navigation rail, and tabbed detail content built from a configurable contract schema.

# Contract Detail

Detail screen for a single job offer selected from [Contract offer](contract offer.md). The manager explores the offering club's profile across multiple information tabs, reviews the contract terms, and decides to accept (directly or via negotiation) or reject.

## Layout Type

**Type 2 — Back Arrow + Title.**

## Flow

```
Contract offer
  → tap OfferCard
  → Contract detail
      ├── Reject → End (pop back)
      ├── Accept → immediate accept → pop back with result
      └── Accept → Negotiate → bottom overlay edit → submit counter-offer
```

## Secondary Header

- **GameplayBackButton**: left-aligned back icon. Pops back to `Contract offer`.
- **TitleText**: the offering club name (e.g., **Manchester United**).

## Action Button Group

Rendered directly below the secondary header, before the content slot. Two side-by-side buttons spanning full width minus the screen gutter. Each button uses the shared primary/secondary button tokens.

### Reject Button

- **Position**: left side.
- **Label**: **Reject**.
- **Style**: secondary button token (`color.button.secondary.background`, secondary border, secondary text).
- **Behavior**: tapping opens a dropdown anchored near the button.

#### Reject Dropdown

A configurable dropdown with a default option:

| Option | Action |
|---|---|
| End | Immediately rejects the offer, closes the dropdown, and pops back to `Contract offer`. |

The dropdown option list comes from a shared `contractActionConfig` configuration object. Do not hard-code the label or action.

### Accept Button

- **Position**: right side.
- **Label**: **Accept**.
- **Style**: primary button token (`color.button.primary.background`, primary border, primary text).
- **Behavior**: tapping opens a dropdown anchored near the button.

#### Accept Dropdown

A configurable dropdown with default options:

| Option | Action |
|---|---|
| Negotiate | Opens a bottom overlay (`NegotiateOfferSheet`) where the manager edits contract terms. |
| Accept | Immediately accepts the offer as-is, closes the dropdown, and pops back to `Contract offer` with the accepted offer data. |

### Config Contract

```text
contractActionConfig {
  acceptOptions: ActionOption[]   // default: [{ id: 'negotiate', label: 'Negotiate' }, { id: 'accept', label: 'Accept' }]
  rejectOptions: ActionOption[]   // default: [{ id: 'end', label: 'End' }]
}

ActionOption {
  id: string
  label: string
  onSelect: (offerId: string) => void
}
```

Consumers of the dropdown pass the config when building the button group. The config is editable per screen and per build.

### Negotiate Offer Sheet

When **Negotiate** is selected from the Accept dropdown, a bottom overlay slides up (`NegotiateOfferSheet`). It contains editable versions of the contract offer fields (see Contract Offer Cards section below). The manager modifies values and submits the counter-offer. The resulting navigation and state update are pending a negotiation system plan.

## Content Slot

The content slot begins below the action button group and scrolls vertically. It has three sections:

1. **Club Identity Card**
2. **Local Sub-Navigation**
3. **Tabbed Detail Content**

## 1. Club Identity Card

A horizontal card pinned at the top of the content scroll.

```
┌──────────────────────────────────┐
│  ┌───────┐  │  ┌───────┐         │
│  │League │  │  │ Club  │         │
│  │ Logo  │  │  │ Badge │         │
│  └───────┘  │  └───────┘         │
│                                    │
│       Manchester United            │
│         Premier League             │
└──────────────────────────────────┘
```

- **League Logo + Divider + Club Badge**: centered group using the same pattern as `OfferCard` in [bento.md](../../../../../Comp/bento.md).
- **Club Name**: heading token, centered.
- **League Name**: caption token, centered, below the club name.
- The card uses `color.surface.card`, `radius.card`, and `shadow.card` tokens.

## 2. Local Sub-Navigation

A horizontal tab rail rendered inside the content slot, directly below the club identity card. It reuses `GameplaySubNavigation` from [navigasi.md](../../../../../Comp/navigasi.md) with `variant: 'single'` for every tab.

**Tabs:**

1. Club Information
2. Current Performance
3. Financial Information
4. Squad Information
5. Facilities
6. Club Vision

> **Note:** Board Expectations is deliberately excluded from the offer review. It belongs to the accepted-contract phase, not the offer-evaluation phase.

The active tab drives which section of the tabbed content is visible below. Tab switching must preserve scroll position or reset to the top based on the screen plan.

## 3. Tabbed Detail Content

Below the local sub-navigation, the content for the active tab renders. Each tab renders a vertical stack of **ContractDetailCard** components driven by a configurable schema.

### ContractDetailCard

A rounded card (`color.surface.card`, `radius.card`) that displays a labeled group of key-value pairs.

```
┌──────────────────────────────────┐
│  Club                            │
│  ────────────────────────────    │
│  Club          Manchester Utd    │
│  Country       England           │
│  League        Premier League    │
│  Reputation    4.5 ★             │
│  Founded       1878              │
│  Stadium       Old Trafford      │
│  Capacity      74,310            │
└──────────────────────────────────┘
```

**Structure:**
- **Card title**: left-aligned small heading (e.g., "Club").
- **Divider**: full-width, one-pixel, below the title.
- **Row list**: stacked key-value rows below the divider.
  - **Label**: left-aligned, body-color token.
  - **Value**: right-aligned, body-color token. Uses the shared number formatter for numeric values.

**Data Shape:**

```text
DetailCard {
  title: string                // card-level heading
  rows: DetailRow[]
}

DetailRow {
  label: string                // e.g., "Country", "Salary"
  value: string                // formatted display value
  key: string                  // data key for the config lookup
  format?: 'text' | 'currency' | 'number' | 'rating'
}
```

### Configurable Schema

The field list for each tab comes from a config object, not hard-coded per screen. The attachment `local://attachment-1` defines the default fields per tab:

```
clubConfig {
  'Club Information':     ['Club', 'Country', 'League', 'Reputation', 'Founded', 'Stadium', 'Capacity']
  'Current Performance':  ['League Position', 'Recent Form', 'Season Record', 'Current Ranking', 'Club Momentum']
  'Financial Information': ['Financial Health', 'Club Balance', 'Transfer Budget', 'Wage Budget', 'Current Wage Usage', 'Revenue', 'Expenses', 'Net Profit', 'Debt']
  'Squad Information':    ['Squad Rating', 'Squad Depth', 'Average Age', 'Average Potential', 'Best Player', 'Captain', 'Top Scorer', 'Key Players']
  'Facilities':           ['Training Facilities', 'Youth Facilities', 'Youth Recruitment', 'Scouting Network', 'Medical Facilities', 'Stadium Quality']
  'Club Vision':          ['Playing Style', 'Transfer Policy', 'Youth Policy', 'Financial Policy', 'Recruitment Focus', 'Long-Term Vision']
}
```

These schemas are grouped into cards. A tab may produce one or multiple `DetailCard` components depending on how the schema is organized (for example, **Financial Information** might be split into **Financial Health** and **Budget** cards).

### Contract Offer Cards Section

Below or alongside the tabbed detail, a dedicated **Contract Offer** section renders. It uses the same `ContractDetailCard` component with fields from the contract offer schema:

```
Contract Offer Schema:
  - Length
  - Salary
  - Signing Bonus
  - Performance Bonus
  - Trophy Bonus
  - Release Clause
  - Start Date
  - Contract Status
```

These cards are always visible (not hidden by tab selection). They stay below the tabbed content or in a fixed area, depending on scroll behavior defined during implementation.

## Data Requirements

```text
ContractDetailData {
  offerId: string
  club: {
    name: string
    badge: ImageSource
  }
  league: {
    name: string
    logo: ImageSource
  }
  details: Record<TabName, Record<string, string | number>>
  contractOffer: {
    length: string
    salary: string
    signingBonus: string
    performanceBonus: string
    trophyBonus: string
    releaseClause: string
    startDate: string
    status: string
  }
}

TabName = 'Club Information' | 'Current Performance' | 'Financial Information'
         | 'Squad Information' | 'Facilities' | 'Club Vision'
```

## Reusable Components

- Shell / chrome: `GameplayScreen` Type 2 from [global.md](../../../../../global.md)
- Secondary header: `GameplaySecondaryHeader` with `GameplayBackButton`
- Sub-navigation: `GameplaySubNavigation` from [navigasi.md](../../../../../Comp/navigasi.md) (local, single variant)
- Club identity card: reuses `OfferCard` center-group pattern from [bento.md](../../../../../Comp/bento.md)
- Detail cards: `ContractDetailCard` (new reusable component derived from `BentoCard`)
- Menu index: [index.md](../../../index.md)

## Acceptance Criteria

- The screen uses global Type 2: back arrow + club title, no global sub-navigation.
- The Reject and Accept buttons sit side-by-side below the secondary header.
- Tapping Reject opens a dropdown; the default option **End** rejects and pops back.
- Tapping Accept opens a dropdown; **Negotiate** opens the `NegotiateOfferSheet` overlay; **Accept** confirms immediately.
- The club identity card shows league logo + divider + club badge, club name, and league name centered.
- The local sub-navigation has 6 tabs: Club Information, Current Performance, Financial Information, Squad Information, Facilities, Club Vision (no Board Expectations).
- Each tab renders stacked `ContractDetailCard` components driven by the configurable schema.
- The contract offer card section is always visible with Length, Salary, Signing Bonus, Performance Bonus, Trophy Bonus, Release Clause, Start Date, and Contract Status.
- All field labels, card groupings, and dropdown options are configurable; no hard-coded values.
- The global top header, coin/budget cards, more menu, and floating bottom navigation remain unchanged.
