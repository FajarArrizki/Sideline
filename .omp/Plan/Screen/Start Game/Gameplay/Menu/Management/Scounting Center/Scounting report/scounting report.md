# Scounting Report

> **Note:** Same design as [Serch Player](../../../Transfer/Serch%20Player/serch%20player.md). **Type 1 — Sub-Navigation Rail.** Management sub-nav remains above. Uses `GameplayScreen` shell from [global.md](../../../../global.md). Only the data source differs: shows youth players discovered by active scouting assignments.

## Differences from Serch Player

- Table data source is scouting results (players found by scouts from [Scounting Focus](../Scounting%20focus/scounting%20focus.md)).
- No filter overlay — results are pre-filtered by the active scouting assignments.
- Search input still filters by name in real-time.
- Table columns: ★ (wishlist), Name (face+name), Position, Age, Rating, **Scouted By** (scout name).
- Tapping a row navigates to [Player Detail](../../../Transfer/Player%20detail/player%20detail.md).

## Additional Column

| Column | Key | Description |
|---|---|---|
| **Scouted By** | scoutName | Name of the scout who found this player. |

## Empty State

- If no active scouting assignments: "No active scouting focus. Set up assignments in Scouting Focus."
- If assignments exist but no results yet: "Scouting in progress. Check back soon."

## Reusable Components

- See [Serch Player design](../../../Transfer/Serch%20Player/serch%20player.md) for full spec.
