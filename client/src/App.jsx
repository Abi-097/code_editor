import "./App.css";
import EditPage from "./components/EditPage";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <div>
        <Toaster position="top-right" />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor/:roomId" element={<EditPage />} />
      </Routes>
    </>
  );
}

export default App;
