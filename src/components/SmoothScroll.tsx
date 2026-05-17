"use client";

import { ReactNode } from "react";

// Lenis was removed: it attaches wheel listeners to window with { passive: false }
// and calls preventDefault(), which permanently blocks scroll inside any fixed
// overlay modal regardless of lenis.stop(). CSS smooth-scroll handles this instead.
export default function SmoothScroll({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
