import {Component, OnInit, NgZone} from '@angular/core';
import {Subject} from 'rxjs';

@Component({
    selector: 'app-plum',
    templateUrl: './plum.component.html',
    styleUrls: ['./plum.component.scss'],
    standalone: false
})
export class PlumComponent implements OnInit {
  public plumSubject = new Subject<boolean>();
  public plumming = false;

  constructor(private ngZone: NgZone) {
    window['here_comes'] = () => ngZone.run(() => {
      console.log('PLUM!!! #notspon');
      this.plumSubject.next(true);
    });
  }

  ngOnInit() {
    this.plumSubject.subscribe((val) => {
      this.plumming = val;

      if (val) {
        // wait a single tick before running the video
        requestAnimationFrame(() => {
          this.runVideo();
        });
      }
    });
    this.plumSubject.next(false);
  }

  runVideo(): void {
    const player = new window['YT'].Player('player', {
      height: '390',
      width: '640',
      videoId: 'J-5Yte5uLxs',
      playerVars: {
        'playsinline': 1
      },
      events: {
        'onReady': (event) => {
          setTimeout(() => {
            event.target.playVideo();
          }, 250);
        },
        'onStateChange': (event) => {
          if (event.data === window['YT'].PlayerState.ENDED) {
            player.destroy();
            this.ngZone.run(() => {
              this.plumSubject.next(false);
            });
          }
        },
      }
    });
  }
}
