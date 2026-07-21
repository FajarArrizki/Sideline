/**
 * Sideline animation tokens.
 * Every animation duration, easing, and opacity must use a token from here.
 * Never hard-code timing values in components or screens.
 *
 * @see .omp/Plan/Animation/animation.md
 */

export const Animation = {
  /** Duration tokens (milliseconds) */
  duration: {
    /** Immediate interaction feedback (button press, toggle) */
    interaction: 200,
    /** Screen-level transitions (fade, content swap) */
    screen: 350,
    /** Group expand/collapse, sheet presentation */
    expand: 500,
  },

  /** Opacity tokens for visual states */
  opacity: {
    /** Pressed state */
    pressed: 0.5,
    /** Disabled state */
    disabled: 0.4,
    /** Muted / secondary content */
    muted: 0.6,
    /** Full visibility */
    full: 1.0,
  },

  /** Placeholder opacity for input fields */
  input: {
    placeholder: 0.5,
  },
} as const;

export type AnimationToken = typeof Animation;
