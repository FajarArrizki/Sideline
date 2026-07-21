# Global Animation System Plan

> **Note:** Sideline motion should follow a restrained, platform-native direction inspired by the clarity and responsiveness of Apple interface design without copying proprietary visuals. Animation must feel simple, smooth, immediate, and satisfying while preserving the portrait-first football management experience. Motion should clarify navigation and interaction, never decorate every element or delay the player.

## Motion Direction

Every animation must communicate one of three things: where the player is moving, what the player just interacted with, or what changed on screen. Prefer subtle transitions that preserve spatial context and make the interface feel responsive. Avoid exaggerated bouncing, long cinematic sequences, continuous decorative motion, large parallax effects, or staggered animations across every child. If removing an animation does not reduce clarity or interaction feedback, the animation is unnecessary.

The application must use consistent global motion tokens for duration, easing, delay, and opacity states. Components and screens must consume named motion variants rather than defining local timing values. Changes to the overall motion character must be possible through the global token and component layer without editing individual features.

## Animation Libraries

Use `react-native-reanimated` with `react-native-worklets` for reusable custom motion that cannot be handled cleanly by React Native or Expo Router defaults. Both dependencies must be verified before use by running `npm ls react-native-reanimated react-native-worklets --depth=0`. If either dependency is missing, install Expo-compatible versions with `npx expo install react-native-reanimated react-native-worklets` rather than guessing versions. Prefer Expo Router and native stack transition behavior for normal page navigation, because native transitions already provide platform-appropriate performance and gestures; do not layer a second custom page animation over an existing router transition.

## Global Motion Components

| Component or Variant | Responsibility |
| --- | --- |
| `MotionProvider` | Exposes global motion tokens, reduced-motion preferences, and shared animation behavior. |
| `AnimatedPressable` | Provides consistent pressed, released, disabled, and focus feedback for buttons and other tappable controls. |
| `Fade` | Handles intentional opacity entry, exit, and state replacement without creating local timing values. |
| `PageTransition` | Provides an explicit reusable transition only for flows where Expo Router or the native stack does not already supply the required behavior. |
| `AnimatedStateChange` | Cross-fades controlled content changes such as tabs, filters, status messages, or updated values. |

Do not create multiple wrappers that solve the same motion problem. Extend these shared variants when a repeated interaction needs new behavior, and keep animation components free from football feature logic.

## Page Navigation

Normal screen changes should use Expo Router or native stack transitions with consistent directional behavior. Forward navigation should feel like progression, backward navigation should preserve the expected reverse gesture, and modal flows should use the platform-appropriate presentation. Keep transitions short and smooth, preserve interactive back gestures, and avoid custom effects that conflict with navigation direction. Do not replay heavy entrance animations every time a tab regains focus.

When a custom page transition is genuinely required, keep it restrained and use opacity as the primary custom visual change. Do not animate background colors or introduce temporary shades. The screen must remain readable throughout the transition, and navigation must not wait for decorative motion to finish.

## Button and Interaction Feedback

Buttons must respond immediately when pressed. Use the shared `AnimatedPressable` so primary, secondary, icon, and compact buttons receive the same timing and opacity behavior. Keep the button's semantic background, border, icon, and text colors unchanged; represent the pressed state by applying an approved opacity token and smoothly restoring the default opacity on release. Disabled, loading, and active states must use explicit reusable variants rather than arbitrary local opacity values.

Feedback should feel satisfying because it is immediate, consistent, and synchronized with the touch, not because it is large or dramatic. Avoid repeated bounce, glow, gradient, color-cycling, or pulse effects. Do not delay the actual action until the pressed animation completes.

## Color and Opacity Rules

Never use aesthetic gradients in animation or static interface styling. All backgrounds, borders, text, icons, overlays, and surfaces must keep using existing semantic color tokens. The sole approved exception is the functional `PickerListScrollFade` beneath the sticky search region in the reusable `SearchableFlagPickerSheet`; country and fluent-language picker variants may transition the existing background token through approved opacity stops so scrolling rows disappear smoothly beneath the fixed header. This exception is not a reusable decorative gradient and must remain scoped to that shared picker. For every other visual intensity change, do not generate a new shade, interpolate arbitrary colors, or hard-code temporary transition colors; animate only an approved semantic opacity token while keeping the underlying color token unchanged.

Opacity variants must also be centralized. Do not place values such as pressed opacity, disabled opacity, muted opacity, or transition opacity directly inside feature components. Define them once in the design and motion token systems and consume them through shared variants.

## Content and State Changes

Use a short cross-fade when replacing content in place would otherwise feel abrupt, such as changing a selected tactical view, filter result, status message, or summary value. Preserve layout stability and avoid animating every row in large squad, transfer, or academy lists. New data should remain quick to scan, and motion must not interfere with scrolling or repeated management actions.

Loading feedback must remain calm and functional. Do not use gradient shimmer effects. Prefer a static token-based placeholder, a restrained opacity treatment, or an existing platform activity indicator when progress is indeterminate. Remove loading motion as soon as usable content is available.

## Accessibility and Performance

Respect the operating system's reduced-motion preference through the global motion provider. Reduced-motion mode should remove nonessential movement, avoid large spatial transitions, and use an immediate state change or minimal opacity transition where feedback is still necessary. Functional behavior, navigation, and content visibility must never depend on an animation completing.

Keep custom animations on properties supported efficiently by the chosen animation system, avoid triggering expensive layout work on every frame, and avoid animating long lists as a single sequence. Animation cleanup must be automatic when a component unmounts or an interaction is interrupted. Validate motion on real Android and iOS devices, not only in a web preview or emulator.

## Acceptance Criteria

Page navigation feels consistent and does not duplicate native router transitions; buttons respond immediately using the shared opacity behavior; repeated animation values come from global tokens; aesthetic gradients and arbitrary color interpolation are absent outside the approved searchable-picker scroll-fade mask; loading and state changes remain restrained; reduced-motion preferences are respected; scrolling and touch interactions remain responsive; and any global timing, easing, or opacity adjustment can be made without editing individual feature screens.
