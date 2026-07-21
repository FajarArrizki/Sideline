# Bento Components

> **Note:** Reusable bento-style card and grid components for gameplay content surfaces. All values come from shared tokens; do not hard-code colors, spacing, corner radii, or shadows.

## BentoGrid

A responsive grid container that lays out child cards in a bento pattern. On portrait phone widths it defaults to a single column; when the available width permits, it expands to a configurable maximum column count with a fixed gap.

### Props

```text
BentoGridProps {
  children: ReactNode
  maxColumns?: number        // defaults to 2
  gap?: number               // defaults to spacing.bento.gap
  padding?: number           // defaults to spacing.screen.gutter
  accessibilityLabel?: string
}
```

### Layout Rules

- The grid spans the full width of its parent.
- Cards are placed left-to-right, top-to-bottom, filling rows before wrapping.
- `maxColumns` caps the column count; on narrow widths the grid collapses to fewer columns automatically.
- The grid gap is taken from `spacing.bento.gap` when not overridden.
- The outer horizontal padding matches the screen content gutter so the grid aligns with other screen content.

## BentoCard

A pressable rounded card used for summary items, offer lists, and other modular gameplay content. It exposes a vertical content slot and keeps internal spacing consistent.

### Props

```text
BentoCardProps {
  onPress?: () => void
  children: ReactNode
  disabled?: boolean
  accessibilityLabel?: string
  testID?: string
}
```

### Visual Treatment

- Background: `color.surface.card` (or `color.background.elevated` if no card token exists).
- Border radius: `radius.card`.
- Border: `color.border.card` with `borderWidth.card` when a card border token exists; otherwise no border.
- Shadow/elevation: `shadow.card` on iOS, `elevation.card` on Android.
- Minimum touch target: use the global minimum touch target size even when the visual card is smaller.
- Press feedback: reuse the shared pressable primitive (opacity-only visual state change).

### Internal Layout

The card uses vertical flex layout with centered alignment by default:

```text
BentoCard
├── CenterGroup (horizontal, centered)
│   ├── LeadingVisual
│   ├── Divider (vertical)
│   └── TrailingVisual
├── TitleText
└── DetailText
```

Consumers compose the visuals and text via explicit props or children. Do not hard-code image sizes; use `size.icon.league`, `size.icon.club`, or generic avatar tokens.

## OfferCard (BentoCard Variant)

A specialized `BentoCard` for club/contract offers. It follows the exact pattern requested by the Contract offer screen:

### Props

```text
OfferCardProps {
  leagueLogo: ImageSource
  clubBadge: ImageSource
  clubName: string
  contractDetail: string
  onPress?: () => void
  disabled?: boolean
  accessibilityLabel?: string
}
```

### Content Structure

1. **Center group** — horizontally centered group containing:
   - League logo on the left
   - Vertical divider
   - Club badge on the right
2. **Club name** — below the center group, centered, using the card-title typography token.
3. **Contract detail** — below the club name, centered, using the card-detail typography token (e.g., contract type, wage, or duration summary).

### Visual Details

- League logo and club badge share the same nominal size token (`size.avatar.club` or nearest generic avatar size).
- The vertical divider uses `color.border.divider` and a fixed height smaller than the image height.
- The group has a small internal gap matching `spacing.inline.tight`.
- Text rows are centered and stacked with `spacing.stack.tight` between them.
- The entire card is pressable and routes to the offer detail screen.

## Usage Example

```text
<BentoGrid maxColumns={2}>
  {offers.map(offer => (
    <OfferCard
      key={offer.id}
      leagueLogo={offer.league.logo}
      clubBadge={offer.club.badge}
      clubName={offer.club.name}
      contractDetail={offer.contract.summary}
      onPress={() => navigateToOfferDetail(offer.id)}
    />
  ))}
</BentoGrid>
```

## Acceptance Criteria

- `BentoGrid` respects `maxColumns` and collapses on narrow screens.
- `BentoCard` does not contain hard-coded colors, radii, spacing, or shadows.
- `OfferCard` renders league logo + divider + club badge centered, followed by club name and contract detail centered below.
- All pressable states use the shared pressable primitive and meet the minimum touch target.
- Empty, loading, and error states are handled by the consuming screen plan, not inside the card.
