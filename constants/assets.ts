/**
 * Sideline asset path constants.
 * Every asset reference must use a token from here.
 * Never import asset paths directly in screens or components.
 *
 * Note: Uses require() for image assets which is the standard
 * React Native pattern and compatible with Expo SDK 54 metro bundler.
 *
 * @see .omp/Plan/Asset/asset.md
 * @see .omp/Plan/Asset/icon.md
 */

export const Assets = {
  /** Brand identity */
  brand: {
    /** Icon-only Sideline brand mark */
    logo: require("../assets/Generic/Logo-brand/brand-logo.png"),
  },

  /** Generic wireframe placeholders */
  generic: {
    /** Temporary player/manager face */
    face: require("../assets/Generic/Pace/Generic-pace.png"),
    /** Temporary club badge */
    badge: require("../assets/Generic/Badge/Badge-generic.png"),
  },
} as const;

export type AssetToken = typeof Assets;
