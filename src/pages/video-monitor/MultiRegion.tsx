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

const RegionOverlay = styled.div<{ color: string }>`
  position: absolute;
  border: 2px solid ${props => props.color};
  border-radius: 4px;
  background-color: ${props => `${props.color}20`};
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => `${props.color}40`};
  }
`;

const Region1 = styled(RegionOverlay)`
  top: 15%;
  left: 20%;
  width: 25%;
  height: 20%;
`;

const Region2 = styled(RegionOverlay)`
  top: 40%;
  right: 25%;
  width: 20%;
  height: 25%;
`;

const Region3 = styled(RegionOverlay)`
  bottom: 20%;
  left: 30%;
  width: 30%;
  height: 15%;
`;

const MultiRegion: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { currentVideo } = useVideoStore();

  useEffect(() => {
    // Use the current video from the store if available
    if (videoRef.current && currentVideo) {
      videoRef.current.src = currentVideo.url;
      videoRef.current.load();
      videoRef.current.play().catch(err => console.error("Video play error:", err));
    }
  }, [currentVideo]);

  return (
    <Card>
      <Title level={2}>Multi-Region Monitor</Title>
      <VideoContainer>
        <Video ref={videoRef} controls />
        <Region1 color="#1890ff" />
        <Region2 color="#722ed1" />
        <Region3 color="#fa8c16" />
      </VideoContainer>
    </Card>
  );
};

export default MultiRegion; 