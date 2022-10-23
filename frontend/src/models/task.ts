export interface ITask {
    id: number;
    text: string;
    worker: string;
    workerId: string;
    date: string;
    isActive: boolean;
    isCompleted: boolean;
    isClosed: boolean;
}
