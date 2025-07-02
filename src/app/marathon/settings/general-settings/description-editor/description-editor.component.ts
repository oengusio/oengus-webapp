import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  styleUrl: './description-editor.component.scss',
})
export class DescriptionEditorComponent {

  @Input() disabled: boolean;
  @Input() maxLength: number;
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
