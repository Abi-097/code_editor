import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";

function addPropsToReactElement(element, props) {
  if (React.isValidElement(element)) {
    return React.cloneElement(element, props);
  }
  return element;
}

function addPropsToChildren(children, props) {
  if (!Array.isArray(children)) {
    return addPropsToReactElement(children, props);
  }
  return children.map((childElement) =>
    addPropsToReactElement(childElement, props)
  );
}

export default function SocketWrapper({ children }) {
  // const socket = io.connect(
  //   // process.env.REACT_APP_WEB_SOCKET_URL || "http://localhost:5000"
  //   process.env.REACT_APP_WEB_SOCKET_URL ||
  //     "https://code-editor-server-ochre.vercel.app"
  // );
  const socket = io(
    process.env.REACT_APP_WEB_SOCKET_URL ||
      "https://code-editor-server-ochre.vercel.app",
    {
      transports: ["websocket"],
    }
  );
  const location = useLocation();
  const navigate = useNavigate();
  const { roomId } = useParams();

  useEffect(() => {
    function kickStrangerOut() {
      navigate("/", { replace: true });
      toast.error("No username provided");
    }

    if (location.state && location.state.username) {
      socket.emit("when a user joins", {
        roomId,
        username: location.state.username,
      });

      socket.on("connect_error", (err) => {
        console.error("Connection Error:", err);
        toast.error("Connection failed. Please try again later.");
      });
    } else {
      kickStrangerOut();
    }

    return () => {
      socket.disconnect();
    };
  }, [socket, location.state, roomId, navigate]);

  return location.state && location.state.username ? (
    <div>{addPropsToChildren(children, { socket })}</div>
  ) : (
    <div className="room">
      <h2>No username provided. Please use the form to join a room.</h2>
    </div>
  );
}
