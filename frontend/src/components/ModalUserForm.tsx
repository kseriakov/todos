import { Form, Input, Button, DatePicker, Modal } from "antd";
import { useRef, useState } from "react";
import { IUser } from "../models/user";
import { workerAPI } from "../services/workerAPI";
import dateToString from "../utils/dateToString";
import { required } from "../utils/formFields";

const ModalUserForm: React.FC = () => {
    const [createWorker, { isLoading: loadingCreate }] =
        workerAPI.useCreateWorkerMutation();

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const submitRef = useRef(null) as React.RefObject<HTMLButtonElement> | null;

    const onCreate = async (
        data: Omit<IUser, "birthdate"> & Record<"birthdate", moment.Moment>
    ) => {
        await createWorker({
            email: data.email,
            first_name: data.firstName,
            last_name: data.lastName,
            position: data.position,
            birthdate: dateToString(data.birthdate.toDate()),
        });
        setIsModalOpen(false);
    };

    return (
        <>
            <Button type="dashed" onClick={() => setIsModalOpen(true)}>
                Добавить сотрудника
            </Button>
            <Modal
                title="Новый сотрудник"
                getContainer={false}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                cancelText="Закрыть"
                okText="Применить"
                onOk={() => submitRef?.current?.click()}
                footer={[
                    <Button key="back" onClick={() => setIsModalOpen(false)}>
                        Закрыть
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        loading={loadingCreate}
                        onClick={() => submitRef?.current?.click()}
                    >
                        Создать
                    </Button>,
                ]}
            >
                <Form name="worker" onFinish={(data) => onCreate(data)}>
                    <Form.Item
                        name="firstName"
                        label="Имя"
                        rules={[required("Заполните поле")]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="lastName"
                        label="Фамилия"
                        rules={[required("Заполните поле")]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="position"
                        label="Должность"
                        rules={[required("Заполните поле")]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ type: "email" }, required("Заполните поле")]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="birthdate" label="День рождения">
                        <DatePicker
                            format="DD-MM-YYYY"
                            placeholder="Выберите дату"
                        />
                    </Form.Item>
                    <Form.Item style={{ display: "none" }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            ref={submitRef}
                        >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default ModalUserForm;
