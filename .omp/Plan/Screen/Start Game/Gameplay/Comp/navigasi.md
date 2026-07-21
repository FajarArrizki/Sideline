# Gameplay Sub-Navigation Component

> **Note:** This document defines a reusable horizontal text-tab sub-navigation for Gameplay screens. Specific tab labels, default selection, and per-tab screen content are documented in the consuming screen plans; this file only defines the shared component contract, layout behavior, and styling primitives.

## Purpose

`GameplaySubNavigation` sits below the main screen header and lets the user switch between related sections inside one Gameplay screen (for example: Overview, Standings, Schedule, Squad). It renders as a single horizontal row of text labels that scrolls when the total tab width exceeds the viewport. Active and inactive states are communicated through color and/or opacity using shared tokens.

## Layout Behavior

- **Full-width container:** The navigation wrapper uses `width: 100%` and has **no horizontal padding**. It spans from the left physical screen edge to the right physical screen edge.
- **Horizontal scroll rail:** Tab items are laid out left-to-right in one continuous row. The row scrolls horizontally with momentum when the combined tab widths exceed the viewport width. Content never wraps to a second line.
- **No snap-to-tab:** Tabs do not snap to the center or nearest item. The user stops the scroll naturally.
- **Left-aligned first tab:** The first tab starts at the left screen edge. The last tab can be scrolled fully into view so it reaches the right screen edge.
- **No visible scroll indicator:** The platform default horizontal scroll indicator is acceptable; do not render custom scroll thumbs, dots, or progress UI.
- **Fixed height:** The component has a fixed minimum height from shared touch-target/spacing tokens so the header area remains stable across screens.

## Component Tree

```text
GameplaySubNavigation
├── ScrollRail (horizontal)
│   └── TabItem × N
│       ├── TabLabel
│       ├── TabArrowIcon (dropdown variant only)
│       └── ActiveIndicator (optional underline/pill)
├── DropdownMenu (rendered when a dropdown tab is active)
│   └── DropdownOption × N
└── BottomDivider (optional hairline)
```

## Tab Variants

Each tab is one of two variants. The consuming screen plan declares the variant per tab.

### Single Tab

- Renders only the tab label text.
- No trailing icon.
- Pressing the tab switches to that section.
- Example: **Overview** inside a management screen.

### Dropdown Tab

- Renders the tab label text followed by a trailing arrow icon from the global icon registry.
- Pressing the tab does **not** switch to a section; it opens a dropdown menu or bottom sheet containing the tab's child options.
- The selected dropdown option may replace the tab's displayed label or simply mark the active option, depending on the screen plan.
- Example: **Scouting Center** inside a management screen, which opens a dropdown of scouting sub-destinations.
- A dropdown tab can also carry an active state if one of its child options is currently selected, visualized through the same active label color and indicator as a single tab.

### Dropdown Option vs Expandable Group

A dropdown menu may contain two kinds of items:

- **DropdownOption** — a leaf item. Pressing it triggers `onPress` and closes the dropdown.
- **DropdownGroup** — an expandable group header. Pressing it does **not** trigger navigation; it toggles the group's expanded state and reveals its child options. The group itself is not a selectable destination.

Example: inside the **Tactic** dropdown, **Set Pieces** is a group that expands to show **Corner**, **Freekick**, **Pinalties**, **Set Pieces Taker**, and **Trow in**.

## Tab Definition

Each tab object now includes a `variant` field:

```text
TabDef {
  id: string
  label: string
  variant: 'single' | 'dropdown'
  options?: DropdownItem[]    // required when variant === 'dropdown'
  activeOptionId?: string     // optional; identifies the currently selected dropdown option
  accessibilityLabel?: string
}

DropdownItem = DropdownOption | DropdownGroup

DropdownOption {
  id: string
  label: string
  onPress?: () => void
  accessibilityLabel?: string
}

DropdownGroup {
  id: string
  label: string
  expanded?: boolean
  children: DropdownOption[]
  onToggle?: () => void
  accessibilityLabel?: string
}
```

Do not hard-code any tab variant, label, arrow icon, dropdown option, or group label inside the component.

## Tokens

Use only shared tokens from `Plan/Color/color.md`, `Plan/Asset/icon.md`, `Plan/Animation/animation.md`, and the global spacing/typography system:

| Property | Token | Notes |
| --- | --- | --- |
| Container width | `100%` | Full screen width, no horizontal inset |
| Container background | `surface/primary` or screen-defined surface | Do not hard-code colors |
| Component height | `touch-target.lg` or `sub-navigation.height` | Fixed minimum height |
| Tab horizontal padding | `spacing.subnav.horizontal` or `spacing.md` | Space inside each tab touch target |
| Tab label typography | `typography.label` or `typography.body` | Use one style consistently per screen |
| Active label color | `text/primary` or `brand/primary` | High-emphasis active state |
| Inactive label color | `text/muted` or `text/secondary` | Lower-emphasis default state |
| Active opacity | `1` | Fully opaque active label |
| Inactive opacity | `opacity.text-muted` or `0.6` | Use either a muted color or reduced opacity, not both at full strength |
| Active indicator color | `brand/primary` or `border/brand` | Underline or pill behind active tab |
| Active indicator height | `hairline` or `spacing.xs` | Thin underline or small pill height |
| Divider color | `border/subtle` | Optional bottom separator |
| Press feedback | `pressable.feedback` | Use the global pressable primitive |

If a token does not exist yet, record it as pending in the consuming screen plan and fall back to the nearest semantic shared value. Do not invent one-off numbers or colors in the component.

## Tab States

### Single Tab State

- **Active single tab:**
  - Label uses the active text color at full opacity.
  - Optional indicator appears below or behind the label (underline, dot, or pill) using the active indicator token.
  - The tab is not pressable while active.
- **Inactive single tab:**
  - Label uses the inactive text color or the active text color at reduced opacity.
  - No indicator.
  - Pressing the tab switches to that section.

### Dropdown Tab State

- **Active dropdown tab:**
  - Label and arrow icon use the active text color at full opacity.
  - Optional indicator appears below or behind the label using the active indicator token.
  - The tab remains pressable because it opens the dropdown rather than switching to a section.
- **Inactive dropdown tab:**
  - Label and arrow icon use the inactive text color or the active text color at reduced opacity.
  - No indicator.
  - Pressing the tab opens the dropdown.

### Dropdown Group State

- A group header is styled like a dropdown option but with a trailing expand/collapse arrow icon.
- Pressing the group toggles `expanded` and calls `onToggle`.
- Child options are indented or visually grouped under the header when expanded.
- Selecting a child option closes the dropdown and triggers the option's `onPress`.

Choose **one** inactive treatment per screen: either a muted color token **or** reduced opacity of the active color. Do not combine both at full strength because it creates inconsistent visual weight.

## Dropdown Behavior

- The dropdown is a surface rendered by the consuming screen plan (for example, a bottom sheet, a menu, or a modal) and triggered by the component through an `onDropdownOpen` callback.
- The component does not own the dropdown options, group state, selection state, or resulting navigation.
- The tab arrow icon rotates or flips only if the design system defines a directional animation token; do not add custom rotation animations.
- Group expand/collapse may use a shared animation token for height or opacity; do not add custom spring or bounce animations.
- Selecting a dropdown option (leaf) must close the dropdown and call the option's `onPress` handler.
- Toggling a group must not close the dropdown; it only reveals or hides the group's children.
- If a dropdown option is selected, the tab may display the selected option label instead of the original tab label only when the screen plan explicitly requests it.

## Scroll and Active-Tab Visibility

- When the active tab is set programmatically (for example, on first load or after an external state change), scroll it into view if it lies outside the current viewport.
- Do not auto-center the active tab unless the consuming screen plan explicitly requests it; bringing the active tab fully into view is enough.
- Preserve the user's manual scroll offset when switching tabs or opening/closing dropdowns so the navigation does not jump unexpectedly.

## Accessibility

- The sub-navigation container exposes `accessibilityRole="tablist"`.
- Each tab exposes `accessibilityRole="tab"` and `accessibilityState={{ selected: boolean }}`.
- Provide an `accessibilityLabel` that matches the visible label or a more descriptive action when the screen plan supplies one.
- Ensure each tab touch target meets the global minimum touch target even if the visible text is smaller.

## Animation

- Keep animations restrained and native:
  - Active indicator position may animate with a shared duration token (e.g., `duration.fast` or `duration.normal`).
  - Label color/opacity transitions use the shared color/opacity transition token.
- Do not add scale transforms, bounces, or custom page-transition animations to tabs.

## Reusable Implementation Boundary

Implement `GameplaySubNavigation` as a single shared component that accepts:

- `tabs: TabDef[]` — array of tab definitions with `variant: 'single' | 'dropdown'`
- `activeTabId: string` — the currently selected tab id
- `onTabChange: (tabId: string) => void` — called when a single tab is pressed
- `onDropdownOpen: (tabId: string) => void` — called when a dropdown tab is pressed
- `renderDropdown?: (tabId: string, options: DropdownItem[]) => ReactNode` — optional render prop for the dropdown surface; if omitted, the consuming screen plan renders its own surface when `onDropdownOpen` fires
- `showIndicator?: boolean` — defaults to `true`
- `indicatorVariant?: 'underline' | 'pill'` — defaults to `'underline'`
- `inactiveStyle?: 'muted-color' | 'opacity'` — defaults to `'muted-color'`
- `divider?: boolean` — defaults to `false`
- `accessibilityLabel?: string`

Do not hard-code tab labels, colors, opacity values, indicator dimensions, or spacing inside the component. All visual values come from shared tokens or from the consuming screen plan.

## Acceptance Criteria

- The navigation container spans the full screen width with zero horizontal margin or padding.
- Tabs scroll horizontally as a single rail when their total width exceeds the viewport.
- Single tabs render only text; dropdown tabs render text plus a trailing arrow icon.
- Active tab is visually distinct through color and/or opacity using shared tokens.
- Inactive tabs use exactly one muted treatment (muted color or reduced opacity).
- Each tab has a sufficient touch target and uses the global pressable primitive.
- Single tabs switch to their section via `onTabChange`; dropdown tabs open their dropdown via `onDropdownOpen`.
- No custom scroll indicators, dots, or progress bars appear inside the navigation.
- The component is documented only as a reusable contract; specific tab labels, variants, dropdown options, order, default selection, and resulting screen content are defined in the consuming screen plans.
