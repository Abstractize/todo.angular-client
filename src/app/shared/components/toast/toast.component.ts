import { Component, OnInit } from '@angular/core';
import { ToastMessage } from '@shared/models';
import { ToastService } from '@shared/services';

@Component({
  selector: 'app-toast',
  standalone: false,
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit {
  toasts: ToastMessage[] = [];

  constructor(private toastService: ToastService) { }

  ngOnInit(): void {
    this.toastService.toast$.subscribe((toast) => {
      this.toasts.push(toast);
      setTimeout(() => {
        this.toasts.shift();
      }, 3000);
    });
  }

  getBootstrapClass(type: string): string {
    return {
      success: 'bg-success text-white',
      error: 'bg-danger text-white',
      info: 'bg-info text-white',
      warning: 'bg-warning text-dark',
    }[type] || 'bg-secondary text-white';
  }
}