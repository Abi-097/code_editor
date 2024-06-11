import { useEffect, useRef, useState } from "react";
import Logo from "../assets/Logo.png";
import Client from "./Client";
import Editor from "./Editor";
import { ACTIONS } from "../Action";
import { toast } from "react-hot-toast";
import {
  useNavigate,
  useLocation,
  Navigate,
  useParams,
} from "react-router-dom";
import { initSocket } from "../Socket";

const EditPage = () => {
  const [clients, setClients] = useState([]);
  const [socket, setSocket] = useState(null);
  const codeRef = useRef(null);
  // const socketRef = useRef(null);
  const Location = useLocation();
  const navigate = useNavigate();
  const { roomId } = useParams();

  const handleErrors = (err) => {
    console.log("Error", err);
    toast.error("Socket connection failed, Try again later");
    navigate("/");
  };

  useEffect(() => {
    const init = async () => {
      try {
        const socketURL = "http://localhost:5000"; // Specify your socket URL here
        const socketInstance = await initSocket(socketURL);
        setSocket(socketInstance);

        socketInstance.on("connect_error", (err) => handleErrors(err));
        socketInstance.on("connect_failed", (err) => handleErrors(err));

        const handleErrors = (err) => {
          console.log("Error", err);
          toast.error("Socket connection failed, Try again later");
          navigate("/");
        };

        socketInstance.emit(ACTIONS.JOIN, {
          roomId,
          username: Location.state?.username,
        });

        socketInstance.on(ACTIONS.JOINED, ({ clients, username, socketId }) => {
          if (username !== Location.state?.username) {
            toast.success(`${username} joined the room.`);
          }
          setClients(clients);
          socketInstance.emit(ACTIONS.SYNC_CODE, {
            code: codeRef.current,
            socketId,
          });
        });

        socketInstance.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
          toast.success(`${username} left the room`);
          setClients((prev) => {
            return prev.filter((client) => client.socketId !== socketId);
          });
        });
      } catch (error) {
        console.error(error);
        handleErrors(error);
      }
    };

    init();

    // Cleanup
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [Location.state, navigate, roomId]);

  if (!Location.state) {
    return <Navigate to="/" />;
  }

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success(`roomId is copied`);
    } catch (error) {
      console.log(error);
      toast.error("Unable to copy the room Id");
    }
  };

  const leaveRoom = async () => {
    navigate("/");
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        <div
          className="col-md-2 bg-dark text-light d-flex flex-column h-100"
          style={{ boxShadow: "2px 0px 4px rgba(0, 0, 0, 0.1)" }}
        >
          <img
            src={Logo}
            alt="Logo"
            className="img-fluid mx-auto"
            style={{ maxWidth: "80px" }}
          />
          <hr />
          <div className="d-flex flex-column flex-grow-1 overflow-auto">
            <span className="mb-2 text-center">Members</span>
            {clients.map((client) => (
              <Client key={client.socketId} username={client.username} />
            ))}
          </div>
          <hr />
          <div className="mt-auto">
            <button className="btn btn-success" onClick={copyRoomId}>
              Copy Room ID
            </button>
            <button
              className="btn btn-danger mt-2 mb-2 px-3 btn-block"
              onClick={leaveRoom}
            >
              Exit Room
            </button>
          </div>
        </div>
        <div className="col-md-10 text-light d-flex flex-column h-100">
          <Editor
            // socketRef={socketRef}
            socket={socket}
            roomId={roomId}
            onCodeChange={(code) => {
              codeRef.current = code;
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default EditPage;
