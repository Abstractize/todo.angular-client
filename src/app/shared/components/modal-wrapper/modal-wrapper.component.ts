import {
  AfterViewInit,
  Component,
  ComponentRef,
  EventEmitter,
  Input,
  Output,
  Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

declare var bootstrap: any;

@Component({
  selector: 'app-modal-wrapper',
  standalone: false,
  templateUrl: './modal-wrapper.component.html',
})
export class ModalWrapperComponent implements AfterViewInit {
  @Input() title: string = '';
  @Input() bodyComponent!: Type<any>;
  @Input() data: any;

  @Output() closed = new EventEmitter<any>();

  @ViewChild('modalRef') modalElement!: any;
  @ViewChild('bodyContainer', { read: ViewContainerRef }) bodyContainer!: ViewContainerRef;

  private modalInstance: any;
  private embeddedComponentRef!: ComponentRef<any>;

  ngAfterViewInit(): void {
    this.modalInstance = new bootstrap.Modal(this.modalElement.nativeElement);
    this.modalInstance.show();

    this.modalElement.nativeElement.addEventListener('hidden.bs.modal', () => {
      this.closed.emit(null);
    });

    // Inyectar componente dinámico
    this.bodyContainer.clear();
    this.embeddedComponentRef = this.bodyContainer.createComponent(this.bodyComponent);

    // pasarle los datos
    if (this.data && this.embeddedComponentRef.instance) {
      Object.assign(this.embeddedComponentRef.instance, this.data);
    }

    // si no usa EventEmitter, pasamos función close directamente
    if (typeof this.embeddedComponentRef.instance.close === 'function') {
      this.embeddedComponentRef.instance.close = (result: any) => {
        this.closed.emit(result);
        this.modalInstance.hide();
      };
    }

    // si usa EventEmitter como fallback (por compatibilidad)
    if (this.embeddedComponentRef.instance.submitted instanceof EventEmitter) {
      this.embeddedComponentRef.instance.submitted.subscribe((result: any) => {
        this.closed.emit(result);
        this.modalInstance.hide();
      });
    }
  }

  cancel(): void {
    this.closed.emit(false);
    this.modalInstance.hide();
  }
}