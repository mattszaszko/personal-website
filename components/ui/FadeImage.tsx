"use client";

import { useEffect, useState } from "react";
import NextImage, { type ImageProps } from "next/image";

type FadeImageProps = Omit<ImageProps, "onLoad"> & {
  /** Fade-in duration after the image has loaded */
  fadeDurationMs?: number;
};

/**
 * Shows a quiet shimmer placeholder until the image decodes, then fades it in.
 */
export default function FadeImage({
  className = "",
  fadeDurationMs = 450,
  alt,
  style,
  fill,
  ...props
}: FadeImageProps) {
  const [loaded, setLoaded] = useState(false);
  const srcKey =
    typeof props.src === "string" ? props.src : JSON.stringify(props.src);

  useEffect(() => {
    setLoaded(false);
  }, [srcKey]);

  return (
    <span
      className={
        fill
          ? "absolute inset-0 block overflow-hidden"
          : "relative block h-full w-full overflow-hidden"
      }
    >
      <span
        aria-hidden
        className={`image-shimmer pointer-events-none absolute inset-0 transition-opacity ease-out ${
          loaded ? "opacity-0" : "opacity-100"
        }`}
        style={{ transitionDuration: `${fadeDurationMs}ms` }}
      />
      <NextImage
        {...props}
        fill={fill}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`transition-[opacity,transform] ease-out ${className}`.trim()}
        style={{
          ...style,
          opacity: loaded ? 1 : 0,
          transitionDuration: `${fadeDurationMs}ms`,
        }}
      />
    </span>
  );
}
