export interface IUserAPIProfileData {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    birthdate: string | null;
    position: string;
    chief_id: string | null;
    is_chief: boolean;
    is_active: boolean;
    tasks: number[];
}

export interface ITaskResponse {
    count: number;
    next: number | null;
    previous: number | null;
    results: ITaskAPIData[];
}

export interface ITaskAPIData {
    id: number;
    worker: IUserAPIProfileData;
    chief: IUserAPIProfileData;
    text: string;
    date: string;
    position: string;
    is_active: boolean;
    is_completed: boolean;
    is_closed: boolean;
}

export interface ITaskCreateData {
    text: string;
    worker_id: number;
    date: string;
}

export interface ITaskFormData {
    workerId: number;
    text: string;
    datePicker: moment.Moment;
}

export interface IWorkersResponse {
    workers: IUserAPIProfileData[];
}

export interface ICreateWorkerData {
    email: string;
    first_name: string;
    last_name: string;
    birthdate: string | null;
    position: string;
}

export interface ICreateChiefData {
    email: string;
    first_name: string;
    last_name: string;
    birthdate: string | null;
    position: string;
    password: string;
}
