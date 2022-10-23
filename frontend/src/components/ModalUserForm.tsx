import { Form, Input, Button, DatePicker, Modal } from "antd";
import { useRef, useState } from "react";
import { IWorker } from "../models/worker";
import dateToString from "../utils/dateToString";
import { required } from "../utils/formFields";

interface ModalUserFormProps {
    createWorker: (worker: IWorker) => void;
}

const ModalUserForm: React.FC<ModalUserFormProps> = ({ createWorker }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const submitRef = useRef(null) as React.RefObject<HTMLButtonElement> | null;

    const onCreate = (
        data: Omit<IWorker, "birthdate"> & Record<"birthdate", moment.Moment>
    ) => {
        createWorker({
            ...data,
            birthdate: dateToString(data.birthdate.toDate()),
        } as IWorker);

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
                    <Form.Item
                        name="birthdate"
                        label="День рождения"
                        rules={[required("Заполните поле")]}
                    >
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
