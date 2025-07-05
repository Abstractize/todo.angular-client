import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector } from '@angular/core';
import { ModalWrapperComponent } from '../components/modal-wrapper/modal-wrapper.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(
    private appRef: ApplicationRef,
    private injector: Injector,
    private resolver: ComponentFactoryResolver
  ) { }

  open(title: string, body: string): Promise<boolean | null> {
    return new Promise((resolve) => {
      const factory = this.resolver.resolveComponentFactory(ModalWrapperComponent);
      const componentRef = factory.create(this.injector);

      componentRef.instance.title = title;
      componentRef.instance.body = body;

      componentRef.instance.closed.subscribe((result: boolean | null) => {
        resolve(result);
        this.appRef.detachView(componentRef.hostView);
        componentRef.destroy();
      });

      this.appRef.attachView(componentRef.hostView);
      const domElem = (componentRef.hostView as any).rootNodes[0] as HTMLElement;
      document.body.appendChild(domElem);
    });
  }
}