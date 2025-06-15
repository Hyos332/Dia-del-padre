import React from 'react';
import styled, { keyframes } from 'styled-components';

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
`;

const popIn = keyframes`
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const glow = keyframes`
  0%, 100% {
    box-shadow: 0 0 20px rgba(255, 0, 0, 0.5);
  }
  50% {
    box-shadow: 0 0 40px rgba(255, 0, 0, 0.8);
  }
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.8);
  z-index: 2000;
  animation: ${popIn} 0.5s ease-out;
`;

const MessageBox = styled.div`
  background: rgba(255, 255, 255, 0.95);
  padding: 30px;
  border-radius: 20px;
  text-align: center;
  max-width: 500px;
  width: 90%;
  animation: ${shake} 0.5s ease-in-out, ${glow} 2s infinite;
  border: 2px solid #ff0000;
  backdrop-filter: blur(10px);
`;

const Title = styled.h2`
  color: #ff0000;
  font-size: 2rem;
  margin-bottom: 20px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const Message = styled.p`
  color: #333;
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const SuperHeroName = styled.span`
  color: #ff0000;
  font-weight: bold;
  font-size: 1.4rem;
  text-transform: uppercase;
  display: block;
  margin: 20px 0;
  animation: ${glow} 2s infinite;
`;

const Button = styled.button`
  background: linear-gradient(45deg, #ff0000, #ff6b6b);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 10px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 5px 15px rgba(255, 0, 0, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(255, 0, 0, 0.4);
  }
`;

interface BlockedMessageProps {
  onContinue: () => void;
}

const BlockedMessage: React.FC<BlockedMessageProps> = ({ onContinue }) => {
  return (
    <Container>
      <MessageBox>
        <Title>¡ESPERA UN MOMENTO!</Title>
        <Message>
          ¿Qué estás haciendo? ¿Intentando escribir otro nombre?
        </Message>
        <Message>
          ¡Solo existe un SUPER HÉROE en este mundo!
        </Message>
        <SuperHeroName>JOSE LUIS HOYOS</SuperHeroName>
        <Message>
          El mejor papá del universo, el más increíble, el más fuerte, el más sabio...
        </Message>
        <Button onClick={onContinue}>
          ¡Continuar con el mejor papá!
        </Button>
      </MessageBox>
    </Container>
  );
};

export default BlockedMessage; 