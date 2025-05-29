import { Layout, Menu, Switch, Space, Button } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  DashboardOutlined,
  VideoCameraOutlined,
  AlertOutlined,
  LineChartOutlined,
  CameraOutlined,
  BulbOutlined,
  EyeOutlined,
  ZoomInOutlined,
  AppstoreOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const { Header, Sider } = Layout;

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useTheme();
  const [siderCollapsed, setSiderCollapsed] = useState(true);

  const toggleSider = () => {
    setSiderCollapsed(!siderCollapsed);
  };

  const menuItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: '/monitor/1',
      icon: <VideoCameraOutlined />,
      label: 'Real-Time Monitor',
    },
    {
      key: '/factory-realtime-v2',
      icon: <VideoCameraOutlined />,
      label: 'Factory Real-Time v2',
    },
    {
      key: 'video',
      icon: <VideoCameraOutlined />,
      label: 'Video Monitoring',
      children: [
        {
          key: '/video/alert',
          icon: <EyeOutlined />,
          label: 'Alert Highlight',
        },
        {
          key: '/video/focus',
          icon: <ZoomInOutlined />,
          label: 'Focus Zoom',
        },
        {
          key: '/video/multi',
          icon: <AppstoreOutlined />,
          label: 'Multi-Region',
        },
      ],
    },
    {
      key: '/alerts',
      icon: <AlertOutlined />,
      label: 'Alerts',
    },
    {
      key: '/predictions',
      icon: <LineChartOutlined />,
      label: 'Predictions',
    },
    {
      key: '/snapshots',
      icon: <CameraOutlined />,
      label: 'Snapshots',
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ 
        background: 'var(--ant-component-background)',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={toggleSider}
            style={{ fontSize: '16px' }}
          />
          <h2 style={{ margin: 0, color: 'var(--ant-primary-color)' }}>Smart Factory Audit System</h2>
        </div>
        <Space>
          <BulbOutlined style={{ fontSize: 16 }} />
          <Switch
            checked={isDarkMode}
            onChange={toggleTheme}
            checkedChildren="Dark"
            unCheckedChildren="Light"
          />
        </Space>
      </Header>
      <Layout>
        <Sider 
          width={200} 
          collapsed={siderCollapsed}
          collapsedWidth={0}
          style={{ 
            background: 'var(--ant-component-background)',
            transition: 'all 0.2s'
          }}
        >
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            style={{ height: '100%', borderRight: 0 }}
            items={menuItems}
            onClick={({ key }) => navigate(key)}
          />
        </Sider>
        <Layout style={{ 
          padding: '0', 
          background: 'var(--ant-component-background)',
          transition: 'all 0.2s'
        }}>
          {children}
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout; 