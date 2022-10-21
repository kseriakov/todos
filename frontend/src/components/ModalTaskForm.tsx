import { Form, Select, Button, DatePicker } from "antd";
import TextArea from "antd/lib/input/TextArea";
import moment from "moment";
import { useEffect, useState } from "react";

import { ITask } from "../models/task";
import dateToString from "../utils/dateToString";
import { required } from "../utils/formFields";
import { taskDateToMoment } from "../utils/taskDateToMoment";

interface ModalTaskFormProps {
    submitRef: any;
    currentTask: ITask;
    actionTask: (task: ITask) => void;
    setIsModalOpen: (isModalOpen: boolean) => void;
}

export interface TaskForModalForm extends Omit<ITask, "date"> {
    date: moment.Moment;
}

const ModalTaskForm: React.FC<ModalTaskFormProps> = ({
    submitRef,
    currentTask,
    actionTask,
    setIsModalOpen,
}) => {
    const [form] = Form.useForm();

    const [formData, setFormData] = useState<TaskForModalForm>(
        taskDateToMoment(currentTask)
    );

    useEffect(() => {
        setFormData(() => taskDateToMoment(currentTask));
    }, [currentTask]);

    useEffect(() => {
        for (let prop in formData) {
            if (prop === "date") {
                form.setFieldValue(
                    prop,
                    formData.date?.isValid() ? formData[prop] : ""
                );
                continue;
            }

            form.setFieldValue(prop, formData[prop]);
        }
    }, [formData]);

    const onChangeTask = (updatedTask: TaskForModalForm) => {
        actionTask({
            ...updatedTask,
            date: dateToString(updatedTask.date.toDate()),
        } as ITask);
        setIsModalOpen(false);
    };

    return (
        <Form form={form} onFinish={() => onChangeTask(formData)}>
            <Form.Item
                name="date"
                label="Срок исполнения"
                rules={[required("Заполните поле")]}
            >
                <DatePicker
                    placeholder="Выберете дату"
                    onChange={(e: moment.Moment | null) =>
                        setFormData((formData) => ({
                            ...formData,
                            date: e as moment.Moment,
                        }))
                    }
                />
            </Form.Item>
            <Form.Item
                name="worker"
                label="Выбрать сотрудника"
                rules={[required("Заполните поле")]}
            >
                <Select
                    onChange={(e: string) =>
                        setFormData((formData) => ({
                            ...formData,
                            worker: e,
                        }))
                    }
                >
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
                <TextArea
                    rows={4}
                    name="text"
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        setFormData((formData) => ({
                            ...formData,
                            text: e.target.value,
                        }))
                    }
                />
            </Form.Item>

            <Form.Item style={{ display: "none" }}>
                <Button type="primary" htmlType="submit" ref={submitRef}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default ModalTaskForm;
