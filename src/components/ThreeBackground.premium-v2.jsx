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

      {/* Clearly visible but subtle fine grid */}
      <div className="absolute inset-0 premium-grid opacity-80" />

      {/* Scattered fine dots — subtle structure */}
      <div className="absolute inset-0 premium-dots opacity-40" />

      {/* Restrained glass coating — very slight glassmorphism depth */}
      <div className="absolute inset-0 premium-glass" />

      {/* Soft glass sheen — light diffusion across the surface */}
      <div className="absolute inset-0 premium-sheen" />

      {/* Soft, low-contrast radial light from the top */}
      <div className="absolute inset-0 premium-light opacity-70" />

      {/* Gentle vignette for depth, keeping edges quiet */}
      <div className="absolute inset-0 premium-vignette" />
    </div>
  );
};

export default ThreeBackground;