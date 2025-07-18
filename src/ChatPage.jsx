import React, { useState, useEffect, useRef } from 'react';
import InputMsg from './chat/components/InputMsg';
import ChatHeader from './chat/components/Header';
import Message from './chat/components/Message';
import Loading from './utils/compnents/Loading';

const ChatPage = ({ name,
    chatLog,
    sendMessage,
    status }) => {
    // برای نگهداری پیام‌
    const [message, setMessage] = useState("");

    const handleSendMessage = () => {
        sendMessage(message);
        setMessage('');
    };

    // Ref برای اسکرول خودکار به آخرین پیام
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    // scroll down when message recived
    useEffect(() => {
        scrollToBottom()
    }, [chatLog])
    return (<>
        <Loading status={status} />
        <div className="flex flex-col h-dvh w-dvw bg-white shadow-xl rounded-lg">
            {/* هدر چت روم */}
            <ChatHeader name={name} status={status} />

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
            <InputMsg handleSendMessage={handleSendMessage} setMessage={setMessage} message={message} />
        </div>
    </>
    );
};

export default ChatPage;