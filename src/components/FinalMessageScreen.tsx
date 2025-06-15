import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import JuanValdezImage from '../assets/juan_valdez.png'; // Asegúrate de que la ruta sea correcta

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideInText = keyframes`
  0% {
    transform: translateX(-100%) rotate(-10deg);
    opacity: 0;
  }
  50% {
    transform: translateX(0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateX(100%) rotate(10deg);
    opacity: 0;
  }
`;

const floatImage = keyframes`
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-20px) scale(1.05);
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
  background: linear-gradient(135deg, #a8e6cf 0%, #dcedc1 100%);
  z-index: 1001;
  animation: ${fadeIn} 1.5s ease-out forwards;
  overflow: hidden;
`;

const StyledImage = styled.img`
  width: 300px;
  height: auto;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  animation: ${floatImage} 4s ease-in-out infinite;
  margin-bottom: 50px;
  border: 5px solid rgba(255, 255, 255, 0.8);
  z-index: 1;

  @media (max-width: 768px) {
    width: 200px;
    margin-bottom: 30px;
  }
`;

const AnimatedText = styled.h2<{ delay: number; startX: number; startY: number; endX: number; endY: number }>`
  position: absolute;
  font-size: 4rem;
  font-weight: 900;
  color: #fff;
  text-shadow: 4px 4px 10px rgba(0, 0, 0, 0.4);
  animation: moveText ${props => props.delay}s linear infinite, ${fadeIn} 1s ease-out forwards;
  opacity: 0;
  white-space: nowrap;
  padding: 10px 20px;
  border-radius: 15px;
  background: rgba(255, 107, 107, 0.8);
  border: 2px solid rgba(255, 255, 255, 0.5);

  @keyframes moveText {
    0% {
      left: ${props => props.startX}%;
      top: ${props => props.startY}%;
      transform: translate(-50%, -50%) scale(1);
    }
    50% {
      left: ${props => props.endX}%;
      top: ${props => props.endY}%;
      transform: translate(-50%, -50%) scale(1.1) rotate(5deg);
    }
    100% {
      left: ${props => props.startX}%;
      top: ${props => props.startY}%;
      transform: translate(-50%, -50%) scale(1) rotate(0deg);
    }
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const texts = [
  { text: "TE AMO PAPA", delay: 15, startX: 10, startY: 20, endX: 90, endY: 80 },
  { text: "MI HÉROE", delay: 18, startX: 80, startY: 10, endX: 20, endY: 90 },
  { text: "ERES EL MEJOR", delay: 20, startX: 30, startY: 90, endX: 70, endY: 10 },
  { text: "GRACIAS POR TODO", delay: 16, startX: 50, startY: 5, endX: 50, endY: 95 },
];

const FinalMessageScreen: React.FC = () => {
  return (
    <Container>
      <StyledImage src={JuanValdezImage} alt="Familia en Juan Valdez" />
      {texts.map((item, index) => (
        <AnimatedText 
          key={index} 
          delay={item.delay} 
          startX={item.startX} 
          startY={item.startY} 
          endX={item.endX} 
          endY={item.endY}
        >
          {item.text}
        </AnimatedText>
      ))}
    </Container>
  );
};

export default FinalMessageScreen; 