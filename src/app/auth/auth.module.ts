import { ModuleWithProviders, NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { routes } from './auth.routes';
import { LoginComponent, RegisterComponent } from './pages';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ],
})
export class AuthModule { }
