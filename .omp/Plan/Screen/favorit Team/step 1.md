# Step 1 — Manager Information

> **Note:** This is the first of four internal onboarding steps and uses the shared structure defined in [global.md](global.md). The interface must not show a step number, dots, boxes, counters, or progress bar. Steps 2, 3, and 4 remain defined in their separate documents.

## Content Heading

Set the `StepContent` heading to **Manager Information**. This heading introduces the user's manager profile information and is separate from the global header identity text **Headline**. Use the shared heading component and typography token rather than styling this text locally.

## Manager Information Form

`ManagerInformationForm` is divided into reusable field groups. Group 1 contains `ManagerNameInput` and `CountrySelectField` beside each other directly below the content heading. Every group uses shared row spacing, field height, border, typography, and focus behavior from the global form and layout systems rather than screen-specific values.

| Field | Type | Display | Purpose |
| --- | --- | --- | --- |
| `ManagerNameInput` | Text input | Placeholder: **Manager Name** | Captures the user's manager name |
| `CountrySelectField` | Read-only dropdown-style input | Default: Indonesia flag, **Indonesia**, and trailing dropdown chevron; fallback placeholder: **Select Country** | Opens the country selection overlay |

## Input Visual Style

All text inputs, dropdown-style selectors, and compact form controls use the application background token `#131318` and the default border token `#3F3F43`, matching the global secondary or default button surface. Entered text, selected values, and field icons use the approved default foreground token `#FFFFFF`. Placeholder text uses the same foreground token with the shared placeholder-opacity token rather than a new hard-coded color. Border radius, field height, horizontal padding, focus state, pressed state, and spacing must come from reusable input or selector variants.

Implementation must consume `color.input.default.background`, `color.input.default.border`, `color.input.default.text`, and `color.input.default.placeholder` from the shared theme. The hexadecimal values above document their approved wireframe appearance and must not be copied into the component.

The default country is **Indonesia**, displayed with the Indonesia flag and country name when Step 1 first opens. Keep **Select Country** as the field placeholder for any state where the default is unavailable or the selection has been cleared.

Do not implement `CountrySelectField` as a free-text country field. It should visually match the shared input component but behave as an accessible pressable selector. When closed, it displays the selected country's flag and name together and places the dropdown chevron at the trailing edge. Use the global icon component for the chevron and the reusable `CountryFlagIcon` wrapper around `react-native-country-flag` for the country flag.

### Country and Language Flag Rendering

Every country flag in Step 1—including the Indonesia default, closed country field, country-picker rows, and any language flag backed by a country mapping—must render through `CountryFlagIcon` as defined in [../../Asset/icon.md](../../Asset/icon.md). Step 1 must not import `react-native-country-flag` directly or add screen-local PNG or SVG country flags. Country records provide an ISO 3166-1 alpha-2 code to the wrapper.

`react-native-country-flag` does not accept language codes. Each fluent-language record must provide an explicit product-defined `displayCountryIsoCode` before a flag is rendered; do not convert an ISO language code to a country code or infer a representative country inside the UI. The shared wrapper owns loading and network-failure fallback behavior because the package's default flag source is remote.

## Field Groups

| Group | Controls | Layout | Purpose |
| --- | --- | --- | --- |
| `FieldGroupOne` | `ManagerNameInput` and `CountrySelectField` | Two controls beside each other | Captures the manager name and country |
| `FieldGroupTwo` | `CoachingStyleSelectField` and `FluentLanguageSelectField` | Two controls beside each other, matching Group 1 | Selects a coaching style and the manager's fluent language |
| `FieldGroupThree` | `AddFluentLanguageButton` | One icon-only **+** control | Adds another fluent-language selector |

### Group 1 — Manager Identity

Keep the existing `ManagerNameInput` and `CountrySelectField` side by side. `ManagerNameInput` uses the **Manager Name** placeholder. `CountrySelectField` starts with the Indonesia flag and **Indonesia**, retains **Select Country** as its fallback placeholder, and opens the searchable country picker.

### Group 2 — Coaching and Language

Place `FieldGroupTwo` directly below Group 1 using the shared group gap. `CoachingStyleSelectField` visually matches the default input or button surface and initially displays a global coaching icon beside the text **Select**. After the user chooses a coaching-style template or creates a custom style, replace **Select** with the selected style title. Pressing this field pushes the full-screen `CoachingStyleScreen` route described below; it must not open a bottom overlay or replace content inside the Step 1 route.

`FluentLanguageSelectField` uses the same visual structure and interaction pattern as `CountrySelectField`: a `CountryFlagIcon` backed by the language record's explicit `displayCountryIsoCode`, selected language name, trailing dropdown chevron, searchable bottom overlay, sticky full-width search input, divider, scroll-edge fade, scrollable list, immediate selection, and automatic close. Its initial placeholder is **Select Language**. Selecting a language replaces the placeholder with that language's mapped flag and name. Country and language selection must share the reusable `SearchableFlagPickerSheet` primitives while supplying their own datasets, search labels, and row copy.

### Group 3 — Additional Fluent Languages

Place `FieldGroupThree` below Group 2. It contains only `AddFluentLanguageButton`, rendered as the reusable icon-only **+** control with an accessibility label such as **Add fluent language**. Pressing it inserts another `FluentLanguageSelectField` before the add control while preserving the same dropdown behavior. Keep the **+** control available for additional entries until a product-defined maximum is reached. Do not invent the maximum, duplicate-language rules, or removal interaction yet.

## Dropdown Interaction

Pressing `CountrySelectField` opens `CountryPickerSheet` from the bottom of the screen. At the same time, rotate or transition the dropdown chevron from its downward state to its upward state using the global motion tokens and reusable animation component. When the overlay closes, restore the chevron to its downward state. Do not define local duration, easing, opacity, or icon values inside this screen.

The overlay opening and closing motion must be smooth, restrained, and consistent with the global animation plan. The field action must use `AnimatedPressable` or the shared selector primitive, while the bottom-sheet transition must reuse the project's global overlay motion variant. Do not delay country selection or closing behavior for decorative animation.

## Country Selection Overlay

```text
CountryPickerSheet
├── StickySearchRegion
│   ├── CountrySearchInput
│   ├── Divider
│   └── PickerListScrollFade
└── CountryList
    └── CountryRow
        ├── CountryFlagIcon
        └── CountryName
```

Present `CountryPickerSheet` as an overlay that enters from the bottom and remains above the current step screen. The sheet height, top radius, safe-area inset, background, and motion must come from reusable overlay components and tokens. The user must be able to dismiss the sheet using the established platform or overlay behavior without losing unrelated form state.

## Sticky Search Region

Place a full-width `CountrySearchInput` at the top of the overlay. Add a divider directly below it. Keep both the search input and divider sticky while the country list scrolls underneath them, so search remains available regardless of the list position. The sticky region uses the existing application background token and must not introduce a new surface color.

Add a subtle scroll-edge fade beneath the sticky divider so list rows moving underneath the fixed search region disappear smoothly. This is an explicitly approved exception to the project's general no-gradient rule. The fade may use `expo-linear-gradient` only in the reusable `PickerListScrollFade` owned by `SearchableFlagPickerSheet`, and every gradient stop must use the same existing background color token with different approved opacity values. Country and fluent-language variants may reuse this functional mask; it must not introduce another hue, decorate the interface, appear on buttons or backgrounds, or establish a general gradient pattern elsewhere.

Before implementing the exception, verify whether `expo-linear-gradient` is declared and installed by running `npm ls expo-linear-gradient --depth=0`. If it is missing, install the Expo SDK-compatible package with `npx expo install expo-linear-gradient`. Keep the gradient inside the reusable `SearchableFlagPickerSheet` component so this exception cannot spread into feature screens.

Current dependency status: `expo-linear-gradient` is not installed in this workspace yet. It must be installed and verified before `PickerListScrollFade` is implemented.

## Country Search and List

Search filters the scrollable country list by country name. The exact country dataset and localization source must be selected before implementation rather than embedded as an arbitrary screen-local array. Filtering must remain responsive while typing, and clearing the query must restore the full list.

Each `CountryRow` remains visually simple and contains only `CountryFlagIcon` beside the country name. Do not add a checkbox, radio control, checkmark, active badge, highlighted selected marker, or separate confirmation button. Pressing a country immediately updates `CountrySelectField` with that flag and name and closes the overlay. The newly selected value is visible in the closed field, so the list does not need an additional selection indicator.

The list must scroll independently below the sticky search region, preserve safe-area spacing at the bottom, and use an appropriate virtualized React Native list for the full country dataset. Country rows, `CountryFlagIcon`, typography, separators, pressed opacity, and spacing must use reusable components and global tokens.

## Fluent-Language Selection Overlay

Present `FluentLanguagePickerSheet` through the same reusable `SearchableFlagPickerSheet` contract as `CountryPickerSheet`. The language variant changes only its dataset, labels, query matching, and selected-value callback. It retains the sticky search region, divider, approved functional scroll-edge fade, independently scrolling virtualized list, bottom safe-area spacing, immediate selection, automatic close, and closed-field chevron transition. Each row contains only a language name and `CountryFlagIcon` when the language record has an explicit `displayCountryIsoCode`; do not add a second confirmation or selected marker.

## Coaching Style Screen

`CoachingStyleScreen` is a separate full-screen route pushed onto the native stack from `CoachingStyleSelectField`. It is not a sheet, modal overlay, or conditional replacement inside `StepContent`. Pushing it preserves the Step 1 form state beneath the new route and gives forward and back navigation the standard native stack transition and interactive back behavior.

The route reuses the global safe-area, brand, button, typography, icon, color, spacing, and motion primitives, but it must not render `StepScreenLayout`. While this route is active, the Step 1 **Headline**, **Manager Information** content, and bottom **Back** and **Continue** actions are not visible. The dedicated header preserves only a reusable Back control and the brand identity, with the global brand icon beside the text **Sideline**.

```text
CoachingStyleScreen
├── SystemTopArea
├── CoachingStyleHeader
│   ├── BackButton
│   └── BrandIdentity
│       ├── BrandIcon
│       └── Text: "Sideline"
└── CoachingStyleEditor
    ├── CoachingTemplateSelect
    ├── CoachingAttributesSection
    └── MentalAttributesSection
```

Use Expo Router or the project's native stack for the push and pop. Do not add a custom page animation over the native transition. Pressing the header Back control or using the platform back gesture pops to Step 1. If no style was selected, `CoachingStyleSelectField` remains **Select**. If a predefined template was selected, it displays that template title; if **Custom** was selected, it displays **Custom**. Preserve the other Step 1 field values in every case.

## Coaching Template Selection

Place `CoachingTemplateSelect` at the top of the scrollable editor. It provides product-defined predefined coaching-style templates plus a **Custom** option. Selecting a predefined template loads its defined attribute values; selecting **Custom** enables a user-defined combination. The template names, each template's values, the initial attribute values for **Custom**, and whether manually changing a predefined template automatically changes its title to **Custom** remain pending product decisions.

## Reusable Attribute Controls

Both attribute sections use the same reusable `AttributeRow` and `AttributeBar` components. `AttributeBar` receives an integer value from 0 through 10 and always renders exactly 10 GitHub-activity-style square segments. The first `value` segments use `color.attribute.segment.active`; the remaining segments use `color.attribute.segment.inactive`. Colors, segment size, gap, radius, and transitions must come from shared tokens or variants rather than row-specific styles.

```text
AttributeRow
├── AttributeName
└── AttributeControl
    ├── IncrementButton: "+"
    ├── AttributeBar: 10 segments
    └── DecrementButton: "-"
```

Keep each section title and its attribute names consistently right-aligned. The icon-only **+** button increments the row by one and the icon-only **−** button decrements it by one, clamped to the inclusive 0–10 range. Use the global icon and `AnimatedPressable` primitives, expose an accessible value such as **6 of 10**, and provide row-specific accessibility labels for both buttons. Changing one row must not change another row unless a future product-defined total-point budget requires redistribution.

## Coaching Attributes

Set the right-aligned section title to **Coaching Attributes** and render these rows in this exact order:

1. Attacking
2. Defending
3. Fitness
4. GK Distribution
5. GK Handling
6. GK Shot Stopping
7. Tactical
8. Mental
9. Technical
10. Working With Youngsters

## Mental Attributes

Set the right-aligned section title to **Mental Attributes** and render these rows in this exact order:

1. Adaptability
2. Determination
3. Player Knowledge
4. Youngster Knowledge
5. People Management
6. Level of Discipline
7. Motivating

## Step Content Structure

```text
StepContent
├── ContentHeading: "Manager Information"
└── ManagerInformationForm
    ├── FieldGroupOne
    │   ├── ManagerNameInput
    │   └── CountrySelectField
    ├── FieldGroupTwo
    │   ├── CoachingStyleSelectField
    │   └── FluentLanguageSelectField
    └── FieldGroupThree
        ├── AdditionalFluentLanguageField(s)
        └── AddFluentLanguageButton: "+"

Bottom overlays:
├── CountryPickerSheet
└── FluentLanguagePickerSheet

Stack destination:
└── CoachingStyleScreen
```

The global Back and Continue buttons remain supplied by `StepScreenLayout` and are not recreated in Step 1. **Continue** pushes `CountrySelectionStep` after the Step 1 validation rules succeed. The Back destination, validation requirements, and enabled or disabled behavior remain pending; do not infer required fields until validation rules are explicitly defined.

## Pending Decisions

Country flag rendering is fixed to the reusable `CountryFlagIcon` wrapper around `react-native-country-flag`. The remaining product decisions are the authoritative country and language datasets; each language's explicit `displayCountryIsoCode`; localization language; accessible flag fallback and offline-onboarding requirements; picker empty states and search placeholders; sheet height and dismissal gestures; predefined coaching template names and attribute values; initial **Custom** values; template-to-custom transition behavior after manual edits; any total coaching-attribute point budget; maximum fluent-language entries; duplicate-language prevention and language-removal interaction; manager-name and field validation; persistence; the Step 1 Back destination; and exact route paths. The Continue destination is fixed to `CountrySelectionStep`.
