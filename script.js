const loveButton = document.getElementById('loveButton');
const page = document.querySelector('.page');

const randomBetween = (min, max) => Math.random() * (max - min) + min;

const createParticle = (x, y, color) => {
  const particle = document.createElement('div');
  const type = Math.random() > 0.5 ? 'particle' : 'sparkle';
  particle.className = type;
  particle.style.left = `${x}px`;
  particle.style.top = `${y}px`;

  if (type === 'particle') {
    particle.style.width = `${randomBetween(12, 18)}px`;
    particle.style.height = `${randomBetween(18, 26)}px`;
    particle.style.background = color;
    particle.style.borderRadius = '55% 45% 60% 40%';
    particle.style.transform = `rotate(${randomBetween(-40, 40)}deg)`;
  }

  if (type === 'sparkle') {
    const size = randomBetween(8, 14);
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.background = 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0.3) 50%, transparent 100%)';
    particle.style.filter = 'blur(0.2px)';
  }

  particle.addEventListener('animationend', () => particle.remove());
  page.appendChild(particle);
};

const makeTrail = (event) => {
  if (!page) return;
  const rect = page.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const colors = ['#ff96c5', '#ffb9d3', '#f7a3ca', '#ffd4e3'];
  createParticle(x, y, colors[Math.floor(randomBetween(0, colors.length))]);
  if (Math.random() > 0.55) {
    createParticle(x + randomBetween(-14, 14), y + randomBetween(-14, 14), '#ffffff');
  }
};

if (page) {
  page.addEventListener('pointermove', (event) => {
    if (!event.isPrimary) return;
    if (Math.random() > 0.7) {
      makeTrail(event);
    }
  });

  page.addEventListener('click', (event) => {
    makeTrail(event);
    triggerBloom(event.clientX, event.clientY);
  });
}

const triggerBloom = (clientX, clientY) => {
  if (!page) return;
  const rect = page.getBoundingClientRect();
  const x = clientX - rect.left;
  const y = clientY - rect.top;
  const colors = ['#ff96c5', '#ffb9d3', '#f7a3ca', '#ffd4e3'];
  for (let i = 0; i < 14; i += 1) {
    createParticle(x + randomBetween(-24, 24), y + randomBetween(-24, 24), colors[Math.floor(randomBetween(0, colors.length))]);
  }
};

if (loveButton) {
  loveButton.addEventListener('pointerenter', () => {
    loveButton.style.transform = 'translateY(-3px) scale(1.02)';
  });
  loveButton.addEventListener('pointerleave', () => {
    loveButton.style.transform = 'translateY(0) scale(1)';
  });
  loveButton.addEventListener('click', (event) => {
    event.preventDefault();
    const rect = loveButton.getBoundingClientRect();
    triggerBloom(rect.left + rect.width / 2, rect.top + rect.height / 2);
  });
}
