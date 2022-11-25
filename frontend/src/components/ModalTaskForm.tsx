import { Form, Select, Button, DatePicker, Modal } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useEffect, useRef } from "react";

import { required } from "../utils/formFields";
import { dateToMoment } from "../utils/dateToMoment";
import { ITask } from "../models/task";
import { useForm } from "antd/es/form/Form";
import { taskAPI } from "../services/taskAPI";
import dateToString from "../utils/dateToString";
import { workerAPI } from "../services/workerAPI";
import { ITaskFormData } from "../services/types";
import { IUser } from "../models/user";

interface ModalTaskFormProps {
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
    currentTask: ITask;
    workerSelected?: IUser | null;
}

const ModalTaskForm: React.FC<ModalTaskFormProps> = ({
    isModalOpen,
    setIsModalOpen,
    currentTask,
    workerSelected,
}) => {
    const [form] = useForm();
    const submitRef = useRef<HTMLButtonElement | null>(null);

    const { data: workers } = workerAPI.useGetMyWorkersQuery();
    const [createTask, { isLoading: loadingCreate }] =
        taskAPI.useCreateTaskMutation();
    const [changeTask, {}] = taskAPI.useChangeTaskMutation();

    useEffect(() => {
        const datePicker = dateToMoment(currentTask.date);
        form.setFieldsValue({
            ...currentTask,
            datePicker,
        });

        if (workerSelected) {
            form.setFieldValue("workerId", workerSelected.id);
        }
    }, [currentTask]);

    const onActionTask = async (data: ITaskFormData) => {
        if (currentTask.id) {
            await changeTask({
                id: currentTask.id,
                text: data.text,
                date: dateToString(data.datePicker.toDate()),
                is_completed: false,
            });
        } else {
            await createTask({
                worker_id: data.workerId,
                text: data.text,
                date: dateToString(data.datePicker.toDate()) as string,
            });
        }

        setIsModalOpen(false);
    };

    return (
        <div>
            <Modal
                forceRender={true}
                title="Поручение"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                cancelText="Закрыть"
                okText="Применить"
                getContainer={false}
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
                        Применить
                    </Button>,
                ]}
            >
                <Form onFinish={(data) => onActionTask(data)} form={form}>
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
                        name="workerId"
                        label="Выбрать сотрудника"
                        rules={[required("Заполните поле")]}
                    >
                        <Select>
                            {workers?.map((worker) => (
                                <Select.Option
                                    value={worker.id}
                                    key={worker.id}
                                >
                                    {worker.firstName} {worker.lastName}
                                </Select.Option>
                            ))}
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
