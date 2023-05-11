import { Component, Input, OnInit } from '@angular/core';
import { TemporalServiceService } from '../../../../services/termporal/temporal-service.service';
import { dateTimeFormatKey } from '../../../../services/termporal/config';

@Component({
  selector: 'app-element-temporal-datetime',
  templateUrl: './element-temporal-datetime.component.html',
  styleUrls: ['./element-temporal-datetime.component.scss']
})
export class ElementTemporalDatetimeComponent implements OnInit {
  @Input() dateTime: string | Date = new Date().toString();
  @Input() format: dateTimeFormatKey = 'mediumDateTime';

  constructor(public temporal: TemporalServiceService) { }

  ngOnInit(): void {
  }

  get date(): Date {
    return new Date(this.dateTime);
  }
}
