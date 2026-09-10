'use client';

import type { ComponentType } from 'react';
import { useCallback, useEffect, useState } from 'react';
import SystemsManifoldFallback from '@/components/visual/SystemsManifoldFallback';
import type { SceneStats } from '@/components/visual/SystemsManifoldCanvas';

type SceneComponent = ComponentType<{
  onReady: (stats: SceneStats) => void;
  onUnavailable: () => void;
}>;

type NavigatorWithMemory = Navigator & { deviceMemory?: number };
type WindowWithIdle = Window & {
  requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
  cancelIdleCallback?: (handle: number) => void;
};

let scenePromise: Promise<typeof import('./SystemsManifoldCanvas')> | undefined;

function loadScene() {
  scenePromise ??= import('./SystemsManifoldCanvas');
  return scenePromise;
}

export default function SystemsManifold() {
  const [Scene, setScene] = useState<SceneComponent | null>(null);
  const [ready, setReady] = useState(false);

  const handleReady = useCallback((_stats: SceneStats) => setReady(true), []);
  const handleUnavailable = useCallback(() => {
    setReady(false);
    setScene(null);
  }, []);

  useEffect(() => {
    let cancelled = false;
    let idleHandle: number | undefined;
    let timeoutHandle: ReturnType<typeof setTimeout> | undefined;
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const lowMemory = (navigator as NavigatorWithMemory).deviceMemory;
    const idleWindow = window as WindowWithIdle;

    const schedule = () => {
      if (motionQuery.matches || (typeof lowMemory === 'number' && lowMemory <= 2)) return;

      const start = () => {
        loadScene()
          .then((module) => {
            if (!cancelled) setScene(() => module.default);
          })
          .catch(() => {
            if (!cancelled) handleUnavailable();
          });
      };

      if (idleWindow.requestIdleCallback) {
        idleHandle = idleWindow.requestIdleCallback(start, { timeout: 1500 });
      } else {
        timeoutHandle = setTimeout(start, 500);
      }
    };

    const handleMotionChange = () => {
      if (motionQuery.matches) {
        setScene(null);
        setReady(false);
      } else {
        schedule();
      }
    };

    schedule();
    motionQuery.addEventListener('change', handleMotionChange);

    return () => {
      cancelled = true;
      motionQuery.removeEventListener('change', handleMotionChange);
      if (idleHandle !== undefined) idleWindow.cancelIdleCallback?.(idleHandle);
      if (timeoutHandle !== undefined) clearTimeout(timeoutHandle);
    };
  }, [handleUnavailable]);

  return (
    <div className="manifold-shell" data-ready={ready ? 'true' : 'false'} aria-hidden="true">
      <SystemsManifoldFallback />
      {Scene ? <Scene onReady={handleReady} onUnavailable={handleUnavailable} /> : null}
    </div>
  );
}
