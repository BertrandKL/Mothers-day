const page = document.querySelector('.page');
const petalColors = ['#ffbed6', '#ffd8e8', '#ffc6d9', '#ffe7f2'];
let isPointerDown = false;

const randomBetween = (min, max) => Math.random() * (max - min) + min;

const createPetal = (x, y, color, size = 16) => {
  const petal = document.createElement('div');
  petal.className = 'petal';
  petal.style.left = `${x}px`;
  petal.style.top = `${y}px`;
  petal.style.width = `${size}px`;
  petal.style.height = `${size * 1.4}px`;
  petal.style.background = color;
  petal.style.transform = `rotate(${randomBetween(-30, 30)}deg)`;
  petal.addEventListener('animationend', () => petal.remove());
  page.appendChild(petal);
};

const createSparkle = (x, y, size = 10) => {
  const sparkle = document.createElement('div');
  sparkle.className = 'sparkle';
  sparkle.style.left = `${x}px`;
  sparkle.style.top = `${y}px`;
  sparkle.style.width = `${size}px`;
  sparkle.style.height = `${size}px`;
  sparkle.addEventListener('animationend', () => sparkle.remove());
  page.appendChild(sparkle);
};

const addPetalTrail = (event) => {
  if (!page) return;
  const rect = page.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  createPetal(x + randomBetween(-12, 12), y + randomBetween(-12, 12), petalColors[Math.floor(randomBetween(0, petalColors.length))], randomBetween(12, 18));
  if (Math.random() > 0.6) {
    createSparkle(x + randomBetween(-8, 8), y + randomBetween(-8, 8), randomBetween(8, 14));
  }
};

const triggerBloom = (clientX, clientY) => {
  if (!page) return;
  const rect = page.getBoundingClientRect();
  const x = clientX - rect.left;
  const y = clientY - rect.top;
  for (let i = 0; i < 10; i += 1) {
    createPetal(x + randomBetween(-24, 24), y + randomBetween(-24, 24), petalColors[Math.floor(randomBetween(0, petalColors.length))], randomBetween(10, 22));
    createSparkle(x + randomBetween(-18, 18), y + randomBetween(-18, 18), randomBetween(8, 14));
  }
};

if (page) {
  page.addEventListener('pointerdown', () => {
    isPointerDown = true;
  });

  page.addEventListener('pointerup', () => {
    isPointerDown = false;
  });

  page.addEventListener('pointerleave', () => {
    isPointerDown = false;
  });

  page.addEventListener('pointermove', (event) => {
    if (!event.isPrimary) return;
    if (isPointerDown) {
      addPetalTrail(event);
    } else if (Math.random() > 0.85) {
      addPetalTrail(event);
    }
  });

  page.addEventListener('click', (event) => {
    triggerBloom(event.clientX, event.clientY);
  });
}
