import { Component, Input, OnInit } from '@angular/core';
import { TemporalServiceService } from '../../../../services/termporal/temporal-service.service';

@Component({
  selector: 'app-element-temporal-datetime',
  templateUrl: './element-temporal-datetime.component.html',
  styleUrls: ['./element-temporal-datetime.component.scss']
})
export class ElementTemporalDatetimeComponent implements OnInit {
  @Input() dateTime: string = new Date().toString();
  @Input() format = 'mediumDateTime';

  constructor(public temporal: TemporalServiceService) { }

  ngOnInit(): void {
  }

  get date(): Date {
    return new Date(this.dateTime);
  }
}
