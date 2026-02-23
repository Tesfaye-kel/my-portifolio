import { usePortfolio } from '../../context/PortfolioContext';
import {
  Code,
  Image,
  MessageSquare,
  Link2,
} from 'lucide-react';

const Dashboard = () => {
  const { data } = usePortfolio();

  const stats = [
    {
      label: 'Total Projects',
      value: data.projects?.length || 0,
      icon: Code,
    },
    {
      label: 'Gallery Images',
      value: data.gallery?.length || 0,
      icon: Image,
    },
    {
      label: 'Unread Messages',
      value: data.messages?.filter((m) => !m.read).length || 0,
      icon: MessageSquare,
    },
    {
      label: 'Social Links',
      value: data.socialLinks?.length || 0,
      icon: Link2,
    },
  ];

  return (
    <div>
      <div>
        <h1 style={{ fontSize: '30px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>Dashboard</h1>
        <p style={{ color: '#9ca3af', marginTop: '4px' }}>Welcome back! Here&apos;s an overview of your portfolio.</p>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '16px', marginTop: '24px' }}>
        {stats.map((stat, index) => (
          <div
            key={index}
            style={{
              backgroundColor: '#1f2937',
              borderRadius: '12px',
              padding: '24px',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: '#374151',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ color: '#9ca3af', fontSize: '14px' }}>{stat.label}</p>
                <p style={{ color: 'white', fontSize: '30px', fontWeight: 'bold', marginTop: '8px' }}>{stat.value}</p>
              </div>
              <stat.icon size={32} style={{ color: '#64ffda' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
