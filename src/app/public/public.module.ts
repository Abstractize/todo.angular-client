import { NgModule } from '@angular/core';
import { ForbiddenComponent, LandingComponent, NotFoundComponent } from './pages';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { routes } from './public.routes';



@NgModule({
  declarations: [
    ForbiddenComponent,
    LandingComponent,
    NotFoundComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class PublicModule { }
