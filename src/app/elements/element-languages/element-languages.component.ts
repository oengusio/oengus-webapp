import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import BulmaTagsInput from '@duncte123/bulma-tagsinput';
import { firstValueFrom } from 'rxjs';
import { MiscService } from '../../../services/misc.service';

interface LangType {
  value: string;
  text: string;
}

@Component({
    selector: 'app-element-languages',
    templateUrl: './element-languages.component.html',
    styleUrls: ['./element-languages.component.scss'],
    host: {
        'class': 'field',
    },
    standalone: false
})
export class ElementLanguagesComponent implements OnInit {
  @ViewChild('languagesEl', {static: true}) languageInput: ElementRef<HTMLInputElement>;
  @Input() languages: string[];
  @Output() languagesChange = new EventEmitter<string[]>();

  private languagesTagsInput: BulmaTagsInput;

  constructor(
    private miscService: MiscService,
    private translateService: TranslateService
  ) { }

  async ngOnInit(): Promise<void> {
    const tagsInput = this.languageInput.nativeElement;

    const placeholder = await firstValueFrom(
      this.translateService.get('user.settings.language.placeholder')
    );
    const noResults = await firstValueFrom(
      this.translateService.get('user.settings.language.no_results')
    );

    this.languagesTagsInput = new BulmaTagsInput(tagsInput, {
      noResultsLabel: noResults,
      selectable: false,
      freeInput: false,
      itemValue: 'value',
      itemText: 'text',
      placeholder: placeholder,
      caseSensitive: false,
      trim: true,
      tagClass: 'is-rounded is-primary',
      source: (value: string) => new Promise((resolve) => {
        if (!value) {
          return resolve([]);
        }

        firstValueFrom(this.miscService.searchLanguage(value))
          .then(resolve)
          .catch(() => resolve([]));
      }),
    });

    this.languagesTagsInput.on('after.add', () => {
      this.languagesChange.emit(this.languagesTagsInput.items.map((it) => it.value));
    });

    this.languagesTagsInput.on('after.remove', () => {
      this.languagesChange.emit(this.languagesTagsInput.items.map((it) => it.value));
    });

    this.collectLanguages(this.languages).then((langs: LangType[]) => {
      this.languagesTagsInput.add(langs);
    });
  }

  private async collectLanguages(langauges: string[]): Promise<LangType[]> {
    const promises = [] as Promise<LangType>[];

    langauges.forEach((lang) => {
      promises.push(new Promise((resolve) => {
        this.translateService.get('language.' + lang).subscribe((name) => {
          resolve({
            value: lang,
            text: name,
          });
        });
      }));
    });

    return await Promise.all(promises);
  }

}
