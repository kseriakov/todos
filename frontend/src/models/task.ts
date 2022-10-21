export interface ITask {
    [key: string]: any;
    id: number;
    text: string;
    worker: string;
    date: string;
    isActive: boolean;
    isCompleted: boolean;
    isClosed: boolean;
}
