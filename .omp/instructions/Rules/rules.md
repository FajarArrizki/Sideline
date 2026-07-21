# Expo Reusable UI Rules

## Expo Foundation

Treat this repository as an Expo SDK 54 and React Native project. Consult the exact versioned Expo documentation at https://docs.expo.dev/versions/v54.0.0/ before implementing Expo-specific behavior. Keep route and screen files focused on composition, navigation, and feature orchestration instead of reusable presentation details.

## No Hard-Coded Design Values

Never hard-code colors, font families, font sizes, font weights, font styles, line heights, letter spacing, spacing, dimensions, icon sizes, border colors, border widths, border styles, border radii, shadows, elevation, opacity, z-index values, animation durations, or any other reusable styling decision inside a screen or component. Use centralized semantic design tokens, theme values, typed variants, and reusable component APIs instead. When a required value does not exist, add it to the appropriate shared token or variant system before using it. Never duplicate an existing token, style, variant, primitive, or component, and never introduce an arbitrary one-off visual value as a shortcut.

## No Gradients Except the Approved Searchable Picker Scroll Fade

Never use aesthetic gradients in the interface, including backgrounds, buttons, borders, overlays, loading placeholders, decorative effects, or animations. The sole approved exception is the functional `PickerListScrollFade` beneath the sticky search region in the reusable `SearchableFlagPickerSheet`; country and fluent-language picker variants may use it so rows disappear smoothly beneath the fixed header. It may transition only the existing background color token through approved opacity stops, must remain inside the shared picker component, must not introduce another hue, and must not be reused as general decoration. For every other pressed, disabled, transition, loading, or emphasis state, keep the underlying color token unchanged and vary only an approved semantic opacity token.

## Reusable Components

Build every recurring visual or interactive pattern as a reusable component. Extend the shared token or component system instead of introducing copied components or one-off styles, and use React Native StyleSheet or the styling approach already established by the repository consistently. Search for an existing token, primitive, variant, or component before creating a new implementation. Expose typed, minimal props, prefer composition and explicit variants over boolean-prop sprawl, give each component one focused responsibility and a stable public export, and colocate component-specific styles, types, and tests within the component's functional folder when appropriate.

## Atomic Design Structure

Organize reusable UI with atomic design semantics without naming folders atoms, molecules, organisms, or templates. Use components/base for atoms, components/groups for molecules, components/sections for organisms, and components/layouts for templates. Always subdivide every level by responsibility so files are never placed loosely or mixed together. Use functional folders such as components/base/text for typography primitives, components/base/buttons for button primitives, components/base/inputs for input primitives, components/base/icons for icon wrappers, components/base/surfaces for cards and containers, components/groups/forms for composed form controls, components/groups/navigation for compact navigation assemblies, components/groups/feedback for alerts and status groups, components/sections/headers for page-level headers, components/sections/lists for substantial list regions, components/sections/forms for complete form sections, components/layouts/screens for reusable screen shells, and components/layouts/auth for authentication layouts. Create another clearly named functional subfolder when none of these categories fits rather than placing a file directly inside base, groups, sections, or layouts.

## Dependency Direction

Keep dependencies flowing strictly upward through the atomic hierarchy. Base components may depend only on platform primitives, design tokens, and low-level utilities; groups may compose base components; sections may compose base components and groups; layouts may compose base components, groups, and sections; lower levels must never import higher levels. Keep business logic, data fetching, navigation state, and feature-specific side effects outside base components. Use consistent PascalCase names for component files and component declarations so the design system remains reusable, predictable, and free of duplicate implementations.
