import { useState } from 'react';
import { Row, Col, Card, Statistic, Typography, Tabs, Space } from 'antd';
import { 
  DashboardOutlined,
  CloudOutlined,
  TeamOutlined,
  AlertOutlined 
} from '@ant-design/icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const { Title } = Typography;
const { TabPane } = Tabs;

// Mock data for charts
const mockSensorData = [
  { time: '00:00', temperature: 25, humidity: 45, people: 10 },
  { time: '01:00', temperature: 24, humidity: 46, people: 8 },
  { time: '02:00', temperature: 24, humidity: 47, people: 5 },
  { time: '03:00', temperature: 23, humidity: 48, people: 3 },
  { time: '04:00', temperature: 23, humidity: 48, people: 2 },
  { time: '05:00', temperature: 24, humidity: 47, people: 3 },
  { time: '06:00', temperature: 25, humidity: 46, people: 5 },
  { time: '07:00', temperature: 26, humidity: 45, people: 15 },
  { time: '08:00', temperature: 27, humidity: 44, people: 30 },
  { time: '09:00', temperature: 28, humidity: 43, people: 45 },
];

const FactoryMonitor = () => {
  const [activeTab, setActiveTab] = useState('1');

  return (
    <div>
      <Title level={2}>Factory Real-Time Monitoring</Title>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Temperature"
              value={26}
              suffix="°C"
              prefix={<DashboardOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Humidity"
              value={45}
              suffix="%"
              prefix={<CloudOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="People Count"
              value={45}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Alert Count"
              value={3}
              prefix={<AlertOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
      </Row>

      <Card style={{ marginTop: 16 }}>
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="Live Monitor" key="1">
            <div style={{ height: 400, background: '#f0f2f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Space direction="vertical" align="center">
                <img 
                  src="https://via.placeholder.com/640x360" 
                  alt="Monitor Feed" 
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
                <div>Factory A - Line 1 Monitor Feed</div>
              </Space>
            </div>
          </TabPane>
          <TabPane tab="Sensor Data" key="2">
            <div style={{ height: 400 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockSensorData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="temperature" stroke="#ff4d4f" name="Temperature" />
                  <Line type="monotone" dataKey="humidity" stroke="#1890ff" name="Humidity" />
                  <Line type="monotone" dataKey="people" stroke="#52c41a" name="People Count" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default FactoryMonitor; 