import React from 'react';
import { Card, Row, Col, Typography } from 'antd';
import { AlertOutlined } from '@ant-design/icons';
import { useVideoStore } from '../../stores/videoStore';

const { Text } = Typography;

interface VideoGridProps {
  cardStyle: React.CSSProperties;
}

const VideoGrid: React.FC<VideoGridProps> = ({ cardStyle }) => {
  const { setCurrentVideo, gridVideos } = useVideoStore();
  
  // Handle video click to swap with main video
  const handleVideoClick = (videoId: string) => {
    const video = gridVideos.find(v => v.id === videoId);
    if (!video) return;
    
    const { currentVideo, swapWithMainVideo } = useVideoStore.getState();
    
    // If there's already a current video, swap them
    if (currentVideo) {
      swapWithMainVideo(videoId);
    } else {
      // Otherwise just set as current video (first time)
      setCurrentVideo(video);
    }
  };
  
  // Handle double click to enter fullscreen
  const handleVideoDoubleClick = (event: React.MouseEvent<HTMLVideoElement>) => {
    const videoElement = event.currentTarget;
    
    if (videoElement.requestFullscreen) {
      videoElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    }
  };

  return (
    <Card 
      title="Camera Grid" 
      style={{ ...cardStyle, height: '100%' }}
      bodyStyle={{ height: 'calc(100% - 56px)', padding: '12px' }}
    >
      <Row gutter={[8, 8]} style={{ height: '100%' }}>
        {gridVideos.map((video) => {
          const isCurrentlyInMain = useVideoStore.getState().currentVideo?.id === video.id;
          const wasSwappedFromMain = useVideoStore.getState().previousMainVideo?.id === video.id;
          
          return (
            <Col span={8} key={video.id} style={{ height: '50%' }}>
              <Card 
                size="small" 
                style={{ 
                  height: '100%',
                  cursor: 'pointer',
                  border: video.status === 'offline' ? '1px solid #ff4d4f' : 
                         isCurrentlyInMain ? '2px solid #52c41a' :
                         wasSwappedFromMain ? '2px solid #1890ff' : 
                         '1px solid var(--ant-border-color-split)',
                  opacity: video.status === 'offline' ? 0.6 : 1,
                  boxShadow: isCurrentlyInMain ? '0 0 8px rgba(82, 196, 26, 0.5)' : 'none',
                  pointerEvents: isCurrentlyInMain ? 'none' : 'auto'
                }}
                bodyStyle={{ padding: '4px', height: '100%' }}
                hoverable
                onClick={() => handleVideoClick(video.id)}
              >
                <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ 
                    flex: 1, 
                    background: '#000',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    position: 'relative',
                    marginBottom: '4px'
                  }}>
                    <video 
                      src={video.url}
                      autoPlay
                      loop
                      muted 
                      onDoubleClick={handleVideoDoubleClick}
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover'
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '4px',
                      right: '4px',
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: video.status === 'online' ? '#52c41a' : '#ff4d4f'
                    }} />
                    {video.status === 'offline' && (
                      <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: 'white',
                        fontSize: '16px'
                      }}>
                        <AlertOutlined />
                      </div>
                    )}
                    {wasSwappedFromMain && !isCurrentlyInMain && (
                      <div style={{
                        position: 'absolute',
                        top: '8px',
                        left: '8px',
                        background: 'rgba(24,144,255,0.7)',
                        color: 'white',
                        padding: '2px 4px',
                        borderRadius: '2px',
                        fontSize: '9px'
                      }}>
                        Previously Main
                      </div>
                    )}
                    {isCurrentlyInMain && (
                      <div style={{
                        position: 'absolute',
                        top: '8px',
                        left: '8px',
                        background: 'rgba(82,196,26,0.7)',
                        color: 'white',
                        padding: '2px 4px',
                        borderRadius: '2px',
                        fontSize: '9px'
                      }}>
                        Main View
                      </div>
                    )}
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <Text style={{ fontSize: '10px', fontWeight: 'bold', display: 'block' }}>
                      {video.title}
                    </Text>
                    <Text style={{ fontSize: '9px', color: 'var(--ant-text-color-secondary)' }}>
                      {video.location} {video.status === 'online' && <span style={{ color: '#52c41a' }}>• Double-click for fullscreen</span>}
                    </Text>
                  </div>
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Card>
  );
};

export default VideoGrid;
