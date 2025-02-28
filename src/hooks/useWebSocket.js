import { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const useWebSocket = (userId, token) => {
  const [notifications, setNotifications] = useState([]);
  const [client, setClient] = useState(null);

  useEffect(() => {
    if (!userId || !token) return;

    const stompClient = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"), 
      connectHeaders: {
        Authorization: `Bearer ${token}`, // Token để xác thực
      },
      onConnect: () => {
        console.log("✅ WebSocket Connected");

        // Subscribe đến kênh thông báo của user
        const destination = `/user/${userId}/queue/notifications`;
        stompClient.subscribe(destination, (message) => {
          const newNotification = message.body;
          setNotifications((prev) => [...prev, newNotification]);
        });
      },
      onDisconnect: () => {
        console.log("❌ WebSocket Disconnected");
      },
    });

    stompClient.activate();
    setClient(stompClient);

    return () => {
      stompClient.deactivate();
    };
  }, [userId, token]);

  return { notifications, client };
};

export default useWebSocket;
