import {
  Injector,
  ComponentFactoryResolver,
  EmbeddedViewRef,
  ApplicationRef,
  ComponentRef,
  ReflectiveInjector
} from '@angular/core';

interface GhostData {
  component: any;
  componentInputs: any;
  data: any;
  typeRecipient: string;
}
interface Position {
  top: number;
  left: number;
}

export class GhostEntity {
  // Data from ghost to receiver.
  dataForReceiver = {
    typeRecipient: null,
    data: null
  };
  ghostRef: ComponentRef<any> | null = null;
  childGhostRef: ComponentRef<any> | null = null;
  private componentFactoryResolver: ComponentFactoryResolver;
  private appRef: ApplicationRef;
  private injector: Injector;
  constructor(
      ghostComponent: any,
      componentFactoryResolver: ComponentFactoryResolver,
      appRef: ApplicationRef,
      injector: Injector
    ) {
    this.bindAll();
    this.componentFactoryResolver = componentFactoryResolver;
    this.appRef = appRef;
    this.injector = injector;
    this.createGhostComponent(ghostComponent);
  }
  bindAll() {}
  /** Get ghost HTML element */
  getGhostElement(): HTMLElement {
    return this.ghostRef ? (this.ghostRef.hostView as EmbeddedViewRef<any>)
    .rootNodes[0] as HTMLElement : null;
  }
  /** Create ghost component */
  createGhostComponent(ghostComponent: any) {
    this.ghostRef = this.componentFactoryResolver.resolveComponentFactory(ghostComponent).create(this.injector);
    this.appRef.attachView(this.ghostRef.hostView);
    const ghostElement = this.getGhostElement();
    document.body.appendChild(ghostElement);
  }
  /** Destroy ghost component */
  destroyGhostComponent() {
    if (this.ghostRef) {
      this.appRef.detachView(this.ghostRef.hostView);
      this.ghostRef.destroy();
      this.ghostRef = null;
    }
  }
  /** Get HTML element of ghost child  */
  getGhostChildElement(): HTMLElement {
    return this.childGhostRef ? (this.childGhostRef.hostView as EmbeddedViewRef<any>)
    .rootNodes[0] as HTMLElement : null;
  }
  /** Fill component with inputs */
  fillComponentInputs(properties: Object = {}) {
    for (const property in properties) {
      if (properties.hasOwnProperty(property)) {
        this.childGhostRef.instance[property] = properties[property];
      }
    }
  }
  getDataForReceiver() {
    return this.dataForReceiver || null;
  }
  /** Create child of ghost */
  createChildGhostComponent(ghostData: GhostData) {
    this.dataForReceiver.data = ghostData.data;
    this.dataForReceiver.typeRecipient = ghostData.typeRecipient;
    const factory = this.componentFactoryResolver.resolveComponentFactory(ghostData.component);
    this.childGhostRef = factory.create(this.injector);
    this.fillComponentInputs(ghostData.componentInputs);
    this.appRef.attachView(this.childGhostRef.hostView);
    const childGhostElement = this.getGhostChildElement();
    const ghostElement = this.getGhostElement();
    childGhostElement.style.opacity = '0.5';
    ghostElement.appendChild(childGhostElement);
  }
  /** Destroy child component of ghost */
  destroyChildGhostComponent() {
    if (this.childGhostRef) {
      this.appRef.detachView(this.childGhostRef.hostView);
      this.childGhostRef.destroy();
      this.childGhostRef = null;
      this.dataForReceiver.data = null;
      this.dataForReceiver.typeRecipient = null;
    }
  }
  /** Update position of ghost */
  updatePosition(position: Position) {
    const ghostElement = this.getGhostElement();
    if (position.top <= (document.body.offsetHeight - ghostElement.offsetHeight) && position.top >= 0) {
      ghostElement.style.top = `${position.top}px`;
    } else {
        if (position.top < 0) {
          ghostElement.style.top = '0px';
        } else {
          ghostElement.style.top = `${document.body.offsetHeight - ghostElement.offsetHeight}px`;
      }
    }
    if (position.left <= (document.body.offsetWidth - ghostElement.offsetWidth) && position.left >= 0) {
      ghostElement.style.left = `${position.left}px`;
    } else {
      if (position.left < 0) {
        ghostElement.style.left = '0px';
      } else {
        ghostElement.style.left = `${document.body.offsetWidth - ghostElement.offsetWidth}px`;
      }
    }
  }
}
