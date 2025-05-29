import React from 'react';
import { Card, Row, Col, Typography } from 'antd';
import { AlertOutlined } from '@ant-design/icons';

const { Text } = Typography;

// Mock video covers
const mockVideoCovers = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  title: `Camera ${String.fromCharCode(65 + i)}`,
  location: `Section ${i + 1}`,
  thumbnail: `https://picsum.photos/160/90?random=${i + 1}`,
  status: i % 3 === 0 ? 'offline' : 'online'
}));

interface VideoGridProps {
  cardStyle: React.CSSProperties;
}

const VideoGrid: React.FC<VideoGridProps> = ({ cardStyle }) => {
  return (
    <Card 
      title="Camera Grid" 
      style={{ ...cardStyle, height: '100%' }}
      bodyStyle={{ height: 'calc(100% - 56px)', padding: '12px' }}
    >
      <Row gutter={[8, 8]} style={{ height: '100%' }}>
        {mockVideoCovers.map((video) => (
          <Col span={4.8} key={video.id} style={{ height: '50%' }}>
            <Card 
              size="small" 
              style={{ 
                height: '100%',
                cursor: 'pointer',
                border: video.status === 'offline' ? '1px solid #ff4d4f' : '1px solid var(--ant-border-color-split)',
                opacity: video.status === 'offline' ? 0.6 : 1
              }}
              bodyStyle={{ padding: '4px', height: '100%' }}
              hoverable
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
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
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
                </div>
                <div style={{ textAlign: 'center' }}>
                  <Text style={{ fontSize: '10px', fontWeight: 'bold', display: 'block' }}>
                    {video.title}
                  </Text>
                  <Text style={{ fontSize: '9px', color: 'var(--ant-text-color-secondary)' }}>
                    {video.location}
                  </Text>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default VideoGrid;
