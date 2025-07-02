import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { routes } from './auth.routes';
import { LoginComponent } from './pages';
import { AuthService } from './services/auth.service';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    AuthService,
  ]
})
export class AuthModule { }
