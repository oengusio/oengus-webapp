import { Component, Input, OnInit } from '@angular/core';
import { Marathon } from 'src/model/marathon';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {
  @Input() marathon: Marathon;

  constructor() { }

  ngOnInit(): void {
  }

}
