import "antd/dist/antd.css";
import "./styles/index.scss";

import React from "react";

import AppRoutes from "./components/AppRoutes";
import { BrowserRouter } from "react-router-dom";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <div className="container">
                <AppRoutes />
            </div>
        </BrowserRouter>
    );
};

export default App;
