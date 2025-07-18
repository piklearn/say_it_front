import { useEffect, useState } from 'react'
import ChatPage from './ChatPage';
import Loading from './utils/compnents/Loading';
import useChatSocket from './hooks/useChatSocket';

function App() {
    const baseUrl = import.meta.env.VITE_BASE_URL || "ws://localhost:8000/ws";
    const { isLoading, setIsLoading } = useState(true);
    const { userId, status, chatLog, sendMessage } = useChatSocket(baseUrl + '/ws', setIsLoading);

    return (
        <>
            <ChatPage
                name={userId}
                chatLog={chatLog}
                sendMessage={sendMessage}
                status={status}
            />
        </>
    )
}

export default App
