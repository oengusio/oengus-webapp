import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sync-button',
  templateUrl: './sync-button.component.html',
  styleUrls: ['./sync-button.component.scss']
})
export class SyncButtonComponent implements OnInit {
  public faSyncAlt = faSyncAlt;

  @Input() public title: string;
  @Input() public username: string;
  @Input() public synced: boolean;

  @Output() public sync = new EventEmitter<void>();
  @Output() public unsync = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

}
