import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import JuanValdezImage from '../assets/juan_valdez.png'; // Importa la imagen aquí

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fallAndFade = keyframes`
  0% {
    transform: translateY(-50px) translateX(var(--initial-x)) rotate(0deg);
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  100% {
    transform: translateY(calc(100vh + 50px)) translateX(var(--final-x)) rotate(360deg);
    opacity: 0;
  }
`;

const revealBigText = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.8) translateY(20px);
  }
  30% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  70% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  100% {
    opacity: 0;
    transform: scale(1.2) translateY(-20px);
  }
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #FFC0CB 0%, #ADD8E6 100%); /* Colores suaves y alegres */
  z-index: 1001;
  animation: ${fadeIn} 1s ease-out forwards;
  overflow: hidden;
  display: flex;
  flex-direction: column; /* Para centrar la imagen y los textos */
  justify-content: center;
  align-items: center;
`;

const MessageBubble = styled.div<{ 
  delay: number; 
  duration: number; 
  xStart: number; 
  xEnd: number; 
  color: string; 
  size: number 
}>`
  position: absolute;
  top: -50px; /* Iniciar fuera de la pantalla */
  left: ${props => props.xStart}%;
  background-color: ${props => props.color};
  padding: ${props => props.size * 0.8}px ${props => props.size * 1.5}px;
  border-radius: ${props => props.size}px;
  font-size: ${props => props.size}px;
  color: white;
  text-align: center;
  white-space: nowrap;
  opacity: 0;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  filter: blur(0.5px);

  animation: ${fallAndFade} ${props => props.duration}s linear forwards;
  animation-delay: ${props => props.delay}s;

  --initial-x: 0px;
  --final-x: ${props => props.xEnd - props.xStart}vw; /* Ajuste para el movimiento horizontal */
`;

const BigAnimatedText = styled.h2`
  font-size: 4.5rem;
  font-weight: 900;
  color: #FFFFFF;
  text-shadow: 3px 3px 8px rgba(0, 0, 0, 0.4);
  text-align: center;
  position: absolute;
  z-index: 10; /* Asegurar que esté por encima de la lluvia pero detrás de los mensajes principales */
  opacity: 0;
  animation: ${revealBigText} 4s ease-in-out forwards;

  @media (max-width: 768px) {
    font-size: 2.8rem;
  }
`;

const BackgroundImage = styled.img`
  width: 250px; /* Tamaño de la imagen */
  height: auto;
  position: absolute;
  bottom: 50px; /* Ajusta la posición vertical */
  left: 50%;
  transform: translateX(-50%);
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  z-index: 5; /* Asegura que esté por encima del fondo pero debajo de la lluvia y el texto grande */
  animation: ${fadeIn} 2s ease-out forwards; /* Animación de aparición */

  @media (max-width: 768px) {
    width: 180px;
    bottom: 30px;
  }
`;

interface MessageRainProps {
  messages: string[];
  onAnimationComplete: () => void;
}

const MessageRain: React.FC<MessageRainProps> = ({ messages, onAnimationComplete }) => {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#5DADE2', '#FFD700', '#A569BD', 
    '#F39C12', '#1ABC9C', '#E74C3C', '#9B59B6', '#3498DB'
  ];

  const bigTexts = [
    "Eres el mejor 🌟",
    "Te deseo un Feliz Día 🎁",
    "Mi gran Ejemplo 💪",
    "Siempre en mi Corazón ❤️",
    "Gracias por ser tú ✨"
  ];

  const [animatedMessages, setAnimatedMessages] = useState<{
    id: number;
    text: string;
    delay: number;
    duration: number;
    xStart: number;
    xEnd: number;
    color: string;
    size: number;
  }[]>([]);
  const [currentBigTextIndex, setCurrentBigTextIndex] = useState(0);

  useEffect(() => {
    let rainTimer: ReturnType<typeof setTimeout>;
    let messageCount = 0;

    const startRain = () => {
      if (messageCount < messages.length * 3) { // Más mensajes para la lluvia
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        const delay = Math.random() * 4; // Retraso de hasta 4 segundos
        const duration = 6 + Math.random() * 6; // Duración de 6 a 12 segundos
        const xStart = Math.random() * 90;
        const xEnd = Math.random() * 90;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = 18 + Math.random() * 12; // Tamaño de fuente entre 18px y 30px

        setAnimatedMessages(prev => [...prev, {
          id: Date.now() + messageCount,
          text: randomMessage,
          delay,
          duration,
          xStart,
          xEnd,
          color,
          size,
        }]);

        messageCount++;
        rainTimer = setTimeout(startRain, Math.random() * 200); // Intervalo más rápido para la lluvia
      } else {
        // Después de generar suficientes mensajes, esperamos a que el último se desvanezca
        setTimeout(() => {
          onAnimationComplete();
        }, 7000); // Esperar que la mayoría de los mensajes desaparezcan
      }
    };

    startRain();

    return () => clearTimeout(rainTimer);
  }, [messages, onAnimationComplete]);

  // Efecto para la secuencia de mensajes grandes
  useEffect(() => {
    const bigTextTimer = setInterval(() => {
      setCurrentBigTextIndex(prevIndex => {
        if (prevIndex < bigTexts.length - 1) {
          return prevIndex + 1;
        }
        return prevIndex; // Mantener el último mensaje visible hasta la transición
      });
    }, 3000); // Cambiar cada 3 segundos

    return () => clearInterval(bigTextTimer);
  }, []);

  return (
    <Container>
      <BackgroundImage src={JuanValdezImage} alt="Papá y yo en Juan Valdez" />
      {animatedMessages.map(msg => (
        <MessageBubble
          key={msg.id}
          delay={msg.delay}
          duration={msg.duration}
          xStart={msg.xStart}
          xEnd={msg.xEnd}
          color={msg.color}
          size={msg.size}
        >
          {msg.text}
        </MessageBubble>
      ))}
      {currentBigTextIndex < bigTexts.length && (
        <BigAnimatedText>
          {bigTexts[currentBigTextIndex]}
        </BigAnimatedText>
      )}
    </Container>
  );
};

export default MessageRain; 