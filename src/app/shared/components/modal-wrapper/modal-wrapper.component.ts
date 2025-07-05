import { Component, ElementRef, EventEmitter, Input, Output, AfterViewInit, ViewChild } from '@angular/core';

declare var bootstrap: any;

@Component({
  selector: 'app-modal-wrapper',
  standalone: false,
  templateUrl: './modal-wrapper.component.html',
})
export class ModalWrapperComponent implements AfterViewInit {
  @Input() title: string = '';
  @Input() body: string = '';

  @Output() closed = new EventEmitter<boolean | null>();
  @ViewChild('modalRef') modalElement!: ElementRef;

  private modalInstance: any;

  ngAfterViewInit(): void {
    this.modalInstance = new bootstrap.Modal(this.modalElement.nativeElement);
    this.modalInstance.show();

    this.modalElement.nativeElement.addEventListener('hidden.bs.modal', () => {
      this.closed.emit(null); // En caso de cerrar sin botones
    });
  }

  confirm(): void {
    this.closed.emit(true);
    this.modalInstance.hide();
  }

  cancel(): void {
    this.closed.emit(false);
    this.modalInstance.hide();
  }
}