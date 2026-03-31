const cursor = document.getElementById("cursor"),
  ring = document.getElementById("cursor-ring");
let mx = 0,
  my = 0,
  rx = 0,
  ry = 0;
document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx + "px";
  cursor.style.top = my + "px";
});
function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + "px";
  ring.style.top = ry + "px";
  requestAnimationFrame(animRing);
}
animRing();
document
  .querySelectorAll(
    "a,.btn,.skill-card,.project-card,.social-btn,.contact-card,.cert-card",
  )
  .forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.transform = "translate(-50%,-50%) scale(2)";
      ring.style.transform = "translate(-50%,-50%) scale(0.5)";
      ring.style.opacity = "0";
    });
    el.addEventListener("mouseleave", () => {
      cursor.style.transform = "translate(-50%,-50%) scale(1)";
      ring.style.transform = "translate(-50%,-50%) scale(1)";
      ring.style.opacity = "0.6";
    });
  });
const canvas = document.getElementById("three-canvas");
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.z = 5;
const count = 3000,
  geo = new THREE.BufferGeometry();
const pos = new Float32Array(count * 3),
  col = new Float32Array(count * 3);
for (let i = 0; i < count * 3; i += 3) {
  pos[i] = (Math.random() - 0.5) * 30;
  pos[i + 1] = (Math.random() - 0.5) * 30;
  pos[i + 2] = (Math.random() - 0.5) * 30;
  const r = Math.random();
  if (r < 0.33) {
    col[i] = 0.42;
    col[i + 1] = 0.39;
    col[i + 2] = 1;
  } else if (r < 0.66) {
    col[i] = 0;
    col[i + 1] = 0.96;
    col[i + 2] = 0.79;
  } else {
    col[i] = 1;
    col[i + 1] = 0.42;
    col[i + 2] = 0.42;
  }
}
geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
const mat = new THREE.PointsMaterial({
  size: 0.05,
  vertexColors: true,
  transparent: true,
  opacity: 0.7,
});
const points = new THREE.Points(geo, mat);
scene.add(points);
let mouseX = 0,
  mouseY = 0;
document.addEventListener("mousemove", (e) => {
  mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
  mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});
function animate() {
  requestAnimationFrame(animate);
  points.rotation.y += 0.0005;
  points.rotation.x += 0.0002;
  camera.position.x += (mouseX * 0.3 - camera.position.x) * 0.03;
  camera.position.y += (-mouseY * 0.3 - camera.position.y) * 0.03;
  camera.lookAt(scene.position);
  renderer.render(scene, camera);
}
animate();
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("visible");
    });
  },
  { threshold: 0.1 },
);
document.querySelectorAll(".fade-in").forEach((el) => obs.observe(el));
