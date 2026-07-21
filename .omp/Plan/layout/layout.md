# Global Mobile Layout Plan

> **Note:** Sideline is an Expo and React Native portrait application, not a responsive website. Build layouts with React Native primitives and shared layout components, never with web `div` assumptions, CSS page-flow assumptions, or duplicated screen-level spacing. Every screen must use the same global shell, safe-area behavior, navigation insets, content gutters, and full-bleed rules.

## Purpose

The global layout system must make every screen structurally consistent while allowing specific sections, especially horizontal lists, to intentionally reach the physical screen edges. Layout behavior should be controlled by reusable components and shared spacing tokens so changes to navigation height, safe-area insets, content padding, section gaps, or edge-to-edge behavior can be made once and applied across the application.

## Expo-Native Layout Model

Use React Native primitives such as `View`, `ScrollView`, `FlatList`, and safe-area utilities rather than web elements such as `div`. The root application shell must fill the available screen, use the global application background token, and account for the device safe areas. Top navigation, scrollable screen content, and bottom navigation must be treated as separate layout regions. Navigation that should remain visible must live outside the main scrolling content instead of being placed inside the same `ScrollView`.

The main content region must account for the real rendered height and safe-area inset of both navigation regions. Do not guess navigation spacing or add arbitrary padding independently on each screen. Content must never be hidden behind the top navigation, bottom navigation, home indicator, status bar, or device cutout. If navigation is provided by Expo Router, use the router layout and inset information as the source of truth while keeping screen content spacing inside the shared layout components.

## Global Layout Hierarchy

```text
AppShell
├── TopNavigation or router header
├── ScreenLayout
│   └── Vertical scroll region
│       ├── ContentContainer
│       │   ├── Section
│       │   ├── Stack
│       │   └── regular padded content
│       └── FullBleed or HorizontalRail
└── BottomNavigation or router tabs
```

The hierarchy describes responsibilities rather than requiring every screen to render custom navigation. Expo Router may own the actual header or tabs, but the shared layout system must still provide the correct content insets, gutters, and spacing between navigation and screen content.

## Shared Layout Components

| Component | Responsibility |
| --- | --- |
| `AppShell` | Owns the global background, full-screen sizing, safe-area strategy, and the regions around persistent navigation. |
| `ScreenLayout` | Provides the standard portrait screen structure, scroll behavior, keyboard behavior when required, and navigation-aware content insets. |
| `ContentContainer` | Applies the shared horizontal screen gutter and keeps ordinary content aligned consistently across screens. |
| `Stack` | Controls repeated vertical or horizontal spacing through approved spacing tokens instead of child margins. |
| `Section` | Groups related screen content and applies consistent section spacing, headings, and internal alignment. |
| `FullBleed` | Allows an intentional region to escape the normal content gutter and use the full viewport width. |
| `HorizontalRail` | Provides reusable horizontal scrolling whose viewport reaches both screen edges while its first and last items remain aligned with the standard content gutter. |

## Content Gutters and Spacing

Ordinary content must be placed inside `ContentContainer`, which owns the shared horizontal gutter. Do not wrap every child in another container merely to recreate padding, because nested containers produce double spacing and make alignment inconsistent. Use `Stack` or `Section` to control gaps between children, and use semantic spacing tokens rather than hard-coded margins or padding. Individual child components should not compensate for screen gutters or navigation heights.

A screen must apply each spacing responsibility exactly once: the shell handles safe areas and persistent navigation, the screen layout handles scroll content insets, the content container handles horizontal gutters, and stacks or sections handle spacing between related elements. This prevents the common mistake where navigation spacing is ignored on one screen but applied twice on another.

## Full-Bleed Horizontal Scrolling

Do not rely on `overflow: visible` alone to make a horizontal list extend beyond a padded content container. Overflow controls whether drawing may escape bounds, but it does not automatically give the horizontal scroller a full-width viewport or correct first-and-last-item spacing. A horizontal rail must either be a full-width sibling of the padded content container or use the shared `FullBleed` component to cancel only the standard screen gutter.

The horizontal `ScrollView` or `FlatList` viewport should reach the physical screen edges. Apply the standard screen gutter through the scroller's `contentContainerStyle` so the first item aligns with regular content when the rail is at its starting position, intermediate items can scroll all the way across the screen, and the last item receives the same trailing gutter. Avoid wrapping the rail in a parent with `overflow: hidden`, avoid hard-coded screen widths, and derive responsive width from the available viewport when width calculations are required.

## Navigation-Aware Content

Top and bottom navigation spacing must be defined globally and verified on a real device or emulator with safe-area insets. The first content section must have a predictable gap below the top navigation, and the final scrollable section must include enough bottom inset to remain fully visible and tappable above the bottom navigation and home indicator. Screens must not manually reproduce these offsets. Any screen-specific exception must be expressed through an explicit typed layout variant rather than arbitrary local styles.

## Implementation Rules

Use portrait-first responsive measurements and shared tokens rather than desktop breakpoints or web container conventions. Keep layout primitives presentation-focused and free from feature business logic. Do not hard-code screen width, navigation height, safe-area padding, gutters, or section gaps inside feature screens. Do not import higher-level sections into lower-level layout primitives. Prefer explicit variants such as scrollable, fixed, keyboard-aware, full-bleed, and navigation-aware over copied layout implementations. Test representative screens with long content, short content, a horizontal rail, top navigation, bottom navigation, keyboard visibility, and devices with different safe-area insets before treating the global layout as complete.
