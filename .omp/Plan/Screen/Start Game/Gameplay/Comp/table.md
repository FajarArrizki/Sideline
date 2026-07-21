# Gameplay Table Component

> **Note:** This document defines a reusable full-width, horizontally-scrollable table (rail table) for Gameplay screens. Specific table content, column definitions, row actions, and empty/error states are documented in the consuming screen plans; this file only defines the shared component contract, layout behavior, and styling primitives.

## Purpose

`GameplayTable` displays structured gameplay data in rows that extend horizontally beyond the viewport. The container always spans the full width of the screen from edge to edge, while the content scrolls horizontally behind a single shared vertical scrollbar. The first column may be pinned so row labels remain visible during horizontal scroll.

## Layout Behavior

- **Full-width container:** The table wrapper uses `width: 100%` and has **no horizontal padding or margin**. It touches the left and right physical screen edges.
- **Horizontal scroll content:** The scrollable content layer is wider than the viewport when the sum of column widths exceeds screen width. It scrolls horizontally with `horizontal={true}` on the scroll container and never wraps.
- **Vertical stacking:** Rows stack vertically with shared row-gap or divider tokens. Vertical scrolling of the whole table is handled by the parent screen scroll view; `GameplayTable` itself does not scroll vertically.
- **No visible vertical grid lines** unless a screen plan explicitly requests them.
- **Minimum row height** is enforced by shared touch-target and spacing tokens so every row is tappable and readable.

## Component Tree

```text
GameplayTable
├── TableHeaderRow (optional; sticky on horizontal scroll when implemented)
│   ├── HeaderCell × N
│   └── HeaderDivider
├── TableBody
│   ├── TableRow (rail)
│   │   ├── RowLeadingCell (optional pinned first column)
│   │   └── RowDataCells
│   │       ├── DataCell × N
│   │       └── CellDivider (optional)
│   └── RowDivider
└── HorizontalScrollIndicator (platform default; do not render custom scrollbar)
```

## Tokens

Use only shared tokens from `Plan/Color/color.md`, `Plan/Asset/icon.md`, `Plan/Animation/animation.md`, and the global spacing/typography system:

| Property | Token | Notes |
| --- | --- | --- |
| Container width | `100%` | Always full screen width, no horizontal inset |
| Container background | `surface/primary` or screen-defined surface | Do not hard-code colors |
| Row minimum height | `touch-target.md` | Ensures tappable rows |
| Row horizontal padding | `spacing.table.horizontal` or `spacing.md` | Applied inside each cell, not the container |
| Row gap / divider | `spacing.table.row-gap` or `hairline` divider token | Use one consistent separator strategy per screen |
| Cell text | `typography.body` | Numbers may use `typography.numeric` if defined |
| Header text | `typography.label` or `typography.caption-strong` | Must differ visually from body cells |
| Pinned column width | `table.pinned-column-width` | Fixed width for row-leading labels |
| Data column minimum width | `table.column-min-width` | Prevents columns from crushing content |

If a token does not exist yet, record it as pending in the consuming screen plan and fall back to the nearest semantic shared spacing value. Do not invent one-off numbers in the component.

## Scroll Behavior

- Enable horizontal scrolling only when total column width exceeds viewport width.
- Disable horizontal scroll bouncing on Android if the design system disables it globally; keep iOS momentum scroll.
- Synchronize horizontal scroll offsets between the header row and body rows so pinned columns stay aligned. If native synchronization is unreliable, keep the header row non-sticky and let it scroll with the body.
- Do not implement snap-to-column behavior unless a screen plan explicitly requests it.
- The horizontal scroll indicator must remain the platform default; do not render custom scroll thumbs, dots, or progress UI.

## Row (Rail)

- Each row is one horizontal flex container (`flexDirection: row`) with a fixed minimum height.
- Cells inside a row align to a shared baseline or vertical center, chosen consistently per screen.
- A row may be pressable if the screen plan defines a row action. When pressable, it uses the global pressable primitive and shows the shared press feedback; non-pressable rows remain static.
- Row dividers span the full scrollable width, not just the viewport width.

## Cells

- **HeaderCell:** Top-aligned or vertically centered, uses strong label typography, may include an optional sort indicator or info icon if defined by the consuming screen.
- **RowLeadingCell (pinned):** Leftmost cell, fixed width, contains the row label or primary identifier. It is visually separated from scrollable data cells by a subtle vertical divider or shadow when pinned behavior is active.
- **DataCell:** Flexible or fixed width depending on the column definition supplied by the screen plan. Supports text, number, icon, badge, or avatar content as configured by the consumer.
- **Cell padding:** Symmetric horizontal padding inside each cell; no padding on the table container edges.

## Empty and Loading States

- The table component does not own empty or loading UI. The parent screen renders `EmptyState`, `SkeletonTable`, or inline loading text above or below the table boundary.
- If the table receives zero rows, it renders nothing and lets the screen plan decide what appears in its place.

## Accessibility

- The table container exposes `accessibilityRole="grid"` when all rows and cells are focusable; otherwise use `accessibilityRole="list"` for a read-only table.
- Each row exposes `accessibilityRole="row"` and each cell `"cell"` or `"gridcell"`.
- Horizontal scroll must remain reachable with screen reader focus order; do not trap focus inside the scroll container.
- Provide an `accessibilityLabel` for the table describing its purpose (e.g., "League standings table") when the consuming screen supplies one.

## Responsiveness

- On narrow viewports, columns compress only down to their `table.column-min-width`; beyond that, horizontal scrolling activates.
- On wide viewports, columns may distribute extra space according to the column definition (`flex`, `fixed`, or `auto`). The container still spans full width.
- Font scaling and dynamic type must not break row alignment; clamp line count to one line per cell unless a screen plan explicitly allows wrapping.

## Reusable Implementation Boundary

Implement `GameplayTable` as a single shared component that accepts:

- `columns: ColumnDef[]` — width, alignment, header label, and optional pinned flag
- `rows: RowData[]` — array of cell values keyed by column id
- `onRowPress?: (row: RowData) => void` — optional row tap action
- `accessibilityLabel?: string`
- `showHeader?: boolean` — defaults to `true`
- `pinFirstColumn?: boolean` — defaults to `false`

Do not hard-code column widths, colors, fonts, or spacing inside the component. All visual values come from shared tokens passed through the design system or from the consuming screen plan.

## Acceptance Criteria

- The table container spans the full screen width with zero horizontal margin or padding.
- Rows scroll horizontally as a single rail when total column width exceeds the viewport.
- Header and body rows stay horizontally aligned during scroll.
- First column can be pinned without overlapping or truncating scrollable cells.
- All colors, typography, spacing, and press behavior come from shared tokens.
- No custom scroll indicators, progress bars, or step dots appear inside the table.
- The component is documented only as a reusable contract; screen-specific columns, data, and actions are defined in the consuming screen plans.
