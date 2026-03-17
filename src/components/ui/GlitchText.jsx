import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function GlitchText({ text, as: Component = 'span', className = '' }) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';

  useEffect(() => {
    let interval = null;
    
    if (isHovering) {
      let iteration = 0;
      interval = setInterval(() => {
        setDisplayText((prev) => 
          prev.split('')
            .map((letter, index) => {
              if (index < iteration) {
                return text[index];
              }
              return letters[Math.floor(Math.random() * 26)];
            })
            .join('')
        );

        if (iteration >= text.length) {
          clearInterval(interval);
        }

        iteration += 1 / 3;
      }, 30);
    } else {
      setDisplayText(text);
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isHovering, text]);

  return (
    <Component 
      className={className}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      data-value={text}
    >
      {displayText}
    </Component>
  );
}
