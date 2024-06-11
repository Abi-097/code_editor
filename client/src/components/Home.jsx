import { useState } from "react";
import { v4 as uuid } from "uuid";
import toast from "react-hot-toast";
import Logo from "../assets/Logo.png";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const generateRoomId = (e) => {
    e.preventDefault();
    const Id = uuid();
    setRoomId(Id);
    toast.success("A room ID has been generated!", {
      style: {
        borderRadius: "10px",
        background: "#80B9AD",
        color: "#fff",
        fontWeight: "bold",
      },
    });
  };

  const joinRoom = () => {
    if (!roomId || !username) {
      toast.error("Both fields are required", {
        // icon: "🗙",
        style: {
          borderRadius: "10px",
          background: "#FF8080",
          color: "#fff",
          fontWeight: "bold",
        },
      });
      return;
    }

    // redirect
    navigate(`/editor/${roomId}`, {
      state: {
        username,
      },
    });
    toast.success("room is created", {
      style: {
        borderRadius: "10px",
        background: "#80B9AD",
        color: "#fff",
        fontWeight: "bold",
      },
    });
  };

  // when enter then also join
  const handleInputEnter = (e) => {
    if (e.code === "Enter") {
      joinRoom();
    }
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-12 col-md-6">
          <div className="card shadow-sm p-2 mb-5 bg-secondary rounded">
            <div className="card-body text-center bg-dark">
              <img
                src={Logo}
                alt="Logo"
                className="img-fluid mx-auto d-block"
                style={{ maxWidth: "150px" }}
              />
              <h4 className="card-title text-light mb-4">Enter the ROOM ID</h4>

              <div className="form-group">
                <input
                  type="text"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  className="form-control mb-2"
                  placeholder="ROOM ID"
                  onKeyUp={handleInputEnter}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-control mb-2"
                  placeholder="USERNAME"
                  onKeyUp={handleInputEnter}
                />
              </div>
              <button
                onClick={joinRoom}
                className="btn btn-success btn-lg btn-block"
              >
                JOIN
              </button>
              <p className="mt-3 text-light">
                Don&apos;t have a room ID? create
                <span
                  onClick={generateRoomId}
                  className=" text-success p-1"
                  style={{ cursor: "pointer" }}
                >
                  New Room
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
