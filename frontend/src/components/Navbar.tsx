import { Row, Menu } from "antd";
import { Header } from "antd/lib/layout/layout";
import { MenuInfo } from "rc-menu/lib/interface";
import { To, useNavigate } from "react-router-dom";
import {
    GeneralLinksNavbar,
    CheifLinksNavbar,
    UserLinksNavbar,
} from "../enums/navbar";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { RouteForNavbar } from "../router/router";
import { actions } from "../store/actions";

const Navbar: React.FC = () => {
    const { isAuth, isChief, lastName, firstName } = useAppSelector(
        ({ auth }) => auth
    );

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const authLink = isAuth
        ? GeneralLinksNavbar.LOGOUT
        : GeneralLinksNavbar.LOGIN;

    const links: string[] = isChief
        ? [
              CheifLinksNavbar.TASKS_ON_CONTROL,
              CheifLinksNavbar.MY_WORKES,
              authLink,
          ]
        : !isChief && isAuth
        ? [UserLinksNavbar.TASKS, authLink]
        : [authLink];

    const goToLink = (e: MenuInfo) => {
        if (e.key === GeneralLinksNavbar.LOGOUT) {
            dispatch(actions.logout());
        }

        navigate(RouteForNavbar.get(e.key) as To);
    };

    return (
        <Header className="header">
            <Row justify="end">
                <div className="header__username">
                    {firstName && lastName ? `${firstName} ${lastName}` : ""}
                </div>
                <Menu
                    onClick={(e) => goToLink(e)}
                    theme="dark"
                    mode="horizontal"
                    overflowedIndicator={null}
                    selectable={false}
                    items={links.map((item) => ({ key: item, label: item }))}
                ></Menu>
            </Row>
        </Header>
    );
};

export default Navbar;
