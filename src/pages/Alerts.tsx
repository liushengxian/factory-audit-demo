import { useState } from 'react';
import { Table, Card, Tag, Space, Typography, Select, DatePicker, Button, Modal, Form, Input } from 'antd';
import { WarningOutlined, InfoCircleOutlined, PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import type { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';
import { useTheme } from '../contexts/ThemeContext';

const { Title } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

interface Alert {
  id: string;
  factory: string;
  type: 'Safety' | 'Quality' | 'Environment' | 'Operation';
  level: 'info' | 'warning' | 'critical';
  message: string;
  time: string;
  status: 'pending' | 'processing' | 'resolved';
}

const mockAlerts: Alert[] = [
  {
    id: '1',
    factory: 'Shanghai Factory A',
    type: 'Safety',
    level: 'critical',
    message: 'Detected personnel without safety helmet',
    time: '2024-03-15 10:30:00',
    status: 'pending',
  },
  {
    id: '2',
    factory: 'Suzhou Factory B',
    type: 'Quality',
    level: 'warning',
    message: 'Product pass rate below standard',
    time: '2024-03-15 09:15:00',
    status: 'processing',
  },
  {
    id: '3',
    factory: 'Hangzhou Factory C',
    type: 'Environment',
    level: 'info',
    message: 'Temperature out of normal range',
    time: '2024-03-15 08:45:00',
    status: 'resolved',
  },
];

const Alerts = () => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { isDarkMode } = useTheme();

  const cardStyle = {
    background: 'var(--ant-component-background)',
    borderColor: 'var(--ant-border-color-split)',
  };

  const columns = [
    {
      title: 'Factory',
      dataIndex: 'factory',
      key: 'factory',
    },
    {
      title: 'Alert Type',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => {
        const typeConfig = {
          Safety: { color: 'red', text: 'Safety' },
          Quality: { color: 'orange', text: 'Quality' },
          Environment: { color: 'blue', text: 'Environment' },
          Operation: { color: 'purple', text: 'Operation' },
        };
        const config = typeConfig[type as keyof typeof typeConfig];
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: 'Alert Level',
      dataIndex: 'level',
      key: 'level',
      render: (level: string) => {
        const levelConfig = {
          info: { color: 'blue', icon: <InfoCircleOutlined />, text: 'Info' },
          warning: { color: 'orange', icon: <WarningOutlined />, text: 'Warning' },
          critical: { color: 'red', icon: <WarningOutlined />, text: 'Critical' },
        };
        const config = levelConfig[level as keyof typeof levelConfig];
        return (
          <Tag color={config.color} icon={config.icon}>
            {config.text}
          </Tag>
        );
      },
    },
    {
      title: 'Alert Message',
      dataIndex: 'message',
      key: 'message',
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusConfig = {
          pending: { color: 'red', text: 'Pending' },
          processing: { color: 'orange', text: 'Processing' },
          resolved: { color: 'green', text: 'Resolved' },
        };
        const config = statusConfig[status as keyof typeof statusConfig];
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button type="link" size="small">View</Button>
          <Button type="link" size="small">Edit</Button>
        </Space>
      ),
    },
  ];

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current && current > dayjs().endOf('day');
  };

  const handleAddAlert = () => {
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      console.log('Form values:', values);
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Title level={2} style={{ color: 'var(--ant-heading-color)', margin: 0 }}>Alerts Management</Title>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={handleAddAlert}
        >
          Add Alert
        </Button>
      </div>

      <Card style={cardStyle}>
        <Space style={{ marginBottom: 16 }}>
          <Select
            style={{ width: 140 }}
            value={selectedType}
            onChange={setSelectedType}
            options={[
              { value: 'all', label: 'All Types' },
              { value: 'Safety', label: 'Safety' },
              { value: 'Quality', label: 'Quality' },
              { value: 'Environment', label: 'Environment' },
              { value: 'Operation', label: 'Operation' },
            ]}
          />
          <Select
            style={{ width: 140 }}
            value={selectedLevel}
            onChange={setSelectedLevel}
            options={[
              { value: 'all', label: 'All Levels' },
              { value: 'info', label: 'Info' },
              { value: 'warning', label: 'Warning' },
              { value: 'critical', label: 'Critical' },
            ]}
          />
          <Select
            style={{ width: 140 }}
            value={selectedStatus}
            onChange={setSelectedStatus}
            options={[
              { value: 'all', label: 'All Statuses' },
              { value: 'pending', label: 'Pending' },
              { value: 'processing', label: 'Processing' },
              { value: 'resolved', label: 'Resolved' },
            ]}
          />
          <RangePicker
            disabledDate={disabledDate}
            showTime
            format="YYYY-MM-DD HH:mm:ss"
          />
        </Space>
        <Table
          columns={columns}
          dataSource={mockAlerts}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          style={{ background: 'var(--ant-component-background)' }}
        />
      </Card>

      <Modal
        title="Add New Alert"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
        okText="Add"
        cancelText="Cancel"
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="type"
            label="Alert Type"
            rules={[{ required: true, message: 'Please select alert type' }]}
          >
            <Select>
              <Option value="Safety">Safety</Option>
              <Option value="Quality">Quality</Option>
              <Option value="Equipment">Equipment</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="severity"
            label="Severity"
            rules={[{ required: true, message: 'Please select severity' }]}
          >
            <Select>
              <Option value="High">High</Option>
              <Option value="Medium">Medium</Option>
              <Option value="Low">Low</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="location"
            label="Location"
            rules={[{ required: true, message: 'Please enter location' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter description' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Alerts; 