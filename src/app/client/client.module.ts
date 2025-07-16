import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { routes } from './client.routes';
import { EditTaskModalComponent, TaskListModalComponent, TaskListSettingsModalComponent } from './components/';
import { DashboardComponent, TaskListDetailComponent } from './pages';

@NgModule({
  declarations: [
    DashboardComponent,
    TaskListDetailComponent,

    TaskListModalComponent,
    EditTaskModalComponent,
    TaskListSettingsModalComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class ClientModule { }
