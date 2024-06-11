// import { io } from "socket.io-client";

// export const initSocket = async () => {
//   const options = {
//     forceNew: true, // Correcting the option key
//     reconnectionAttempts: Infinity, // Use Infinity as a number, not a string
//     timeout: 10000,
//     transports: ["websocket"],
//   };

//   // Check if the REACT_APP_BACKEND_URL environment variable is set
//   if (!process.env.REACT_APP_SOCKET_IO_URL) {
//     throw new Error("REACT_APP_SOCKET_IO_URL is not defined");
//   }

//   return io(process.env.REACT_APP_SOCKET_IO_URL, options);
// };
import { io } from "socket.io-client";

export const initSocket = async () => {
  const options = {
    "force new connection": true,
    reconnectionAttempts: "Infinity",
    timeout: 10000,
    transports: ["websocket"],
  };
  return io(process.env.REACT_APP_BACKEND_URL, options);
};
