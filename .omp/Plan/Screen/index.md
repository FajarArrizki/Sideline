# Screen Workflow and Navigation Plan

> **Note:** This document is the source of truth for Sideline screen flows, button destinations, navigation actions, conditions, and back behavior. Define or update a flow here before implementing navigation so buttons never point to guessed routes and every screen has a clear entry, destination, and exit. Keep each user journey in its own table and use the exact screen and route names implemented by the project.

## Screen Design Documents

Read screen plans in this order during implementation, one plan at a time:

1. [Splash screen implementation design](Splash%20screen/splash%20screen.md) — Native-to-React splash handoff, centered Sideline brand, and safe-area-aware application version.
2. [Global four-step favorite-team design](favorit%20Team/global.md) — Shared onboarding shell and synchronized dropdown-and-centered-rail pattern.
3. [Step 1 Manager Information design](favorit%20Team/step%201.md) — Manager identity, country and language pickers, and the pushed coaching-style editor.
4. [Step 2 country selection design](favorit%20Team/step%202.md) — Searchable country dropdown and auto-selecting centered flag rail.
5. [Step 3 league selection design](favorit%20Team/step%203.md) — Country-filtered league selection through a synchronized dropdown and badge rail.
6. [Step 4 favorite-team design](favorit%20Team/step%204.md) — League-filtered club selection and onboarding completion into Home.
7. [Home global design](Home/global.md) — Safe-area-aware Home shell, coin and menu header actions, content boundaries, and floating primary navigation.
8. [Home manager summary design](Home/manager%20summary.md) — Gallery-backed manager photo, persisted manager identity, and favorite-club badge.
9. [Home saved-game rail design](Home/saved%20game%20rail.md) — Center-snapping saved-game cards that load only on explicit tap and require confirmation before deletion.
10. [Home download screen design](Home/download.md) — Safe-area-aware league-package list, far-right row download actions, Download All queue, and shared progress bottom sheet.
11. [Home Toko screen design](Home/toko.md) — Conventional Back header, one-column vertical Purchase Coin cards, and platform-native purchase-sheet boundary.
12. [Start Game workflow and navigation plan](Start%20Game/index.md) — Central Start Game index linking the pick-your-team flow and the planned Gameplay destination.
13. [Start Game pick-your-team global design](Start%20Game/pick%20your%20team/global.md) — Favorite-Team-equivalent four-step shell with Back, Continue, and final Done behavior.
14. [Start Game Step 1 Manager Information design](Start%20Game/pick%20your%20team/step%201.md) — New-game draft prefilled from the persisted Favorite Team onboarding result.
15. [Start Game Step 2 country selection design](Start%20Game/pick%20your%20team/step%202.md) — Start Game country selection through the reused synchronized dropdown and rail.
16. [Start Game Step 3 league selection design](Start%20Game/pick%20your%20team/step%203.md) — Country-filtered Start Game league selection through the reused synchronized controls.
17. [Start Game Step 4 team selection design](Start%20Game/pick%20your%20team/step%204.md) — Final team selection with Done handoff to the planned Gameplay destination.
18. [Gameplay global design](Start%20Game/Gameplay/global.md) — Gameplay shell: top header with coin and club-budget cards, floating bottom navigation with Portal/Tactic/Transfer/Management/Next-Match action.
19. [Gameplay destination placeholder](Start%20Game/Gameplay/gameplay.md) — Intentionally undefined gameplay design anchor.
20. [Gameplay table component](Start%20Game/Gameplay/Comp/table.md) — Reusable full-width, horizontally-scrollable rail table for Gameplay screens.
21. [Gameplay sub-navigation component](Start%20Game/Gameplay/Comp/navigasi.md) — Reusable horizontal text-tab sub-navigation with active/default color or opacity states.
22. [Gameplay menu index](Start%20Game/Gameplay/Menu/index.md) — Central index for Portal, Tactic, Transfer, and Management menu screen plans.

## Flow Index

| Flow | Purpose | Entry Screen | Completion Screen | Status |
| --- | --- | --- | --- | --- |
| Startup / Splash | Display the Sideline brand and application version, then enter favorite-team onboarding | Native Expo Splash | `ManagerInformationStep` | Planned; route path pending |
| Manager Onboarding / Step 1 Coaching Style | Edit the manager's coaching template and attribute values without losing Step 1 form state | `ManagerInformationStep` | `ManagerInformationStep` | Planned; route paths pending |
| Four-Step Manager Onboarding | Capture manager information, club country, league or division, and favorite club | `ManagerInformationStep` | `HomeScreen` | Planned; route paths and persistence pending |
| Home Header and Primary Navigation | Open Purchase Coin in Toko, begin Start Game setup, or activate another defined primary destination | `HomeScreen` | `TokoScreen`, `StartGameManagerInformationStep`, or `DownloadScreen` | Planned; route paths and top-level actions pending |
| Home Coin Purchase | Choose a coin package and hand payment to the platform-native store without client-side coin credit | `TokoScreen` | `TokoScreen` | Planned; product catalog, billing, verification, fulfillment, and recovery contracts pending |
| Start Game / Pick Your Team | Prefill a new-game manager draft, choose country, league, and team, then hand off to Gameplay | `StartGameManagerInformationStep` | `GameplayScreen` | Planned; route paths, validation, draft handoff pending; Gameplay chrome defined |
| Gameplay / Global Chrome | Persistent Gameplay header, coin/budget cards, and floating bottom navigation | `GameplayScreen` | `PortalScreen`, `TacticScreen`, `TransferScreen`, `ManagementScreen` | Partially planned; global chrome defined, content screens pending |
| Gameplay / Time Advance | Skip game time or enter match day via the Next/Match action | `GameplayScreen` | Time-advance sheet | Pending; trigger conditions, sheet content, and state update pending |
| Gameplay / Menu Index | Central index linking all gameplay menu screen plans | `GameplayScreen` | `PortalScreen`, `TacticScreen`, `TransferScreen`, `ManagementScreen` | Partially planned; placeholders created, content pending |
| Home Manager Profile Photo | Choose or replace the manager profile image from the device gallery | `HomeScreen` | `HomeScreen` | Planned; picker validation and profile-image persistence pending |
| Home Package Download | Download one missing league package at a time or process all eligible packages in order | `DownloadScreen` | `DownloadScreen` | Planned; route, catalog, manifest, storage, integrity, and recovery contracts pending |
| Home Saved-Game Loading | Load or delete a persisted game save from the Home saved-game rail | `HomeScreen` | Loaded-game destination identifier pending | Planned; save storage, loading destination, and route action pending |

## Per-Flow Navigation Table

Create a separate section and table for every flow using this structure:

| Step | Current Screen | Trigger or Button | Destination Screen | Navigation Action | Condition | Back Destination | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |

## Startup / Splash Flow

| Step | Current Screen | Trigger or Button | Destination Screen | Navigation Action | Condition | Back Destination | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Native Expo Splash | Application launch | `SplashScreenView` | Automatic handoff | The initial React view, required fonts, and required assets are ready | None | Planned |
| 2 | `SplashScreenView` | Startup bootstrap completes | `ManagerInformationStep` | Replace | All required startup work has completed successfully | None | Planned; onboarding entry route path pending |

## Manager Onboarding / Step 1 Coaching Style Flow

`ManagerInformationStep` and `CoachingStyleScreen` are planned screen identifiers; their Expo Router paths must be recorded here when the onboarding route group is implemented. The coaching editor is a full-screen stack destination, not a modal, bottom sheet, or in-place state inside the manager-information route.

| Step | Current Screen | Trigger or Button | Destination Screen | Navigation Action | Condition | Back Destination | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `ManagerInformationStep` | Press `CoachingStyleSelectField` | `CoachingStyleScreen` | Push on the native stack | Always; preserve the current manager-information form state | `ManagerInformationStep` | Planned; route paths pending |
| 2 | `CoachingStyleScreen` | Header Back control or platform back gesture | `ManagerInformationStep` | Pop | No selection keeps the field label **Select**; a chosen predefined template returns its title; **Custom** returns **Custom** | Previous stack entry | Planned; route paths pending |

Do not add a separate save route or custom page animation. The native stack owns forward and reverse transitions; the editor returns its current coaching-style selection while all unrelated Step 1 values remain intact.

## Four-Step Manager Onboarding Flow

`ManagerInformationStep`, `CountrySelectionStep`, `LeagueSelectionStep`, `FavoriteTeamSelectionStep`, and `HomeScreen` are planned screen identifiers. Record their exact Expo Router paths when the onboarding and Home route groups are implemented. The shared onboarding shell must not render visible step numbering or progress UI.

| Step | Current Screen | Trigger or Button | Destination Screen | Navigation Action | Condition | Back Destination | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `ManagerInformationStep` | **Continue** | `CountrySelectionStep` | Push | Step 1 validation succeeds once its rules are defined | Previous route before onboarding | Planned; Step 1 validation and route paths pending |
| 2 | `CountrySelectionStep` | **Continue** | `LeagueSelectionStep` | Push | A valid `selectedCountryId` exists | `ManagerInformationStep` | Planned; route paths pending |
| 3 | `LeagueSelectionStep` | **Continue** | `FavoriteTeamSelectionStep` | Push | A valid `selectedLeagueId` belonging to `selectedCountryId` exists | `CountrySelectionStep` | Planned; route paths pending |
| 4 | `FavoriteTeamSelectionStep` | Final **Continue** | `HomeScreen` | Replace | A valid `selectedTeamId` belonging to `selectedLeagueId` has been persisted successfully | `LeagueSelectionStep` | Planned; Home route path and persistence mechanism pending |

Back navigation pops to the preceding onboarding screen and preserves every still-valid upstream selection. Changing the Step 2 country clears incompatible league and team values; changing the Step 3 league clears an incompatible team value. Dropdown selection and centered-rail selection update the same screen-level ID and do not create navigation events by themselves.

The canonical startup sequence is `Native Expo Splash` → `SplashScreenView` → four-step favorite-team onboarding beginning at `ManagerInformationStep` → `HomeScreen`. Completing onboarding replaces the onboarding stack with Home so platform Back cannot reopen the completed setup flow.

## Home Header and Primary Navigation Flow

`TokoScreen` is the planned canonical store identifier shared by `CoinBalanceCard` and the **Toko** bottom-navigation item. Tapping the coin card requests the **Purchase Coin** section; tapping the bottom item uses the default Toko entry. Purchase Coin is currently the only defined section, so both actions display it through the same store destination rather than pushing duplicate Toko routes. Record the exact Expo Router path, section representation, top-level switch action, and back behavior here when the Toko route group is defined.

| Step | Current Screen | Trigger or Button | Destination Screen | Navigation Action | Condition | Back Destination | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `HomeScreen` | Tap `CoinBalanceCard` | `TokoScreen` with **Purchase Coin** active | Activate the canonical Toko destination and target its Purchase Coin section; do not push a duplicate store route | The card is enabled and the authoritative balance state is available or safely represented | `HomeScreen`; exact top-level back action pending | Planned; Toko path, section parameter, and router action pending |
| 2 | `HomeScreen` | Tap **Toko** in `HomeBottomNavigation` | `TokoScreen` default entry | Activate the same canonical Toko destination; its current default content is Purchase Coin | Always | `HomeScreen`; exact top-level back action pending | Planned; Toko path and router action pending |
| 3 | `HomeScreen` | Tap **Start Game** in `HomeBottomNavigation` | `StartGameManagerInformationStep` | Push the canonical Start Game pick-your-team entry; do not reuse the onboarding route or create duplicate setup state | Persisted onboarding data is available or its safe recovery behavior is active | `HomeScreen` | Planned; Start Game route path and draft initialization pending |
| 4 | `HomeScreen` | Tap **Download** in `HomeBottomNavigation` | `DownloadScreen` | Activate the canonical Download destination; do not push a duplicate route or open an inline Home overlay | Always | `HomeScreen`; exact top-level back action pending | Planned; Download path and router action pending |
| 5 | `HomeScreen` | Tap `MoreMenuButton` | Menu surface and actions pending | Do not open a guessed menu or route | Pending menu requirements | `HomeScreen` | Blocked by menu design |

## Start Game / Pick Your Team Flow

`StartGameManagerInformationStep`, `StartGameCountrySelectionStep`, `StartGameLeagueSelectionStep`, and `StartGameTeamSelectionStep` are separate Start Game route identifiers. Their presentation and Steps 2–4 synchronized selection behavior intentionally match the Favorite Team onboarding flow, but they own a distinct new-game draft and must not reuse or mutate onboarding route state. `GameplayScreen` is only a planned completion identifier; the `Start Game/Gameplay` directory remains intentionally empty and defines no gameplay UI or behavior.

| Step | Current Screen | Trigger or Button | Destination Screen | Navigation Action | Condition | Back Destination | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `HomeScreen` | Tap **Start Game** | `StartGameManagerInformationStep` | Push and initialize a separate game draft from the authoritative persisted onboarding manager data | Persisted data loads or the approved safe recovery state is available | `HomeScreen` | Planned; route and missing-profile recovery pending |
| 2 | `StartGameManagerInformationStep` | **Continue** | `StartGameCountrySelectionStep` | Push while preserving the draft-only manager values | Step 1 validation succeeds once its rules are defined | `HomeScreen`; Step 1 **Back** returns Home without committing draft edits | Planned; validation and route paths pending |
| 3 | `StartGameCountrySelectionStep` | **Continue** | `StartGameLeagueSelectionStep` | Push | A valid `selectedCountryId` exists | `StartGameManagerInformationStep` | Planned; route paths pending |
| 4 | `StartGameLeagueSelectionStep` | **Continue** | `StartGameTeamSelectionStep` | Push | A valid `selectedLeagueId` belonging to `selectedCountryId` exists | `StartGameCountrySelectionStep` | Planned; route paths pending |
| 5 | `StartGameTeamSelectionStep` | **Done** | `GameplayScreen` | Replace the completed four-step setup stack | A valid `selectedTeamId` belonging to `selectedLeagueId` exists and the game draft is ready for handoff | `StartGameLeagueSelectionStep` before completion; completed setup is not reopened by platform Back | Planned; draft handoff and Gameplay route pending; Gameplay chrome defined |

Back navigation within Steps 2–4 pops to the preceding Start Game screen and preserves every compatible draft value. Changing the country clears an incompatible league and team; changing the league clears an incompatible team. Step 1 edits apply only to the new-game draft and never overwrite the persisted manager profile or favorite club. The final button label is **Done**, not Continue.

## Home Coin Purchase Flow

`TokoScreen` is the single planned coin-store destination. It renders a conventional left-aligned Back control and a one-column vertical list of `CoinPackageCard` components under **Purchase Coin**. A card press requests the platform-native Google Play or App Store purchase sheet; the native sheet is not an application route or a custom Toko overlay. In-app billing remains blocked until product, transaction, verification, idempotent fulfillment, and wallet reconciliation contracts are implemented.

| Step | Current Screen | Trigger or Button | Destination Screen | Navigation Action | Condition | Back Destination | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `TokoScreen` | Press `TokoBackControl` or use supported platform Back | `HomeScreen` | Return through the canonical Toko-to-Home relationship without pushing a duplicate Home route | Always | Previous canonical Home destination | Planned; exact route action pending |
| 2 | `TokoScreen` | Press an enabled `CoinPackageCard` | Google Play purchase sheet on Android or App Store purchase sheet on iOS | Request the native platform purchase UI without application route navigation | Authoritative product metadata is available, the platform can purchase it, and no other purchase flow is active | `TokoScreen` | Blocked by billing integration and product configuration |
| 3 | Native platform purchase sheet | Cancel, leave payment pending, or encounter store failure | `TokoScreen` | Dismiss or return focus to the initiating card; do not change the authoritative coin balance | No verified and fulfilled transaction exists | `TokoScreen` | Planned; cancellation, pending, and safe feedback contracts pending |
| 4 | Native platform purchase sheet | Store reports transaction success | `TokoScreen` | Verify the stable transaction and expected product through the authoritative service, fulfill it idempotently, then refresh the wallet or coin ledger | Verification and exactly-once fulfillment succeed | `TokoScreen` | Blocked by verification, fulfillment, and wallet reconciliation design |

A card press or client store callback must never optimistically increment coins. Duplicate, invalid, cancelled, pending, failed, refunded, or unfulfilled transactions leave the confirmed balance unchanged. Do not create a fake success state or custom payment overlay while billing remains pending.

## Home Package Download Flow

`DownloadScreen` is the planned canonical destination for league-package downloads. It owns the catalog and presents one reusable `DownloadProgressSheet` in either `individual` or `all` mode; the sheet is an in-screen modal surface, not another route. Record the exact Expo Router path, top-level activation action, active-navigation treatment, and Back behavior here when the route group is implemented.

| Step | Current Screen | Trigger or Button | Destination Screen | Navigation Action | Condition | Back Destination | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `HomeScreen` | Tap **Download** in `HomeBottomNavigation` | `DownloadScreen` | Activate the canonical Download destination | Always | `HomeScreen`; exact top-level back action pending | Planned; route path and action pending |
| 2 | `DownloadScreen` | Tap a row's `PackageDownloadButtonCard` | `DownloadProgressSheet` in `individual` mode | Present the shared bottom sheet and start the selected package without route navigation | No package transfer is already active and the package is eligible | `DownloadScreen` | Planned; manifest, transfer, validation, and storage contracts pending |
| 3 | `DownloadProgressSheet` in `individual` mode | Press **Continue** after verified completion | Same sheet with the first missing package, or `DownloadScreen` when none remain | Re-read installed state, scan the catalog from the top, skip installed packages, and immediately start the first missing package; dismiss when none remain | Continue is enabled only after the current package is validated, persisted, and committed | `DownloadScreen` | Planned; authoritative installed-state boundary pending |
| 4 | `DownloadScreen` | Press **Download All** | `DownloadProgressSheet` in `all` mode | Present the shared bottom sheet and process the fixed eligible queue in top-to-bottom order | At least one package is missing or requires the approved installed version | `DownloadScreen` | Planned; queue, aggregate-byte, and storage contracts pending |
| 5 | `DownloadProgressSheet` in either mode | Press **Cancel** | `DownloadScreen` | Abort active work, stop the remaining queue, remove the active temporary artifact, then dismiss without deleting committed packages | Cancellation cleanup has settled | `DownloadScreen` | Planned; cancellation and temporary-file contracts pending |
| 6 | `DownloadProgressSheet` in `all` mode | Every queued package completes | `DownloadScreen` | Commit only validated packages, present shared completion feedback, and dismiss automatically; never render Continue in all mode | Every eligible queued package has validated and persisted successfully | `DownloadScreen` | Planned; completion copy and dismissal timing pending |

Network, authorization, storage, write, integrity, or persistence failure keeps the failing package uninstalled, stops the active transfer or queue, leaves Continue disabled, and uses the sheet as the safe feedback boundary. Retry, timeout, partial-resume, and error-copy policies remain pending and must not be guessed.

## Home Manager Profile Photo Flow

The manager photo card opens the system photo library without pushing an application route. Camera capture, file-manager selection, custom cropping, image removal, and remote upload are outside this flow until separately defined.

| Step | Current Screen | Trigger or Button | Destination Screen | Navigation Action | Condition | Back Destination | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `HomeScreen` | Tap `ProfilePhotoCard` | System photo library surface | Present the native photo-library picker without stack navigation | User explicitly taps the card; request photo-library permission only when required | `HomeScreen` | Planned; picker integration and permission feedback pending |
| 2 | System photo library surface | Select a valid image | `HomeScreen` | Persist the selected profile image, dismiss the picker, and update the fixed-size card | Image validation and persistence succeed | `HomeScreen` | Planned; validation and storage mechanism pending |
| 3 | System photo library surface | Cancel, deny permission, or encounter selection failure | `HomeScreen` | Dismiss or return without replacing the current or generic image | No valid persisted replacement exists | `HomeScreen` | Planned; shared feedback copy pending |

## Home Saved-Game Flow

The saved-game rail is Home content, not another tab or onboarding selection control. Center snapping does not create a navigation event and must not update a selected-save state. Record the exact loaded-game screen and Expo Router action here once the game-session destination is defined.

| Step | Current Screen | Trigger or Button | Destination Screen | Navigation Action | Condition | Back Destination | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `HomeScreen` | Tap `SavedGameCard` | Loaded-game destination identifier pending | Load the persisted game by stable `saveId`; subsequent route action pending | The save exists and loading succeeds; scrolling or snapping never triggers this action | `HomeScreen` while loading is cancelled or fails | Planned; load destination, route action, and failure behavior pending |
| 2 | `HomeScreen` | Press `DeleteSaveButton` | `DeleteSaveConfirmation` | Present confirmation dialog or sheet without stack navigation | The matching save exists; the press must not trigger the card load action | `HomeScreen` | Planned; confirmation component and copy pending |
| 3 | `DeleteSaveConfirmation` | Confirm deletion | `HomeScreen` | Delete the matching save, dismiss confirmation, and recenter the nearest surviving card without loading it | Deletion succeeds | `HomeScreen`; cancellation dismisses without changes | Planned; storage implementation and empty-state presentation pending |
