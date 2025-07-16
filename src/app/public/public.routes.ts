import { Routes } from '@angular/router';
import { ForbiddenComponent, LandingComponent, NotFoundComponent } from './pages';
import { guestGuard } from '@core/guards';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: LandingComponent,
        canActivate: [guestGuard],
    },
    {
        path: 'not-found',
        pathMatch: 'full',
        component: NotFoundComponent,
    },
    {
        path: 'access-denied',
        pathMatch: 'full',
        component: ForbiddenComponent,
    }
];
