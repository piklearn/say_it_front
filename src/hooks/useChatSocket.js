import { useEffect, useRef, useState } from "react";

export default function useChatSocket(url, setIsLoading) {
  const ws = useRef(null);
  const [status, setStatus] = useState("connecting"); // connecting | waiting | matched | disconnected
  const [userId, setUserId] = useState(); 
  const [chatLog, setChatLog] = useState([]);

  useEffect(() => {
    ws.current = new WebSocket(url);

    ws.current.onopen = () => {
      setStatus("connecting");
    };

    ws.current.onmessage = (event) => {
      const msg = event.data;
      if (msg.startsWith("SET_ID:")) {
        setUserId(msg.split(":")[1]);
        localStorage.setItem("user_id", msg.split(":")[1]);
      } else if (msg === "WAITING") {
        setStatus("waiting");
      } else if (msg === "MATCHED") {
        setStatus("matched");
        setIsLoading(false);
      } else if (msg === "PARTNER_DISCONNECTED") {
        setStatus("disconnected");
        alert("طرف مقابل قطع شد" );
      } else {
        setChatLog((prev) => [...prev, { from: "partner", text: msg }]);
      }
    };

    ws.current.onclose = () => {
      setStatus("disconnected");
    };

    return () => {
      ws.current.close();
    };
  }, [url]);

  const sendMessage = (text) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(text);
      setChatLog((prev) => [...prev, { from: "me", text }]);
    }
  };

  return { userId, status, chatLog, sendMessage };
}
