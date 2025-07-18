import { Component } from '@angular/core';
import { AuthService } from '@auth/services';
import { AnalyticsSummary, WeeklyAnalytics } from '@client/models';
import { AnalyticsRepository } from '@client/repositories';

@Component({
  selector: 'app-analytics',
  standalone: false,
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent {

  public summary: AnalyticsSummary | null = null;
  public weeklyStats: WeeklyAnalytics | null = null;

  constructor(private readonly authService: AuthService, private readonly analyticsRepository: AnalyticsRepository) {
    this.authService.userId$.subscribe(userId => {
      this.analyticsRepository.getSummary(userId).subscribe({
        next: (data: AnalyticsSummary) => this.summary = data,
        error: (error) => console.error('Failed to load analytics summary', error)
      });
    });

    this.loadWeeklyStats(this.weekStart);
  }

  private loadWeeklyStats(weekStart: Date): void {
    this.authService.userId$.subscribe(userId => {
      this.analyticsRepository.getWeekly(userId, weekStart).subscribe({
        next: (data: WeeklyAnalytics) => this.weeklyStats = data,
        error: (error) => console.error('Failed to load weekly analytics', error)
      });
    });
  }

  private get weekStart(): Date {
    const now = new Date();
    const utcDay = now.getUTCDay();
    const diff = now.getUTCDate() - utcDay + (utcDay === 0 ? -6 : 1);
    const weekStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), diff));
    return weekStart;
  }
}
