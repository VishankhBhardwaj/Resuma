"use client";

import React, {
  ElementType,
  ReactNode,
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";

const cn = (...inputs) => inputs.filter(Boolean).join(" ");

export function VideoText({
  src,
  children,
  className = "",
  autoPlay = true,
  muted = true,
  loop = true,
  preload = "auto",
  fontSize = 12,
  fontWeight = "bold",
  textAnchor = "middle",
  dominantBaseline = "middle",
  fontFamily = "sans-serif",
  as: Component = "div",
  letterSpacing,
  textTransform = "none",
  maxCharsPerLine = 18, // 👈 ADD THIS
  onVideoLoad,
  onVideoError,
  sources = [],
  poster,
}) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  // Convert children → plain string
  const rawText = useMemo(() => {
    return React.Children.toArray(children)
      .map((child) => (typeof child === "string" ? child : ""))
      .join("")
      .trim();
  }, [children]);

  // Split into lines based on maxCharsPerLine
  const lines = useMemo(() => {
    const words = rawText.split(" ");
    const output = [];
    let current = "";

    words.forEach((word) => {
      if ((current + " " + word).trim().length <= maxCharsPerLine) {
        current += " " + word;
      } else {
        output.push(current.trim());
        current = word;
      }
    });

    if (current) output.push(current.trim());
    return output;
  }, [rawText, maxCharsPerLine]);

  // Build SVG with multiple <tspan>
  const svgMask = useMemo(() => {
    const responsiveFontSize =
      typeof fontSize === "number" ? `${fontSize}vw` : fontSize;

    const tspans = lines
      .map(
        (line, i) =>
          `<tspan x="50%" dy="${i === 0 ? "0" : "1.2em"}">${line}</tspan>`
      )
      .join("");

    const svgString = `
      <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>
        <text
          x='50%'
          y='50%'
          font-size='${responsiveFontSize}'
          font-weight='${fontWeight}'
          text-anchor='middle'
          dominant-baseline='middle'
          font-family='${fontFamily}'
          ${letterSpacing ? `letter-spacing='${letterSpacing}'` : ""}
          ${textTransform !== "none" ? `text-transform='${textTransform}'` : ""}
        >
          ${tspans}
        </text>
      </svg>
    `;

    return `url("data:image/svg+xml,${encodeURIComponent(svgString)}")`;
  }, [lines, fontSize, fontWeight, fontFamily, letterSpacing, textTransform]);

  const handleVideoLoad = useCallback(() => {
    setIsVideoLoaded(true);
    onVideoLoad?.();
  }, [onVideoLoad]);

  const handleVideoError = useCallback(
    (event) => {
      console.error("Video failed to load:", event);
      onVideoError?.(event.nativeEvent);
    },
    [onVideoError]
  );

  useEffect(() => {
    if (videoRef.current && autoPlay) {
      videoRef.current.play().catch((error) => {
        console.warn("Autoplay blocked:", error);
      });
    }
  }, [autoPlay]);

  return (
    <Component className={cn("relative w-full h-full overflow-hidden", className)}>
      {/* Mask */}
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center",
          !isVideoLoaded && "opacity-0 duration-500"
        )}
        style={{
          maskImage: svgMask,
          WebkitMaskImage: svgMask,
          maskSize: "contain",
          maskRepeat: "no-repeat",
          maskPosition: "center",
          opacity: isVideoLoaded ? 1 : 0,
          transition: "opacity .5s ease",
        }}
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          preload={preload}
          playsInline
          poster={poster}
          onLoadedData={handleVideoLoad}
          onError={handleVideoError}
        >
          <source src={src} type="video/mp4" />
          {sources.map((s, i) => (
            <source key={i} src={s.src} type={s.type} />
          ))}
        </video>
      </div>

      {!isVideoLoaded && (
        <div className="absolute inset-0 flex items-center justify-center text-white/50">
          Loading...
        </div>
      )}
    </Component>
  );
}
