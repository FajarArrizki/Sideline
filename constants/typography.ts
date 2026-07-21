/**
 * Sideline typography tokens.
 * Font family and weights must be consumed from here — never hard-code.
 *
 * @see .omp/Plan/Color/color.md (typography section)
 */

export const Typography = {
  /** Primary font family used across the entire application */
  fontFamily: {
    primary: "SF Pro Text",
  },

  /** Font weights */
  fontWeight: {
    /** Default text styling */
    default: "400" as const,
    /** Active or emphasized text styling */
    active: "700" as const,
  },
} as const;

export type TypographyToken = typeof Typography;
