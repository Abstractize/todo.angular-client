import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';



@NgModule({
  exports: [
    CommonModule
  ],
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    provideHttpClient()
  ]
})
export class SharedModule { }
