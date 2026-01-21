import React, { useCallback } from 'react';
import Particles from '@tsparticles/react';
import { loadSlim } from 'tsparticles-slim';

function BackgroundEffects() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesOptions = {
    background: {
      color: {
        value: 'transparent',
      },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: 'push',
        },
        onHover: {
          enable: true,
          mode: 'repulse',
        },
        resize: true,
      },
      modes: {
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: ['#ff00ff', '#00ffff', '#ffff00', '#ff0080', '#8000ff'],
      },
      links: {
        color: '#ffffff',
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 1,
      },
      move: {
        direction: 'none',
        enable: true,
        outModes: {
          default: 'bounce',
        },
        random: false,
        speed: 2,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 600,
        },
        value: 120,
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: 'circle',
      },
      size: {
        value: { min: 1, max: 5 },
      },
    },
    detectRetina: true,
  };

  return (
    <>
      <svg className="background-pattern" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="circuit-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <rect width="100" height="100" fill="transparent"/>
            <circle cx="20" cy="20" r="2" fill="#ff00ff" opacity="0.1"/>
            <circle cx="80" cy="20" r="2" fill="#00ffff" opacity="0.1"/>
            <circle cx="20" cy="80" r="2" fill="#ffff00" opacity="0.1"/>
            <circle cx="80" cy="80" r="2" fill="#ff0080" opacity="0.1"/>
            <line x1="20" y1="20" x2="80" y2="20" stroke="#ffffff" strokeWidth="0.5" opacity="0.05"/>
            <line x1="20" y1="20" x2="20" y2="80" stroke="#ffffff" strokeWidth="0.5" opacity="0.05"/>
            <line x1="80" y1="20" x2="80" y2="80" stroke="#ffffff" strokeWidth="0.5" opacity="0.05"/>
            <line x1="20" y1="80" x2="80" y2="80" stroke="#ffffff" strokeWidth="0.5" opacity="0.05"/>
            <polygon points="50,10 60,30 40,30" fill="#00ff80" opacity="0.05"/>
            <polygon points="50,90 60,70 40,70" fill="#8000ff" opacity="0.05"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit-pattern)"/>
      </svg>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesOptions}
        className="background-particles"
      />
    </>
  );
}

export default BackgroundEffects;