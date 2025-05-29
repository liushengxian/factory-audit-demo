import { useState } from 'react';
import { Card, Row, Col, Typography, Statistic, Progress, Table, Select } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '../contexts/ThemeContext';

const { Title } = Typography;
const { Option } = Select;

// Mock data for predictions
const mockPredictionData = [
  { date: '2024-03-20', actual: 95, predicted: 93 },
  { date: '2024-03-21', actual: 94, predicted: 92 },
  { date: '2024-03-22', actual: 93, predicted: 91 },
  { date: '2024-03-23', actual: 92, predicted: 90 },
  { date: '2024-03-24', actual: 91, predicted: 89 },
  { date: '2024-03-25', actual: 90, predicted: 88 },
];

const mockQualityMetrics = [
  {
    key: '1',
    metric: 'Defect Rate',
    current: '2.5%',
    predicted: '2.8%',
    trend: 'up',
    confidence: 85,
  },
  {
    key: '2',
    metric: 'First Pass Yield',
    current: '95.5%',
    predicted: '94.8%',
    trend: 'down',
    confidence: 82,
  },
  {
    key: '3',
    metric: 'Rework Rate',
    current: '3.2%',
    predicted: '3.5%',
    trend: 'up',
    confidence: 78,
  },
];

const Predictions = () => {
  const [selectedMetric, setSelectedMetric] = useState('all');
  const { isDarkMode } = useTheme();

  const cardStyle = {
    background: 'var(--ant-component-background)',
    borderColor: 'var(--ant-border-color-split)',
  };

  const columns = [
    {
      title: 'Metric',
      dataIndex: 'metric',
      key: 'metric',
    },
    {
      title: 'Current Value',
      dataIndex: 'current',
      key: 'current',
    },
    {
      title: 'Predicted Value',
      dataIndex: 'predicted',
      key: 'predicted',
    },
    {
      title: 'Trend',
      dataIndex: 'trend',
      key: 'trend',
      render: (trend: string) => (
        trend === 'up' ? 
          <ArrowUpOutlined style={{ color: '#cf1322' }} /> : 
          <ArrowDownOutlined style={{ color: '#3f8600' }} />
      ),
    },
    {
      title: 'Confidence',
      dataIndex: 'confidence',
      key: 'confidence',
      render: (confidence: number) => (
        <Progress 
          percent={confidence} 
          size="small" 
          status={confidence >= 80 ? 'success' : 'exception'}
        />
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Title level={2} style={{ color: 'var(--ant-heading-color)', margin: 0 }}>AI Predictions</Title>
        <Select
          defaultValue="all"
          style={{ width: 200 }}
          onChange={setSelectedMetric}
        >
          <Option value="all">All Metrics</Option>
          <Option value="defect">Defect Rate</Option>
          <Option value="yield">First Pass Yield</Option>
          <Option value="rework">Rework Rate</Option>
        </Select>
      </div>

      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card style={cardStyle}>
            <Statistic
              title={<span style={{ color: 'var(--ant-text-color-secondary)' }}>Overall Prediction Accuracy</span>}
              value={92.5}
              precision={1}
              suffix="%"
              valueStyle={{ color: 'var(--ant-text-color)' }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card style={cardStyle}>
            <Statistic
              title={<span style={{ color: 'var(--ant-text-color-secondary)' }}>Model Confidence</span>}
              value={85.3}
              precision={1}
              suffix="%"
              valueStyle={{ color: 'var(--ant-text-color)' }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card style={cardStyle}>
            <Statistic
              title={<span style={{ color: 'var(--ant-text-color-secondary)' }}>Data Points Analyzed</span>}
              value={12500}
              valueStyle={{ color: 'var(--ant-text-color)' }}
            />
          </Card>
        </Col>
      </Row>

      <Card style={{ ...cardStyle, marginTop: 16 }}>
        <Title level={4} style={{ color: 'var(--ant-heading-color)' }}>Quality Metrics Prediction</Title>
        <div style={{ height: 400 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockPredictionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--ant-border-color-split)" />
              <XAxis 
                dataKey="date" 
                stroke="var(--ant-text-color-secondary)"
                tick={{ fill: 'var(--ant-text-color-secondary)' }}
              />
              <YAxis 
                stroke="var(--ant-text-color-secondary)"
                tick={{ fill: 'var(--ant-text-color-secondary)' }}
              />
              <Tooltip 
                contentStyle={{ 
                  background: 'var(--ant-component-background)',
                  border: '1px solid var(--ant-border-color-split)',
                  color: 'var(--ant-text-color)'
                }}
              />
              <Line type="monotone" dataKey="actual" stroke="#1890ff" name="Actual" />
              <Line type="monotone" dataKey="predicted" stroke="#52c41a" name="Predicted" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card style={{ ...cardStyle, marginTop: 16 }}>
        <Title level={4} style={{ color: 'var(--ant-heading-color)' }}>Detailed Metrics</Title>
        <Table 
          columns={columns} 
          dataSource={mockQualityMetrics}
          pagination={false}
          style={{ background: 'var(--ant-component-background)' }}
        />
      </Card>
    </div>
  );
};

export default Predictions;
