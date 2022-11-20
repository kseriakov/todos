import { Row, Spin } from "antd";

export const Spinner: React.FC = () => {
    return (
        <div className="content__spinner">
            <Row justify="center">
                <Spin className="content__spin" size="large" />
            </Row>
        </div>
    );
};
