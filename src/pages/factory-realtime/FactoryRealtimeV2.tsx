import React from 'react';
import { Row, Col } from 'antd';
import SensorCharts from './SensorCharts';
import SystemConsole from './SystemConsole';
import MainVideoPlayer from './MainVideoPlayer';
import VideoGrid from './VideoGrid';

const FactoryRealtimeV2: React.FC = () => {
  const cardStyle = {
    background: 'var(--ant-component-background)',
    borderColor: 'var(--ant-border-color-split)',
    height: '100%'
  };

  return (
    <div style={{ height: 'calc(100vh - 120px)', padding: 0 }}>
      <Row gutter={16} style={{ height: '100%' }}>
        {/* Left Panel - 40% width */}
        <Col span={10} style={{ height: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 16 }}>
            
            {/* Top Section - Sensor Charts (35% height) */}
            <div style={{ height: '45%' }}>
              <SensorCharts cardStyle={cardStyle} />
            </div>

            {/* Bottom Section - Console (65% height) */}
            <div style={{ height: '55%' }}>
              <SystemConsole cardStyle={cardStyle} />
            </div>
          </div>
        </Col>

        {/* Right Panel - 60% width */}
        <Col span={14} style={{ height: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 16 }}>
            
            {/* Main Video Player (60% height) */}
            <div style={{ height: '60%' }}>
              <MainVideoPlayer cardStyle={cardStyle} />
            </div>

            {/* Video Covers Grid (40% height) */}
            <div style={{ height: '40%' }}>
              <VideoGrid cardStyle={cardStyle} />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default FactoryRealtimeV2;
