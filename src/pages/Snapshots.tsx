import { Card, Row, Col, DatePicker, Typography, Image } from 'antd';
import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';

const { Title } = Typography;
const { RangePicker } = DatePicker;

const mockSnapshots = [
  {
    id: '1',
    time: '2024-03-15 10:00:00',
    url: 'https://placehold.co/320x180?text=Snapshot+1'
  },
  {
    id: '2',
    time: '2024-03-15 11:00:00',
    url: 'https://placehold.co/320x180?text=Snapshot+2'
  },
  {
    id: '3',
    time: '2024-03-15 12:00:00',
    url: 'https://placehold.co/320x180?text=Snapshot+3'
  },
];

const Snapshots = () => {
  const [range, setRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);

  const filtered = range
    ? mockSnapshots.filter(s => {
        const t = dayjs(s.time);
        return (
          (!range[0] || t.isAfter(range[0], 'minute')) &&
          (!range[1] || t.isBefore(range[1], 'minute'))
        );
      })
    : mockSnapshots;

  return (
    <div>
      <Title level={2}>Monitoring Snapshots</Title>
      <Card style={{ marginBottom: 16 }}>
        <RangePicker
          showTime
          onChange={setRange}
          style={{ width: 320 }}
        />
      </Card>
      <Row gutter={[16, 16]}>
        {filtered.map(snap => (
          <Col key={snap.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              cover={<Image src={snap.url} alt={`Snapshot ${snap.id}`} />}
              bordered
            >
              <Card.Meta title={snap.time} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Snapshots; 