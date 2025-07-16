import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ToastMessage, ToastType } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastSubject = new Subject<ToastMessage>();
  public toast$ = this.toastSubject.asObservable();

  show(text: string, type: ToastType = 'info') {
    this.toastSubject.next({ text, type });
  }

  success(message: string) {
    this.show(message, 'success');
  }

  error(error: string | any, defaultMessage: string = 'An unexpected error occurred.') {
    const message = typeof error === 'string' ?
      error : error.error?.error ||
      error.error?.message ||
      error.message ||
      defaultMessage;
    this.show(message, 'error');
  }

  info(message: string) {
    this.show(message, 'info');
  }

  warning(message: string) {
    this.show(message, 'warning');
  }
}