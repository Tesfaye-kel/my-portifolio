import { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [ringPosition, setRingPosition] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check if device supports hover (desktop only)
    const isTouchDevice = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    if (isTouchDevice) return;

    let frame = 0;
    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setPosition({ x: mouseX, y: mouseY });
      setVisible(true);
    };

    const onMouseOver = (e) => {
      const target = e.target;
      const isInteractive = target.closest('a, button, [role="button"], input, textarea, select, .project-card, .tech-card');
      setHovering(!!isInteractive);
    };

    const onMouseLeave = () => {
      setVisible(false);
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      setRingPosition({ x: ringX, y: ringY });
      frame = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    document.documentElement.addEventListener('mouseleave', onMouseLeave);
    frame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <div
        className="cursor-dot"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          opacity: visible ? 1 : 0,
        }}
      />
      <div
        className={`cursor-ring ${hovering ? 'hovering' : ''}`}
        style={{
          left: `${ringPosition.x}px`,
          top: `${ringPosition.y}px`,
          opacity: visible ? 1 : 0,
        }}
      />
    </>
  );
};

export default CustomCursor;