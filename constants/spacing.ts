/**
 * Sideline layout spacing tokens.
 * Every gap, gutter, and inset must use a token from here.
 * Never hard-code margin or padding values in components.
 *
 * @see .omp/Plan/layout/layout.md
 */

export const Spacing = {
  /** Horizontal screen content gutter */
  screen: {
    gutter: 16,
  },

  /** Vertical stack spacing between sections */
  stack: {
    /** Tight gap between related items (e.g., label + value) */
    tight: 4,
    /** Standard gap between sibling elements */
    medium: 12,
    /** Large gap before/after major sections */
    large: 24,
  },

  /** Inline horizontal spacing */
  inline: {
    /** Tight gap between icon + text */
    tight: 6,
    /** Standard gap between inline elements */
    medium: 10,
  },

  /** Navigation-aware insets */
  inset: {
    /** Space below top bar before content begins */
    topContent: 12,
    /** Space above bottom bar after content ends */
    bottomContent: 16,
  },

  /** Minimum touch target (accessibility) */
  touch: {
    minimum: 44,
  },
} as const;

export type SpacingToken = typeof Spacing;
