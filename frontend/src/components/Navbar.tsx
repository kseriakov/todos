import { Row, Menu } from "antd";
import { Header } from "antd/lib/layout/layout";
import { MenuInfo } from "rc-menu/lib/interface";
import { To, useNavigate } from "react-router-dom";
import {
    UserRole,
    GeneralLinksNavbar,
    CheifLinksNavbar,
    UserLinksNavbar,
} from "../enums/navbar";

import { RouteForNavbar, RoutePath } from "../router/router";

const Navbar: React.FC = () => {
    const role = UserRole.CHIEF;
    const isAuth = true;

    const navigate = useNavigate();

    const authLink = isAuth
        ? GeneralLinksNavbar.LOGOUT
        : GeneralLinksNavbar.LOGIN;

    const links: string[] =
        role === UserRole.CHIEF
            ? [
                  CheifLinksNavbar.TASKS_ON_CONTROL,
                  CheifLinksNavbar.MY_WORKES,
                  authLink,
              ]
            : [UserLinksNavbar.TASKS, authLink];

    const goToLink = (e: MenuInfo) => {
        console.log(RouteForNavbar.get(e.key));
        navigate(RouteForNavbar.get(e.key) as To);
    };

    return (
        <Header className="header">
            <Row justify="end">
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
