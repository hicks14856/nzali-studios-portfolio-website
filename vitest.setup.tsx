import "@testing-library/jest-dom/vitest";
import React from "react";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

afterEach(() => {
  cleanup();
});

class ResizeObserverMock {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

Object.defineProperty(globalThis, "ResizeObserver", {
  writable: true,
  configurable: true,
  value: ResizeObserverMock,
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

class IntersectionObserverMock {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn();
  root = null;
  rootMargin = "";
  thresholds = [];
}

Object.defineProperty(globalThis, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: IntersectionObserverMock,
});

HTMLCanvasElement.prototype.getContext = vi.fn(() => ({
  drawImage: vi.fn(),
})) as unknown as typeof HTMLCanvasElement.prototype.getContext;

vi.mock("next/image", () => ({
  default: ({
    alt,
    onLoad,
    className,
    ...props
  }: {
    alt: string;
    onLoad?: (event: { currentTarget: HTMLImageElement }) => void;
    className?: string;
    [key: string]: unknown;
  }) => (
    <img
      alt={alt}
      className={className}
      onLoad={(event) => {
        Object.defineProperty(event.currentTarget, "naturalWidth", {
          value: 100,
          configurable: true,
        });
        Object.defineProperty(event.currentTarget, "naturalHeight", {
          value: 100,
          configurable: true,
        });
        onLoad?.(event);
      }}
      {...props}
    />
  ),
}));

vi.mock("next/dynamic", () => ({
  default: () =>
    function DynamicMock(props: Record<string, unknown>) {
      return <div data-testid="dynamic-canvas" {...props} />;
    },
}));

vi.mock("lenis", () => ({
  default: class LenisMock {
    raf = vi.fn();
    destroy = vi.fn();
    scrollTo = vi.fn();
    constructor(_options?: unknown) {}
  },
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/studio",
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
}));

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("@react-three/drei", () => ({
  Float: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
  Sparkles: () => null,
  useTexture: () => ({}),
}));

vi.mock("@react-three/fiber", () => ({
  Canvas: ({
    children,
    className,
  }: {
    children?: React.ReactNode;
    className?: string;
  }) => (
    <div data-testid="r3f-canvas" className={className}>
      {children}
    </div>
  ),
  useFrame: vi.fn(),
  useThree: vi.fn(() => ({
    size: { width: 800, height: 600 },
    camera: { position: { x: 0, y: 0, z: 0 }, lookAt: vi.fn() },
    pointer: { x: 0, y: 0 },
  })),
}));

vi.mock("three", () => ({
  MathUtils: {
    clamp: (value: number, min: number, max: number) =>
      Math.min(max, Math.max(min, value)),
    lerp: (a: number, b: number, t: number) => a + (b - a) * t,
  },
  Vector2: vi.fn().mockImplementation(function Vector2(
    this: { x: number; y: number; set: ReturnType<typeof vi.fn> },
    x = 0,
    y = 0
  ) {
    this.x = x;
    this.y = y;
    this.set = vi.fn();
  }),
  AdditiveBlending: 2,
  SRGBColorSpace: "srgb",
  DoubleSide: 2,
  MeshBasicMaterial: class MeshBasicMaterial {},
}));
