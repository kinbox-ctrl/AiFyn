import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "../lib/theme";

/** Three.js wireframe node-globe — soft teal camera nodes on transparent white. */
export default function NodeGlobe({ className = "" }) {
  const mountRef = useRef(null);
  const [theme] = useTheme();
  const dark = theme === "dark";

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.z = 3.4;
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      return; // No WebGL (disabled GPU, old device): skip the decorative globe instead of crashing the page.
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const N = 240;
    const R = 1.28;
    const pos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / N);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      pos[i * 3] = R * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = R * Math.cos(phi);
      pos[i * 3 + 2] = R * Math.sin(phi) * Math.sin(theta);
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const pMat = new THREE.PointsMaterial({ color: 0x0fb5ae, size: 0.032, transparent: true, opacity: 0.85 });
    group.add(new THREE.Points(pGeo, pMat));

    const linePos = [];
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        if (Math.sqrt(dx * dx + dy * dy + dz * dz) < 0.52) {
          linePos.push(pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2], pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2]);
        }
      }
    }
    const lGeo = new THREE.BufferGeometry();
    lGeo.setAttribute("position", new THREE.Float32BufferAttribute(linePos, 3));
    const lMat = new THREE.LineBasicMaterial({ color: dark ? 0x5eead4 : 0x065654, transparent: true, opacity: dark ? 0.16 : 0.13 });
    group.add(new THREE.LineSegments(lGeo, lMat));

    const glow = new THREE.Mesh(
      new THREE.SphereGeometry(R * 0.7, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0x0fb5ae, transparent: true, opacity: dark ? 0.07 : 0.045 })
    );
    group.add(glow);

    let mx = 0, my = 0;
    const onMouse = (e) => {
      mx = e.clientX / window.innerWidth - 0.5;
      my = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("mousemove", onMouse, { passive: true });

    const resize = () => {
      const w = mount.clientWidth || 1;
      const h = mount.clientHeight || 1;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    let raf;
    const tick = () => {
      group.rotation.y += reduced ? 0.0006 : 0.0022;
      group.rotation.x += (my * 0.35 - group.rotation.x) * 0.03;
      camera.position.x += (mx * 0.5 - camera.position.x) * 0.04;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("mousemove", onMouse);
      pGeo.dispose();
      lGeo.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, [dark]);

  return <div ref={mountRef} className={className} aria-hidden="true" />;
}