import { Button, Col, Form, Input, Row, DatePicker } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useEffect, useRef, useState } from "react";
import { AuthError } from "../enums/error";

import { chiefAPI } from "../services/chiefAPI";
import { ModalWindow } from "../UI/Modal";
import dateToString from "../utils/dateToString";
import { required } from "../utils/formFields";

interface IRegisterData {
    email: string;
    firstName: string;
    lastName: string;
    position: string;
    birthdate: moment.Moment | undefined;
    password1: string;
    password2: string;
}

export const Register = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [form] = useForm();

    const [register, { isLoading, isSuccess, isError }] =
        chiefAPI.useCreateChiefMutation();

    const onFinish = async (data: IRegisterData) => {
        await register({
            email: data.email,
            first_name: data.firstName,
            last_name: data.lastName,
            position: data.position,
            birthdate: dateToString(data.birthdate?.toDate()),
            password: data.password2,
        });
    };

    useEffect(() => {
        let startRequest;

        if (isSuccess && !startRequest) {
            form.resetFields();
            setModalOpen(true);
            setTimeout(() => {
                setModalOpen(false);
            }, 7000);
        }
        return () => {
            startRequest = true;
        };
    }, [isSuccess]);

    useEffect(() => {
        if (isError) {
            form.resetFields(["password1", "password2"]);
            setError(AuthError.INVALID_REGISTER_DATA);
            setTimeout(() => {
                setError(null);
            }, 5000);
        }
    }, [isError]);

    return (
        <div className="content__register register">
            <ModalWindow isOpen={modalOpen} setModalOpen={setModalOpen} />
            <h1 className="register__title">Регистрация нового руководителя</h1>
            <h2 className="register__error">{error}</h2>
            <Row align="middle">
                <Col flex={4}></Col>
                <Col flex={5}>
                    <Form
                        name="register"
                        onFinish={onFinish}
                        scrollToFirstError
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 10 }}
                        form={form}
                    >
                        <Form.Item
                            name="email"
                            label="E-mail"
                            rules={[
                                {
                                    type: "email",
                                    message: "Введите правильный email!",
                                },
                                required("Поле обязательно для заполнения"),
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="firstName"
                            label="Имя"
                            rules={[
                                required("Поле обязательно для заполнения"),
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="lastName"
                            label="Фамилия"
                            rules={[
                                required("Поле обязательно для заполнения"),
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="position"
                            label="Должность"
                            rules={[
                                required("Поле обязательно для заполнения"),
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item name="birthdate" label="День рождения">
                            <DatePicker
                                format="DD-MM-YYYY"
                                placeholder="Выберите дату"
                            />
                        </Form.Item>
                        <Form.Item
                            name="password1"
                            label="Пароль"
                            rules={[
                                required("Поле обязательно для заполнения"),
                            ]}
                            hasFeedback
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            name="password2"
                            label="Подтверждение"
                            dependencies={["password1"]}
                            hasFeedback
                            rules={[
                                required("Поле обязательно для заполнения"),
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (
                                            !value ||
                                            getFieldValue("password1") === value
                                        ) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(
                                            new Error(
                                                "Введенные пароли не совпадают!"
                                            )
                                        );
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Row justify="center">
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    disabled={isLoading}
                                >
                                    Отправить заявку на регистрацию
                                </Button>
                            </Form.Item>
                        </Row>
                    </Form>
                </Col>
                <Col flex={4}></Col>
            </Row>
        </div>
    );
};
