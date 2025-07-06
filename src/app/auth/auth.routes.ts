import { Routes } from '@angular/router';
import { LoginComponent, RegisterComponent } from './pages';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'sign-up',
        component: RegisterComponent
    }
];
