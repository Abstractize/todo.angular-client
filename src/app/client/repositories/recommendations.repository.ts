import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskSuggestion } from '@client/models';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RecommendationsRepository {
    constructor(private readonly httpClient: HttpClient) { }

    public get(): Observable<TaskSuggestion[]> {
        return this.httpClient.get<TaskSuggestion[]>(`/api/recommendations/suggestions`);
    }

    public patch(id: string, used: boolean = true): Observable<void> {
        return this.httpClient.patch<void>(`/api/recommendations/suggestions/${id}/use`, { used: used });
    }
}


