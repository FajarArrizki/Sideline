# Screen Design To-Do

> **Note:** Tracking semua screen plan di bawah `.omp/Plan/Screen/`. Status: ✅ Designed (spec detail lengkap) atau ⬜ Placeholder (hanya "Content pending").

## Home

| Screen | File | Status | Notes |
|---|---|---|---|
| Home Global Shell | `Home/global.md` | ✅ | Safe-area, top bar, floating nav |
| Manager Summary | `Home/manager summary.md` | ✅ | Profile card, favorite club badge |
| Saved Game Rail | `Home/saved game rail.md` | ✅ | Center-snapping cards, delete confirm |
| Download | `Home/download.md` | ✅ | League catalog, progress sheet |
| Toko | `Home/toko.md` | ✅ | Coin packages, native purchase sheet |

## Start Game — Pick Your Team

| Screen | File | Status | Notes |
|---|---|---|---|
| Global Shell | `Start Game/pick your team/global.md` | ✅ | 1:1 copy from Favorite Team | Copy dari Favorite Team, pending edit |
| Step 1 — Manager Info | `Start Game/pick your team/step 1.md` | ✅ | Prefilled from onboarding | Prefilled dari onboarding |
| Step 2 — Select Country | `Start Game/pick your team/step 2.md` | ✅ | Identical to Favorite Team | Copy dari Favorite Team |
| Step 3 — Select League | `Start Game/pick your team/step 3.md` | ✅ | Identical to Favorite Team | Copy dari Favorite Team |
| Step 4 — Pick Team | `Start Game/pick your team/step 4.md` | ✅ | Done → Gameplay | Done → Gameplay |

## Gameplay — Global & Components

| Screen | File | Status | Notes |
|---|---|---|---|
| Global Chrome | `Start Game/Gameplay/global.md` | ✅ | Type 1 + Type 2 layout |
| Sub-Navigation | `Start Game/Gameplay/Comp/navigasi.md` | ✅ | Single, dropdown, expandable group |
| Table | `Start Game/Gameplay/Comp/table.md` | ✅ | Horizontal scroll, fix columns |
| Bento Card | `Start Game/Gameplay/Comp/bento.md` | ✅ | BentoGrid, OfferCard |
| Gameplay Placeholder | `Start Game/Gameplay/gameplay.md` | ⬜ | Intentionally undefined |

## Gameplay — Portal Menu

| Screen | File | Status | Notes |
|---|---|---|---|
| **Home** | `Menu/Portal/Home/home.md` | ✅ | Carousel + standing/stats snapshot cards |
| **My team** (dropdown tab) | `Menu/Portal/My team/my team.md` | ⬜ | Dropdown doc |
| — Schedule | `Menu/Portal/My team/Schedule/schedule.md` | ✅ | Select Competition → Schedule List |
| — — Schedule List | `.../Schedule/Schedule list/schedule list.md` | ✅ | Date nav + VS match cards |
| — Standing (expandable) | `Menu/Portal/My team/Standing/standing.md` | ⬜ | Group doc |
| — — All League | `.../Standing/All League/all league.md` | ⬜ | Index only |
| — — — Step 1 — Select Benua | `.../Standing/All League/Step 1.md` | ✅ | Continent dropdown + rail |
| — — — Step 2 — Select Competition | `.../Standing/All League/step 2.md` | ✅ | Competition dropdown + rail → Done |
| — — — Group Stage | `.../Standing/All League/Group stage/group stage.md` | ✅ | Per-group tables, section headers |
| — — — Knockout Stage | `.../Standing/All League/Knockout stage/knockout stage.md` | ✅ | Stage nav + VS match cards |
| — — My League | `.../Standing/My league/my league.md` | ✅ | 1-step → shared Group/Knockout |
| — Stats (expandable) | `Menu/Portal/My team/Stats/stats.md` | ⬜ | Group doc |
| — — All League | `.../Stats/All League/all league.md` | ⬜ | Index only |
| — — — Step 1 — Select Country | `.../Stats/All League/Step 1.md` | ✅ | Country dropdown + rail |
| — — — Step 2 — Select League | `.../Stats/All League/step 2.md` | ✅ | League dropdown + rail → Done |
| — — — Pick Stats | `.../Stats/All League/Pick stats/pick stats.md` | ✅ | 11 stat cards, Type 2 |
| — — — Stats Detail | `.../Stats/All League/Stats detail/stats detail.md` | ✅ | Leaderboard table per category |
| — — My League | `.../Stats/My league/my league.md` | ✅ | 1-step → shared Pick Stats/Detail |
| **My career** (dropdown tab) | `Menu/Portal/My career/my career.md` | ⬜ | Dropdown doc |
| — My carrer | `.../My career/My carrer/my carrer.md` | ✅ | Manager history, per-club tabs |
| — My contract (expandable) | `.../My career/My contract/my contract.md` | ⬜ | Group doc |
| — — Contract detail | `.../My contract/Contract detail/contract detail.md` | ✅ | Current contract, Type 2, Mengundurkan diri |
| — — Contract offer | `.../My contract/Contract offer/contract offer.md` | ✅ | Offer list, BentoGrid OfferCard |
| — — — Contract offer detail | `.../My contract/Contract offer/contract detail.md` | ✅ | Offer review, Type 2, Reject/Accept/Negotiate |
| **Social** (dropdown tab) | `Menu/Portal/Social/social.md` | ⬜ | Dropdown doc |
| — All | `Menu/Portal/Social/All/all.md` | ✅ | Twitter-style feed + reply templates |
| — My team | `Menu/Portal/Social/My team/my team.md` | ✅ | Same as All, team-filtered |

## Gameplay — Tactic Menu

| Screen | File | Status | Notes |
|---|---|---|---|
| **Squad list** | `Menu/Tactic/Squad list/squad list.md` | ✅ | Serch Player pattern, view dropdown (First/Reserve/U21/U18) |
| **Tactic** (dropdown tab) | `Menu/Tactic/Tactic/tactic.md` | ✅ | Dropdown doc (all children done) |
| — Captain | `.../Tactic/Tactic/Captain/captain.md` | ✅ | Captain + Vice Captain slots |
| — Pormation | `.../Tactic/Tactic/Pormation/pormation.md` | ✅ | Formation dropdown + pitch dots + name |
| — Squat | `.../Tactic/Tactic/Squat/squat.md` | ✅ | Pitch diagram + local sub-nav + card rails |
| — Set Pieces (expandable) | `.../Tactic/Tactic/Set Pieces/set pieces.md` | ✅ | Group doc (all sub-screens done) |
| — — Corner | `.../Set Pieces/Corner/corner.md` | ✅ | Left + Right corner takers |
| — — Freekick | `.../Set Pieces/Freekick/freekick.md` | ✅ | Left + Right freekick takers |
| — — Pinalties | `.../Set Pieces/Pinalties/pinalties.md` | ✅ | 3 penalty takers |
| — — Set Pieces Taker | `.../Set Pieces/Set Pieces Taker/set pieces taker.md` | ✅ | General set-piece taker |
| — — Trow in | `.../Set Pieces/Trow in/trow in.md` | ✅ | Left + Right throw-in takers |

## Gameplay — Transfer Menu

| Screen | File | Status | Notes |
|---|---|---|---|
| **Serch Player** | `Menu/Transfer/Serch Player/serch player.md` | ✅ | Sticky card + filter overlay + table |
| **Serch Staf** | `Menu/Transfer/Serch Staf/serch staf.md` | ✅ | Same as Serch Player, staff filter |
| **Wishlist** | `Menu/Transfer/Wishlist/wishlist.md` | ✅ | Same as Serch Player, only ★ items |

## Gameplay — Management Menu

| Screen | File | Status | Notes |
|---|---|---|---|
| **Scouting Center** (dropdown tab) | `.../Scounting Center/scounting center.md` | ⬜ | Dropdown doc |
| — Scounting report | `.../Scounting Center/Scounting report/scounting report.md` | ✅ | Serch Player table, youth scouting results |
| — Scounting focus | `.../Scounting Center/Scounting focus/scounting focus.md` | ✅ | Up to 3 scout assignments, overlay config |

## Summary

| Section | Total | ✅ Designed | ⬜ Placeholder |
|---|---|---|---|
| Home | 5 | 5 | 0 |
| Start Game — Pick Your Team | 5 | 5 | 0 |
| Gameplay — Global & Components | 5 | 4 | 1 |
| Gameplay — Portal Menu | 27 | 19 | 8 |
| Gameplay — Tactic Menu | 11 | 11 | 0 |
| Gameplay — Transfer Menu | 3 | 3 | 0 |
| Gameplay — Management Menu | 3 | 2 | 1 |
| **Total** | **59** | **49** | **10** |