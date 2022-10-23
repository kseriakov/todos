import { Button, Layout, Row } from "antd";
import { Footer } from "antd/lib/layout/layout";

const AppFooter: React.FC = () => {
    return (
        <Footer className="footer">
            <Row justify="end" align="middle">
                <Button>Форма обратной связи</Button> 
            </Row>
        </Footer>
    );
};

export default AppFooter;
