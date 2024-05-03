import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import JoinRoom from "./assets/routes/JoinRoom/Index";
import Room from "./assets/routes/Room/Index";

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
