import React from 'react';
import styled, { keyframes } from 'styled-components';

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const floatAnimation = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(-45deg, #a8e6cf, #dcedc1, #ffd3b6, #ffaaa5);
  background-size: 400% 400%;
  animation: ${gradientAnimation} 15s ease infinite;
  z-index: -1;
  opacity: 0.8;
`;

const Particle = styled.div<{ size: number; left: number; delay: number }>`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  left: ${props => props.left}%;
  animation: ${floatAnimation} 3s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
  backdrop-filter: blur(5px);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
`;

const AnimatedBackground: React.FC = () => {
  const particles = Array.from({ length: 15 }, (_, index) => ({
    size: Math.random() * 8 + 4,
    left: Math.random() * 100,
    delay: Math.random() * 2
  }));

  return (
    <BackgroundContainer>
      {particles.map((particle, index) => (
        <Particle
          key={index}
          size={particle.size}
          left={particle.left}
          delay={particle.delay}
        />
      ))}
    </BackgroundContainer>
  );
};

export default AnimatedBackground; 