"use client";

import Image, { type ImageProps } from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

type SecureImageProps = Omit<ImageProps, "onDragStart" | "draggable"> & {
  containerClassName?: string;
  overlayClassName?: string;
};

function mergeClasses(...classes: Array<string | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function SecureImage({
  alt,
  className,
  containerClassName,
  overlayClassName,
  fill,
  sizes,
  style,
  onLoad,
  ...imageProps
}: SecureImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvasReady, setCanvasReady] = useState(false);

  const paintCanvas = useCallback((source: CanvasImageSource) => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const context = canvas.getContext("2d", { alpha: false });
    if (!context) return;

    const width =
      source instanceof HTMLImageElement
        ? source.naturalWidth
        : canvas.width || container.clientWidth;
    const height =
      source instanceof HTMLImageElement
        ? source.naturalHeight
        : canvas.height || container.clientHeight;

    if (!width || !height) return;

    canvas.width = width;
    canvas.height = height;
    context.drawImage(source, 0, 0, width, height);
    setCanvasReady(true);
  }, []);

  const handleImageLoad = useCallback(
    (event: React.SyntheticEvent<HTMLImageElement>) => {
      paintCanvas(event.currentTarget);
      onLoad?.(event);
    },
    [onLoad, paintCanvas]
  );

  useEffect(() => {
    if (!fill || canvasReady) return;

    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(() => {
      const hiddenImage = container.querySelector<HTMLImageElement>(
        "[data-secure-image-source='true']"
      );
      if (hiddenImage?.complete && hiddenImage.naturalWidth > 0) {
        paintCanvas(hiddenImage);
      }
    });

    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, [canvasReady, fill, paintCanvas]);

  const containerStyle: CSSProperties | undefined = fill
    ? { position: "relative" }
    : undefined;

  return (
    <div
      ref={containerRef}
      className={mergeClasses(
        "relative isolate overflow-hidden select-none",
        fill ? "h-full w-full" : undefined,
        containerClassName
      )}
      style={containerStyle}
      onDragStart={(event) => event.preventDefault()}
      onContextMenu={(event) => event.preventDefault()}
    >
      <Image
        {...imageProps}
        alt={alt}
        fill={fill}
        sizes={sizes}
        draggable={false}
        data-secure-image-source="true"
        onLoad={handleImageLoad}
        className={mergeClasses(
          fill ? "object-cover" : undefined,
          className,
          canvasReady
            ? "pointer-events-none absolute h-px w-px overflow-hidden opacity-0"
            : "h-full w-full object-cover"
        )}
        style={canvasReady ? { clip: "rect(0 0 0 0)" } : style}
      />

      <canvas
        ref={canvasRef}
        aria-label={typeof alt === "string" ? alt : undefined}
        role="img"
        className={mergeClasses(
          "block h-full w-full",
          fill ? "object-cover" : undefined,
          className,
          !canvasReady ? "opacity-0" : undefined
        )}
        style={!canvasReady ? undefined : style}
        onContextMenu={(event) => event.preventDefault()}
        onDragStart={(event) => event.preventDefault()}
      />

      <div
        aria-hidden="true"
        className={mergeClasses(
          "pointer-events-none absolute inset-0 z-10 bg-transparent",
          overlayClassName
        )}
      />
    </div>
  );
}
