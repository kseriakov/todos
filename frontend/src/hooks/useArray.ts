import { useState } from "react";
import { Type } from "typescript";
import { ITask } from "../models/task";

interface IData {
    id: number;
}

interface ReturnResult<T> {
    data: T[];
    actionData: (actionItem: T) => void;
    deleteData: (deleteItem: T) => void;
}

export const useArray = <T extends IData>(data: T[]): ReturnResult<T> =>
    useItemArray(data);

const useItemArray = <T extends IData>(taskData: T[]): ReturnResult<T> => {
    const [data, setTasks] = useState<T[]>(taskData);

    const actionData = (task: T) => {
        if (task.id) {
            setTasks((tasks) =>
                tasks.map((t) => (task.id === t.id ? task : t))
            );
        } else {
            setTasks((tasks) => [...tasks, task]);
        }
    };

    const deleteData = (task: T) => {
        setTasks((data) => data.filter((t) => t.id !== task.id));
    };

    return {
        data,
        actionData,
        deleteData,
    };
};
