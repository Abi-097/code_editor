import React, { useEffect, useRef, useState } from "react";
import Logo from "../assets/Logo.png";
import Client from "./Client";
import Editor from "./Editor";

const EditPage = () => {
  const [clients, setClients] = useState([
    {
      socketId: 1,
      username: "raja",
    },
    {
      socketId: 2,
      username: "raja2",
    },
  ]);
  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        {/* client panel */}
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
          {/* Client list container */}
          <div className="d-flex flex-column flex-grow-1 overflow-auto">
            <span className="mb-2 text-center">Members</span>
            {clients.map((client) => (
              <Client key={client.socketId} username={client.username} />
            ))}
          </div>
          <hr />
          {/* Buttons */}
          <div className="mt-auto ">
            <button
              className="btn btn-success"
              // onClick={copyRoomId}
            >
              Copy Room ID
            </button>
            <button
              className="btn btn-danger mt-2 mb-2 px-3 btn-block"
              // onClick={leaveRoom}
            >
              Exit Room
            </button>
          </div>
        </div>
        {/* Editor panel */}
        <div className="col-md-10 text-light d-flex flex-column h-100 ">
          <Editor />
        </div>
      </div>
    </div>
  );
};

export default EditPage;
