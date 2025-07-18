
export class SocketManager {
  constructor(url) {
    this.url = url;
    this.ws = null;
    this.listeners = [];
  }

  connect() {
    this.ws = new WebSocket(this.url);

    this.ws.onmessage = (event) => {
      this.listeners.forEach((callback) => callback(event.data));
    };

    this.ws.onclose = () => {
      console.log("WebSocket connection closed");
      // اگه خواستی اینجا reconnect هم بذار
    };
  }

  sendMessage(message) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(message);
    } else {
      console.error("WebSocket not connected");
    }
  }

  addMessageListener(callback) {
    this.listeners.push(callback);
  }

  removeMessageListener(callback) {
    this.listeners = this.listeners.filter((cb) => cb !== callback);
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
    }
  }
}
