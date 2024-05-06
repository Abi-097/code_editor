import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import JoinRoom from "./routes/JoinRoom/Index";
import Room from "./routes/Room/Index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <JoinRoom />,
  },
  {
    path: "/room/:roomId",
    element: <Room />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
