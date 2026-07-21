# Start Game Workflow and Navigation Plan

> **Note:** This document is the source of truth for the Start Game section. It collects the pick-your-team setup flow, the planned Gameplay destination, and the local reading order so implementers can move from `pick your team` to `GameplayScreen` without guessing routes or inventing gameplay design.

## Screen Design Documents

Read Start Game plans in this order during implementation, one plan at a time:

1. [Start Game pick-your-team global design](pick%20your%20team/global.md) — Favorite-Team-equivalent four-step shell with separate Start Game state and final Done behavior.
2. [Gameplay global design](Gameplay/global.md) — Gameplay shell: top header with coin and club-budget cards, floating bottom navigation with Portal/Tactic/Transfer/Management/Next-Match action.
3. [Start Game Step 1 Manager Information design](pick%20your%20team/step%201.md) — Draft-only manager data prefilled from the persisted onboarding result.
4. [Start Game Step 2 country selection design](pick%20your%20team/step%202.md) — Reused synchronized country dropdown and centered rail for new-game setup.
5. [Start Game Step 3 league selection design](pick%20your%20team/step%203.md) — Country-filtered league selection for the Start Game draft.
6. [Start Game Step 4 team selection design](pick%20your%20team/step%204.md) — Team selection with final Done handoff to the planned Gameplay destination.
7. [Gameplay destination placeholder](Gameplay/gameplay.md) — Intentionally undefined gameplay design anchor.
8. [Gameplay table component](Gameplay/Comp/table.md) — Reusable full-width, horizontally-scrollable rail table for Gameplay screens.
9. [Gameplay sub-navigation component](Gameplay/Comp/navigasi.md) — Reusable horizontal text-tab sub-navigation with active/default color or opacity states.
10. [Gameplay menu index](Gameplay/Menu/index.md) — Central index for Portal, Tactic, Transfer, and Management menu screens.

## Flow Index

| Flow | Purpose | Entry Screen | Completion Screen | Status |
| --- | --- | --- | --- | --- |
| Start Game / Pick Your Team | Prefill a new-game manager draft, choose country, league, and team, then hand off to Gameplay | `StartGameManagerInformationStep` | `GameplayScreen` | Planned; route paths, validation, draft handoff pending; Gameplay chrome defined |
| Gameplay | Actual match/session experience controlled by the selected team | `GameplayScreen` | `GameplayScreen` | Partially planned; global chrome defined in [global.md](Gameplay/global.md), content screens pending, gameplay systems pending |
| Gameplay / Portal | Primary gameplay hub | `GameplayScreen` default | `PortalScreen` | Pending; content pending |
| Gameplay / Tactic | Tactical setup | `GameplayScreen` via bottom nav | `TacticScreen` | Pending; content pending |
| Gameplay / Transfer | Player transfer market | `GameplayScreen` via bottom nav | `TransferScreen` | Pending; content pending |
| Gameplay / Management | Club management | `GameplayScreen` via bottom nav | `ManagementScreen` | Pending; content pending |
| Gameplay / Menu Index | Central index linking all gameplay menu screen plans | `GameplayScreen` | `PortalScreen`, `TacticScreen`, `TransferScreen`, `ManagementScreen` | Partially planned; placeholders created, content pending |

## Start Game / Pick Your Team Flow

`StartGameManagerInformationStep`, `StartGameCountrySelectionStep`, `StartGameLeagueSelectionStep`, and `StartGameTeamSelectionStep` are separate Start Game route identifiers. Their presentation and Steps 2–4 synchronized selection behavior intentionally match the Favorite Team onboarding flow, but they own a distinct new-game draft and must not reuse or mutate onboarding route state. `GameplayScreen` is the planned completion identifier for the Start Game pick-your-team flow; see the [Gameplay placeholder](Gameplay/gameplay.md) for the explicit "do not invent gameplay" contract. The global chrome is defined in [Gameplay global design](Gameplay/global.md), and the approved reusable primitives are the [table component](Gameplay/Comp/table.md) and the [sub-navigation component](Gameplay/Comp/navigasi.md); all other gameplay content and systems remain undefined.

| Step | Current Screen | Trigger or Button | Destination Screen | Navigation Action | Condition | Back Destination | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `HomeScreen` | Tap **Start Game** | `StartGameManagerInformationStep` | Push and initialize a separate game draft from the authoritative persisted onboarding manager data | Persisted data loads or the approved safe recovery state is available | `HomeScreen` | Planned; route and missing-profile recovery pending |
| 2 | `StartGameManagerInformationStep` | **Continue** | `StartGameCountrySelectionStep` | Push while preserving the draft-only manager values | Step 1 validation succeeds once its rules are defined | `HomeScreen`; Step 1 **Back** returns Home without committing draft edits | Planned; validation and route paths pending |
| 3 | `StartGameCountrySelectionStep` | **Continue** | `StartGameLeagueSelectionStep` | Push | A valid `selectedCountryId` exists | `StartGameManagerInformationStep` | Planned; route paths pending |
| 4 | `StartGameLeagueSelectionStep` | **Continue** | `StartGameTeamSelectionStep` | Push | A valid `selectedLeagueId` belonging to `selectedCountryId` exists | `StartGameCountrySelectionStep` | Planned; route paths pending |
| 5 | `StartGameTeamSelectionStep` | **Done** | `GameplayScreen` | Replace the completed four-step setup stack | A valid `selectedTeamId` belonging to `selectedLeagueId` exists and the game draft is ready for handoff | `StartGameLeagueSelectionStep` before completion; completed setup is not reopened by platform Back | Planned; draft handoff and Gameplay route pending; Gameplay chrome defined |

Back navigation within Steps 2–4 pops to the preceding Start Game screen and preserves every compatible draft value. Changing the country clears an incompatible league and team; changing the league clears an incompatible team. Step 1 edits apply only to the new-game draft and never overwrite the persisted manager profile or favorite club. The final button label is **Done**, not Continue.

## Gameplay Destination

`GameplayScreen` is the planned identifier for the actual match/session experience. Its design, sub-screens, state, and behavior are intentionally undefined and must not be invented by any implementation pass. The [gameplay.md](Gameplay/gameplay.md) placeholder records the "do not invent gameplay" contract, and [global.md](Gameplay/global.md) defines the persistent chrome. The approved reusable primitives are the [Gameplay table](Gameplay/Comp/table.md) and the [Gameplay sub-navigation](Gameplay/Comp/navigasi.md); no other gameplay files should be added until gameplay requirements are explicitly requested.

## Reusable Implementation Boundary

The Start Game flow reuses the same shared `StepScreenLayout`, `SynchronizedSelectionDropdown`, centered snap rails, safe-area, brand, button, typography, icon, color, spacing, and motion primitives defined for Favorite Team onboarding. Add Start Game-specific composition only where the contract is unique: the separate draft state, the persisted-profile preload, the distinct route identifiers, and the final **Done** → `GameplayScreen` replacement action.
