import { Component, HostBinding, Input } from '@angular/core';

@Component({
    selector: 'app-element-advertisement',
    templateUrl: './element-advertisement.component.html',
    styleUrls: ['./element-advertisement.component.scss'],
    standalone: false
})
export class ElementAdvertisementComponent {

  /**
   * Sometimes you need to insert elements that won't have advertisements
   * if this is false, no advertisement will attempt to load.
   */
  @Input() showAdvertisement = false;
  /**
   * Shows a small "space" that persists even if the advertisement is not shown
   * A "not shown" advertisement can occur due to showAdvertisement being false or it not being fulfilled
   * If the advertisement is fulfilled, there will always be spacers
   */
  @Input() showSpacer = true;
  /**
   * Causes the advertisement to be wider than it is tall
   * You must set one, and only one, of isHorizontal and isVertical
   */
  @Input() isHorizontal = false;
  /**
   * Causes the advertisement to be taller than it is wide
   * You must set one, and only one, of isHorizontal and isVertical
   */
  @Input() isVertical = false;
  /**
   * Flag that is listened to. When it becomes true, a reload will be triggered.
   * To trigger additional reloads, it must stop being true before becoming true again.
   * XXX Currently does not reload anything
   */
  @Input() shouldReload = false;

  @Input() dataWidth = '80%';
  @Input() dataMinHeight: string | null = null;
  @HostBinding('style.height') @Input() dataHeight = 'auto';

  // Binding classes to the host
  @HostBinding('class.is-shown') get isShown() { return this.showAdvertisement; }
  @HostBinding('class.is-horizontal') get isClassHorizontal() { return this.isHorizontal && !this.isVertical; }
  @HostBinding('class.is-vertical') get isClassVertical() { return !this.isHorizontal && this.isVertical; }

  get spacerClass() {
    return {
      spacer: this.showSpacer,
    };
  }
}
