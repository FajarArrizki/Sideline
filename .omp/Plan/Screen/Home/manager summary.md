# Home Manager Summary Design

> **Note:** This document defines the manager summary group positioned immediately below `HomeTopBar` at the top of `HomeContentSlot`. It covers the profile-photo card, manager labels, favorite-club badge card, onboarding data sources, gallery selection, responsive sizing, and consistency rules. It does not define other Home content, a manager profile screen, club navigation, camera capture, image cropping, image removal, or remote profile synchronization.

## Purpose and Placement

`ManagerSummaryGroup` presents the user's persisted manager identity and favorite club before any other Home content. Place it directly below `HomeTopBar` using the shared header-to-content gap and `ContentContainer` horizontal gutter. It remains inside `HomeContentSlot`; it must not become part of the fixed header or scroll underneath the header because of a guessed top offset.

The current Home content order is:

```text
HomeContentSlot
├── ManagerSummaryGroup
├── FutureHomeContent: pending
└── SavedGameRailSection
```

The manager summary owns only its horizontal row. Do not add a visible section heading, edit button, statistics, nationality label, league name, club name, or additional manager metadata until those requirements are defined.

## Component Structure

```text
ManagerSummaryGroup
└── ManagerSummaryRow
    ├── ProfilePhotoCard
    │   └── ManagerProfileImage
    ├── ManagerTextGroup
    │   ├── ManagerName
    │   └── CoachingStyleName
    └── FavoriteClubBadgeCard
        └── FavoriteClubBadge
```

Render `ManagerSummaryRow` as one horizontal row in this fixed left-to-right order: profile-photo card, flexible manager text, favorite-club badge card. Vertically center the text group against the two visual cards. Use shared row gaps instead of individual child margins.

## Shared Visual Card Contract

`ProfilePhotoCard` and `FavoriteClubBadgeCard` use one reusable `IdentityVisualCard` surface contract with interaction-specific variants. Both cards must have identical square outer dimensions, corner radius, border, surface, shadow or elevation, and external alignment. Their inner image fit differs intentionally:

- `ProfilePhotoCard` uses the profile-image variant and may fill the available image region while clipping to the approved inner radius;
- `FavoriteClubBadgeCard` uses the badge variant with `contain` scaling and token-driven inner padding so the complete badge remains visible.

Do not reproduce the same card styles twice. The profile variant is interactive; the favorite-club badge variant is display-only until a club destination is explicitly planned. Do not make the badge pressable or infer navigation from it.

## Profile Photo Card

Use `assets/Generic/Pace/Generic-pace.png` as the default manager profile image when the user has not selected a custom photo or when no persisted photo reference exists. The default must use the same card, crop region, dimensions, and loading boundary as a custom image so replacing it does not shift the row.

Tapping `ProfilePhotoCard` opens the device photo library and allows the user to select or replace one profile image. Do not expose camera capture, a file-manager picker, an edit overlay icon, image removal, or custom crop UI in this plan. Cancelling the picker preserves the current image. If photo-library permission is denied or image selection fails, preserve the current image or generic default and use the shared application feedback pattern rather than leaving a blank card.

Request photo-library access only when the user activates the card. Do not request it during Home startup. The selected image must be validated as a supported image before replacing the visible profile reference. The exact format, file-size limit, resolution limit, crop policy, compression, local copy strategy, and remote upload behavior remain pending.

Give the interactive card an accessibility role and a label that reflects its current purpose, such as **Choose manager profile photo** for the default image and **Change manager profile photo** after a custom image is available. The entire card is the press target and must meet the global minimum touch target without adding a second hidden action over it.

## Manager Text Group

`ManagerTextGroup` occupies the flexible center width between the two fixed square cards. Display the persisted manager name as `ManagerName` using the approved heading typography. Display the persisted coaching-style title immediately below it as `CoachingStyleName` using the supporting text style.

Both values remain left-aligned inside the text group and use a shared vertical gap. Reserve one line for each value. Long manager names or coaching-style titles truncate through the shared one-line ellipsis behavior instead of wrapping, shrinking below the minimum readable type size, changing card dimensions, or pushing the favorite-club badge away from its aligned position. Accessibility services receive each complete untruncated value.

Do not display literal `undefined`, `null`, empty whitespace, temporary mock names, or the Step 1 placeholder **Select** as settled Home data. The exact unavailable-data fallback copy and recovery behavior remain pending; the persisted onboarding completion contract should normally provide valid values.

## Favorite Club Badge Card

`FavoriteClubBadgeCard` displays the badge belonging to the persisted favorite club selected by `selectedTeamId` in onboarding Step 4. Resolve the badge through the shared club data and badge-rendering boundary. Use `assets/Generic/Badge/Badge-generic.png` only as the approved wireframe or missing-badge fallback; do not infer a badge from the club name or route club badges through `CountryFlagIcon`.

The badge card reserves stable image dimensions while the badge loads and when the badge source fails. Its accessible name includes the complete favorite-club name even though the visible group currently shows only the badge. It remains non-interactive until a dedicated club-profile destination and navigation action are defined.

## Onboarding Data Contract

Read the manager summary from the persisted onboarding result rather than maintaining duplicate Home-only identity state:

- `managerName` comes from Step 1 `ManagerNameInput`;
- `coachingStyleId` and its display title come from Step 1 `CoachingStyleSelectField`;
- `favoriteClubId` comes from Step 4 `selectedTeamId` after onboarding completes successfully;
- favorite-club name and badge reference are resolved from the authoritative club record;
- `profileImageReference` is optional and falls back to the generic manager profile image.

`ManagerSummaryGroup` receives a typed summary view model containing these values. It must not read unrelated form internals, infer a coaching style from attribute values, or copy the full onboarding form into component-local state.

After the user chooses a valid gallery image, update the displayed profile reference and persist it through the manager-profile storage boundary. Home must be able to restore the chosen image after an application restart. The storage mechanism and any server synchronization remain pending; do not treat a temporary picker URI as a completed persistence strategy.

## Gallery Interaction Flow

The gallery request is separate from row layout state:

1. the user taps `ProfilePhotoCard`;
2. the application requests photo-library permission when required;
3. the system photo library opens;
4. cancellation returns to Home without changes;
5. a valid selected image is persisted through the profile storage boundary;
6. `ManagerProfileImage` updates without moving or resizing the summary row.

Ignore repeated card activation while the system picker or image persistence is already in progress. If validation or persistence fails, keep the prior image and surface the failure through shared feedback. Do not partially replace the visible photo with a reference that cannot survive restart.

## Proportional Sizing and Spacing

`ManagerSummaryRow` must remain one row on supported portrait widths. Derive the square visual-card size from a shared responsive identity-card size token constrained by approved minimum and maximum values. Both cards always use the same computed size. The center text region uses `flexShrink` and the remaining available width; the visual cards must not become different sizes to accommodate longer text.

Use semantic tokens for:

- gap below `HomeTopBar`;
- screen gutter and row gap;
- square card size and inner padding;
- card radius, border, surface, and elevation;
- image inner radius and badge fit;
- text hierarchy, line height, and text-group gap.

Do not hard-code screen width, copy arbitrary padding into each card, or use absolute positioning to align the three columns. At narrow supported widths, preserve both accessible visual-card targets and truncate the text region. At wider portrait widths, cap the visual-card size rather than allowing it to grow disproportionately.

## Accessibility and Feedback

Focus order follows the visible row: profile-photo action, manager text, then favorite-club badge information. The profile photo has an explicit choose/change action label. The generic silhouette is decorative once the card exposes its action label, and the favorite badge exposes the club name without relying on badge artwork alone.

Press, permission, selection, persistence, and failure feedback reuse global motion and feedback components. Do not signal interactivity through color alone and do not animate card dimensions when the selected photo replaces the generic image.

## Reusable Implementation Boundary

Reuse `ContentContainer`, `Stack`, the generic asset registry, shared image and badge renderers, typography, icon, pressable, safe-area, feedback, color, border, radius, spacing, and motion systems. Introduce one reusable `IdentityVisualCard` surface with explicit profile-image and club-badge variants, then compose `ManagerSummaryGroup` from that primitive. Do not duplicate the same square card, permission handling, image fallback, or onboarding persistence mapping inside `HomeScreen`.

## Pending Decisions

The profile-image validation formats, maximum file size, resolution, compression, crop behavior, storage mechanism, remote upload or synchronization, unavailable onboarding-data fallback copy, manager-profile destination, club-profile destination, and badge data source remain undefined. Do not add camera access, removal, editing tools, or inferred navigation until those decisions are documented.

## Acceptance Criteria

The manager summary appears immediately below `HomeTopBar`; the row order is profile-photo card, manager text, and favorite-club badge card; both visual cards are equal square cards with one shared proportional style contract; manager name and coaching style come from persisted Step 1 data; the club badge comes from the persisted Step 4 favorite club; the generic profile image and generic badge provide stable fallbacks; tapping only the profile card opens the device gallery; cancellation or failure preserves the prior image; a valid chosen image survives restart through the profile storage boundary; long text truncates without moving the cards; and no camera, crop, remove, club navigation, or unrelated Home content is invented by this plan.
