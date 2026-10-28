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
      <div className="absolute inset-0 bg-[var(--portfolio-bg)]" />

      {/* Palette-aware grid and ambient glow from the supplied home design */}
      <div className="absolute inset-0 premium-grid" />
      <div className="absolute inset-0 portfolio-ambient" />
    </div>
  );
};

export default ThreeBackground;