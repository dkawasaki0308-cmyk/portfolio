// ヘッダー下の小さな庭。草と花がゆれて、ときどき鳥が横切る。
(() => {
  const canvas = document.querySelector('[data-garden]');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const colors = {
    stem: '#8b917a',
    grass: ['#a9ad96', '#959a82', '#bcbfab'],
    flowers: ['#88727d', '#b08d8f', '#c9b38c', '#9c8fa8', '#f1ece2'],
    center: '#c9a86a',
    bird: '#5d5f57',
    ground: '#d3d2c7',
  };

  // 毎回同じ庭になるよう、シード付きの乱数を使う
  let seed = 121;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  const pick = (list) => list[Math.floor(rand() * list.length)];

  let width = 0;
  let height = 0;
  let grass = [];
  let flowers = [];
  let birds = [];
  let nextBird = 3;

  const build = () => {
    seed = 121;
    const ground = height * 0.86;
    grass = Array.from({ length: Math.round(width / 5) }, () => ({
      x: rand() * width,
      base: ground + rand() * 4,
      h: height * (0.08 + rand() * 0.16),
      lean: (rand() - 0.5) * 6,
      phase: rand() * Math.PI * 2,
      color: pick(colors.grass),
    }));
    flowers = Array.from({ length: Math.max(8, Math.round(width / 38)) }, () => ({
      x: 12 + rand() * (width - 24),
      base: ground + rand() * 3,
      h: height * (0.22 + rand() * 0.42),
      r: 2.5 + rand() * 3.5,
      petals: 5 + Math.floor(rand() * 3),
      phase: rand() * Math.PI * 2,
      speed: 0.6 + rand() * 0.6,
      color: pick(colors.flowers),
    })).sort((a, b) => b.h - a.h);
  };

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    build();
  };

  const sway = (phase, time, speed = 1) => Math.sin(time * speed + phase) * 0.5 + Math.sin(time * speed * 0.37 + phase * 2) * 0.5;

  const drawGrass = (time) => {
    ctx.lineWidth = 1;
    for (const g of grass) {
      const tip = g.lean + sway(g.phase, time, 1.3) * 3;
      ctx.strokeStyle = g.color;
      ctx.beginPath();
      ctx.moveTo(g.x, g.base);
      ctx.quadraticCurveTo(g.x + tip * 0.3, g.base - g.h * 0.6, g.x + tip, g.base - g.h);
      ctx.stroke();
    }
  };

  const drawFlower = (f, time) => {
    const bend = sway(f.phase, time, f.speed) * (f.h * 0.06);
    const topX = f.x + bend;
    const topY = f.base - f.h;

    ctx.strokeStyle = colors.stem;
    ctx.lineWidth = 1.1;
    ctx.beginPath();
    ctx.moveTo(f.x, f.base);
    ctx.quadraticCurveTo(f.x + bend * 0.2, f.base - f.h * 0.5, topX, topY);
    ctx.stroke();

    // 葉
    ctx.fillStyle = colors.stem;
    ctx.beginPath();
    ctx.ellipse(f.x + bend * 0.15 + 4, f.base - f.h * 0.35, 4, 1.6, -0.5, 0, Math.PI * 2);
    ctx.fill();

    // 花びら
    const spin = sway(f.phase, time, 0.4) * 0.3;
    ctx.fillStyle = f.color;
    for (let i = 0; i < f.petals; i++) {
      const a = (i / f.petals) * Math.PI * 2 + spin;
      ctx.beginPath();
      ctx.ellipse(topX + Math.cos(a) * f.r, topY + Math.sin(a) * f.r, f.r * 0.9, f.r * 0.5, a, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = colors.center;
    ctx.beginPath();
    ctx.arc(topX, topY, f.r * 0.45, 0, Math.PI * 2);
    ctx.fill();
  };

  const spawnBird = () => {
    const dir = Math.random() < 0.5 ? 1 : -1;
    const flock = 1 + Math.floor(Math.random() * 3);
    for (let i = 0; i < flock; i++) {
      birds.push({
        x: dir > 0 ? -20 - i * 18 : width + 20 + i * 18,
        y: height * (0.12 + Math.random() * 0.3) + i * 6,
        vx: dir * (28 + Math.random() * 14),
        size: 4 + Math.random() * 2.5,
        phase: Math.random() * Math.PI * 2,
      });
    }
  };

  const drawBirds = (time, dt) => {
    ctx.strokeStyle = colors.bird;
    ctx.lineWidth = 1.2;
    ctx.lineCap = 'round';
    for (const b of birds) {
      b.x += b.vx * dt;
      b.y += Math.sin(time * 1.5 + b.phase) * 0.15;
      const wing = Math.sin(time * 9 + b.phase) * b.size * 0.6;
      ctx.beginPath();
      ctx.moveTo(b.x - b.size, b.y - wing);
      ctx.quadraticCurveTo(b.x - b.size * 0.4, b.y - wing * 0.2, b.x, b.y);
      ctx.quadraticCurveTo(b.x + b.size * 0.4, b.y - wing * 0.2, b.x + b.size, b.y - wing);
      ctx.stroke();
    }
    birds = birds.filter((b) => b.x > -60 && b.x < width + 60);
  };

  const draw = (time, dt) => {
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = colors.ground;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, height * 0.86 + 4.5);
    ctx.lineTo(width, height * 0.86 + 4.5);
    ctx.stroke();
    drawGrass(time);
    for (const f of flowers) drawFlower(f, time);
    drawBirds(time, dt);
  };

  let frame = 0;
  let last = 0;
  const loop = (now) => {
    const time = now / 1000;
    const dt = last ? Math.min(time - last, 0.1) : 0;
    last = time;
    nextBird -= dt;
    if (nextBird <= 0) {
      spawnBird();
      nextBird = 7 + Math.random() * 9;
    }
    draw(time, dt);
    frame = requestAnimationFrame(loop);
  };

  const start = () => {
    cancelAnimationFrame(frame);
    last = 0;
    if (reduceMotion.matches || document.hidden) {
      // 動きを減らす設定のときは静止画を1枚だけ描く
      birds = [];
      draw(0, 0);
    } else {
      frame = requestAnimationFrame(loop);
    }
  };

  resize();
  start();
  canvas.classList.add('is-ready');

  new ResizeObserver(() => {
    resize();
    if (reduceMotion.matches) draw(0, 0);
  }).observe(canvas);
  document.addEventListener('visibilitychange', start);
  reduceMotion.addEventListener('change', start);
})();
