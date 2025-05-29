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

const ZoomOverlay = styled.div`
  position: absolute;
  top: 25%;
  left: 35%;
  width: 30%;
  height: 20%;
  border: 2px solid #52c41a;
  border-radius: 50%;
  box-shadow: 0 0 15px rgba(82, 196, 26, 0.6);
  transform: scale(1.5);
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(2);
    z-index: 1;
  }
`;

const FocusZoom: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Simulate video source - replace with actual video source
    if (videoRef.current) {
      videoRef.current.src = 'https://example.com/sample-video.mp4';
    }
  }, []);

  return (
    <Card>
      <Title level={2}>Focus Zoom Monitor</Title>
      <VideoContainer>
        <Video ref={videoRef} controls />
        <ZoomOverlay />
      </VideoContainer>
    </Card>
  );
};

export default FocusZoom; 