# Splash Screen Implementation Design

> **Note:** Keep the Sideline splash experience intentionally simple and portrait-first: the generic brand logo is centered on the application background, while the current application version appears at the bottom above the device safe area. Do not add navigation, buttons, progress indicators, decorative artwork, or unrelated content.

## Visual Design

The splash screen uses the global application background token `color.background.app` with the value `#131318`. Display `assets/Generic/Logo-brand/brand-logo.png` as the only central visual element. The logo must be centered horizontally and visually centered within the available portrait viewport, use `contain` scaling, preserve its aspect ratio, and obtain its dimensions from a shared splash or asset-size token rather than a hard-coded value inside the screen.

Display the application version at the bottom center in the format `Version x.y.z`. The version label must sit above the bottom safe-area inset with spacing from the shared layout tokens. Use the shared typography system with `SF Pro Text`, the default `Regular` weight, and an approved semantic text color token. The version is supporting information and must remain visually quieter than the centered logo.

## Layout Structure

```text
SplashScreenView
├── CenterContent
│   └── BrandLogo
└── BottomMeta
    └── VersionLabel
```

The root fills the screen and owns the background color. `CenterContent` uses the full available space to keep the logo centered independently of the version label. `BottomMeta` is positioned by the shared layout and safe-area system so the label does not shift the logo upward and never overlaps the home indicator. Do not approximate this structure with web `div` behavior; use Expo and React Native layout primitives such as `View`, `Image`, and `Text` through the project's reusable base components.

## Native Splash and React Splash Responsibilities

Expo's native splash screen, configured through the `expo-splash-screen` config plugin, should use the same `#131318` background and centered brand logo so application startup looks immediate and consistent. The native splash configuration supports a background and splash image, but a dynamic version label should not be baked into the image because it would become stale whenever the application version changes.

Render the bottom version label in a minimal React `SplashScreenView` that visually matches the native splash. Keep the native splash visible only until required fonts, assets, and the initial React view are ready, then transition without a flash to the React splash. Call `SplashScreen.preventAutoHideAsync()` early enough when manual control is required, and hide the native splash as soon as the initial experience is ready rather than adding an artificial delay. When startup bootstrap completes, replace `SplashScreenView` with `ManagerInformationStep`, the entry to the four-step favorite-team onboarding flow; do not push it above Splash. Validate the final native appearance in a release build because Expo Go and development builds do not fully reproduce the production splash screen on current Expo SDK versions.

## Version Source

Read the application version from the Expo application configuration or runtime application metadata and expose it through a shared application metadata utility. Never hard-code the version string inside the splash component. The visible label must update automatically when the project version changes, and the UI must handle a temporarily unavailable version value without displaying `undefined`, `null`, or a broken placeholder.

## Reusable Component Rules

Use the shared image or brand component for the logo, the shared text component for the version label, the global color and typography tokens, and the global safe-area-aware layout primitives. Keep `SplashScreenView` presentation-only and do not place unrelated startup business logic inside it. Resource readiness belongs in the root application bootstrap flow, while the splash component receives only the display data and state it needs. Any future change to logo size, version styling, background color, or safe-area spacing must be made through the corresponding shared token or reusable component rather than edited independently in the splash screen.

## Acceptance Criteria

The splash background fills the complete portrait screen with `#131318`; the brand logo is centered and preserves its aspect ratio; the application version is centered near the bottom and remains above the safe area; the version comes from application metadata rather than a literal string; no navigation or interactive controls appear; no content flashes between native startup and the first React frame; and the production behavior is verified with a release build on both Android and iOS.
