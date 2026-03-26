/**
 * ProjectImageDistortion — CSS-only replacement
 * 
 * Previously: Each project card spawned its own <Canvas> (WebGL context).
 * With 4 cards, that was 4 GPUs contexts running useFrame every tick.
 * 
 * Now: A simple <img> with CSS transitions for hover distortion.
 * Visual effect is comparable, GPU cost is near-zero.
 */
export default function ProjectImageDistortion({ imageSrc, isHovered }) {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <img
        src={imageSrc}
        alt=""
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover transition-all duration-700 ease-out"
        style={{
          transform: isHovered ? 'scale(1.08)' : 'scale(1.02)',
          filter: isHovered
            ? 'brightness(0.7) saturate(1.3)'
            : 'brightness(0.5) saturate(0.9)',
        }}
      />
    </div>
  );
}
