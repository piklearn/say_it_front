// src/components/ChatRoom.js

import React, { useState, useEffect, useRef } from 'react';
import InputMsg from './InputMsg';
import ChatHeader from './header';

const ChatRoom = () => {
  // State برای نگهداری لیست پیام‌ها
  const [messages, setMessages] = useState([
    { id: 1, text: 'سلام! خوش اومدی. به صورت ناشناس وصل شدی.', sender: 'other' },
    { id: 2, text: 'سلام، ممنون!', sender: 'me' },
  ]);

  // State برای نگهداری متن پیام جدید در اینپوت
  const [newMessage, setNewMessage] = useState('');

  // Ref برای اسکرول خودکار به آخرین پیام
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // هر بار که پیام جدیدی اضافه می‌شود، به پایین اسکرول کن
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // تابع برای مدیریت ارسال پیام
  const handleSendMessage = (e) => {
    e.preventDefault(); // جلوگیری از رفرش شدن صفحه با ارسال فرم

    if (newMessage.trim() === '') return; // اگر پیام خالی بود، ارسال نکن

    // ساخت آبجکت پیام جدید کاربر
    const userMessage = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'me',
    };

    // اضافه کردن پیام کاربر به لیست پیام‌ها
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setNewMessage(''); // خالی کردن اینپوت

    // شبیه‌سازی پاسخ از طرف مقابل با یک ثانیه تأخیر
    setTimeout(() => {
      const otherMessage = {
        id: messages.length + 2,
        text: 'جالبه! از کجا هستی؟',
        sender: 'other',
      };
      setMessages((prevMessages) => [...prevMessages, otherMessage]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[500px] w-full max-w-lg mx-auto bg-white shadow-xl rounded-lg">
      {/* هدر چت روم */}
      <ChatHeader/>

      {/* بخش نمایش پیام‌ها */}
      <div className="flex-grow p-4 space-y-4 overflow-y-auto bg-gray-50" dir="rtl">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg shadow ${
                message.sender === 'me'
                  ? 'bg-blue-500 text-white rounded-br-none'
                  : 'bg-white text-gray-800 rounded-bl-none'
              }`}
            >
              <p>{message.text}</p>
            </div>
          </div>
        ))}
        {/* این المنت خالی برای اسکرول خودکار استفاده می‌شود */}
        <div ref={messagesEndRef} />
      </div>

      {/* بخش ورودی و دکمه ارسال */}
      <InputMsg setNewMessage={setNewMessage} newMessage={newMessage} handleSendMessage={handleSendMessage}/>
    </div>
  );
};

export default ChatRoom;