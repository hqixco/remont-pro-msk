"use client";

import { useEffect, useState } from "react";

export const MODAL_ANIMATION_MS = 180;

type ModalPhase = "closed" | "open" | "closing";

export function useModalPresence(isOpen: boolean) {
  const [phase, setPhase] = useState<ModalPhase>(isOpen ? "open" : "closed");

  useEffect(() => {
    if (isOpen) {
      const frameId = window.requestAnimationFrame(() => {
        setPhase("open");
      });

      return () => window.cancelAnimationFrame(frameId);
    }

    const closeFrameId = window.requestAnimationFrame(() => {
      setPhase((currentPhase) =>
        currentPhase === "closed" ? currentPhase : "closing"
      );
    });

    const timeoutId = window.setTimeout(() => {
      setPhase("closed");
    }, MODAL_ANIMATION_MS);

    return () => {
      window.cancelAnimationFrame(closeFrameId);
      window.clearTimeout(timeoutId);
    };
  }, [isOpen]);

  const shouldRender = isOpen || phase !== "closed";
  const isVisible = phase === "open";

  return { shouldRender, isVisible };
}
