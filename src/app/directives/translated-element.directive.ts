import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';


// Source: https://github.com/ngx-translate/core/issues/223#issuecomment-481916818
@Directive({
  selector: '[appTranslatedElement]',
})
export class TranslatedElementDirective {

  @Input('appTranslatedElement')
  public elementKey: string;

  constructor(
    public readonly viewRef: ViewContainerRef,
    public readonly templateRef: TemplateRef<any>,
  ) {}
}
