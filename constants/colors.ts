/**
 * Sideline design color tokens.
 * Every color in the application must reference a token from this file.
 * Never hard-code hex values in components or screens.
 *
 * @see .omp/Plan/Color/color.md
 */

export const Colors = {
  /** Global application background */
  background: {
    app: "#131318",
  },

  /** Primary action button (e.g., Continue, Accept) */
  button: {
    primary: {
      background: "#FFFFFF",
      border: "#3F3F43",
      text: "#131318",
    },
    secondary: {
      background: "#131318",
      border: "#3F3F43",
      text: "#FFFFFF",
    },
  },

  /** Text inputs and dropdown selectors */
  input: {
    default: {
      background: "#131318",
      border: "#3F3F43",
      text: "#FFFFFF",
      placeholder: "#FFFFFF",
    },
  },

  /** 10-step coaching AttributeBar segments */
  attribute: {
    segment: {
      active: "#FFFFFF",
      inactive: "#3F3F43",
    },
  },
} as const;

export type ColorToken = typeof Colors;
