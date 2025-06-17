import React, { useState, useEffect, useRef } from 'react';
import { Card, List, Typography } from 'antd';
import { useTheme } from '../../contexts/ThemeContext';

const { Text } = Typography;

// Mock console logs
const initialConsoleLogs = [
  { id: 1, time: '2024-03-15 14:32:15', type: 'info', message: 'FCCA audit commenced - Facility assessment initiated', source: 'FCCA Audit Team' },
  { id: 2, time: '2024-03-15 14:31:42', type: 'warning', message: 'Minor defect: Worker break area lacks adequate seating', source: 'Worker Welfare Audit' },
  { id: 3, time: '2024-03-15 14:30:08', type: 'error', message: 'Major defect: Overtime records exceed regulatory limits', source: 'Labor Standards' },
  { id: 4, time: '2024-03-15 14:29:35', type: 'info', message: 'Compliance verified: Age verification documents complete', source: 'Child Labor Prevention' },
  { id: 5, time: '2024-03-15 14:28:12', type: 'warning', message: 'Finding: Machine safety guards require adjustment', source: 'Machine Safety Audit' },
  { id: 6, time: '2024-03-15 14:27:48', type: 'error', message: 'Critical defect: Electrical panel access obstructed', source: 'Electrical Safety' },
];

// Additional system messages for auto-generation
const systemMessages = [
  { type: 'info', message: 'FCCA audit checkpoint: Working hours compliance verified', source: 'FCCA Audit System' },
  { type: 'warning', message: 'Minor defect: Fire extinguisher inspection overdue by 3 days', source: 'Safety Compliance' },
  { type: 'error', message: 'Major defect: Emergency exit blocked in Building C', source: 'Safety Audit' },
  { type: 'info', message: 'Environmental compliance: Waste segregation standards met', source: 'Environmental Audit' },
  { type: 'warning', message: 'Minor defect: Personal protective equipment not properly stored', source: 'Workplace Safety' },
  { type: 'error', message: 'Critical defect: Chemical storage ventilation system malfunction', source: 'Chemical Safety' },
  { type: 'info', message: 'Labor standards verification: Break time compliance confirmed', source: 'Labor Compliance' },
  { type: 'warning', message: 'Finding: Training records incomplete for 3 operators', source: 'Training Audit' },
  { type: 'error', message: 'Major defect: First aid kit expired medications found', source: 'Health & Safety' },
  { type: 'warning', message: 'Observation: Housekeeping standards below expectation in Zone 2', source: 'Facility Audit' },
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
