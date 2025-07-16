import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalWrapperComponent, ConfirmModalComponent, ToastComponent } from './components';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    ModalWrapperComponent,
    ConfirmModalComponent,
    ToastComponent
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    ConfirmModalComponent,
    ToastComponent,
  ],
})
export class SharedModule { }
