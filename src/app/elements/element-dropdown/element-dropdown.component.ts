import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-element-dropdown',
  templateUrl: './element-dropdown.component.html',
  styleUrls: ['./element-dropdown.component.scss']
})
export class ElementDropdownComponent implements OnInit {
  faAngleDown = faAngleDown;

  @HostBinding('class.is-active') get active() { return this.isActive; }
  @HostBinding('class.is-right') get right() { return this.isRight; }
  @HostBinding('class.navbar-item.has-dropdown') get navbar() { return this.isNavbar; }
  @HostBinding('class.dropdown') get notNavbar() { return !this.isNavbar; }

  @Input() type = 'DROPDOWN'; // DROPDOWN | NAVBAR
  @Input() isRight = false;

  isActive = false;

  get isNavbar() {
    return /^navbar$/i.test(this.type);
  }

  clickOutsideStatic = undefined as (() => void) | undefined;

  constructor() { }

  ngOnInit(): void {
    this.clickOutsideStatic = this.clickOutside.bind(this);
  }

  toggleActive(): void {
    this.isActive = !this.isActive;
    if (this.isActive) {
      requestAnimationFrame(() => document.addEventListener('click', this.clickOutsideStatic));
    } else {
      this.clickOutside();
    }
  }

  clickOutside(): void {
    this.isActive = false;
    document.removeEventListener('click', this.clickOutsideStatic);
  }
}
