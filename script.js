const loveButton = document.getElementById('loveButton');
const stage = document.querySelector('.stage');

const createSparkle = (x, y) => {
  const sparkle = document.createElement('div');
  sparkle.className = 'sparkle';
  sparkle.style.left = `${x}px`;
  sparkle.style.top = `${y}px`;
  sparkle.style.background = `radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,157,198,0.8) 40%, transparent 70%)`;
  stage.appendChild(sparkle);

  sparkle.addEventListener('animationend', () => sparkle.remove());
};

const makeTrail = (event) => {
  const rect = stage.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  createSparkle(x, y);
};

stage.addEventListener('pointermove', (event) => {
  if (!event.isPrimary) return;
  if (Math.random() > 0.8) {
    makeTrail(event);
  }
});

stage.addEventListener('click', (event) => {
  makeTrail(event);
});

loveButton.addEventListener('pointerenter', () => {
  loveButton.style.transform = 'translateY(-4px) scale(1.02)';
});

loveButton.addEventListener('pointerleave', () => {
  loveButton.style.transform = 'translateY(0) scale(1)';
});

loveButton.addEventListener('click', () => {
  for (let i = 0; i < 8; i += 1) {
    const x = loveButton.offsetLeft + loveButton.offsetWidth * Math.random();
    const y = loveButton.offsetTop + loveButton.offsetHeight * Math.random();
    createSparkle(x, y);
  }
});
