import { Routes } from '@angular/router';
import { AnalyticsComponent, DashboardComponent, TaskListDetailComponent } from './pages';

export const routes: Routes = [
    {
        path: 'analytics',
        component: AnalyticsComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'task-list/:id',
        component: TaskListDetailComponent
    }
];
