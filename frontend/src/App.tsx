import "antd/dist/antd.css";
import "./styles/index.scss";

import React, { lazy } from "react";

import { Spinner } from "./UI/Spinner";

const Routes = lazy(() => import("./components/AppRoutes"));

const App: React.FC = () => {
    return (
        <div className="container">
            <React.Suspense fallback={<Spinner />}>
                <Routes />
            </React.Suspense>
        </div>
    );
};

export default App;
