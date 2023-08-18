'use client'

import React, { useState, useEffect } from 'react';
import Pusher from 'pusher-js';

const AdminChat = ({ userId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const pusher = new Pusher('08fffc3c6fcb0f95f566', {
        cluster: 'ap2'
      });

    const channel = pusher.subscribe(`user-${userId}`);
    channel.bind('message', data => {
      setMessages(prevMessages => [...prevMessages, data]);
    });

    return () => {
      pusher.unsubscribe(`user-${userId}`);
    };
  }, [userId]);

  const sendMessage = () => {
    if (newMessage.trim() !== '') {
      // Send the message to the backend
     const data = fetch('/api/pusher/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, message: newMessage }),
      }).then(res =>{
        console.log(res.body)
      });

      setMessages([...messages, { role: 'admin', message: newMessage }]);
      setNewMessage('');
    }
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <span>{message.role === 'admin' ? 'Admin: ' : 'Customer: '}</span>
            {message.message}
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default AdminChat;
