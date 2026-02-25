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

      {/* Recent Messages Table */}
      <div style={{ marginTop: '32px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'white', marginBottom: '16px' }}>Recent Messages</h2>
        <div style={{ backgroundColor: '#1f2937', borderRadius: '12px', borderWidth: '1px', borderStyle: 'solid', borderColor: '#374151', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#111827' }}>
                <th style={{ padding: '16px', textAlign: 'left', color: '#9ca3af', fontWeight: '500', fontSize: '14px' }}>Name</th>
                <th style={{ padding: '16px', textAlign: 'left', color: '#9ca3af', fontWeight: '500', fontSize: '14px' }}>Email</th>
                <th style={{ padding: '16px', textAlign: 'left', color: '#9ca3af', fontWeight: '500', fontSize: '14px' }}>Message</th>
                <th style={{ padding: '16px', textAlign: 'left', color: '#9ca3af', fontWeight: '500', fontSize: '14px' }}>Date</th>
                <th style={{ padding: '16px', textAlign: 'left', color: '#9ca3af', fontWeight: '500', fontSize: '14px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.messages && data.messages.length > 0 ? (
                data.messages.slice(0, 5).map((message, index) => (
                  <tr key={message.id} style={{ borderBottomWidth: index < 4 ? '1px' : '0', borderBottomStyle: 'solid', borderBottomColor: '#374151' }}>
                    <td style={{ padding: '16px', color: 'white', fontSize: '14px' }}>{message.name}</td>
                    <td style={{ padding: '16px', color: '#9ca3af', fontSize: '14px' }}>{message.email}</td>
                    <td style={{ padding: '16px', color: '#d1d5db', fontSize: '14px', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{message.message}</td>
                    <td style={{ padding: '16px', color: '#9ca3af', fontSize: '14px' }}>{message.date}</td>
                    <td style={{ padding: '16px' }}>
                      <span style={{ 
                        padding: '4px 12px', 
                        borderRadius: '9999px', 
                        fontSize: '12px', 
                        fontWeight: '500',
                        backgroundColor: message.read ? '#065f46' : '#dc2626',
                        color: message.read ? '#6ee7b7' : '#fca5a5'
                      }}>
                        {message.read ? 'Read' : 'Unread'}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ padding: '32px', textAlign: 'center', color: '#6b7280' }}>No messages yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
