import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import { 
  PlayCircleOutlined,
  PauseCircleOutlined
} from '@ant-design/icons';
import { useVideoStore } from '../../stores/videoStore';

interface MainVideoPlayerProps {
  cardStyle: React.CSSProperties;
}

const MainVideoPlayer: React.FC<MainVideoPlayerProps> = ({ cardStyle }) => {
  const [isMainVideoPlaying, setIsMainVideoPlaying] = useState(true);
  const [showSwapAnimation, setShowSwapAnimation] = useState(false);
  const { currentVideo } = useVideoStore();
  
  // Show animation when current video changes
  useEffect(() => {
    if (currentVideo) {
      setShowSwapAnimation(true);
      setTimeout(() => setShowSwapAnimation(false), 500);
    }
  }, [currentVideo]);
  
  // Handle video error
  const handleVideoError = () => {
    if (currentVideo) {
      useVideoStore.getState().updateVideoStreamStatus(currentVideo.id, 'error');
      // Optionally show an error message to the user
    }
  };

  // Handle video play/pause toggle
  const toggleVideoPlayback = () => {
    const newPlayingState = !isMainVideoPlaying;
    setIsMainVideoPlaying(newPlayingState);
    
    // Update the stream status in the store
    if (currentVideo) {
      useVideoStore.getState().updateVideoStreamStatus(
        currentVideo.id, 
        newPlayingState ? 'active' : 'paused'
      );
    }
  };
  
  // Open video selection modal or menu
  const handleMainVideoClick = () => {
    // If video is paused, we should resume it instead of opening selection
    if (!isMainVideoPlaying) {
      setIsMainVideoPlaying(true);
      return;
    }
    
    // Flash the grid videos to indicate they can be selected
    const { previousMainVideo } = useVideoStore.getState();
    if (previousMainVideo) {
      setShowSwapAnimation(true);
      setTimeout(() => setShowSwapAnimation(false), 300);
    }
  };
  
  // Handle double click to enter fullscreen
  const handleVideoDoubleClick = (event: React.MouseEvent<HTMLVideoElement>) => {
    event.stopPropagation(); // Prevent triggering the click handler
    const videoElement = event.currentTarget;
    
    if (videoElement.requestFullscreen) {
      videoElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    }
  };

  return (
    <Card 
      title={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Main Video Feed - {currentVideo?.title || 'Loading...'}</span>
          <div style={{ cursor: 'pointer' }} onClick={toggleVideoPlayback}>
            {isMainVideoPlaying ? 
              <PauseCircleOutlined style={{ fontSize: '20px', color: '#1890ff' }} /> :
              <PlayCircleOutlined style={{ fontSize: '20px', color: '#52c41a' }} />
            }
          </div>
        </div>
      }
      style={{ ...cardStyle, height: '100%' }}
      bodyStyle={{ height: 'calc(100% - 56px)', padding: '12px' }}
    >
      <div style={{ 
        height: '100%', 
        background: '#000',
        borderRadius: '6px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        cursor: 'pointer'
      }}
      onClick={handleMainVideoClick}
      >
        <video 
          src={currentVideo?.url || ""}
          autoPlay
          loop
          muted
          onDoubleClick={handleVideoDoubleClick}
          onError={handleVideoError}
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            opacity: isMainVideoPlaying ? 1 : 0.7,
            transition: 'all 0.3s ease',
            transform: showSwapAnimation ? 'scale(1.05)' : 'scale(1)',
            border: showSwapAnimation ? '3px solid #1890ff' : 'none'
          }}
        />
        {!isMainVideoPlaying && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            fontSize: '48px'
          }}>
            <PlayCircleOutlined />
          </div>
        )}
        <div style={{
          position: 'absolute',
          bottom: '12px',
          left: '12px',
          background: 'rgba(0,0,0,0.7)',
          color: 'white',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '12px'
        }}>
          {isMainVideoPlaying ? '● LIVE' : '⏸ PAUSED'} - {currentVideo?.title || 'Loading...'} - {currentVideo?.resolution || '1920x1080'}
        </div>
        
        {/* Hint to swap videos */}
        {isMainVideoPlaying && (
          <div style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'rgba(0,0,0,0.5)',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            opacity: showSwapAnimation ? 1 : 0.7,
            transition: 'opacity 0.3s ease'
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 16V4L3 8M17 8V20L21 16M12 2V22" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Click to swap | Double-click for fullscreen
          </div>
        )}
      </div>
    </Card>
  );
};

export default MainVideoPlayer;
