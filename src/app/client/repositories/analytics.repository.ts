import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnalyticsSummary, WeeklyAnalytics } from '@client/models';

@Injectable({
    providedIn: 'root'
})
export class AnalyticsRepository {
    constructor(private readonly httpClient: HttpClient) { }

    public getSummary(userId: string): Observable<AnalyticsSummary> {
        let params: Record<string, string> = {
            userId: userId
        }
        return this.httpClient.get<AnalyticsSummary>(`/api/analytics/summary`, { params });
    }

    public getWeekly(userId: string, weekStartUtc: Date): Observable<WeeklyAnalytics> {
        let params: Record<string, string> = {
            userId: userId,
            weekStartUtc: weekStartUtc.toISOString()
        }
        return this.httpClient.get<WeeklyAnalytics>(`/api/analytics/weekly`, { params });
    }
}


