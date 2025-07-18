import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalWrapperComponent, ConfirmModalComponent, ToastComponent } from './components';
import { BaseChartDirective } from 'ng2-charts';
import { BarChartComponent } from './components/charts/bar-chart/bar-chart.component';
import { CardComponent } from './components/card/card.component';

@NgModule({
  imports: [
    BaseChartDirective,
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    BarChartComponent,
    CardComponent,

    ModalWrapperComponent,
    ConfirmModalComponent,
    ToastComponent,
  ],
  exports: [
    BarChartComponent,
    CardComponent,

    CommonModule,
    ReactiveFormsModule,
    ConfirmModalComponent,
    ToastComponent,
  ],
})
export class SharedModule { }
