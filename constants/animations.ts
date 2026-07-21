/**
 * Sideline animation tokens.
 * Every animation duration, easing, delay, and opacity must use a token from here.
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

  /** Easing curve tokens (use with Reanimated or Animated.timing) */
  easing: {
    /** Standard ease-out for enter/expand animations */
    easeOut: { type: "easeOut" as const, bezier: [0.0, 0.0, 0.2, 1.0] as const },
    /** Standard ease-in for exit/collapse animations */
    easeIn: { type: "easeIn" as const, bezier: [0.4, 0.0, 1.0, 1.0] as const },
    /** Smooth ease-in-out for content transitions */
    easeInOut: { type: "easeInOut" as const, bezier: [0.4, 0.0, 0.2, 1.0] as const },
  },

  /** Delay tokens (milliseconds) */
  delay: {
    /** No delay */
    none: 0,
    /** Stagger start for grouped items */
    stagger: 50,
    /** Short wait before revealing content */
    short: 100,
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
