# WATCHDOG — Implementation Consistency Guard

> **Note:** Baca sebelum menulis kode apapun. Menjaga konsistensi token, component, asset, animation, layout, dan navigation.

## Title
**Sideline Implementation Watchdog**

## Description
Guard rules untuk implementasi Sideline. Setiap screen, component, token, animation, asset, dan navigation harus merujuk ke plan files di `.omp/Plan/`.

---

## Token & Styling

Warna dari `Plan/Color/color.md`. Typography dari `Plan/Color/color.md` (`SF Pro Text`, Regular/Bold). Spacing, safe-area, full-bleed dari `Plan/layout/layout.md`. Border radius & shadow dari shared token. Tidak boleh hard-code.

## Component

Struktur atomic: `components/base/` → `groups/` → `sections/` → `layouts/`. Dependency hanya ke atas. Tidak ada business logic di `base/`. Cek existing component sebelum buat baru — extend variant, jangan tambah boolean props. Reusable: `GameplaySubNavigation` (`Comp/navigasi.md`), `GameplayTable` (`Comp/table.md`), `BentoGrid/Card/OfferCard` (`Comp/bento.md`), `ContractDetailCard`, `CenteredSnapSelectionRail`, `CountryFlagIcon` (`Plan/Asset/icon.md`).

## Screen

Setiap screen wajib deklarasi **Type 1** (sub-nav) atau **Type 2** (back arrow + title). Chrome (top header, bottom nav, safe-area) tidak boleh di-recreate. Bottom nav #5 adalah state machine: Next → Match → Kick-Off → Next → Done. **Tidak boleh ada step indicator (dots, counter, progress bar)** di multi-step flow. Layout type dan global.md reference wajib di setiap screen plan.

## Asset

Brand logo: `assets/Generic/Logo-brand/brand-logo.png`. Ikon: Expo Vector Icons. Flag: `CountryFlagIcon` → react-native-country-flag. Fallback: gray placeholder. Jangan import flag PNG/SVG langsung.

## Animation

Restrained, Apple-inspired (`Plan/Animation/animation.md`). Press feedback: **opacity-only**. No scale, no bounce, no custom spring. Group expand: height/opacity token saja. Match: karambol-style linear movement, snap-to-player.

## Data & State

Coin balance dari wallet boundary, budget dari club-economy boundary — tidak boleh hard-code "000". Dropdown options selalu dari config object (`contractActionConfig`, `replyTemplateConfig`, `playerActionConfig`). Stat schema dari config (`clubConfig`). Scout filters conditional per focus type.

## Consistency Checklist

Sebelum submit: warna dari token, typography dari token, spacing dari layout, komponen reuse existing, screen deklarasi Type, chrome tidak duplicate, tidak ada step indicator, asset dari registry, animation opacity-only, configurable options dari config object, link resolve, `todo.md` status update.

## Reference

- `.omp/AGENTS.md` — Arsitektur project, reusable UI rules
- `.omp/WATCHDOG.md` — File ini
- `.omp/Plan/Color/color.md` — Token warna & typography
- `.omp/Plan/Asset/asset.md` — Asset usage
- `.omp/Plan/Asset/icon.md` — Icon system
- `.omp/Plan/layout/layout.md` — Layout & safe-area
- `.omp/Plan/Animation/animation.md` — Aturan animasi
- `.omp/Plan/Screen/todo.md` — Status screen design
