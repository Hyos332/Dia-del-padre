import React from 'react';
import styled, { keyframes } from 'styled-components';

const flyAway = keyframes`
  0% {
    transform: translate(0, 0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translate(var(--fly-x), var(--fly-y)) rotate(var(--fly-rotate));
    opacity: 0;
  }
`;

const wingFlap = keyframes`
  0%, 100% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(-20deg);
  }
`;

const Container = styled.div<{ x: number; y: number }>`
  position: absolute;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  transform: translate(-50%, -50%);
  animation: ${flyAway} 2s ease-out forwards;
  z-index: 1000;
`;

const Wing = styled.div<{ side: 'left' | 'right' }>`
  position: absolute;
  width: 40px;
  height: 60px;
  background: linear-gradient(45deg, #ffd3b6, #ffaaa5);
  border-radius: 50% 50% 0 50%;
  transform-origin: ${props => props.side === 'left' ? 'right' : 'left'} center;
  animation: ${wingFlap} 0.5s ease-in-out infinite;
  box-shadow: 0 0 10px rgba(255, 170, 165, 0.3);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);

  ${props => props.side === 'left' ? `
    left: -20px;
    transform: rotate(45deg);
  ` : `
    right: -20px;
    transform: rotate(-45deg) scaleX(-1);
  `}
`;

const Message = styled.div`
  background: rgba(255, 255, 255, 0.9);
  padding: 15px 30px;
  border-radius: 20px;
  font-size: 1.2rem;
  color: #2c3e50;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  white-space: nowrap;
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

interface FlyingWingsProps {
  message: string;
  x: number;
  y: number;
  onAnimationEnd: () => void;
}

const FlyingWings: React.FC<FlyingWingsProps> = ({ message, x, y, onAnimationEnd }) => {
  const flyX = (Math.random() - 0.5) * 1000;
  const flyY = -Math.random() * 800 - 200;
  const flyRotate = (Math.random() - 0.5) * 360;

  return (
    <Container 
      x={x} 
      y={y}
      style={{
        '--fly-x': `${flyX}px`,
        '--fly-y': `${flyY}px`,
        '--fly-rotate': `${flyRotate}deg`
      } as any}
      onAnimationEnd={onAnimationEnd}
    >
      <Wing side="left" />
      <Message>{message}</Message>
      <Wing side="right" />
    </Container>
  );
};

export default FlyingWings; 