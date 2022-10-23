import { Route, Routes } from "react-router-dom";
import { UserRole } from "../enums/navbar";
import {
    privateChiefRoutes,
    privateUserRoutes,
    publicRoutes,
} from "../router/router";

export const role = UserRole.CHIEF;

const AppRoutes: React.FC = () => {
    const isAuth = true;

    const routes = isAuth
        ? role === (UserRole.CHIEF as UserRole)
            ? privateChiefRoutes
            : privateUserRoutes
        : publicRoutes;

    return (
        <Routes>
            {routes.map((route) => (
                <Route key={route.path} {...route} />
            ))}
        </Routes>
    );
};

export default AppRoutes;
