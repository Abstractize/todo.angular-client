import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnalyticsSummary, WeeklyAnalytics } from '@client/models';

@Injectable({
    providedIn: 'root'
})
export class AnalyticsRepository {
    constructor(private readonly httpClient: HttpClient) { }

    public getSummary(): Observable<AnalyticsSummary> {
        return this.httpClient.get<AnalyticsSummary>(`/api/analytics/summary`);
    }

    public getWeekly(today: Date): Observable<WeeklyAnalytics> {
        const utcDate = today.toISOString();

        return this.httpClient.get<WeeklyAnalytics>(`/api/analytics/weekly`, {
            params: {
                dayUtc: utcDate
            }
        });
    }
}


