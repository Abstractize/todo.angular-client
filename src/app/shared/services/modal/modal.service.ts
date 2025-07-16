import {
  ApplicationRef,
  ComponentFactoryResolver,
  Injectable,
  Injector,
  Type
} from '@angular/core';

import { ModalWrapperComponent } from '@shared/components';

@Injectable({ providedIn: 'root' })
export class ModalService {
  constructor(
    private appRef: ApplicationRef,
    private injector: Injector,
    private resolver: ComponentFactoryResolver
  ) { }

  open(component: Type<any>, options?: { title?: string; data?: any }): Promise<any> {
    return new Promise((resolve) => {
      const factory = this.resolver.resolveComponentFactory(ModalWrapperComponent);
      const componentRef = factory.create(this.injector);

      componentRef.instance.title = options?.title || '';
      componentRef.instance.bodyComponent = component;
      componentRef.instance.data = options?.data || {};

      componentRef.instance.closed.subscribe((result: any) => {
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