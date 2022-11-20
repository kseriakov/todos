import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppSelector";
import { RoutePath } from "../router/router";

export const NotFound: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { isAuth } = useAppSelector(({ auth }) => auth);

    useEffect(() => {
        if (location.pathname === RoutePath.LOGIN && isAuth) {
            navigate(RoutePath.ALL_TASKS);
        }
    }, []);

    const goBack = () => {
        navigate(-1);
    };

    return (
        <div className="content__notfound">
            <h1>Страница не найдена...</h1>
            <h2>
                <button onClick={() => goBack()}>Вернуться назад</button>
            </h2>
        </div>
    );
};
