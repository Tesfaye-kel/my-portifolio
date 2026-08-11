/**
 * Premium background — clean, subtle, sophisticated.
 *
 * Intentionally understated: a fine grid, a soft radial light, and a gentle
 * vignette for depth. No particles, no heavy animation, no colorful glows.
 * The content remains the primary focus.
 *
 * The previous (experimental) version is preserved at:
 *   ./ThreeBackground.original.jsx
 * Restore it by copying that file over this one.
 */
const ThreeBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* Base deep background */}
      <div className="absolute inset-0 bg-[#0a192f]" />

      {/* Clearly visible fine grid — more prominent */}
      <div className="absolute inset-0 premium-grid" />

      {/* Transparent glass coating — minimal depth */}
      <div className="absolute inset-0 premium-glass opacity-50" />

      {/* Soft light wash from the top */}
      <div className="absolute inset-0 premium-light opacity-60" />

      {/* Very light depth, keeping edges open and airy */}
      <div className="absolute inset-0 premium-vignette opacity-70" />
    </div>
  );
};

export default ThreeBackground;