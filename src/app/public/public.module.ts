import { NgModule } from '@angular/core';
import { LandingComponent } from './pages/landing/landing.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { routes } from './public.routes';



@NgModule({
  declarations: [
    LandingComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class PublicModule { }
