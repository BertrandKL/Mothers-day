const loveButton = document.getElementById('loveButton') || document.getElementById('loveButton');
const stage = document.querySelector('.stage');
const confettiContainer = document.getElementById('confetti');

const randomBetween = (min, max) => Math.random() * (max - min) + min;

const createParticle = (type, x, y) => {
  const particle = document.createElement('div');
  particle.className = type;
  particle.style.left = `${x}px`;
  particle.style.top = `${y}px`;

  if (type === 'sparkle') {
    particle.style.width = `${randomBetween(10, 16)}px`;
    particle.style.height = `${randomBetween(10, 16)}px`;
    particle.style.background = `radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255, 126, 185, 0.9) 35%, transparent 72%)`;
  }

  if (type === 'confetti-piece') {
    const colors = ['#ff7eb9', '#7ef0d2', '#ffaf7b', '#ab9cff', '#ffe36b'];
    particle.style.background = colors[Math.floor(randomBetween(0, colors.length))];
    particle.style.width = `${randomBetween(8, 14)}px`;
    particle.style.height = `${randomBetween(8, 14)}px`;
    particle.style.transform = `rotate(${randomBetween(0, 360)}deg)`;
  }

  const removeParticle = () => particle.remove();
  particle.addEventListener('animationend', removeParticle);

  if (confettiContainer) {
    confettiContainer.appendChild(particle);
  } else if (stage) {
    stage.appendChild(particle);
  }
};

const makeTrail = (event) => {
  if (!stage) return;
  const rect = stage.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  createParticle('sparkle', x, y);
  if (Math.random() > 0.6) {
    createParticle('confetti-piece', x + randomBetween(-16, 16), y + randomBetween(-16, 16));
  }
};

if (stage) {
  stage.addEventListener('pointermove', (event) => {
    if (!event.isPrimary) return;
    if (Math.random() > 0.72) {
      makeTrail(event);
    }
  });

  stage.addEventListener('click', (event) => {
    makeTrail(event);
    triggerBurst(event.clientX, event.clientY);
  });
}

const triggerBurst = (clientX, clientY) => {
  if (!stage) return;
  const rect = stage.getBoundingClientRect();
  const x = clientX - rect.left;
  const y = clientY - rect.top;
  for (let i = 0; i < 12; i += 1) {
    createParticle('confetti-piece', x + randomBetween(-20, 20), y + randomBetween(-20, 20));
    createParticle('sparkle', x + randomBetween(-12, 12), y + randomBetween(-12, 12));
  }
};

const pulseButton = () => {
  if (!loveButton) return;
  loveButton.animate(
    [
      { transform: 'translateY(0) scale(1)' },
      { transform: 'translateY(-5px) scale(1.03)' },
      { transform: 'translateY(0) scale(1)' }
    ],
    { duration: 350, easing: 'ease-in-out' }
  );
};

if (loveButton) {
  loveButton.addEventListener('pointerenter', () => {
    loveButton.style.transform = 'translateY(-3px) scale(1.02)';
  });

  loveButton.addEventListener('pointerleave', () => {
    loveButton.style.transform = 'translateY(0) scale(1)';
  });

  loveButton.addEventListener('click', (event) => {
    pulseButton();
    triggerBurst(event.clientX, event.clientY);
  });
}
