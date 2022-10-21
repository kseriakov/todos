import moment from "moment";
import { TaskForModalForm } from "../components/ModalTaskForm";
import { ITask } from "../models/task";

export const taskDateToMoment = (task: ITask): TaskForModalForm => {
    return {
        ...task,
        date: moment(task?.date, "DD-MM-YYYY"),
    };
};

