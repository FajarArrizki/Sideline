# Player Detail

> **Context:** This screen uses **Gameplay global Type 2** defined in [global.md](../../../global.md). It keeps the top header and floating bottom navigation, and uses a GameplaySecondaryHeader (back arrow + player name title). The content slot contains a player identity card, a local sub-navigation rail, and tabbed content. Below the tabbed content, two side-by-side action buttons are pinned above the bottom nav.

## Layout Type

**Type 2 — Back Arrow + Title.**

## Flow

```
Serch Player / Serch Staf / Wishlist / Scouting Report
  → tap row
  → Player Detail
      ├── Tanya Ketersediaan → Loan / Buy availability
      └── Approach → Approach to Buy / Approach to Loan
```

## Secondary Header

- **GameplayBackButton**: left-aligned back icon. Pops back to the source screen.
- **TitleText**: the player's name (e.g., **Kylian Mbappe**).

---

## 1. Player Identity Card

A card pinned at the top of the content slot.

```
┌──────────────────────────────────────┐
│                          [🇫🇷] (91)  │
│  ┌──────────────────────────────────┐│
│  │                                  ││
│  │          Player Face             ││
│  │          (border-radius 0)       ││
│  │                                  ││
│  ├──────────────────────────────────┤│
│  │ Kylian Mbappe                    ││
│  │ [badge] Paris Saint-Germain      ││
│  │                          [☆ Add] ││
│  └──────────────────────────────────┘│
└──────────────────────────────────────┘
```

| Element | Description |
|---|---|
| **Country Flag** | Top-left of the right group: player nationality flag. |
| **Rating Circle** | Top-right: player rating (0–99) inside a circle. |
| **Player Face** | Full-width, border-radius 0, zero gap to the text section below. |
| **Player Name** | Heading token, left-aligned. |
| **Club Badge + Name** | Caption token, left-aligned below the name. |
| **Add to Wishlist** | Star icon + "Add" button, right-aligned. Toggles wishlist state. Filled star = on wishlist. |

---

## 2. Local Sub-Navigation

A horizontal tab rail rendered inside the content slot, below the identity card. Reuses `GameplaySubNavigation` from [navigasi.md](../../../Comp/navigasi.md) with `variant: 'single'`.

### Tabs

| # | Tab | Content |
|---|---|---|
| 1 | **Basic** | Player basic info card |
| 2 | **Pace** | Acceleration, Sprint Speed |
| 3 | **Shooting** | Positioning, Finishing, Long Shots, Penalties, Shot Power, Volleys |
| 4 | **Passing** | Crossing, Curve, Free Kick Accuracy, Long Pass, Short Pass, Vision |
| 5 | **Dribbling** | Agility, Balance, Ball Control, Reactions, Composure |
| 6 | **Defending** | Heading Accuracy, Interceptions, Marking, Standing Tackle, Sliding Tackle |
| 7 | **Physical** | Aggression, Jumping, Stamina, Strength |

---

## 3. Tabbed Content

### Basic Tab

A `ContractDetailCard` showing general player information:

```
┌──────────────────────────────────┐
│  Basic Information               │
│  ────────────────────────────    │
│  Name          Kylian Mbappe     │
│  Current Club  Paris SG          │
│  Position      ST                │
│  Age           25                │
│  Height        178 cm            │
│  Weight        73 kg             │
│  Squad Number  7                 │
│  Nationality   France            │
│  Preferred Foot Right            │
│  Contract      Jun 2028          │
└──────────────────────────────────┘
```

### Attribute Tabs (Pace, Shooting, etc.)

Each tab renders one or more `ContractDetailCard` components. Each card shows a stat category with its sub-stats as key-value rows. Values are 0–99 ratings.

```
┌──────────────────────────────────┐
│  Pace                            │
│  ────────────────────────────    │
│  Acceleration          93        │
│  Sprint Speed          97        │
└──────────────────────────────────┘
```

#### Stat Breakdown

**Pace**
- Acceleration
- Sprint Speed

**Shooting**
- Positioning, Finishing, Long Shots, Penalties, Shot Power, Volleys

**Passing**
- Crossing, Curve, Free Kick Accuracy, Long Pass, Short Pass, Vision

**Dribbling**
- Agility, Balance, Ball Control, Reactions, Composure

**Defending**
- Heading Accuracy, Interceptions, Marking, Standing Tackle, Sliding Tackle

**Physical**
- Aggression, Jumping, Stamina, Strength

Each stat value is a number 0–99 with an optional visual bar. The user's eyes should be drawn to high values (90+) via a subtle highlight.

---

## 4. Action Buttons

Two side-by-side buttons pinned at the bottom of the content slot, above the floating bottom navigation. Same pattern as the Accept/Reject button group in [contract detail.md](../../Portal/My%20career/My%20contract/Contract%20offer/contract%20detail.md).

```
┌──────────────────────┬──────────────────────┐
│  Tanya Ketersediaan  │     Approach         │
│          ▾           │          ▾           │
└──────────────────────┴──────────────────────┘
```

### Tanya Ketersediaan (Ask Availability)

- **Style**: Secondary button token.
- **Behavior**: Opens a dropdown. Selecting an option sends the inquiry immediately — no overlay, no confirmation.

| Option | Action |
|---|---|
| **Loan Availability** | Sends inquiry about loan terms. Response comes via inbox. |
| **Buy Availability** | Sends inquiry about transfer fee and contract demands. Response via inbox. |

### Approach

- **Style**: Primary button token.
- **Behavior**: Opens a dropdown. **Approach to Buy** opens a negotiation overlay; **Approach to Loan** opens a loan overlay (pending).

| Option | Action |
|---|---|
| **Approach to Buy** | Opens the Transfer Offer overlay (see below). |
| **Approach to Loan** | Opens the Loan Offer overlay (see below). |

---

## 5. Transfer Offer Overlay

A bottom sheet that slides up when **Approach to Buy** is selected.

```
┌──────────────────────────────────────┐
│  Transfer Offer                  ✕   │
│  ────────────────────────────────    │
│                                      │
│  Transfer Fee                        │
│  ┌──────────────────────────────┐    │
│  │ $                             │    │
│  └──────────────────────────────┘    │
│                                      │
│  Player Exchange                     │
│  ┌──────────────────────────────┐    │
│  │ ( + )  Add player        ▾  │    │
│  └──────────────────────────────┘    │
│                                      │
│  Sell-On Percentage                  │
│  ┌──────────────────────────────┐    │
│  │ 10 %                          │    │
│  └──────────────────────────────┘    │
│                                      │
│  Installments                        │
│  ┌──────────┐ ┌──────────┐ ┌──────┐ │
│  │ Upfront  │ │ Per Year │ │ 3    │ │
│  │ $30M     │ │ $10M     │ │ yrs ▾│ │
│  └──────────┘ └──────────┘ └──────┘ │
│                                      │
│  Pay later: Today pay €30M.          │
│  Remaining €30M over 3 years         │
│  (€10M per year).                    │
│                                      │
│  [Cancel]               [Send]       │
└──────────────────────────────────────┘
```

### Overlay Fields

| Field | Type | Description |
|---|---|---|
| **Transfer Fee** | Currency input | Total transfer fee offered. |
| **Player Exchange** | Dropdown | Opens squad selection (same + pattern as [Pinalties](../../Tactic/Tactic/Set%20Pieces/Pinalties/pinalties.md)). Tap + to add a player from the squad as part of the exchange. Multiple players can be added. |
| **Sell-On Percentage** | Input/Stepper | Percentage of future sale going to the selling club. Default 0%, max 50%. |
| **Installments — Upfront** | Currency input | Amount paid immediately. |
| **Installments — Per Year** | Currency input | Amount paid each year of the installment period. |
| **Installments — Duration** | Dropdown | 1 season, 1.5 seasons (mid-season), 2 seasons, 3 seasons, 4 seasons. |
| **Pay Later Summary** | Read-only text | Auto-computed: "Today pay €X. Remaining €Y over Z years (€W per year)." |

### Flow After Send

1. Send → selling club reviews offer.
2. Club accepts → player notified.
3. Player agrees personal terms via **Contract Negotiation** overlay (same as [Free Agent Sign Overlay](#7-free-agent-variant)).
4. Both sides sign → transfer complete.

The Contract Negotiation overlay reuses the exact same fields as the Free Agent overlay: Squad Role, Contract Length, Weekly Wage, Signing Bonus, Agent Fee, Release Clause, Performance Bonuses, Recommendation, and Done button.
---

## 6. Loan Offer Overlay

A bottom sheet that slides up when **Approach to Loan** is selected.

```
┌──────────────────────────────────────┐
│  Loan Offer                      ✕   │
│  ────────────────────────────────    │
│                                      │
│  Loan Duration                       │
│  ┌──────────────────────────────┐    │
│  │ 6 months                  ▾  │    │
│  └──────────────────────────────┘    │
│                                      │
│  Loan Fee                            │
│  ┌──────────────────────────────┐    │
│  │ $                             │    │
│  └──────────────────────────────┘    │
│                                      │
│  Wage Contribution                   │
│  ┌──────────┐       ┌──────────┐     │
│  │ Min 50%  │       │ Max 100% │     │
│  └──────────┘       └──────────┘     │
│                                      │
│  Recall Clause          [Active ✓]   │
│                                      │
│  Obligation to Buy       [Active ✓]  │
│  ────────────────────────────────    │
│  Transfer Fee                        │
│  ┌──────────────────────────────┐    │
│  │ $45,000,000                  │    │
│  └──────────────────────────────┘    │
│                                      │
│  Player Exchange                     │
│  ┌──────────────────────────────┐    │
│  │ ( + )  Add player        ▾  │    │
│  └──────────────────────────────┘    │
│                                      │
│  Sell-On Percentage                  │
│  ┌──────────────────────────────┐    │
│  │ 10 %                          │    │
│  └──────────────────────────────┘    │
│                                      │
│  Installments                        │
│  ┌──────────┐ ┌──────────┐ ┌──────┐ │
│  │ Upfront  │ │ Per Year │ │ 3    │ │
│  │ $15M     │ │ $10M     │ │ yrs ▾│ │
│  └──────────┘ └──────────┘ └──────┘ │
│                                      │
│  Clauses                             │
│  ┌──────────────────────────────┐    │
│  │ Must score ▾  [15] goals  ✕  │    │
│  └──────────────────────────────┘    │
│  ┌──────────────────────────────┐    │
│  │ Must play  ▾  [25] match  ✕  │    │
│  └──────────────────────────────┘    │
│                            [ + Add]  │
│                                      │
│  Recommendation                      │
│  ┌──────────────────────────────┐    │
│  │ Highly recommended. Excellent │    │
│  │ potential, fits our system.  │    │
│  └──────────────────────────────┘    │
│                                      │
│  [Cancel]               [Done]       │
└──────────────────────────────────────┘
```

### Overlay Fields

| Field | Type | Description |
|---|---|---|
| **Loan Duration** | Dropdown | Duration in months: 3, 6, 12, 18, 24. |
| **Loan Fee** | Currency input | One-time fee paid to the parent club for the loan. |
| **Wage Contribution** | Range / Two inputs | Min % and Max % of the player's wages the loaning club covers. |
| **Recall Clause** | Toggle | If active, parent club can recall the player mid-loan. Default: active. |
| **Obligation to Buy** | Toggle | When active, reveals the buy terms section below (same inputs as Transfer Offer). |

### Obligation to Buy Section (visible when toggle is active)

| Field | Type | Description |
|---|---|---|
| **Transfer Fee** | Currency input | Transfer fee for the mandatory purchase. |
| **Player Exchange** | Dropdown | Squad player selection (+ pattern from Pinalties). |
| **Sell-On Percentage** | Input/Stepper | Percentage of future sale. Default 0%, max 50%. |
| **Installments — Upfront** | Currency input | Amount paid immediately. |
| **Installments — Per Year** | Currency input | Amount paid each year. |
| **Installments — Duration** | Dropdown | 1, 1.5, 2, 3, 4 seasons. |
| **Clauses** | Dynamic list | Condition dropdown + value + ✕. [+] button adds a clause. |

### Clause Conditions

| Condition | Type | Description |
|---|---|---|
| **Must score** | Numeric | Target goals. |
| **Must play** | Numeric | Target matches played. |
| **Must assist** | Numeric | Target assists. |
| **Club avoids relegation** | Boolean | No value input needed. |
| **Club qualifies for UCL** | Boolean | No value input needed. |
| **Club wins trophy** | Boolean | Dropdown to select which trophy. |

### Recommendation

| Field | Type | Description |
|---|---|---|
| **Recommendation** | Text area | Manager's recommendation notes (scouting, fit, potential). Max 500 chars. |

### Done Behavior

- Done submits the loan offer with all terms to the parent club.
- Response comes via inbox (pending system).
- Cancel discards and closes the overlay.
## 7. Free Agent Variant

When the player is a free agent (no current club), the flow changes. The identity card shows **Free Agent** instead of a club name. The approach buttons are replaced by a single **Approach to Sign** button.

### Action Button

```
┌──────────────────────────────────────┐
│         Approach to Sign             │
└──────────────────────────────────────┘
```

- Single primary button spanning full width.
- Tapping opens the **Sign Free Agent** overlay.

### Sign Free Agent Overlay

```
┌──────────────────────────────────────┐
│  Sign Free Agent                 ✕   │
│  ────────────────────────────────    │
│                                      │
│  Squad Role                          │
│  ┌──────────────────────────────┐    │
│  │ Important Player          ▾  │    │
│  └──────────────────────────────┘    │
│                                      │
│  Contract Length                     │
│  ┌──────────────────────────────┐    │
│  │ 3 years                   ▾  │    │
│  └──────────────────────────────┘    │
│                                      │
│  Weekly Wage                         │
│  ┌──────────────────────────────┐    │
│  │ $ 150,000                    │    │
│  └──────────────────────────────┘    │
│                                      │
│  Signing Bonus                       │
│  ┌──────────────────────────────┐    │
│  │ $ 2,000,000                  │    │
│  └──────────────────────────────┘    │
│                                      │
│  Agent Fee                           │
│  ┌──────────────────────────────┐    │
│  │ $ 500,000                    │    │
│  └──────────────────────────────┘    │
│                                      │
│  Release Clause                      │
│  ┌──────────────────────────────┐    │
│  │ $ 50,000,000                 │    │
│  └──────────────────────────────┘    │
│                                      │
│  Performance Bonuses                 │
│  ┌──────────────────────────────┐    │
│  │ Goal bonus  ▾ [$5,000] ✕  [+│    │
│  └──────────────────────────────┘    │
│                                      │
│  Recommendation                      │
│  ┌──────────────────────────────┐    │
│  │ Top free agent available.    │    │
│  │ Immediate starter material.  │    │
│  └──────────────────────────────┘    │
│                                      │
│  [Cancel]               [Done]       │
└──────────────────────────────────────┘
```

### Overlay Fields

| Field | Type | Description |
|---|---|---|
| **Squad Role** | Dropdown | Star Player, Important Player, Squad Player, Rotation, Backup, Youngster. |
| **Contract Length** | Dropdown | 1, 2, 3, 4, 5 years. |
| **Weekly Wage** | Currency input | Weekly wage offered. |
| **Signing Bonus** | Currency input | One-time bonus paid on signing. |
| **Agent Fee** | Currency input | Fee paid to the player's agent. |
| **Release Clause** | Currency input | Minimum fee for another club to trigger a buyout. Leave empty for none. |
| **Performance Bonuses** | Dynamic list | Bonus type dropdown + amount + ✕. [+] button adds a bonus. |

### Bonus Types

| Type | Description |
|---|---|
| **Goal bonus** | Per goal scored. |
| **Assist bonus** | Per assist. |
| **Clean sheet bonus** | Per clean sheet (GK/DEF). |
| **Appearance bonus** | Per match played. |
| **Team of the Year** | If selected in league TOTY. |
| **Player of the Month** | If awarded POTM. |
| **League win** | If club wins the league. |
| **Cup win** | If club wins a cup competition. |
| **UCL qualification** | If club qualifies for Champions League. |

### Done Behavior

- Done submits the contract offer to the free agent.
- Response comes via inbox (pending system).
- Cancel discards and closes the overlay.


## Data Requirements

```text
PlayerDetailData {
  id: string
  name: string
  face: ImageSource
  nationality: string
  nationalityFlag: ImageSource
  rating: number           // 0–99
  club: {
    name: string
    badge: ImageSource
  }
  wishlisted: boolean
  basic: BasicInfo
  attributes: PlayerAttributes
}

BasicInfo {
  position: string
  age: number
  height: number          // cm
  weight: number          // kg
  squadNumber: number
  preferredFoot: 'left' | 'right' | 'both'
  contractExpiry: string  // e.g., "Jun 2028"
}

PlayerAttributes {
  pace: {
    acceleration: number
    sprintSpeed: number
  }
  shooting: {
    positioning: number
    finishing: number
    longShots: number
    penalties: number
    shotPower: number
    volleys: number
  }
  passing: {
    crossing: number
    curve: number
    freeKickAccuracy: number
    longPass: number
    shortPass: number
    vision: number
  }
  dribbling: {
    agility: number
    balance: number
    ballControl: number
    reactions: number
    composure: number
  }
  defending: {
    headingAccuracy: number
    interceptions: number
    marking: number
    standingTackle: number
    slidingTackle: number
  }
  physical: {
    aggression: number
    jumping: number
    stamina: number
    strength: number
  }
}
```

## Reusable Components

- Shell: `GameplayScreen` Type 2 from [global.md](../../../global.md)
- Sub-navigation: `GameplaySubNavigation` from [navigasi.md](../../../Comp/navigasi.md) (local, single variant)
- Cards: `ContractDetailCard` shared with [contract detail.md](../../Portal/My%20career/My%20contract/Contract%20offer/contract%20detail.md)
- Action buttons: same config pattern as [contract detail.md](../../Portal/My%20career/My%20contract/Contract%20offer/contract%20detail.md)
- Menu index: [index.md](../../index.md)

## Acceptance Criteria

- Type 2 layout: back arrow + player name title.
- Player identity card shows face (br-0), country flag, rating circle, name, club badge+name, wishlist toggle.
- Local sub-navigation has 7 tabs: Basic, Pace, Shooting, Passing, Dribbling, Defending, Physical.
- Basic tab shows general info in a `ContractDetailCard`.
- Attribute tabs show stat breakdown cards with 0–99 values.
- Two action buttons pinned at the bottom: "Tanya Ketersediaan" and "Approach".
- Each button opens a configurable dropdown with availability/approach options.
- Wishlist toggle persists across sessions.
