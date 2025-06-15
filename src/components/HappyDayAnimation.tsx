import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const burst = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }
  20% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
`;

const particleAnimation = keyframes`
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(var(--dx), var(--dy)) scale(0.5);
    opacity: 0;
  }
`;

const textReveal = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #FFD700 0%, #FF69B4 100%); /* Colores vibrantes */
  z-index: 1002;
  animation: ${fadeIn} 1s ease-out forwards;
  overflow: hidden;
`;

const BurstEffect = styled.div`
  position: absolute;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(255, 215, 0, 0) 70%);
  border-radius: 50%;
  animation: ${burst} 2s ease-out forwards;
  z-index: 1;
`;

const Particle = styled.div<{ size: number; x: number; y: number; delay: number; color: string; dx: number; dy: number }>`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background-color: ${props => props.color};
  border-radius: 50%;
  left: ${props => props.x}%;
  top: ${props => props.y}%;
  animation: ${particleAnimation} 2s ease-out forwards;
  animation-delay: ${props => props.delay}s;
  transform: translate(-50%, -50%);
  z-index: 2;
  filter: blur(1px);

  --dx: ${props => props.dx}px;
  --dy: ${props => props.dy}px;
`;

const MainText = styled.h1`
  font-size: 5rem;
  font-weight: 900;
  color: #FFFFFF;
  text-shadow: 5px 5px 15px rgba(0, 0, 0, 0.5);
  margin-top: 50px;
  animation: ${textReveal} 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
  animation-delay: 1s;
  opacity: 0;

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

interface HappyDayAnimationProps {
  onAnimationComplete: () => void;
}

const HappyDayAnimation: React.FC<HappyDayAnimationProps> = ({ onAnimationComplete }) => {
  const colors = ['#FFD700', '#FF69B4', '#8A2BE2', '#00CED1', '#FF4500']; // Más colores

  const particles = Array.from({ length: 50 }, () => ({
    size: Math.random() * 10 + 5,
    x: 50 + (Math.random() - 0.5) * 40,
    y: 50 + (Math.random() - 0.5) * 40,
    delay: Math.random() * 0.5,
    color: colors[Math.floor(Math.random() * colors.length)],
    dx: (Math.random() - 0.5) * 400,
    dy: (Math.random() - 0.5) * 400,
  }));

  useEffect(() => {
    const timer = setTimeout(() => {
      onAnimationComplete();
    }, 3500); // Duración total de la animación antes de pasar a la siguiente pantalla

    return () => clearTimeout(timer);
  }, [onAnimationComplete]);

  return (
    <Container>
      <BurstEffect />
      {particles.map((p, index) => (
        <Particle 
          key={index} 
          size={p.size} 
          x={p.x} 
          y={p.y} 
          delay={p.delay} 
          color={p.color} 
          dx={p.dx} 
          dy={p.dy} 
        />
      ))}
      <MainText>¡Feliz Día Papito Lindo!</MainText>
    </Container>
  );
};

export default HappyDayAnimation; 