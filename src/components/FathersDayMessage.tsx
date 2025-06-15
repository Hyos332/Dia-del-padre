import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import MessageCloud from './MessageCloud';
import AnimatedBackground from './AnimatedBackground';
import InteractiveCursor from './InteractiveCursor';
import WelcomeScreen from './WelcomeScreen';
import FlyingWings from './FlyingWings';
import JuanValdezImage from '../assets/juan_valdez.png';
import FinalMessageScreen from './FinalMessageScreen';
import HappyDayAnimation from './HappyDayAnimation';
import MessageRain from './MessageRain';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1<{ isHovered: boolean }>`
  color: #2c3e50;
  font-size: 4rem;
  margin-bottom: 60px;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 1s ease-out, ${bounce} 2s ease-in-out infinite;
  font-weight: 800;
  letter-spacing: 2px;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding: 30px;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  transform: ${props => props.isHovered ? 'scale(1.1)' : 'scale(1)'};
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    font-size: 2.5rem;
    padding: 20px;
  }
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px;
  padding: 20px;
  position: relative;
  z-index: 1;
  margin: 0 auto;
  min-height: 200px;
`;

const FloatingHeart = styled.div<{ x: number; y: number }>`
  position: absolute;
  font-size: 2rem;
  pointer-events: none;
  animation: ${fadeIn} 0.5s ease-out forwards;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  transform: translate(-50%, -50%);
  z-index: 2;
`;

const ClickPrompt = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.9);
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 1.2rem;
  color: #2c3e50;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 1s ease-out, ${bounce} 2s ease-in-out infinite;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(-50%) scale(1.1);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const messages = [
  { text: "¡Feliz día del padre, papito hermosooo! 💙" },
  { text: "Te quiero demasiadooo, y hoy más que nunca quiero que sepas que enserio, MUCHAS GRACIAS por darme todo siempre. Gracias por estar ahí, por cuidarme, por enseñarme, por motivarme, y por hacerme sentir que puedo llegar a ser igual de grande que tú." },
  { 
    text: "Gracias por cada salida que teníamos a Santafé a tomarnos un Starbucks o un café de Juan Valdez ☕, por esos momentos únicos en los que simplemente éramos tú y yo, compartiendo lo nuestro. Gracias por cada tarde jugando básquet 🏀, por reírnos, por pasar tiempo juntos como solo tú sabes hacerlo.", 
    image: JuanValdezImage 
  },
  { text: "Y GRACIAS, de corazón, por cada momento en la casa en el que me mostrabas tus proyectos, enseñándome con tanta pasión, y yo ahí, con ansias de escucharte, porque para mí eres un ejemplo a seguir. Admiro tanto la forma en que piensas, en que trabajas, en que sueñas… me inspiras todos los días a ser mejor." },
  { text: "Papito, no tengo palabras suficientes para decirte cuánto te amo y cuánto te valoro. Eres mi orgullo, mi fuerza, y mi héroe." },
  { text: "¡Te amooo con todo mi corazón, papito bello! 💖" },
  { text: "No dejes que nadie te cambie como eres." }
];

const rainMessages = [
  "Eres mi inspiración 🌟",
  "Gracias por tu amor incondicional ❤️",
  "Mi guía, mi fuerza 💪",
  "Siempre a tu lado, papá ✨",
  "El mejor papá del mundo 🏆",
  "Orgulloso de ti, siempre 🙏",
  "Amor incondicional a mi héroe 💖",
  "Mi primer héroe y amigo 🦸‍♂️",
  "Tu legado es mi camino 🗺️",
  "Juntos por siempre, papá 👨‍👧‍👦"
];

const FathersDayMessage: React.FC = () => {
  const [titleHovered, setTitleHovered] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [flyingMessages, setFlyingMessages] = useState<{ id: number; message: string; x: number; y: number }[]>([]);
  const [showFinalScreen, setShowFinalScreen] = useState(false);
  const [showHappyDayAnimation, setShowHappyDayAnimation] = useState(false);
  const [showMessageRain, setShowMessageRain] = useState(false);

  useEffect(() => {
    if (!gameStarted || showHappyDayAnimation || showFinalScreen || showMessageRain) return;

    const messageDisplayDuration = 5000;
    const timer = setTimeout(() => {
      if (currentMessageIndex < messages.length - 1) {
        setFlyingMessages(prev => [...prev, {
          id: Date.now(),
          message: messages[currentMessageIndex].text,
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
        }]);
        setCurrentMessageIndex(prev => prev + 1);
      } else {
        setShowMessageRain(true);
      }
    }, messageDisplayDuration);

    return () => clearTimeout(timer);
  }, [currentMessageIndex, gameStarted, showHappyDayAnimation, showFinalScreen, showMessageRain]);

  const handleClick = (e: React.MouseEvent) => {
    if (showMessageRain || showHappyDayAnimation || showFinalScreen) return;

    const newHeart = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY
    };
    setHearts(prev => [...prev, newHeart]);
    setTimeout(() => {
      setHearts(prev => prev.filter(heart => heart.id !== newHeart.id));
    }, 2000);

    if (currentMessageIndex < messages.length - 1) {
      setFlyingMessages(prev => [...prev, {
        id: Date.now(),
        message: messages[currentMessageIndex].text,
        x: e.clientX,
        y: e.clientY
      }]);
      setCurrentMessageIndex(prev => prev + 1);
    } else {
      setShowMessageRain(true);
    }
  };

  const handleStart = () => {
    setGameStarted(true);
  };

  const handleFlyingMessageEnd = (id: number) => {
    setFlyingMessages(prev => prev.filter(msg => msg.id !== id));
  };

  const handleHappyDayAnimationComplete = () => {
    setShowFinalScreen(true);
  };

  const handleMessageRainComplete = () => {
    setShowHappyDayAnimation(true);
  };

  if (!gameStarted) {
    return <WelcomeScreen onStart={handleStart} />;
  }

  if (showMessageRain) {
    return <MessageRain messages={rainMessages} onAnimationComplete={handleMessageRainComplete} />;
  }

  if (showHappyDayAnimation) {
    return <HappyDayAnimation onAnimationComplete={handleHappyDayAnimationComplete} />;
  }

  if (showFinalScreen) {
    return <FinalMessageScreen />;
  }

  return (
    <Container onClick={handleClick}>
      <AnimatedBackground />
      <InteractiveCursor />
      <Title 
        isHovered={titleHovered}
        onMouseEnter={() => setTitleHovered(true)}
        onMouseLeave={() => setTitleHovered(false)}
        className="interactive"
      >
        Feliz día papito lindo 💖
      </Title>
      <MessageContainer>
        <MessageCloud
          message={messages[currentMessageIndex].text}
          imageUrl={messages[currentMessageIndex].image}
          delay={0}
        />
      </MessageContainer>
      {hearts.map(heart => (
        <FloatingHeart key={heart.id} x={heart.x} y={heart.y}>
          ❤️
        </FloatingHeart>
      ))}
      {flyingMessages.map(msg => (
        <FlyingWings
          key={msg.id}
          message={msg.message}
          x={msg.x}
          y={msg.y}
          onAnimationEnd={() => handleFlyingMessageEnd(msg.id)}
        />
      ))}
      {currentMessageIndex < messages.length - 1 && (
        <ClickPrompt>
          Haz clic o espera para ver el siguiente mensaje 💝
        </ClickPrompt>
      )}
    </Container>
  );
};

export default FathersDayMessage; 