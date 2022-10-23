import { Button, Collapse, Row } from "antd";
import { useMemo, useState } from "react";

import { ITask } from "../models/task";
import TaskButtons from "./TaskButtons";
import ModalTaskForm from "./ModalTaskForm";

const { Panel } = Collapse;

interface TaskListProps {
    currentTask: ITask;
    setCurrentTask: (task: ITask) => void;
    tasks: ITask[];
    changeTask: (task: ITask) => void;
    deleteTask: (task: ITask) => void;
}

const TaskList: React.FC<TaskListProps> = ({
    currentTask,
    setCurrentTask,
    tasks,
    changeTask,
    deleteTask,
}) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const hideTask = (task: ITask) => {
        setTimeout(() => deleteTask(task), 700);
        return "remove";
    };

    const onLoad = () => {
        setLoading(true);
        setTimeout(() => setLoading(false), 500);
    };

    return (
        <>
            <ModalTaskForm
                currentItem={currentTask}
                actionItem={changeTask}
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
            <Row className="content__load" justify="center">
                <Button loading={loading} onClick={() => onLoad()}>
                    Загрузить еще
                </Button>
            </Row>
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
