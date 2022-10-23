import { ITask } from "../models/task";
import dateToString from "./dateToString";

export interface TaskDataForm {
    worker: string;
    text: string;
    datePicker: moment.Moment;
}

export const updateTask = (task: ITask, taskData: TaskDataForm): ITask => {
    return {
        ...task,
        worker: taskData.worker,
        text: taskData.text,
        date: dateToString(taskData.datePicker.toDate()),
    };
};
