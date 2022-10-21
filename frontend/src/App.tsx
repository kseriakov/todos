import "antd/dist/antd.css";
import "./styles/index.scss";

import { Layout, Menu, Row } from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import React from "react";

import Navbar from "./components/Navbar";
import AppRoutes from "./components/AppRoutes";
import { BrowserRouter } from "react-router-dom";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <div className="container">
                <Layout className="wrapper">
                    <Navbar />
                    <Content className="content">
                        <AppRoutes />
                    </Content>
                    <Footer className="footer">Footer</Footer>
                </Layout>
            </div>
        </BrowserRouter>
    );
};

export default App;
