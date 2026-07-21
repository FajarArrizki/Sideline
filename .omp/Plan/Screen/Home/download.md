# Home Download Screen Design

> **Note:** This document defines the canonical `DownloadScreen` opened by the **Download** item in `HomeBottomNavigation`. It covers the safe-area-aware screen shell, simple banner boundary, league-package list, per-package download action, full-width **Download All** action, and one progress bottom sheet with individual and all-package modes. It does not define banner copy or media, package catalog ownership, remote manifest schema, exact Expo Router path, installed-package storage, package update policy, or a separate package-details screen.

## Purpose and Navigation

`DownloadScreen` lets the user inspect and download league data packages without creating a duplicate Home tab or an inline Home overlay. Tapping **Download** in `HomeBottomNavigation` activates this canonical destination. Record the exact Expo Router path, top-level activation action, active-navigation treatment, and platform Back behavior in the screen workflow index when the route group is implemented.

Use the shared portrait `AppShell` and derive the top and bottom insets from the device safe area and native system navigation. Do not guess status-bar, display-cutout, home-indicator, or Android system-navigation dimensions.

## Screen Structure

```text
DownloadScreen
└── AppShell
    ├── NativeTopSafeArea
    ├── DownloadContent
    │   ├── DownloadBannerCard
    │   └── PackageList
    │       ├── LeaguePackageRow
    │       ├── PackageDivider
    │       └── LeaguePackageRow...
    ├── DownloadAllAction
    │   └── Text: "Download All"
    ├── NativeBottomSafeArea
    └── DownloadProgressSheet: presented when a transfer is active
```

`DownloadContent` occupies the flexible region between the native top area and the bottom action. The package list owns vertical scrolling when its content exceeds the available height. Keep `DownloadAllAction` outside that scroller and immediately above the bottom safe area so list content cannot push it beneath system navigation.

## Download Banner Card

Place one simple `DownloadBannerCard` directly below the native top safe area and inside the shared content gutter. It uses the shared card surface, radius, border, spacing, and elevation tokens. The banner remains visually subordinate to package selection and must not use a gradient.

The banner's copy, image, icon, action, accessibility label, and data source remain undefined. Do not invent promotional text, package counts, artwork, or a press destination until that content contract is approved. Reserve the banner as one bounded reusable card region rather than scattering banner-specific styling across `DownloadScreen`.

## League Package List

Render the authoritative package catalog as a vertical `PackageList`. Insert one shared divider between adjacent package rows; do not add a detached card around every row or render a trailing divider after the final item.

Each `LeaguePackageRow` uses this fixed left-to-right composition:

```text
LeaguePackageRow
├── PackageIdentityVisuals
│   ├── CountryFlagIcon
│   ├── VerticalDivider
│   └── TopLeagueBadge
├── PackageTextGroup
│   ├── LeagueName
│   └── CreatorMeta
│       ├── CreatorIcon
│       └── CreatorName
└── PackageDownloadButtonCard
    └── DownloadIcon
```

The country flag, vertical divider, and top-league badge form one compact visual identity group. Render the flag from a validated country code through the global country-flag wrapper. Render the league artwork through the shared badge or image boundary with `contain` scaling and stable dimensions. Do not treat the league badge as a country flag or infer either visual from display text.

`PackageTextGroup` takes the flexible middle width. Show the league name above a creator row containing one semantic creator icon and the creator's complete display name. Keep both values left-aligned. Long values use the shared one-line ellipsis behavior without shrinking the identity visuals or download action; accessibility services receive the complete values.

Place `PackageDownloadButtonCard` at the far right, as a separate icon-only action. It uses the shared compact card and pressable contracts, a semantic download icon, visible press feedback, an explicit accessible label containing the league name, and at least the global minimum touch target. Disable or ignore repeated activation while that package is already transferring. The row itself must not start a download, so scrolling, focusing, or tapping non-action content cannot trigger a transfer.

## Package Data and Ownership

Drive each row from one typed package summary with a stable package identifier, country code, league identifier and display name, badge reference, creator name, installed ownership or version state, and the transfer metadata required by the download boundary. Ownership and installed status come from the authoritative package store; they must not be inferred from a completed-looking progress animation or maintained as duplicate screen-local truth.

The exact remote manifest, URL authorization, expected-byte metadata, integrity metadata, local directory, version comparison, update eligibility, and ownership acquisition rules remain pending. Implementation must define these contracts before transferring real files and must use the Expo SDK 54-approved network and filesystem APIs rather than relying on temporary response URIs as installed packages.

## Download All Action

Render one long, full-width `DownloadAllAction` directly above the native bottom safe area with the exact visible text **Download All**. Reuse the global primary button or action-card contract instead of creating a screen-specific height, radius, typography, or pressed state.

Activation builds a stable queue from packages that the authoritative store reports as not currently owned or not installed at the required version, preserving the catalog's top-to-bottom order and skipping current installed packages. Disable duplicate activation while the queue is running. If no eligible package exists, do not open an empty progress sheet; use the shared non-blocking feedback pattern. Exact feedback copy remains pending.

## Shared Download Progress Bottom Sheet

Use one reusable `DownloadProgressSheet` with explicit `individual` and `all` modes. Do not maintain two nearly identical overlays. Present it from the bottom above the native bottom safe area with the shared dim backdrop, bottom-sheet surface, radius, spacing, and restrained motion. Focus moves into the sheet when it opens and returns to the initiating control when it closes.

```text
DownloadProgressSheet
├── SheetTitle: "Download Progress"
├── CurrentPackageIdentity
│   ├── CountryFlagIcon
│   ├── VerticalDivider
│   └── TopLeagueBadge
├── DownloadProgressBar
└── ProgressActions
    ├── CancelButton
    └── ContinueButton: individual mode only
```

Use the normalized exact heading **Download Progress**. Center the current package's flag, divider, and league badge as one identity group. The determinate progress bar sits below that group and exposes its numeric value and accessible progress semantics. Progress is derived from confirmed transferred bytes against authoritative expected bytes; do not advance it from a timer or report completion before validation and persistence succeed.

`CancelButton` uses the shared secondary or default button treatment. `ContinueButton` uses the shared primary or active treatment. Button color is not the only state cue: a disabled Continue must also expose disabled interaction and accessibility state.

## Individual Download Mode

Tapping a row's `PackageDownloadButtonCard` opens the sheet in `individual` mode for that package and starts one transfer. Show both **Cancel** and **Continue**, but keep Continue disabled until the complete package has been received, integrity-checked, persisted, and committed to authoritative installed state.

After a successful individual transfer, pressing **Continue** performs this deterministic smart sequence:

1. read the latest authoritative installed state;
2. scan the visible catalog from the top in its stable order;
3. skip every package already owned or installed at the required version;
4. select the first remaining package;
5. reset the same sheet to that package and begin its download.

Do not use the currently focused row as the start of the scan and do not wrap from the current item; the scan always begins at the top. If no missing package remains, **Continue** closes the sheet and returns to the package list. It must not open a details screen or require a second tap on the next row.

## Download All Mode

Tapping **Download All** opens the same sheet in `all` mode and processes the eligible queue in top-to-bottom order. The identity group updates to the package currently transferring. The progress bar represents aggregate confirmed bytes across the fixed queue, while package completion is counted only after validation and persistence.

The all-package sheet shows only **Cancel** while work remains and never renders **Continue**. After every queued package is validated and committed, present the shared completion feedback and dismiss the sheet automatically. The exact completion-feedback duration and copy remain pending; they must not require a new confirmation action.

## Cancellation, Failure, and Recovery

**Cancel** must abort the active network and file operation, stop any remaining all-package queue, remove the active package's temporary partial artifact, and close the sheet only after cancellation cleanup settles. Packages successfully committed before cancellation remain installed. Do not delete previously owned packages or roll back already completed queue items.

Offline, network, authorization, storage-capacity, write, integrity, and persistence failures must keep authoritative installed state unchanged for the failing package. Stop the active individual transfer or all-package queue, retain the sheet as the error feedback boundary, keep Continue disabled, and provide a safe user-facing error through the shared feedback system. Never expose raw URLs, local paths, stack traces, credentials, or backend payloads. Exact retry action, error copy, timeout, retry count, and partial-download resume policy remain pending; do not invent automatic retry or retain unverified partial files.

Clean up active requests and temporary resources when the sheet or screen unmounts. Guard all late progress and completion callbacks so a cancelled or replaced transfer cannot update the next package's state.

## Proportional Layout and Accessibility

Use semantic tokens for content gutters, banner spacing, row height, row gaps, dividers, visual sizes, action-card size, bottom-action spacing, sheet width and radius, progress-bar dimensions, and button arrangement. Do not hard-code a device width or absolutely position list columns. Preserve the fixed identity and download-action targets while allowing the text group to shrink on narrow supported portrait widths. Cap content width and visual growth on wider devices.

Focus order follows visible order: banner content when eventually interactive, each row's identity and text, its download action, then **Download All**. The sheet announces its title and current league, traps focus while modal, exposes progress updates without excessive announcements, labels Cancel with the affected scope, and omits Continue entirely in `all` mode. Country and league identity must not rely on artwork alone.

## Reusable Implementation Boundary

Reuse `AppShell`, safe-area handling, `ContentContainer`, stack and row layout primitives, card surfaces, button variants, typography, global icons, country flags, badge rendering, dividers, bottom sheet, progress bar, feedback, color, spacing, radius, elevation, and motion systems. Keep catalog state, installed ownership, queue orchestration, transfer cancellation, validation, and persistence outside base presentation components.

Introduce Home-specific composition only for `DownloadScreen`, `DownloadBannerCard`, `LeaguePackageRow`, `PackageIdentityVisuals`, `PackageTextGroup`, and the mode configuration passed to `DownloadProgressSheet`. Do not duplicate download logic in each row, implement a separate all-download overlay, or place network and filesystem effects inside visual primitives.

## Pending Decisions

The banner content and behavior, exact Expo Router path and top-level back action, package catalog and ownership source, manifest and authorization schema, expected-size and integrity format, installed-package filesystem contract, version and update policy, retry and timeout policy, partial-resume policy, list loading and empty states, error and completion copy, and exact progress-sheet dismissal timing remain undefined. These decisions must be documented before their behavior is implemented; do not fill them with mocks or guessed production values.

## Acceptance Criteria

The canonical `DownloadScreen` opens from the Home **Download** navigation item; all content respects native top and bottom safe areas; one simple banner card precedes a divided vertical package list; every row renders country flag, vertical divider, top-league badge, league name, creator icon and name, then a far-right download-icon card; only that action card starts an individual download; the full-width **Download All** action remains above system navigation; one shared bottom sheet uses the exact heading **Download Progress** and shows the current package identity above a determinate progress bar; individual mode shows Cancel plus a disabled-until-verified Continue; Continue scans from the top, skips installed packages, and immediately downloads the first missing package; all mode shows only Cancel, processes an ordered eligible queue, and dismisses after verified completion; cancellation stops active work and cleans temporary data without deleting completed packages; failure cannot create false installed state or fake 100% progress; and no banner content, route, manifest, retry, or storage policy is invented beyond this plan.
