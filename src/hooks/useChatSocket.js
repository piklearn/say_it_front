import { useEffect, useRef, useState } from "react";

export default function useChatSocket(url) {
  const ws = useRef(null);
  const [status, setStatus] = useState("connecting"); // connecting | waiting | matched | disconnected
  const [userId, setUserId] = useState();
  const [partnerId, setPartnerId] = useState();
  const [chatLog, setChatLog] = useState([]);

  useEffect(() => {
    ws.current = new WebSocket(url);

    ws.current.onopen = () => {
      const id = localStorage.getItem('user_id');
      if (id) {
        ws.current.send(JSON.stringify({
          "status": "request_continue_chat",
          "payload": {
            "user_id": id
          }
        }))
      } else {
        ws.current.send(JSON.stringify({
          "status": "new id"
        }))
      }
      setStatus("connecting");
    };

    ws.current.onmessage = (event) => {
      const msg = JSON.parse(event.data);

      if (msg["status"] === "new id") {
        setUserId(msg["payload"]["user_id"]);
        localStorage.setItem("user_id", msg["payload"]["user_id"]);

      } else if (msg["status"] === "waiting") {
        setStatus("waiting");

      } else if (msg["status"] === "matched") {
        setStatus("matched");
        setPartnerId(msg["payload"]["partner_id"])

      } else if (msg["status"] === "partner_disconnected") {
        setStatus("disconnected");
        alert("مخاطب قطع شد");

      } else if (msg["status"] === "receive_message") {
        console.log(msg);

        setChatLog((prev) => [...prev, { from: "partner", text: msg["payload"]["content"] }]);
      }
      else {
        console.log(msg)
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

  return { partnerId, userId, status, chatLog, sendMessage };
}
