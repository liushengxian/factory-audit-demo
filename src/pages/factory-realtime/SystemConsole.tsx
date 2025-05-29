import React, { useState, useEffect, useRef } from 'react';
import { Card, List, Typography } from 'antd';
import { useTheme } from '../../contexts/ThemeContext';

const { Text } = Typography;

// Mock console logs
const initialConsoleLogs = [
  { id: 1, time: '2024-03-15 14:32:15', type: 'info', message: 'Sensor calibration completed successfully', source: 'Temperature Sensor #1' },
  { id: 2, time: '2024-03-15 14:31:42', type: 'warning', message: 'Humidity level approaching upper threshold', source: 'Humidity Sensor #2' },
  { id: 3, time: '2024-03-15 14:30:08', type: 'error', message: 'Connection timeout to pressure sensor', source: 'Pressure Sensor #3' },
  { id: 4, time: '2024-03-15 14:29:35', type: 'info', message: 'Data backup completed', source: 'System' },
  { id: 5, time: '2024-03-15 14:28:12', type: 'info', message: 'Quality check passed for Line A', source: 'Quality Control' },
  { id: 6, time: '2024-03-15 14:27:48', type: 'warning', message: 'Machine temperature elevated', source: 'Machine Monitor' },
];

// Additional system messages for auto-generation
const systemMessages = [
  { type: 'info', message: 'System health check completed', source: 'System Monitor' },
  { type: 'info', message: 'Network connectivity verified', source: 'Network Service' },
  { type: 'warning', message: 'CPU usage above 80%', source: 'Performance Monitor' },
  { type: 'info', message: 'Database synchronization complete', source: 'Database Service' },
  { type: 'warning', message: 'Disk space running low on drive C:', source: 'Storage Monitor' },
  { type: 'error', message: 'Failed to connect to external API', source: 'API Gateway' },
  { type: 'info', message: 'User authentication successful', source: 'Auth Service' },
  { type: 'warning', message: 'High memory usage detected', source: 'Memory Monitor' },
  { type: 'info', message: 'Scheduled maintenance completed', source: 'Maintenance Service' },
  { type: 'error', message: 'SSL certificate expires in 7 days', source: 'Security Monitor' },
];

interface SystemConsoleProps {
  cardStyle: React.CSSProperties;
}

const SystemConsole: React.FC<SystemConsoleProps> = ({ cardStyle }) => {
  const { isDarkMode } = useTheme();
  const [consoleLogs, setConsoleLogs] = useState(initialConsoleLogs);
  const [messageId, setMessageId] = useState(initialConsoleLogs.length + 1);
  const scrollRef = useRef<HTMLDivElement>(null);

  const getLogTypeColor = (type: string) => {
    switch (type) {
      case 'error': return '#ff4d4f';
      case 'warning': return '#faad14';
      case 'info': return '#1890ff';
      default: return '#666';
    }
  };

  const generateRandomMessage = () => {
    const randomMessage = systemMessages[Math.floor(Math.random() * systemMessages.length)];
    const now = new Date();
    const timeString = now.toLocaleString('sv-SE').replace('T', ' ');
    
    return {
      id: messageId,
      time: timeString,
      type: randomMessage.type,
      message: randomMessage.message,
      source: randomMessage.source
    };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newMessage = generateRandomMessage();
      setConsoleLogs(prev => [...prev, newMessage]);
      setMessageId(prev => prev + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, [messageId]);

  useEffect(() => {
    // Auto-scroll to bottom when new messages are added
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [consoleLogs]);

  return (
    <Card 
      title="System Console" 
      style={{ ...cardStyle, height: '100%' }}
      bodyStyle={{ height: 'calc(100% - 56px)', padding: 0 }}
    >
      <div 
        ref={scrollRef}
        style={{ 
          height: '100%', 
          background: isDarkMode ? '#1f1f1f' : '#f8f8f8',
          fontFamily: 'Monaco, Consolas, "Courier New", monospace',
          fontSize: '12px',
          overflow: 'auto',
          padding: '12px'
        }}
      >
        <List
          size="small"
          dataSource={consoleLogs}
          renderItem={(item) => (
            <List.Item style={{ padding: '4px 0', borderBottom: 'none' }}>
              <div style={{ width: '100%', display: 'flex', alignItems: 'flex-start' }}>
                <Text 
                  style={{ 
                    color: 'var(--ant-text-color-secondary)', 
                    fontSize: '11px',
                    minWidth: '140px',
                    marginRight: '8px'
                  }}
                >
                  {item.time}
                </Text>
                <Text 
                  style={{ 
                    color: getLogTypeColor(item.type),
                    fontWeight: 'bold',
                    fontSize: '11px',
                    minWidth: '60px',
                    marginRight: '8px'
                  }}
                >
                  [{item.type.toUpperCase()}]
                </Text>
                <Text style={{ fontSize: '11px', color: 'var(--ant-text-color)' }}>
                  {item.source}: {item.message}
                </Text>
              </div>
            </List.Item>
          )}
        />
      </div>
    </Card>
  );
};

export default SystemConsole;
