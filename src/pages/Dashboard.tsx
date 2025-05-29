import { Row, Col, Card, Table, Tag, Space, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { 
  WarningOutlined, 
  CheckCircleOutlined, 
  ClockCircleOutlined 
} from '@ant-design/icons';

const { Title } = Typography;

interface Factory {
  id: string;
  name: string;
  status: 'normal' | 'warning' | 'critical';
  lastInspection: string;
  alerts: number;
  predictions: number;
}

const mockFactories: Factory[] = [
  {
    id: '1',
    name: 'Shanghai Factory A',
    status: 'normal',
    lastInspection: '2024-03-15',
    alerts: 0,
    predictions: 2,
  },
  {
    id: '2',
    name: 'Suzhou Factory B',
    status: 'warning',
    lastInspection: '2024-03-14',
    alerts: 3,
    predictions: 1,
  },
  {
    id: '3',
    name: 'Hangzhou Factory C',
    status: 'critical',
    lastInspection: '2024-03-13',
    alerts: 5,
    predictions: 3,
  },
];

const Dashboard = () => {
  const navigate = useNavigate();

  const columns = [
    {
      title: 'Factory Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusConfig = {
          normal: { color: 'success', icon: <CheckCircleOutlined />, text: 'Normal' },
          warning: { color: 'warning', icon: <WarningOutlined />, text: 'Warning' },
          critical: { color: 'error', icon: <WarningOutlined />, text: 'Critical' },
        };
        const config = statusConfig[status as keyof typeof statusConfig];
        return (
          <Tag color={config.color} icon={config.icon}>
            {config.text}
          </Tag>
        );
      },
    },
    {
      title: 'Last Inspection',
      dataIndex: 'lastInspection',
      key: 'lastInspection',
    },
    {
      title: 'Alerts',
      dataIndex: 'alerts',
      key: 'alerts',
    },
    {
      title: 'Predicted Issues',
      dataIndex: 'predictions',
      key: 'predictions',
    },
    {
      title: 'Actions',
      key: 'action',
      render: (_: any, record: Factory) => (
        <Space size="middle">
          <a onClick={() => navigate(`/monitor/${record.id}`)}>View Monitor</a>
          <a onClick={() => navigate('/alerts')}>View Alerts</a>
        </Space>
      ),
    },
  ];

  const cardStyle = {
    background: 'var(--ant-component-background)',
    borderColor: 'var(--ant-border-color-split)',
  };

  const iconStyle = {
    fontSize: 24,
    color: 'var(--ant-primary-color)',
  };

  return (
    <div style={{ background: 'var(--ant-component-background)'}}>
      <Title level={2} style={{ color: 'var(--ant-heading-color)' }}>Factory Audit Overview</Title>
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col span={8}>
          <Card style={cardStyle}>
            <Space>
              <WarningOutlined style={{ ...iconStyle, color: '#faad14' }} />
              <div>
                <div style={{ color: 'var(--ant-text-color-secondary)' }}>Pending Alerts</div>
                <div style={{ fontSize: 24, fontWeight: 'bold', color: 'var(--ant-text-color)' }}>8</div>
              </div>
            </Space>
          </Card>
        </Col>
        <Col span={8}>
          <Card style={cardStyle}>
            <Space>
              <ClockCircleOutlined style={{ ...iconStyle, color: '#1890ff' }} />
              <div>
                <div style={{ color: 'var(--ant-text-color-secondary)' }}>Inspections Today</div>
                <div style={{ fontSize: 24, fontWeight: 'bold', color: 'var(--ant-text-color)' }}>3</div>
              </div>
            </Space>
          </Card>
        </Col>
        <Col span={8}>
          <Card style={cardStyle}>
            <Space>
              <CheckCircleOutlined style={{ ...iconStyle, color: '#52c41a' }} />
              <div>
                <div style={{ color: 'var(--ant-text-color-secondary)' }}>Normal Factories</div>
                <div style={{ fontSize: 24, fontWeight: 'bold', color: 'var(--ant-text-color)' }}>12</div>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>
      <Card 
        title="Factory List" 
        style={cardStyle}
        headStyle={{ 
          background: 'var(--ant-component-background)',
          borderBottom: '1px solid var(--ant-border-color-split)'
        }}
      >
        <Table 
          columns={columns} 
          dataSource={mockFactories} 
          rowKey="id"
          pagination={false}
          style={{ background: 'var(--ant-component-background)' }}
        />
      </Card>
    </div>
  );
};

export default Dashboard; 