import React, { useState } from 'react';
import { Card } from 'antd';
import { 
  PlayCircleOutlined,
  PauseCircleOutlined
} from '@ant-design/icons';

interface MainVideoPlayerProps {
  cardStyle: React.CSSProperties;
}

const MainVideoPlayer: React.FC<MainVideoPlayerProps> = ({ cardStyle }) => {
  const [isMainVideoPlaying, setIsMainVideoPlaying] = useState(true);

  return (
    <Card 
      title={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Main Video Feed - Production Line A</span>
          <div style={{ cursor: 'pointer' }} onClick={() => setIsMainVideoPlaying(!isMainVideoPlaying)}>
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
        overflow: 'hidden'
      }}>
        <video 
          src="https://misanya-1252867445.cos.ap-shanghai.myqcloud.com/videos/v1.mp4"
          autoPlay
          loop
          muted
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            opacity: isMainVideoPlaying ? 1 : 0.7
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
          {isMainVideoPlaying ? '● LIVE' : '⏸ PAUSED'} - Camera A1 - 1920x1080
        </div>
      </div>
    </Card>
  );
};

export default MainVideoPlayer;
