'use client';

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { ResponseStream, type Mode } from '@/components/ui/response-stream';

type StreamOnViewProps = {
  text: string;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  mode?: Mode;
  fadeDuration?: number;
  segmentDelay?: number;
};

/**
 * Defers a ResponseStream until the element scrolls into view, so text
 * streams in word by word exactly when the visitor reaches it. Before that,
 * the same text is rendered invisibly to reserve layout space (no CLS).
 */
export function StreamOnView({
  text,
  as = 'div',
  className,
  mode = 'fade',
  fadeDuration = 800,
  segmentDelay = 30,
}: StreamOnViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {inView ? (
        <ResponseStream
          textStream={text}
          mode={mode}
          as={as}
          className={className}
          fadeDuration={fadeDuration}
          segmentDelay={segmentDelay}
        />
      ) : (
        React.createElement(
          as,
          { className: cn(className, 'opacity-0'), 'aria-hidden': 'true' },
          text
        )
      )}
    </div>
  );
}
