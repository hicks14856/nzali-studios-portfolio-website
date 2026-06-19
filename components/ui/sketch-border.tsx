import type { ReactNode } from "react";

type SketchBorderProps = {
  children: ReactNode;
  className?: string;
  variant?: "default" | "heavy" | "crimson";
  as?: "div" | "section" | "article" | "aside";
};

const variantClasses = {
  default: "",
  heavy: "sketch-border-heavy",
  crimson: "sketch-border-crimson",
};

export function SketchBorder({
  children,
  className = "",
  variant = "default",
  as: Tag = "div",
}: SketchBorderProps) {
  return (
    <Tag
      className={`sketch-border rounded-sketch ${variantClasses[variant]} ${className}`}
    >
      {children}
    </Tag>
  );
}

/** Inline SVG filter definitions — mount once in layout */
export function SketchFilters() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute h-0 w-0 overflow-hidden"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter
          id="pencil-roughness"
          x="-5%"
          y="-5%"
          width="110%"
          height="110%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.04 0.06"
            numOctaves="3"
            seed="2"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="1.8"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
        <filter
          id="pencil-roughness-light"
          x="-3%"
          y="-3%"
          width="106%"
          height="106%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.03 0.05"
            numOctaves="2"
            seed="7"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="1.2"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}
