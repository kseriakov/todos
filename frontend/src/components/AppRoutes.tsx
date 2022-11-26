import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";

import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { indexRouter } from "../router/router";
import { actions } from "../store/actions";
import { Spinner } from "../UI/Spinner";

const AppRoutes: React.FC = () => {
    const { isAuth, loading, isChief, id } = useAppSelector(({ auth }) => auth);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(actions.checkAuthStatus());
    }, []);

    const router = indexRouter(isAuth, isChief, id);

    return <>{loading ? <Spinner /> : <RouterProvider router={router} />}</>;
};

export default AppRoutes;
