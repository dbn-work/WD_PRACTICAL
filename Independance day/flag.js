const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function randomColor() {
  const colors = ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#F37121"];
  return colors[Math.floor(Math.random() * colors.length)];
}

function Firework() {
  this.x = Math.random() * canvas.width;
  this.y = canvas.height;
  this.radius = Math.random() * 2 + 1;
  this.color = randomColor();
  this.vx = Math.random() * 2 - 1;
  this.vy = -Math.random() * 5 - 2;
  this.alpha = 1;
}

let fireworks = [];

function animateFireworks() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  fireworks.forEach((fw, i) => {
    ctx.beginPath();
    ctx.arc(fw.x, fw.y, fw.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${hexToRGB(fw.color)},${fw.alpha})`;
    ctx.fill();

    fw.x += fw.vx;
    fw.y += fw.vy;
    fw.alpha -= 0.01;

    if (fw.alpha <= 0) fireworks.splice(i, 1);
  });

  requestAnimationFrame(animateFireworks);
}

function hexToRGB(hex) {
  hex = hex.replace("#", "");
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r},${g},${b}`;
}

setInterval(() => {
  for (let i = 0; i < 5; i++) {
    fireworks.push(new Firework());
  }
}, 300);

animateFireworks();
