'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export type SceneStats = {
  drawCalls: number;
  triangles: number;
  dpr: number;
};

type SystemsManifoldCanvasProps = {
  onReady: (stats: SceneStats) => void;
  onUnavailable: () => void;
};

type ModuleSpec = {
  size: readonly [number, number, number];
  position: readonly [number, number, number];
};

const STATIC_MODULES: ModuleSpec[] = [
  { size: [3, 0.4, 0.4], position: [-3.15, 0.7, 0] },
  { size: [0.8, 0.8, 0.8], position: [0.45, -0.05, 0] },
  { size: [3, 0.4, 0.4], position: [2.9, -0.65, 0] },
];

const ROUTE: ModuleSpec = {
  size: [0.6, 1, 0.6],
  position: [-1.05, 0.2, 0],
};

function mergeModuleEdges(modules: ModuleSpec[]) {
  const positions: number[] = [];

  modules.forEach(({ size, position }) => {
    const box = new THREE.BoxGeometry(...size);
    const edges = new THREE.EdgesGeometry(box);
    const attribute = edges.getAttribute('position');
    for (let index = 0; index < attribute.count; index += 1) {
      positions.push(
        attribute.getX(index) + position[0],
        attribute.getY(index) + position[1],
        attribute.getZ(index) + position[2],
      );
    }
    edges.dispose();
    box.dispose();
  });

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  return geometry;
}

export default function SystemsManifoldCanvas({
  onReady,
  onUnavailable,
}: SystemsManifoldCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('webgl2', {
      alpha: true,
      antialias: true,
      depth: true,
      powerPreference: 'low-power',
    });
    if (!context) {
      onUnavailable();
      return;
    }

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        context,
        alpha: true,
        antialias: true,
        powerPreference: 'low-power',
      });
    } catch {
      onUnavailable();
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-5, 5, 3, -3, 0.1, 100);
    const pitch = THREE.MathUtils.degToRad(20);
    const yaw = THREE.MathUtils.degToRad(-15);
    const distance = 10;
    camera.position.set(
      Math.sin(yaw) * Math.cos(pitch) * distance,
      Math.sin(pitch) * distance,
      Math.cos(yaw) * Math.cos(pitch) * distance,
    );
    camera.lookAt(0, 0, 0);

    const manifoldRoot = new THREE.Group();
    manifoldRoot.scale.setScalar(0.86);
    scene.add(manifoldRoot);

    const edgeMaterial = new THREE.LineBasicMaterial({
      color: 0x1f4e4a,
      transparent: true,
      opacity: 0.7,
    });
    const staticEdgesGeometry = mergeModuleEdges(STATIC_MODULES);
    const staticModuleLines = new THREE.LineSegments(staticEdgesGeometry, edgeMaterial);
    manifoldRoot.add(staticModuleLines);

    const routeBox = new THREE.BoxGeometry(...ROUTE.size);
    const routeEdgesGeometry = new THREE.EdgesGeometry(routeBox);
    routeBox.dispose();
    const routePivot = new THREE.Group();
    routePivot.position.set(...ROUTE.position);
    const routeLines = new THREE.LineSegments(routeEdgesGeometry, edgeMaterial);
    routePivot.add(routeLines);
    manifoldRoot.add(routePivot);

    const channelGeometry = new THREE.BoxGeometry(1, 1, 1);
    const channelMaterial = new THREE.MeshBasicMaterial({
      color: 0x1f4e4a,
      transparent: true,
      opacity: 0.9,
    });
    const channels = new THREE.InstancedMesh(channelGeometry, channelMaterial, 3);
    const channelPairs = [
      [new THREE.Vector3(-1.77, 0.7, 0), new THREE.Vector3(-1.23, 0.34, 0)],
      [new THREE.Vector3(-0.75, 0.06, 0), new THREE.Vector3(0.05, -0.05, 0)],
      [new THREE.Vector3(0.85, -0.16, 0), new THREE.Vector3(1.4, -0.58, 0)],
    ] as const;
    const xAxis = new THREE.Vector3(1, 0, 0);
    const matrix = new THREE.Matrix4();
    const midpoint = new THREE.Vector3();
    const direction = new THREE.Vector3();
    const quaternion = new THREE.Quaternion();
    const scale = new THREE.Vector3();

    channelPairs.forEach(([start, end], index) => {
      direction.subVectors(end, start);
      midpoint.copy(start).add(end).multiplyScalar(0.5);
      quaternion.setFromUnitVectors(xAxis, direction.clone().normalize());
      scale.set(direction.length() + 0.24, 0.07, 0.07);
      matrix.compose(midpoint, quaternion, scale);
      channels.setMatrixAt(index, matrix);
    });
    channels.instanceMatrix.needsUpdate = true;
    manifoldRoot.add(channels);

    renderer.setClearColor(0x000000, 0);
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    renderer.setPixelRatio(dpr);

    const resize = () => {
      const width = Math.max(1, canvas.clientWidth);
      const height = Math.max(1, canvas.clientHeight);
      const aspect = width / height;
      const frustumHeight = 6.8;
      camera.left = (-frustumHeight * aspect) / 2;
      camera.right = (frustumHeight * aspect) / 2;
      camera.top = frustumHeight / 2;
      camera.bottom = -frustumHeight / 2;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      renderer.render(scene, camera);
    };

    let inViewport = true;
    let documentVisible = !document.hidden;
    let previousTime: number | null = null;
    let elapsed = 0;

    const animate = (time: number) => {
      const delta = previousTime === null ? 0 : Math.min((time - previousTime) / 1000, 0.1);
      previousTime = time;
      elapsed += delta;
      manifoldRoot.rotation.y += 0.05 * delta;
      routePivot.rotation.y =
        THREE.MathUtils.degToRad(10) * Math.sin((elapsed * Math.PI * 2) / 20);
      renderer.render(scene, camera);
    };

    const syncAnimation = () => {
      previousTime = null;
      renderer.setAnimationLoop(inViewport && documentVisible ? animate : null);
      if (!inViewport || !documentVisible) renderer.render(scene, camera);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      inViewport = entry.isIntersecting;
      syncAnimation();
    });
    intersectionObserver.observe(canvas);

    const handleVisibility = () => {
      documentVisible = !document.hidden;
      syncAnimation();
    };
    const handleContextLost = (event: Event) => {
      event.preventDefault();
      renderer.setAnimationLoop(null);
      onUnavailable();
    };
    document.addEventListener('visibilitychange', handleVisibility);
    canvas.addEventListener('webglcontextlost', handleContextLost);

    resize();
    renderer.render(scene, camera);
    canvas.dataset.ready = 'true';
    canvas.dataset.drawCalls = String(renderer.info.render.calls);
    canvas.dataset.triangles = String(renderer.info.render.triangles);
    canvas.dataset.dpr = String(renderer.getPixelRatio());
    onReady({
      drawCalls: renderer.info.render.calls,
      triangles: renderer.info.render.triangles,
      dpr: renderer.getPixelRatio(),
    });
    syncAnimation();

    return () => {
      renderer.setAnimationLoop(null);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      staticEdgesGeometry.dispose();
      routeEdgesGeometry.dispose();
      channelGeometry.dispose();
      edgeMaterial.dispose();
      channelMaterial.dispose();
      channels.dispose();
      renderer.dispose();
    };
  }, [onReady, onUnavailable]);

  return <canvas ref={canvasRef} className="manifold-canvas" aria-hidden="true" />;
}
