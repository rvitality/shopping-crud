import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CartContextProvider } from "./context/CartContext";
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <CartContextProvider>
            <App />
        </CartContextProvider>
    </React.StrictMode>
);
