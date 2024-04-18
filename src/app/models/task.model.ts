export interface TaskModel {
    id?: string;
    name: string;
    detail: string;
    endDate: Date | null;
    state: boolean;
    priority: string;
}