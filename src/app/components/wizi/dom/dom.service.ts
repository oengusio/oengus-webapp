import {
  ApplicationRef,
  ComponentRef,
  EmbeddedViewRef,
  inject,
  Injectable,
  Injector,
  Optional,
  SkipSelf,
  ViewContainerRef,
} from '@angular/core';

import { OverlayContainer } from '../overlay/overlay-container';
// import { PortalInjector } from '../portal/portal-injector';

@Injectable({
  providedIn: 'root',
})
export class DomService {
  // TODO: fix
  // private readonly viewContainerRef: ViewContainerRef = inject(ViewContainerRef);
  private readonly appRef: ApplicationRef = inject(ApplicationRef);
  private readonly injector: Injector = inject(Injector);
  private readonly overlayContainer: OverlayContainer = inject(OverlayContainer);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  attachComponentPortal<T>(component: ComponentType<T>, injector?: Injector): ComponentRef<T> {
    /*const componentRef: ComponentRef<T> = this.viewContainerRef.createComponent(
      component,
      {
        injector: injector ? injector : this.injector,
      }
    );

    this.appRef.attachView(componentRef.hostView);

    this.overlayContainer.getContainerElement().appendChild(this._getComponentRootNode(componentRef));

    return componentRef;*/

    throw new Error('Whoopsie this component is fuckied.');
  }

  /** Gets the root HTMLElement for an instantiated component. */
  private _getComponentRootNode(componentRef: ComponentRef<unknown>): HTMLElement {
    return (componentRef.hostView as EmbeddedViewRef<unknown>).rootNodes[0] as HTMLElement;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ComponentType<T> = new (...args: any[]) => T;
