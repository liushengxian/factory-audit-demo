import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import { ConfigProvider, theme } from 'antd';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import FactoryMonitor from './pages/FactoryMonitor';
import Alerts from './pages/Alerts';
import Predictions from './pages/Predictions';
import Snapshots from './pages/Snapshots';
import AlertHighlight from './pages/video-monitor/AlertHighlight';
import FocusZoom from './pages/video-monitor/FocusZoom';
import MultiRegion from './pages/video-monitor/MultiRegion';
import FactoryRealtimeV2 from './pages/factory-realtime/FactoryRealtimeV2';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import './App.css';

const { Content } = Layout;

const AppContent = () => {
  const { isDarkMode } = useTheme();

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: '#1890ff',
        },
      }}
    >
      <Router basename={import.meta.env.PROD ? '/factory-audit-demo' : '/'}>
        <MainLayout>
          <Content className="site-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/monitor/:factoryId" element={<FactoryMonitor />} />
              <Route path="/factory-realtime-v2" element={<FactoryRealtimeV2 />} />
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/predictions" element={<Predictions />} />
              <Route path="/snapshots" element={<Snapshots />} />
              <Route path="/video/alert" element={<AlertHighlight />} />
              <Route path="/video/focus" element={<FocusZoom />} />
              <Route path="/video/multi" element={<MultiRegion />} />
            </Routes>
          </Content>
        </MainLayout>
      </Router>
    </ConfigProvider>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
