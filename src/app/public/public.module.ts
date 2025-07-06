import { NgModule } from '@angular/core';
import { LandingComponent } from './pages';
import { SharedModule } from '@shared/shared.module';
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
