import { List, Button, Skeleton } from "antd";
import { useState } from "react";
import React from "react";

import TaskButtons from "../components/TaskButtons";
import ModalTask from "../components/ModalTask";
import { ITask } from "../models/task";
import { TaskStatus } from "../enums/task";
import { useArray } from "../hooks/useArray";

export const taskData: ITask[] = [
    {
        id: 1,
        worker: "User1",
        text: "A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many householdsacross the world.",
        date: "20-10-2022",
        isCompleted: false,
        isActive: true,
        isClosed: false,
    },
    {
        id: 2,
        worker: "User2",
        text: "A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many householdsacross the world.",
        date: "21-10-2022",
        isCompleted: false,
        isActive: true,
        isClosed: false,
    },
    {
        id: 3,
        worker: "User3",
        text: "A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many householdsacross the world.",
        date: "22-10-2022",
        isCompleted: false,
        isActive: true,
        isClosed: false,
    },
    {
        id: 4,
        worker: "User4",
        text: "A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many householdsacross the world.",
        date: "23-10-2022",
        isCompleted: true,
        isActive: false,
        isClosed: false,
    },
];

const Tasks: React.FC = () => {
    const isChief = true;

    const [loading, setLoading] = useState<boolean>(true);
    const {
        data: tasks,
        actionData: changeTask,
        deleteData: deleteTask,
    } = useArray(taskData);

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [currentTask, setCurrentTask] = useState<ITask>({} as ITask);

    setTimeout(() => {
        setLoading(false);
    }, 500);

    return (
        <div className="content__tasks">
            <ModalTask
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                currentTask={currentTask}
                actionTask={changeTask}
            />
            <h1>User1</h1>
            <List
                loading={loading}
                itemLayout="horizontal"
                // loadMore={loadMore}
                dataSource={tasks}
                renderItem={(item) => (
                    <List.Item>
                        <Skeleton avatar title={false} loading={loading} active>
                            <List.Item.Meta
                                title={
                                    <div className="content__task-title">
                                        <TasksStatusText task={item} />
                                        {item.date}
                                    </div>
                                }
                                description={
                                    <p
                                        className={`content__task-description ${
                                            item.isClosed
                                                ? "content__task-complete"
                                                : ""
                                        }`}
                                    >
                                        {item.text}
                                    </p>
                                }
                            />
                        </Skeleton>

                        <TaskButtons
                            task={item}
                            changeTask={changeTask}
                            deleteTask={deleteTask}
                            setIsModalOpen={setIsModalOpen}
                            setCurrentTask={setCurrentTask}
                        />
                    </List.Item>
                )}
            />
        </div>
    );
};

const TasksStatusText: React.FC<{ task: ITask }> = ({ task }) => {
    const status = task.isClosed
        ? TaskStatus.CLOSED
        : task.isCompleted
        ? TaskStatus.COMPLETED
        : TaskStatus.ACTIVE;

    const statusClass = task.isClosed
        ? "closed"
        : task.isCompleted
        ? "completed"
        : "active";

    return <p className={`content__task-status ${statusClass}`}>{status}</p>;
};

export default Tasks;
