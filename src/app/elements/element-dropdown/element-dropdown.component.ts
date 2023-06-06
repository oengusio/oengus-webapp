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
  @HostBinding('class.dropdown') get dropdown() { return !this.isNavbar; }
  @HostBinding('class.navbar-item') get navbar() { return this.isNavbar; }
  @HostBinding('class.has-dropdown') get navbarExtraClass() { return this.isNavbar; }
  @HostBinding('class.is-right') get right() { return this.isRight; }
  @HostBinding('class.dropdown') get notNavbar() { return !this.isNavbar; }

  @Input() type: 'DROPDOWN' | 'NAVBAR' = 'DROPDOWN';
  @Input() isRight = false;
  @HostBinding('class.mob') @Input() isMob = false;

  isActive = false;

  get isNavbar() {
    return /^navbar$/i.test(this.type);
  }

  clickOutsideStatic = undefined as (() => void) | undefined;

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
