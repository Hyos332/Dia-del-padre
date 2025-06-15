import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const floatAnimation = keyframes`
  0% {
    transform: translateY(50px) scale(0.8);
    opacity: 0;
  }
  100% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
`;

const glowAnimation = keyframes`
  0% {
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
  }
  50% {
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
  }
  100% {
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
  }
`;

const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const CloudContainer = styled.div<{ delay: number; isHovered: boolean }>`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 30px;
  padding: 25px;
  margin: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  animation: ${floatAnimation} 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards,
             ${glowAnimation} 3s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
  opacity: 0;
  max-width: 700px;
  text-align: center;
  font-size: 1.3rem;
  line-height: 1.8;
  color: #2c3e50;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transform: ${props => props.isHovered ? 'scale(1.05) rotate(2deg)' : 'scale(1) rotate(0deg)'};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

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

  &:hover {
    transform: scale(1.05) rotate(2deg);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
    padding: 20px;
    margin: 15px;
    flex-direction: column;
  }
`;

const HeartButton = styled.button`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  opacity: 0.5;
  transition: all 0.3s ease;
  animation: ${rotateAnimation} 2s linear infinite;

  &:hover {
    opacity: 1;
    transform: scale(1.2);
  }
`;

const MessageText = styled.div`
  flex: 1;
  text-align: center;
  margin-right: 15px;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 15px;
  }
`;

const ImageContainer = styled.div`
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledImage = styled.img`
  width: 120px;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

interface MessageCloudProps {
  message: string;
  delay: number;
  imageUrl?: string;
}

const MessageCloud: React.FC<MessageCloudProps> = ({ message, delay, imageUrl }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showHeart, setShowHeart] = useState(false);

  return (
    <CloudContainer 
      delay={delay} 
      isHovered={isHovered}
      className="interactive"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setShowHeart(!showHeart)}
    >
      <MessageText dangerouslySetInnerHTML={{ __html: message }} />
      {imageUrl && (
        <ImageContainer>
          <StyledImage src={imageUrl} alt="Mensaje con imagen" />
        </ImageContainer>
      )}
      {showHeart && (
        <HeartButton onClick={(e) => {
          e.stopPropagation();
          setShowHeart(false);
        }}>
          ❤️
        </HeartButton>
      )}
    </CloudContainer>
  );
};

export default MessageCloud; 