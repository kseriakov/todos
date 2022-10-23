import { Form, Select, Button, DatePicker, Modal } from "antd";
import TextArea from "antd/lib/input/TextArea";
import moment from "moment";
import { RefObject, useEffect, useRef, useState } from "react";

import { required } from "../utils/formFields";
import { dateToMoment } from "../utils/dateToMoment";
import { ITask } from "../models/task";
import { useForm } from "antd/es/form/Form";
import { TaskDataForm, updateTask } from "../utils/updateTask";

interface ModalTaskFormProps {
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
    currentItem: ITask;
    actionItem: (item: ITask) => void;
}

const ModalTaskForm: React.FC<ModalTaskFormProps> = ({
    isModalOpen,
    setIsModalOpen,
    currentItem,
    actionItem,
}) => {
    const submitRef = useRef(null) as RefObject<HTMLButtonElement> | null;
    const [form] = useForm();

    useEffect(() => {
        const dateMoment = dateToMoment(currentItem.date);
        const datePicker = dateMoment.isValid() ? dateMoment : null;

        form.setFieldsValue({ ...currentItem, datePicker });
    }, [currentItem]);

    const onChangeTask = (data: TaskDataForm) => {
        actionItem(updateTask(currentItem, data));
        setIsModalOpen(false);
    };

    return (
        <div className="content__modal">
            <Modal
                title="Поручение"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                cancelText="Закрыть"
                okText="Применить"
                onOk={() => submitRef?.current?.click()}
                getContainer={false}
            >
                <Form onFinish={(data) => onChangeTask(data)} form={form}>
                    <Form.Item
                        name="datePicker"
                        label="Срок исполнения"
                        rules={[required("Заполните поле")]}
                    >
                        <DatePicker
                            format="DD-MM-YYYY"
                            placeholder="Выберите дату"
                        />
                    </Form.Item>
                    <Form.Item
                        name="worker"
                        label="Выбрать сотрудника"
                        rules={[required("Заполните поле")]}
                    >
                        <Select>
                            <Select.Option value={"User1"}>User1</Select.Option>
                            <Select.Option value={"User2"}>User2</Select.Option>
                            <Select.Option value={"User3"}>User3</Select.Option>
                            <Select.Option value={"User4"}>User4</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="text"
                        label="Поручение"
                        rules={[required("Заполните поле")]}
                    >
                        <TextArea rows={4} name="text" />
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
        </div>
    );
};

export default ModalTaskForm;
