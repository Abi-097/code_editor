import "./App.css";
import EditPage from "./components/EditPage";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor/:roomId" element={<EditPage />} />
      </Routes>
    </div>
  );
}

export default App;
