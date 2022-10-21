import { Collapse } from "antd";
import { useState } from "react";
import useInput from "../hooks/useInput";

import { useArray } from "../hooks/useArray";
import { ITask } from "../models/task";
import { taskData } from "../pages/Tasks";
import ModalTask from "./ModalTask";
import TaskButtons from "./TaskButtons";

const { Panel } = Collapse;

const TaskList: React.FC = () => {
    const {
        data: tasks,
        actionData: changeTask,
        deleteData: deleteTask,
    } = useArray(taskData);

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const [currentTask, setCurrentTask] = useState<ITask>({} as ITask);

    const hideTask = (task: ITask) => {
        setTimeout(() => deleteTask(task), 700);
        return "remove";
    };

    return (
        <>
            <ModalTask
                currentTask={currentTask}
                actionTask={changeTask}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
            />
            <Collapse bordered={false}>
                {tasks.map((task, i) => (
                    <Panel
                        className={`content__panel ${
                            task.isClosed ? hideTask(task) : ""
                        }`}
                        key={i}
                        header={
                            <GetTaskHeader
                                worker={task.worker}
                                date={task.date}
                            />
                        }
                    >
                        <p style={{ paddingLeft: 24 }}>{task.text}</p>
                        <TaskButtons
                            task={task}
                            changeTask={changeTask}
                            deleteTask={deleteTask}
                            setIsModalOpen={setIsModalOpen}
                            setCurrentTask={setCurrentTask}
                        />
                    </Panel>
                ))}
            </Collapse>
        </>
    );
};

const GetTaskHeader: React.FC<{ worker: string; date: string }> = ({
    worker,
    date,
}) => {
    return (
        <>
            <p>
                <b>{worker}</b>
            </p>
            <p>Срок: {date}</p>
        </>
    );
};

export default TaskList;
