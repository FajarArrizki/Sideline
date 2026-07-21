# Wishlist

> **Note:** Same design as [Serch Player](../Serch%20Player/serch%20player.md). **Type 1 — Sub-Navigation Rail.** Transfer sub-nav remains above. Uses `GameplayScreen` shell from [global.md](../../../global.md). Only the data source is limited to wishlisted items.


## Differences from Serch Player

- Table shows only rows where `wishlisted: true` — both players and staff mixed in one view.
- The ★ column is always filled (since every row is wishlisted). Tapping ★ removes the item from the wishlist and the row disappears.
- Filter overlay and search work the same — applied to the already-filtered wishlist dataset.
- If no items are wishlisted, show an empty state: "No players or staff on your wishlist. Tap ★ on any player or staff to add them."

## Reusable Components

- See [Serch Player design](../Serch%20Player/serch%20player.md) for full spec.
