import { Routes } from '@angular/router';
import { adminGuard, authGuard, guestGuard } from './core/guards/';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'prefix',
        loadChildren: () => import('./public/public.module').then(m => m.PublicModule),
    },
    {
        path: '',
        pathMatch: 'prefix',
        loadChildren: () => import('./client/client.module').then(m => m.ClientModule),
        canActivate: [authGuard]
    },
    {
        path: 'auth',
        pathMatch: 'prefix',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
        canActivate: [guestGuard]
    },
    {
        path: 'admin',
        pathMatch: 'prefix',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
        canActivate: [adminGuard]
    },
];
