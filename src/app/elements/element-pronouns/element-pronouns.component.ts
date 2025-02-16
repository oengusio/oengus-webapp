import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import BulmaTagsInput from '@duncte123/bulma-tagsinput';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { MiscService } from '../../../services/misc.service';

@Component({
    selector: 'app-element-pronouns',
    templateUrl: './element-pronouns.component.html',
    styleUrls: ['./element-pronouns.component.scss'],
    host: {
        'class': 'field',
    },
    standalone: false
})
export class ElementPronounsComponent implements OnInit {
  @Input() pronouns: string[];
  @Output() pronounsChange = new EventEmitter<string[]>();

  @ViewChild('pronounEl', {static: true}) pronounsInput: ElementRef<HTMLInputElement>;

  private pronounsTagsInput: BulmaTagsInput;

  constructor(
    private miscService: MiscService,
    private translateService: TranslateService,
  ) { }

  async ngOnInit(): Promise<void> {
    const tagsInput = this.pronounsInput.nativeElement;


    const placeholder = await firstValueFrom(
      this.translateService.get('user.settings.pronouns.hint')
    );
    const noResults = await firstValueFrom(
      this.translateService.get('user.settings.pronouns.no_results')
    );

    this.pronounsTagsInput = new BulmaTagsInput(tagsInput, {
      noResultsLabel: noResults,
      selectable: false,
      freeInput: false,
      placeholder,
      caseSensitive: false,
      trim: true,
      source: (value: string) => new Promise((resolve) => {
        if (!value) {
          return resolve([]);
        }

        firstValueFrom(this.miscService.searchPronouns(value))
          .then(resolve)
          .catch(() => resolve([]));
      }),
    });

    this.pronounsTagsInput.on('after.add', () => {
      this.pronounsChange.emit(this.pronounsTagsInput.items);
    });

    this.pronounsTagsInput.on('after.remove', () => {
      this.pronounsChange.emit(this.pronounsTagsInput.items);
    });

    this.pronounsTagsInput.add(this.pronouns);
  }

}
