import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalWrapperComponent } from './components/modal-wrapper/modal-wrapper.component';
import { ConfirmModalComponent } from './components';

@NgModule({
  exports: [
    CommonModule,
    ReactiveFormsModule,
    ConfirmModalComponent
  ],
  declarations: [
    ModalWrapperComponent,
    ConfirmModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
})
export class SharedModule { }
