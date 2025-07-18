import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { routes } from './client.routes';
import { EditTaskModalComponent, TaskListModalComponent, TaskListSettingsModalComponent } from './components/';
import { AnalyticsComponent, DashboardComponent, TaskListDetailComponent } from './pages';
import { BaseChartDirective } from 'ng2-charts';

@NgModule({
  declarations: [
    AnalyticsComponent,
    DashboardComponent,
    TaskListDetailComponent,

    TaskListModalComponent,
    EditTaskModalComponent,
    TaskListSettingsModalComponent
  ],
  imports: [
    BaseChartDirective,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class ClientModule { }
