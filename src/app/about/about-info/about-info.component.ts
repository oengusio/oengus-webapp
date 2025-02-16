import { Component } from '@angular/core';

@Component({
    selector: 'app-about-info',
    templateUrl: './about-info.component.html',
    styleUrls: ['./about-info.component.scss'],
    host: {
        class: 'box',
    },
    standalone: false
})
export class AboutInfoComponent {
}
