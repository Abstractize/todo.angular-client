import { Component } from '@angular/core';
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
    private readonly analyticsRepository: AnalyticsRepository
  ) {

    this.analyticsRepository.getSummary().subscribe({
      next: (data: AnalyticsSummary) => {
        this.summary = data;
      },
      error: (error) => console.error('Failed to load analytics summary', error)
    });

    this.loadWeeklyStats(new Date());
  }

  private loadWeeklyStats(today: Date): void {

    this.analyticsRepository.getWeekly(today).subscribe({
      next: (data: WeeklyAnalytics) => {
        this.weeklyStats = data;
        this.setupWeeklyChart(data);
      },
      error: (error) => console.error('Failed to load weekly analytics', error)
    });
  }

  private setupWeeklyChart(data: WeeklyAnalytics): void {
    const labels = data.dailyStats.map(d => d.dayOfWeek);
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