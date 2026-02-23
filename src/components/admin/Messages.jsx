import { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Mail, Check, Trash2, Eye, EyeOff, Search } from 'lucide-react';

const Messages = () => {
  const { data, markMessageRead, deleteMessage } = usePortfolio();
  const [messages, setMessages] = useState(data.messages || []);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setMessages(data.messages || []);
  }, [data.messages]);

  const unreadCount = messages.filter((m) => !m.read).length;

  const filteredMessages = messages.filter(
    (m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMarkRead = (id) => {
    markMessageRead(id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      deleteMessage(id);
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Messages</h1>
        <p className="text-gray-400 mt-1">
          You have {unreadCount} unread message{unreadCount !== 1 ? 's' : ''}.
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search messages..."
          className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1 bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <div className="p-4 border-b border-gray-700">
            <h2 className="font-semibold text-white">All Messages</h2>
          </div>
          <div className="divide-y divide-gray-700 max-h-[600px] overflow-y-auto">
            {filteredMessages.length > 0 ? (
              filteredMessages.map((message) => (
                <div
                  key={message.id}
                  onClick={() => setSelectedMessage(message)}
                  className={`p-4 cursor-pointer hover:bg-gray-700/50 transition-colors ${
                    selectedMessage?.id === message.id ? 'bg-gray-700' : ''
                  } ${!message.read ? 'border-l-4 border-primary' : ''}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white truncate">{message.name}</h3>
                      <p className="text-sm text-gray-400 truncate">{message.email}</p>
                    </div>
                    {!message.read && (
                      <span className="w-2 h-2 bg-primary rounded-full ml-2" />
                    )}
                  </div>
                  <p className="text-sm text-gray-400 mt-2 line-clamp-2">{message.message}</p>
                  <p className="text-xs text-gray-500 mt-2">{message.date}</p>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-400">
                <Mail className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No messages found</p>
              </div>
            )}
          </div>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2 bg-gray-800 rounded-xl border border-gray-700">
          {selectedMessage ? (
            <div className="h-full flex flex-col">
              <div className="p-6 border-b border-gray-700">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-white">{selectedMessage.name}</h2>
                    <p className="text-gray-400">{selectedMessage.email}</p>
                    <p className="text-sm text-gray-500 mt-1">{selectedMessage.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {!selectedMessage.read && (
                      <button
                        onClick={() => handleMarkRead(selectedMessage.id)}
                        className="flex items-center gap-2 px-3 py-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors"
                        title="Mark as read"
                      >
                        <Check size={18} />
                        Mark Read
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(selectedMessage.id)}
                      className="flex items-center gap-2 px-3 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                      title="Delete message"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-6 flex-1 overflow-y-auto">
                <p className="text-gray-300 whitespace-pre-wrap">{selectedMessage.message}</p>
              </div>
              <div className="p-6 border-t border-gray-700">
                <a
                  href={`mailto:${selectedMessage.email}`}
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80"
                >
                  <Mail size={18} />
                  Reply to {selectedMessage.email}
                </a>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-12">
              <div className="text-center">
                <Mail className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Select a Message</h3>
                <p className="text-gray-400">Choose a message from the list to view its contents.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
