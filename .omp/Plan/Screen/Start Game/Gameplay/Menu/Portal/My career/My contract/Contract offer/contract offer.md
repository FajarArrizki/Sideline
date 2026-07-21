> **Context:** This screen lives inside the `GameplayScreen` shell defined in [global.md](../../../../../global.md). It does not recreate the top header, bottom navigation, sub-navigation rail, safe-area handling, brand lockup, coin/budget cards, or the time-advance action button.

# Contract Offer

Screen for incoming job offers from other clubs. The manager can review every offer and tap one to open the offer detail.
## Layout Type

**Type 1 — Sub-Navigation Rail.** The Portal sub-navigation remains above this screen.

## Screen Header

- **Position:** left-aligned, at the top of the content slot.
- **Text:** **Club offer**
- **Typography:** screen-header token (`font.weight.active`, largest content heading size).
- **Spacing:** `spacing.stack.large` below the header before the offer grid begins.

## Offer List

The offers are rendered as a **bento grid** using the reusable `BentoGrid` and `OfferCard` components documented in [bento.md](../../../../../Comp/bento.md).

### Layout

- Use `BentoGrid` with `maxColumns={2}`.
- Cards loop left-to-right, top-to-bottom.
- If there is an odd number of offers, the last card occupies the left column; do not stretch it across both columns.

### Card Content (`OfferCard`)

Each card is a pressable rounded surface that shows one offer:

1. **Center group** — horizontally centered, containing:
   - League logo
   - Vertical divider
   - Club badge
2. **Club name** — centered below the center group.
3. **Contract detail** — centered below the club name (e.g., "2 years • €45k/wk" or the relevant wage/duration summary).

### Card Interaction

- Tapping a card pushes the `Contract detail` screen for that offer.
- Press feedback uses the shared pressable primitive (opacity-only).
- Minimum touch target is enforced even if the visual card is smaller.

## Empty State

- If no offers exist, show a centered empty-state message: **No offers yet**.
- Use the body typography token and `color.text.secondary`.
- Do not render an empty grid.

## Loading State

- While offer data loads, render a skeleton bento grid with the same `maxColumns={2}` layout.
- Each skeleton card reserves the same dimensions as `OfferCard`.
- Do not block the chrome; only the content slot shows the skeleton.

## Error State

- If loading fails, show a centered error message and a retry action.
- The retry action uses the shared button primitive.
- Do not mutate the chrome.

## Data Requirements

Each offer item must provide:

```text
Offer {
  id: string
  club: {
    name: string
    badge: ImageSource
  }
  league: {
    logo: ImageSource
  }
  contract: {
    summary: string   // formatted detail line shown below the club name
  }
}
```

The exact contract fields behind `summary` (wage, duration, clauses, etc.) are defined in the `Contract detail` plan.

## Reusable Components

- Shell / chrome: `GameplayScreen` from [global.md](../../../../../global.md)
- Sub-navigation rail: `GameplaySubNavigation` from [navigasi.md](../../../../../Comp/navigasi.md)
- Grid and card: `BentoGrid` / `OfferCard` from [bento.md](../../../../../Comp/bento.md)
- Menu index: [index.md](../../../index.md)

## Acceptance Criteria

- The screen renders inside the Gameplay shell without duplicating chrome.
- The left-aligned header reads **Club offer**.
- Offers are displayed in a 2-column bento grid.
- Each card shows league logo + divider + club badge centered, followed by club name and contract detail centered below.
- Tapping a card navigates to the corresponding `Contract detail` screen.
- Empty, loading, and error states are handled without breaking the grid layout.
