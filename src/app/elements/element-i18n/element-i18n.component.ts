import { AfterViewInit, Component, Input, OnDestroy, Renderer2, ViewContainerRef } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-element-i18n',
  templateUrl: './element-i18n.component.html',
  styleUrls: ['./element-i18n.component.scss'],
})
export class ElementI18nComponent implements OnDestroy, AfterViewInit {
  @Input() key: string;
  @Input() elementKey = 'inner';

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
      this.element = wrapper.nativeElement.childNodes[0];

      this.translateService.stream(this.key)
        .pipe(takeUntil(this.destroy))
        .subscribe({
          next: () => {
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
