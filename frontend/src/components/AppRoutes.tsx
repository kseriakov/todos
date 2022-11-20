import { Layout } from "antd";
import { Content } from "antd/lib/layout/layout";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useAppDispatch } from "../hooks/useAppDispatch";

import { useAppSelector } from "../hooks/useAppSelector";
import {
    privateChiefRoutes,
    privateUserRoutes,
    publicRoutes,
} from "../router/router";
import { actions } from "../store/actions";
import { Spinner } from "../UI/Spinner";
import AppFooter from "./AppFooter";
import Navbar from "./Navbar";

const AppRoutes: React.FC = () => {
    const { isAuth, loading, isChief, id } = useAppSelector(({ auth }) => auth);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(actions.checkAuthStatus());
    }, []);

    const routes = isAuth
        ? isChief
            ? privateChiefRoutes
            : privateUserRoutes(id)
        : publicRoutes;

    return (
        <Layout className="wrapper">
            <Navbar />
            <Content className="content">
                {loading ? (
                    <Spinner />
                ) : (
                    <Routes>
                        {routes.map((route) => (
                            <Route key={route.path} {...route} />
                        ))}
                    </Routes>
                )}
            </Content>
            <AppFooter />
        </Layout>
    );
};

export default AppRoutes;
