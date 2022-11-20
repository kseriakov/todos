import { Button, Layout, Row } from "antd";
import { Footer } from "antd/lib/layout/layout";
import { useState } from "react";
import { taskAPI } from "../services/taskAPI";

const AppFooter: React.FC = () => {
    const testAPI = () => {};

    return (
        <Footer className="footer">
            <Row justify="end" align="middle">
                <Button onClick={() => testAPI()}>Форма обратной связи</Button>
            </Row>
        </Footer>
    );
};

export default AppFooter;
