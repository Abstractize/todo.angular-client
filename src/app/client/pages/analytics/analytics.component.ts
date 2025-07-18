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

  public weeklyChartData: any;

  public colorScheme = {
    domain: ['#0d6efd', '#dc3545']
  };

  constructor(
    private readonly authService: AuthService,
    private readonly analyticsRepository: AnalyticsRepository
  ) {
    this.authService.userId$.subscribe(userId => {
      this.analyticsRepository.getSummary(userId).subscribe({
        next: (data: AnalyticsSummary) => {
          this.summary = data;
        },
        error: (error) => console.error('Failed to load analytics summary', error)
      });

      this.loadWeeklyStats(userId, this.weekStart);
    });
  }

  private loadWeeklyStats(userId: string, weekStart: Date): void {
    this.analyticsRepository.getWeekly(userId, weekStart).subscribe({
      next: (data: WeeklyAnalytics) => {
        this.weeklyStats = data;
        this.setupWeeklyChart(data);
      },
      error: (error) => console.error('Failed to load weekly analytics', error)
    });
  }

  private get weekStart(): Date {
    const now = new Date();
    const day = now.getUTCDay();
    const diff = now.getUTCDate() - day + (day === 0 ? -6 : 1);
    return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), diff));
  }

  private setupWeeklyChart(data: WeeklyAnalytics): void {
    const labels = data.dailyStats.map(d => {
      const date = new Date(d.date);
      return date.toLocaleDateString(undefined, { weekday: 'long' });
    });
    const createdData = data.dailyStats.map(d => d.created);
    const completedData = data.dailyStats.map(d => d.completed);

    this.weeklyChartData = {
      labels: labels,
      datasets: [
        {
          label: 'Created',
          data: createdData,
          backgroundColor: this.colorScheme.domain[0]
        },
        {
          label: 'Completed',
          data: completedData,
          backgroundColor: this.colorScheme.domain[1]
        }
      ]
    };
  }
}