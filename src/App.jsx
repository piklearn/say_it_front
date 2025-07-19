import { useState } from 'react'
import ChatPage from './ChatPage';
import useChatSocket from './hooks/useChatSocket';
import "./App.css"
function App() {
    const baseUrl = import.meta.env.VITE_BASE_URL || "ws://localhost:8000/ws";
    const { partnerId, userId, status, chatLog, sendMessage } = useChatSocket(baseUrl + '/ws');

    return (
        <>
            <ChatPage
                name={partnerId}
                chatLog={chatLog}
                sendMessage={sendMessage}
                status={status}
            />
        </>
    )
}

export default App
