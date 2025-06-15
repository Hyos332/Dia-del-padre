import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import BlockedMessage from './BlockedMessage';

const slideIn = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
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
  background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%);
  z-index: 1000;
  animation: ${fadeIn} 1s ease-out;
`;

const WelcomeCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 500px;
  width: 90%;
  animation: ${slideIn} 1s ease-out;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: linear-gradient(90deg, #ff6b6b, #4ecdc4);
    opacity: 0.7;
  }
`;

const Title = styled.h1`
  color: #2c3e50;
  font-size: 2.5rem;
  margin-bottom: 30px;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${float} 3s ease-in-out infinite;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  margin: 20px 0;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  text-align: center;

  &:focus {
    outline: none;
    border-color: #4ecdc4;
    box-shadow: 0 0 10px rgba(78, 205, 196, 0.3);
  }
`;

const Button = styled.button`
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 10px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;
  font-weight: bold;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      45deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    transform: rotate(45deg);
    animation: shine 3s infinite;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

// @ts-ignore
const shine = keyframes`
  0% {
    transform: translateX(-100%) rotate(45deg);
  }
  100% {
    transform: translateX(100%) rotate(45deg);
  }
`;

interface WelcomeScreenProps {
  onStart: (name: string) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const [showBlocked, setShowBlocked] = useState(false);
  const [hasTyped, setHasTyped] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!hasTyped) {
      setHasTyped(true);
      setShowBlocked(true);
      e.target.value = ''; // Limpiar visualmente el input
    }
  };

  const handleContinue = () => {
    setShowBlocked(false);
    onStart('JOSE LUIS HOYOS');
  };

  if (showBlocked) {
    return <BlockedMessage onContinue={handleContinue} />;
  }

  return (
    <Container>
      <WelcomeCard>
        <Title>¡Feliz Día del Padre!</Title>
        <form onSubmit={(e) => e.preventDefault()}>
          <Input
            type="text"
            placeholder="Ingresa el nombre del mejor papá del mundo..."
            onChange={handleInputChange}
            required
          />
          <Button type="submit" disabled={false}>
            Comenzar
          </Button>
        </form>
      </WelcomeCard>
    </Container>
  );
};

export default WelcomeScreen; 