import { io } from "socket.io-client";

export const initSocket = async (socketURL) => {
  const options = {
    forceNew: true,
    reconnectionAttempts: Infinity,
    timeout: 10000,
    transports: ["websocket"],
  };

  if (!socketURL) {
    throw new Error("Socket URL is not defined");
  }

  return io(socketURL, options);
};
