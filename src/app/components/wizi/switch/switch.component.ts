import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-nwb-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
  host: {
    class: 'nwb-switch',
  },
  encapsulation: ViewEncapsulation.None,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: NwbSwitchComponent, multi: true }],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: true,
  imports: [
    FormsModule,
  ],
})
export class NwbSwitchComponent implements ControlValueAccessor {
  @Input()
  extraClasses = '';
  @Input()
  disabled = false;
  @Input()
  checked = true;

  private currentValue = false;

  private _id: string | null = null;

  private _onChanged: CallbackBooleanFunction = () => { /* empty */ };
  private _onTouched: CallbackFunction = () => { /* empty */ };

  writeValue(obj: boolean): void {
    this._setValue(obj);
  }

  registerOnChange(fn: CallbackBooleanFunction): void {
    this._onChanged = fn;
  }

  registerOnTouched(fn: CallbackFunction): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  change() {
    this._setValue(this.checked);
  }

  private _setValue(value: boolean) {
    if (typeof value !== 'boolean') {
      return;
    }

    const init = this.currentValue === null;

    this.currentValue = value;

    if (this.checked !== this.currentValue) {
      this.checked = this.currentValue === true;
    }

    if (init) {
      return;
    }

    if (typeof this._onChanged === 'function') {
      this._onChanged(this.currentValue);
    }
  }

  getId() {
    if (!this._id) {
      this._id = 'search-' + Math.random().toString().replace('.', '-');
    }
    return this._id;
  }
}

export type CallbackFunction = () => void;
export type CallbackBooleanFunction = (currentValue: boolean) => void;
