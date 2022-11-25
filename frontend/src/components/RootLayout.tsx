import Layout, { Content } from "antd/lib/layout/layout";
import { Outlet } from "react-router-dom";
import AppFooter from "./AppFooter";
import Navbar from "./Navbar";

export const RootLayout = () => {
    return (
        <Layout className="wrapper">
            <Navbar />
            <Content className="content">
                <Outlet />
            </Content>
            <AppFooter />
        </Layout>
    );
};
