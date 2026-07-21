> **Context:** This screen uses **Gameplay global Type 2** defined in [global.md](../../../../../global.md). It keeps the global top header (brand, coin/budget, more menu) and floating bottom navigation, but replaces the sub-navigation rail with a GameplaySecondaryHeader (back arrow + club title). Below that, it adds a single resign button. The content slot contains a club identity card, a local sub-navigation rail, and tabbed detail content for the manager's **current club**.

# Contract Detail

View-only screen for the manager's current contract at their own club. Explores club profile tabs and contract terms. A single action button allows the manager to resign.

## Layout Type

**Type 2 — Back Arrow + Title.**

## Flow

```
My career → My contract → Contract detail
  → Mengundurkan diri → confirm → pop back (manager resigned)
```

## Secondary Header

- **GameplayBackButton**: left-aligned back icon. Pops back to the previous screen.
- **TitleText**: the manager's current club name (e.g., **Manchester United**).

## Action Button

A single full-width button below the secondary header, before the content slot.

### Mengundurkan diri (Resign)

- **Label**: **Mengundurkan diri**.
- **Style**: secondary/danger button token. Use `color.button.secondary.background` and `color.button.secondary.text`, or a dedicated `color.button.danger` token if one exists.
- **Behavior**: tapping opens a confirmation bottom sheet.

#### Resign Confirmation

A bottom sheet or alert dialog that confirms the manager's resignation. It contains:

- Title: **Mengundurkan diri?**
- Body: **Anda akan meninggalkan [club name] dan kehilangan jabatan sebagai manajer. Tindakan ini tidak dapat dibatalkan.**
- Actions:
  - **Batal** (Cancel) — dismisses the confirmation, no action.
  - **Mengundurkan diri** (Confirm Resign) — executes resignation, pops back to the previous screen, and clears the current club contract state.

The exact state-mutation side effects (clearing the contract, setting the manager as unemployed, triggering new offers) are pending a career-system plan.

The content slot begins below the action button and scrolls vertically. It has three sections:
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

> **Note:** Board Expectations is deliberately excluded. It belongs to the accepted-contract phase, not the current-contract viewing phase.

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

### Current Contract Cards Section

Below or alongside the tabbed detail, a dedicated **Current Contract** section renders. It uses the same `ContractDetailCard` component with fields from the current contract schema:

```
Current Contract Schema:
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
  contractId: string
  club: {
    name: string
    badge: ImageSource
  }
  league: {
    name: string
    logo: ImageSource
  }
  details: Record<TabName, Record<string, string | number>>
  currentContract: {
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
- A single **Mengundurkan diri** button sits below the secondary header.
- Tapping **Mengundurkan diri** opens a confirmation bottom sheet with **Batal** and **Mengundurkan diri** actions.
- Confirming resignation pops back and clears the current club contract state.
- The club identity card shows league logo + divider + club badge, club name, and league name centered.
- The local sub-navigation has 6 tabs: Club Information, Current Performance, Financial Information, Squad Information, Facilities, Club Vision (no Board Expectations).
- Each tab renders stacked `ContractDetailCard` components driven by the configurable schema.
- The current contract card section is always visible with Length, Salary, Signing Bonus, Performance Bonus, Trophy Bonus, Release Clause, Start Date, and Contract Status.
- All field labels and card groupings are configurable; no hard-coded values.
- The global top header, coin/budget cards, more menu, and floating bottom navigation remain unchanged.
