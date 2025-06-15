import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const CursorDot = styled.div<{ x: number; y: number }>`
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  transform: translate(-50%, -50%);
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  z-index: 9999;
  transition: transform 0.1s ease;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const CursorRing = styled.div<{ x: number; y: number }>`
  width: 40px;
  height: 40px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  transform: translate(-50%, -50%);
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  z-index: 9998;
  transition: all 0.15s ease-out;
  backdrop-filter: blur(2px);
`;

const InteractiveCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.interactive')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <CursorDot 
        x={position.x} 
        y={position.y} 
        style={{
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
          background: isHovering ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.5)'
        }}
      />
      <CursorRing 
        x={position.x} 
        y={position.y}
        style={{
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.8 : 1})`,
          borderColor: isHovering ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.3)'
        }}
      />
    </>
  );
};

export default InteractiveCursor; 