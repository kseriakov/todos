import { Route, Routes } from "react-router-dom";
import {
    generalRoutes,
    privateChiefRoutes,
    privateUserRoutes,
    publicRoutes,
} from "../router/router";

const AppRoutes: React.FC = () => {
    const isAuth = true;
    const isCheif = true;

    const routes = (
        isAuth
            ? isCheif
                ? privateChiefRoutes
                : privateUserRoutes
            : publicRoutes
    ).concat(generalRoutes);

    return (
        <Routes>
            {routes.map((route) => (
                <Route key={route.path} {...route} />
            ))}
        </Routes>
    );
};

export default AppRoutes;
