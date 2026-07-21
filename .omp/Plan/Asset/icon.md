# Global Icon System Plan

Sideline plans to use Expo Vector Icons through the `@expo/vector-icons` library as the primary icon source for application interfaces. Icons must never be imported and configured independently inside individual screens or feature components when they can be represented through the shared icon system. All icon usage must pass through a reusable global icon component so icon families, icon names, colors, sizes, weights, accessibility labels, and other shared behavior can be controlled consistently from one place.

Before implementing or importing any icon, verify that `@expo/vector-icons` is declared in `package.json` and installed in the current workspace by running `npm ls @expo/vector-icons --depth=0`. If the dependency is missing, install the Expo-compatible version with `npx expo install @expo/vector-icons` rather than guessing a package version. Do not begin icon implementation until this dependency check succeeds.

## Country Flag Library

Use `react-native-country-flag` as the single source for every country flag rendered in the onboarding flow, including closed dropdown fields, searchable picker rows, and horizontal country rails. Country flags are not part of the Expo Vector Icons registry and must not be recreated as locally imported PNG or SVG files inside feature screens.

Before implementing a flag, verify the dependency with `npm ls react-native-country-flag --depth=0`. It is currently not installed in this workspace. Install it with:

```bash
npm install react-native-country-flag
```

After installation, rerun `npm ls react-native-country-flag --depth=0` and do not begin flag implementation until the dependency resolves successfully.

Wrap the package once in a reusable `CountryFlagIcon` component. Only that wrapper may import `react-native-country-flag`; screens, dropdowns, picker rows, and rails request a flag through the wrapper using an ISO 3166-1 alpha-2 country code and an approved semantic size variant. Normalize and validate the country code at the data boundary, keep accessibility labels outside the third-party component, and source width, height, radius, fallback treatment, and selected-state presentation from the shared component and token systems rather than feature-local styles.

`react-native-country-flag` 2.0.2 renders a React Native `Image` from `https://flagcdn.com/w80/{isoCode}.png`, so its default flags require network access and do not provide a completed bundled/offline mode. Treat loading failure as an expected state: `CountryFlagIcon` must render a reusable accessible fallback without shifting layout. The exact fallback visual and whether onboarding must support flags offline remain product decisions; do not add screen-local flag assets as an undocumented fallback.

The package accepts country codes, not language codes, league IDs, or club IDs. A fluent-language record that displays a flag must provide a product-defined `displayCountryIsoCode`; never pass an ISO language code or infer a representative country inside the component. League and club badges remain separate badge assets and must not be routed through `CountryFlagIcon`.

Create a centralized icon component and icon registry that map semantic application names, such as navigation, back, continue, coin balance, store, purchase coin, more menu, download, creator identity, transfer, squad, academy, tactics, settings, and status actions, to the selected Expo Vector Icons family and icon name. Feature code should request a semantic icon and an approved size or color variant instead of depending directly on a specific icon family. This keeps the interface reusable and allows an icon type, visual style, color, or size to be replaced globally without editing every screen that uses it.

Icon colors and sizes must come from the shared design tokens or typed variants rather than hard-coded values. The global icon component should expose a small, typed API, provide sensible defaults, support only intentional overrides, and remain reusable across base components, groups, sections, layouts, and screens. If the design changes later, update the semantic mapping, token, or shared icon component first so every affected icon updates consistently throughout the application.
