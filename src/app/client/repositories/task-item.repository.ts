import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskItem } from '@client/models';

@Injectable({
    providedIn: 'root'
})
export class TaskItemRepository {
    constructor(private readonly httpClient: HttpClient) { }

    public getByTaskListId(taskListId: string): Observable<TaskItem[]> {
        return this.httpClient.get<TaskItem[]>(`/api/tasks/taskitem/${taskListId}`);
    }

    public add(taskItem: TaskItem): Observable<void> {
        return this.httpClient.post<void>(`/api/tasks/taskitem`, taskItem);
    }

    public update(taskItem: TaskItem): Observable<void> {
        return this.httpClient.put<void>(`/api/tasks/taskitem/${taskItem.id}`, taskItem);
    }

    public delete(id: string): Observable<void> {
        return this.httpClient.delete<void>(`/api/tasks/taskitem/${id}`);
    }
}
