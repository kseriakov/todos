import { Form, Input, Checkbox, Button, Row, Col, Spin } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";

import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { required } from "../utils/formFields";
import { actions } from "../store/actions";
import { AuthError } from "../enums/error";
import { Spinner } from "../UI/Spinner";
import { useNavigate } from "react-router-dom";

interface IFormData {
    email: string;
    password: string;
    remember: boolean;
}

const Login: React.FC = () => {
    const { loading, error } = useAppSelector(({ auth }) => auth);

    const dispatch = useAppDispatch();

    const onFinish = (values: IFormData) => {
        dispatch(actions.login(values.email, values.password));
    };

    return (
        <div className="content__login login">
            <h1 className="login__title">
                Войдите на сайт или заполните <a href="#">форму регистрации</a>,
                если вы руководитель
            </h1>
            <h2 className="login__error">
                {error === 401 ? AuthError.STATUS_CODE_401 : null}
            </h2>
            {loading ? <Spinner /> : null}

            <Row align="bottom">
                <Col flex={4}></Col>
                <Col flex={3}>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    type: "email",
                                    message:
                                        "Введите корректный адрес электронной почты",
                                },
                                required("Введите адрес электронной почты"),
                            ]}
                        >
                            <Input
                                prefix={<MailOutlined />}
                                placeholder="Email"
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[required("Введите Ваш пароль")]}
                        >
                            <Input
                                prefix={
                                    <LockOutlined className="site-form-item-icon" />
                                }
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item
                                name="remember"
                                valuePropName="checked"
                                noStyle
                            >
                                <Checkbox>Запомнить меня</Checkbox>
                            </Form.Item>

                            <a className="login-form-forgot" href="">
                                Забыли пароль?
                            </a>
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                            >
                                Войти
                            </Button>
                            Или <a href="">зарегистрироваться</a>
                        </Form.Item>
                    </Form>
                </Col>
                <Col flex={4}></Col>
            </Row>
        </div>
    );
};

export default Login;
