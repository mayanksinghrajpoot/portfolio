import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Each element can carry a [data-cursor] attribute to customize cursor label
// e.g. <a data-cursor="Visit"> …</a>

const CURSOR_VARIANTS = {
  default: { width: 12, height: 12, borderRadius: '50%', bg: 'rgba(255,255,255,1)', label: '' },
  hover: { width: 64, height: 64, borderRadius: '50%', bg: 'rgba(255,255,255,0.08)', label: '' },
  view: { width: 80, height: 80, borderRadius: '50%', bg: 'rgba(236,72,153,1)', label: 'VIEW' },
  link: { width: 64, height: 64, borderRadius: '50%', bg: 'rgba(255,255,255,0.12)', label: '↗' },
  drag: { width: 64, height: 64, borderRadius: '12px', bg: 'rgba(255,255,255,0.08)', label: 'DRAG' },
};

export default function CustomCursor() {
  const [variant, setVariant] = useState('default');
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);

  // Inner dot tracks 1:1 with zero lag
  const x = cursorX;
  const y = cursorY;

  // Outer ring follows with a tight, consistent spring
  const outerSpring = { damping: 25, stiffness: 400, mass: 0.1 };
  const outerX = useSpring(cursorX, outerSpring);
  const outerY = useSpring(cursorY, outerSpring);

  const hasMoved = useRef(false);

  useEffect(() => {
    // Only render on pointer (non-touch) devices
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const move = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      // Prevent massive re-renders: only set state once when mouse first moves
      if (!hasMoved.current) {
        hasMoved.current = true;
        setIsVisible(true);
      }
    };

    const enter = () => {
      hasMoved.current = true;
      setIsVisible(true);
    };
    const leave = () => {
      hasMoved.current = false;
      setIsVisible(false);
    };

    const hover = (e) => {
      const el = e.target;
      const explicitCursor = el.closest('[data-cursor]');
      if (explicitCursor) {
        const type = explicitCursor.getAttribute('data-cursor');
        setVariant(CURSOR_VARIANTS[type] ? type : 'view');
        return;
      }
      if (el.closest('a[href], button, .magnetic-target, [role="button"]')) {
        // detect if it's a project card or regular hover
        if (el.closest('.project-card')) setVariant('view');
        else if (el.closest('a[href^="http"], a[target="_blank"]')) setVariant('link');
        else setVariant('hover');
      } else {
        setVariant('default');
      }
    };

    // Hide native cursor
    document.documentElement.style.cursor = 'none';

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', hover);
    document.addEventListener('mouseenter', enter);
    document.addEventListener('mouseleave', leave);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', hover);
      document.removeEventListener('mouseenter', enter);
      document.removeEventListener('mouseleave', leave);
      document.documentElement.style.cursor = 'auto';
    };
  }, []);

  // Don't render on touch/mobile
  if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) return null;

  const cv = CURSOR_VARIANTS[variant];
  const isDot = variant === 'default';

  return (
    <>
      {/* Inner dot / filled state */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center mix-blend-difference overflow-hidden"
        style={{
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: cv.width,
          height: cv.height,
          borderRadius: cv.borderRadius,
          backgroundColor: cv.bg,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 28, mass: 0.3 }}
      >
        {cv.label && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-[10px] font-black uppercase tracking-widest text-black select-none"
            style={{ mixBlendMode: 'normal' }}
          >
            {cv.label}
          </motion.span>
        )}
      </motion.div>

      {/* Outer trailing ring */}
      {isDot && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border border-white/30"
          style={{
            x: outerX,
            y: outerY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          animate={{
            width: 36,
            height: 36,
            opacity: isVisible ? 0.6 : 0,
          }}
          transition={{ type: 'spring', stiffness: 150, damping: 18 }}
        />
      )}
    </>
  );
}
