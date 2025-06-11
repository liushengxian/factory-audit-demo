import React, { useRef, useEffect } from 'react';
import { Card, Typography } from 'antd';
import styled from 'styled-components';
import { useVideoStore } from '../../stores/videoStore';

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
  const { gridVideos } = useVideoStore();
  
  // Use a specific grid video (for example, the first one with "offline" status)
  const alertVideo = gridVideos.find(v => v.status === 'offline') || gridVideos[0];

  useEffect(() => {
    if (videoRef.current && alertVideo) {
      videoRef.current.src = alertVideo.url;
      videoRef.current.load();
      videoRef.current.play().catch(err => console.error("Video play error:", err));
    }
  }, [alertVideo]);

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