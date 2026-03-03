import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Admin() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/messages').then(res => setMessages(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 flex text-white">
      <aside className="w-64 bg-slate-900 p-6 border-r border-slate-800">
        <h2 className="text-2xl font-bold text-blue-500 mb-10">Admin Dashboard</h2>
        <nav className="space-y-4">
          <p className="text-white font-semibold">Messages</p>
          <p className="text-gray-500">Project Manager</p>
          <p className="text-gray-500">Skills Manager</p>
        </nav>
      </aside>
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-8">Inbox Messages</h1>
        <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-800 text-gray-400 uppercase text-xs">
              <tr>
                <th className="p-4">Sender</th>
                <th className="p-4">Subject</th>
                <th className="p-4">Message</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((m, i) => (
                <tr key={i} className="border-b border-slate-800">
                  <td className="p-4 font-bold">{m.name}</td>
                  <td className="p-4">{m.subject}</td>
                  <td className="p-4 text-gray-400">{m.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}