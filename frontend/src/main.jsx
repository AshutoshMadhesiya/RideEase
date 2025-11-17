import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import UserContext from "./context/UserContext";
import { BrowserRouter } from "react-router-dom";
import CaptainContext from "./context/CaptainContext.jsx";
import SocketProvider from "./context/SocketContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SocketProvider>
      <CaptainContext>
        <UserContext>
          <BrowserRouter>
            <App />
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </BrowserRouter>
        </UserContext>
      </CaptainContext>
    </SocketProvider>
  </StrictMode>
);
