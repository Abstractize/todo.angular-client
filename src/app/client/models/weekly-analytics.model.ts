import { DailyStat } from './daily-stat.model';


export interface WeeklyAnalytics {
    userId: string;
    weekStart: string;
    weekEnd: string;
    totalTasksCreated: number;
    totalTasksCompleted: number;
    dailyStats: DailyStat[];
}
