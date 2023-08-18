"use client"
import React, { useState, useEffect } from 'react';
import Pusher from 'pusher-js';

const UserChat = ({ userId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const pusher = new Pusher('08fffc3c6fcb0f95f566', {
        cluster: 'ap2'
      });

    const channel = pusher.subscribe(`user-${userId}`);
    channel.bind('message', data => {
        console.log(data)
      setMessages(prevMessages => [...prevMessages, data.message]);
    });

    return () => {
      pusher.unsubscribe(`user-${userId}`);
    };
  }, [userId]);

  const sendMessage = () => {
    if (newMessage.trim() !== '') {
      // Send the message to the backend
      fetch('/api/pusher/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, message: newMessage }),
      });

      setNewMessage('');
    }
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
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

export default UserChat;
