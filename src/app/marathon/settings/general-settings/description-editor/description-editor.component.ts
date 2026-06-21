import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../../../../components/components.module';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-description-editor',
  imports: [
    FormsModule,
    ComponentsModule,
    TranslatePipe,
  ],
  templateUrl: './description-editor.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './description-editor.component.scss',
})
export class DescriptionEditorComponent {
  // @ts-expect-error meh.
  @Input() disabled: boolean;
  // @ts-expect-error meh.
  @Input() maxLength: number;
  // @ts-expect-error meh.
  @Input() value: string;

  @Output() valueChange = new EventEmitter<string>();

  previewActive = false;

  get descriptionValue(): string {
    return this.value;
  }

  set descriptionValue(val: string) {
    this.valueChange.emit(val);
  }
}
