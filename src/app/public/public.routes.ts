import { Routes } from '@angular/router';
import { LandingComponent } from './pages';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: LandingComponent
    },
];
