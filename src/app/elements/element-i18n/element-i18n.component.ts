import { AfterViewInit, Component, Input, OnDestroy, Renderer2, ViewContainerRef } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-element-i18n',
    templateUrl: './element-i18n.component.html',
    styleUrls: ['./element-i18n.component.scss'],
    standalone: false
})
export class ElementI18nComponent implements OnDestroy, AfterViewInit {
  @Input() key: string;
  @Input() elementKey: string;

  private destroy = new Subject<boolean>();

  private elementWrapper: HTMLElement;
  private element: HTMLElement;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private translateService: TranslateService,
    private renderer: Renderer2,
  ) {
  }

  ngAfterViewInit(): void {
    if (!this.element && !this.elementWrapper) {
      const wrapper = this.viewContainerRef.element;
      this.elementWrapper = wrapper.nativeElement;
      this.element = Array.from(wrapper.nativeElement.childNodes).find(
        (el: HTMLElement) => el.dataset.key === this.elementKey,
      ) ?? wrapper.nativeElement.childNodes[0];

      this.translateService.stream(this.key)
        .pipe(takeUntil(this.destroy))
        .subscribe({
          next: () => {
            // We need to wait a frame so the elements inside have time to update their translation.
            window.requestAnimationFrame(() => {
              this.replace();
            });
          },
        });
    }
  }

  private replace() {
    const val = this.translateService.instant(this.key, {
      [this.elementKey]: this.element.outerHTML,
    });

    this.renderer.setProperty(this.elementWrapper, 'innerHTML', val);
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
  }
}
