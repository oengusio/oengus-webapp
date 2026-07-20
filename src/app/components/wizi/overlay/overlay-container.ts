import { Injectable } from '@angular/core';

/**
 * The OverlayContainer is the container in which all overlays will load.
 * It should be provided in the root component to ensure it is properly shared.
 */
@Injectable({
  providedIn: 'root',
})
export class OverlayContainer {
  protected _containerElement: HTMLElement | undefined;

  /**
   * This method returns the overlay container element.  It will lazily
   * create the element the first time  it is called to facilitate using
   * the container in non-browser environments.
   * @returns the container element
   */
  getContainerElement(): HTMLElement {
    if (!this._containerElement) {
      this._createContainer();
    }

    // eslint-disable-next-line @typescript-eslint/ban-tslint-comment
    // tslint:disable-next-line:no-non-null-assertion
    return this._containerElement!;
  }

  /**
   * Create the overlay container element, which is simply a div
   * with the 'cdk-overlay-container' class on the document body.
   */
  protected _createContainer(): void {
    const container = document.createElement('div');
    container.classList.add('nwb-overlay-container');

    document.body.appendChild(container);
    this._containerElement = container;
  }
}

