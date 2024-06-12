import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4, validate } from "uuid";
import { Toaster, toast } from "react-hot-toast";
import "./JoinRoom.css";
import Logo from "../../Logo.png";
import { BinaryCodeIcon } from "../../components/Icons";
export default function JoinRoom() {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState(() => "");
  const [username, setUsername] = useState(() => "");
  const [formSubmitted, setFormSubmitted] = useState(false);

  function handleRoomSubmit(e) {
    e.preventDefault();
    setFormSubmitted(true);

    if (!roomId || !username) {
      toast.error("Room ID and username are required", {
        style: {
          borderRadius: "10px",
          background: "#FF6969",
        },
      });
      return;
    }

    if (!validate(roomId)) {
      toast.error("Incorrect room ID", {
        style: {
          borderRadius: "10px",
          background: "#FA7070",
        },
      });
      return;
    }
    username && navigate(`/room/${roomId}`, { state: { username } });
  }

  function createRoomId(e) {
    try {
      setRoomId(uuidv4());
      toast.success("Room created", {
        style: {
          borderRadius: "10px",
          background: "#6FEDD6",
        },
      });
    } catch (exp) {
      console.error(exp);
    }
  }

  return (
    <div className="joinBoxWrapper">
      <form className="joinBox" onSubmit={handleRoomSubmit}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img src={Logo} alt="logo" width={75} height={75} />
        </div>

        <div className="joinBoxInputWrapper">
          <input
            className="joinBoxInput"
            id="roomIdInput"
            type="text"
            placeholder="Enter room ID"
            onChange={(e) => {
              setRoomId(e.target.value);
            }}
            value={roomId}
            required
            autoSave="off"
            autoComplete="off"
          />
        </div>

        <div className="joinBoxInputWrapper">
          <input
            className="joinBoxInput"
            id="usernameInput"
            type="text"
            placeholder="Enter Guest Name"
            value={username}
            required
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            autoSave="off"
            autoComplete="off"
          />
        </div>

        <button
          className="joinBoxBtn"
          type="submit"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
          }}
        >
          <BinaryCodeIcon style={{ marginRight: "5px" }} /> Lets Build
        </button>
        <p>
          Don't have an invitation code? Create your{" "}
          <span className="codeRoomLink" onClick={createRoomId}>
            Code Room
          </span>
        </p>
      </form>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
