import React, { useState, useEffect, useRef } from 'react';
import InputMsg from './chat/components/InputMsg';
import ChatHeader from './chat/components/Header';
import Message from './chat/components/Message';
import { SocketManager } from './chat/utils/socket';

const baseUrl = import.meta.env.VITE_BASE_URL || "ws://localhost:8000/ws";

const ChatPage = () => {
    // برای نگهداری پیام‌
    const [message, setMessage] = useState("");

    const [chatLog, setChatLog] = useState([]);
    const socketRef = useRef(null);


    useEffect(() => {
        // ساختن یک instance از SocketManager
        socketRef.current = new SocketManager(baseUrl + '/ws');

        socketRef.current.connect();

        const handleMessage = (msg) => {
            setChatLog((prev) => [...prev, { from: "other", text: msg }]);
        };

        // اضافه کردن این تابع به لیست دریافت‌کننده‌ها
        socketRef.current.addMessageListener(handleMessage);

        return () => {
            socketRef.current.removeMessageListener(handleMessage);
            socketRef.current.disconnect();
        };
    }, []);

    const sendMessage = () => {
        socketRef.current.sendMessage(message);
        setChatLog((prev) => [...prev, { from: "me", text: message }]);
        setMessage('');
    };

    // Ref برای اسکرول خودکار به آخرین پیام
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    // scroll down when message recived
    useEffect(()=>{
        scrollToBottom()
    },[chatLog])
    return (
        <div className="flex flex-col h-dvh w-dvw bg-white shadow-xl rounded-lg">
            {/* هدر چت روم */}
            <ChatHeader />

            {/* بخش نمایش پیام‌ها */}
            <div className="flex-grow p-4 space-y-4 overflow-y-auto bg-gray-50" dir="rtl overflow-y-scroll">
                {chatLog.map((message, index) => (
                    <Message message={message}
                        key={index} />
                ))}
                {/* این المنت خالی برای اسکرول خودکار استفاده می‌شود */}
                <div ref={messagesEndRef} />
            </div>

            {/* بخش ورودی و دکمه ارسال */}
            <InputMsg sendMessage={sendMessage} setMessage={setMessage} message={message} />
        </div>
    );
};

export default ChatPage;