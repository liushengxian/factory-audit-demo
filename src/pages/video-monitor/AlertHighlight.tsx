import React, { useRef, useEffect } from 'react';
import { Card, Typography } from 'antd';
import styled from 'styled-components';

const { Title } = Typography;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

const Video = styled.video`
  width: 100%;
  border-radius: 8px;
`;

const HighlightOverlay = styled.div`
  position: absolute;
  top: 20%;
  left: 30%;
  width: 40%;
  height: 30%;
  border: 3px solid #ff4d4f;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(255, 77, 79, 0.5);
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(255, 77, 79, 0.7);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(255, 77, 79, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(255, 77, 79, 0);
    }
  }
`;

const AlertHighlight: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Simulate video source - replace with actual video source
    if (videoRef.current) {
      videoRef.current.src = 'https://example.com/sample-video.mp4';
    }
  }, []);

  return (
    <Card>
      <Title level={2}>Alert Highlight Monitor</Title>
      <VideoContainer>
        <Video ref={videoRef} controls />
        <HighlightOverlay />
      </VideoContainer>
    </Card>
  );
};

export default AlertHighlight; 