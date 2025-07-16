import { Routes } from '@angular/router';
import { DashboardComponent, TaskListDetailComponent } from './pages';

export const routes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'task-list/:id',
        component: TaskListDetailComponent
    }
];
