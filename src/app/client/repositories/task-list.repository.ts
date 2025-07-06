import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskList } from '../models';

@Injectable({
    providedIn: 'root'
})
export class TaskListRepository {
    constructor(private readonly httpClient: HttpClient) { }

    public find(id: string): Observable<TaskList> {
        return this.httpClient.get<TaskList>(`/api/tasks/tasklist/${id}`);
    }

    public get(): Observable<TaskList[]> {
        return this.httpClient.get<TaskList[]>(`/api/tasks/tasklist`);
    }

    public add(taskList: TaskList): Observable<void> {
        return this.httpClient.post<void>(`/api/tasks/tasklist`, taskList);
    }

    public update(taskList: TaskList): Observable<void> {
        console.log('Updating task list:', taskList);
        return this.httpClient.put<void>(`/api/tasks/tasklist/${taskList.id}`, taskList);
    }

    public delete(id: string): Observable<void> {
        return this.httpClient.delete<void>(`/api/tasks/tasklist/${id}`);
    }
}
