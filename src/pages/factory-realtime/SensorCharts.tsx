import React, { useState } from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { 
  FireOutlined, 
  CloudOutlined, 
  ExperimentOutlined,
  ArrowUpOutlined
} from '@ant-design/icons';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, LineChart, Line } from 'recharts';

// Mock sensor data
const mockSensorData = [
  { time: '00:00', temperature: 25.2, humidity: 45.8, pressure: 1013.2 },
  { time: '00:30', temperature: 25.5, humidity: 46.1, pressure: 1013.0 },
  { time: '01:00', temperature: 25.8, humidity: 46.5, pressure: 1012.8 },
  { time: '01:30', temperature: 26.1, humidity: 46.8, pressure: 1012.6 },
  { time: '02:00', temperature: 26.4, humidity: 47.2, pressure: 1012.4 },
  { time: '02:30', temperature: 26.7, humidity: 47.5, pressure: 1012.2 },
];

interface SensorChartsProps {
  cardStyle: React.CSSProperties;
}

const SensorCharts: React.FC<SensorChartsProps> = ({ cardStyle }) => {
  const [selectedSensor, setSelectedSensor] = useState<'temperature' | 'humidity' | 'pressure'>('temperature');

  const getSensorColor = (sensor: string) => {
    switch (sensor) {
      case 'temperature': return '#ff4d4f';
      case 'humidity': return '#1890ff';
      case 'pressure': return '#52c41a';
      default: return '#ff4d4f';
    }
  };

  const getSensorUnit = (sensor: string) => {
    switch (sensor) {
      case 'temperature': return '°C';
      case 'humidity': return '%';
      case 'pressure': return 'hPa';
      default: return '';
    }
  };

  return (
    <Card title="Sensor Data" style={{ ...cardStyle, height: '100%' }}>
      <div style={{ height: 'calc(100% - 60px)' }}>
        <Row gutter={[8, 8]} style={{ marginBottom: 16 }}>
          <Col span={8}>
            <Card 
              size="small" 
              style={{ 
                height: '80px', 
                textAlign: 'center',
                cursor: 'pointer',
                border: selectedSensor === 'temperature' ? '2px solid #ff4d4f' : undefined
              }}
              onClick={() => setSelectedSensor('temperature')}
            >
              <Statistic
                title="Temperature"
                value={26.4}
                suffix="°C"
                prefix={<FireOutlined style={{ color: '#ff4d4f' }} />}
                valueStyle={{ fontSize: '16px' }}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card 
              size="small" 
              style={{ 
                height: '80px', 
                textAlign: 'center',
                cursor: 'pointer',
                border: selectedSensor === 'humidity' ? '2px solid #1890ff' : undefined
              }}
              onClick={() => setSelectedSensor('humidity')}
            >
              <Statistic
                title="Humidity"
                value={47.2}
                suffix={
                  <>
                    % <ArrowUpOutlined style={{ color: '#f5222d', fontSize: '14px' }} />
                  </>
                }
                prefix={<CloudOutlined style={{ color: '#1890ff' }} />}
                valueStyle={{ fontSize: '16px' }}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card 
              size="small" 
              style={{ 
                height: '80px', 
                textAlign: 'center',
                cursor: 'pointer',
                border: selectedSensor === 'pressure' ? '2px solid #52c41a' : undefined
              }}
              onClick={() => setSelectedSensor('pressure')}
            >
              <Statistic
                title="Pressure"
                value={1012.4}
                suffix="hPa"
                prefix={<ExperimentOutlined style={{ color: '#52c41a' }} />}
                valueStyle={{ fontSize: '16px' }}
              />
            </Card>
          </Col>
        </Row>
        <Row gutter={[8, 8]} style={{ height: 'calc(100% - 100px)', minHeight: '300px' }}>
          <Col span={12} style={{ height: '100%' }}>
            <div style={{ height: '100%' }}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Area Chart - All Sensors</h4>
              <div style={{ height: '250px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockSensorData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--ant-border-color-split)" />
                    <XAxis 
                      dataKey="time" 
                      stroke="var(--ant-text-color-secondary)"
                      tick={{ fontSize: 10 }}
                    />
                    <YAxis 
                      stroke="var(--ant-text-color-secondary)"
                      tick={{ fontSize: 10 }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        background: 'var(--ant-component-background)',
                        border: '1px solid var(--ant-border-color-split)',
                        borderRadius: '6px',
                        fontSize: '12px'
                      }}
                    />
                    <Area type="monotone" dataKey="temperature" stackId="1" stroke="#ff4d4f" fill="#ff4d4f" fillOpacity={0.3} />
                    <Area type="monotone" dataKey="humidity" stackId="1" stroke="#1890ff" fill="#1890ff" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Col>
          <Col span={12} style={{ height: '100%' }}>
            <div style={{ height: '100%' }}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>
                Line Chart - {selectedSensor.charAt(0).toUpperCase() + selectedSensor.slice(1)}
              </h4>
              <div style={{ height: '250px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockSensorData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--ant-border-color-split)" />
                    <XAxis 
                      dataKey="time" 
                      stroke="var(--ant-text-color-secondary)"
                      tick={{ fontSize: 10 }}
                    />
                    <YAxis 
                      stroke="var(--ant-text-color-secondary)"
                      tick={{ fontSize: 10 }}
                      label={{ 
                        value: getSensorUnit(selectedSensor), 
                        angle: -90, 
                        position: 'insideLeft',
                        style: { textAnchor: 'middle', fontSize: '10px' }
                      }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        background: 'var(--ant-component-background)',
                        border: '1px solid var(--ant-border-color-split)',
                        borderRadius: '6px',
                        fontSize: '12px'
                      }}
                      formatter={(value) => [`${value}${getSensorUnit(selectedSensor)}`, selectedSensor]}
                    />
                    <Line 
                      type="monotone" 
                      dataKey={selectedSensor} 
                      stroke={getSensorColor(selectedSensor)} 
                      strokeWidth={2}
                      dot={{ fill: getSensorColor(selectedSensor), strokeWidth: 2, r: 3 }}
                      activeDot={{ r: 5, stroke: getSensorColor(selectedSensor), strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Card>
  );
};

export default SensorCharts;
