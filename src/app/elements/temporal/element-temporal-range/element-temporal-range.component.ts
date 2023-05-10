import { Component, Input, OnInit } from '@angular/core';
import { TemporalServiceService } from '../../../../services/termporal/temporal-service.service';

@Component({
  selector: 'app-element-temporal-range',
  templateUrl: './element-temporal-range.component.html',
  styleUrls: ['./element-temporal-range.component.scss']
})
export class ElementTemporalRangeComponent implements OnInit {
  @Input() start: string;
  @Input() end: string;
  @Input() format = 'mediumDateTime';

  constructor(public temporal: TemporalServiceService) { }

  ngOnInit(): void {
  }

}
