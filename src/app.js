import { PLATFORM } from 'aurelia-pal';
import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class App {

  constructor(eventAggregator) {
    this.eventAggregator = eventAggregator;
    this.audio = new Audio();
  }

  configureRouter(config, router) {
    config.title = 'Music Search';
    config.map([
      {
        route: ['', 'home'],
        name: 'home',
        moduleId: PLATFORM.moduleName('home/index', 'home'),
        nav: true,
        title: 'Home'
      },
      {
        route: 'artist',
        name: 'artist',
        moduleId: PLATFORM.moduleName('artist/index', 'artist'),
        nav: false,
        title: 'Artist'
      }
    ]);

    this.router = router;
  }

  attached() {
    this.audioEventSubscription = this.eventAggregator
      .subscribe('audio.started', this.onAudioStart.bind(this));
  }

  detached() {
    this.audioEventSubscription.dispose();
  }

  onAudioStart(song) {
    this.audio.pause();
    this.audio = new Audio(song.previewUrl);
    this.audio.play();
  }

}
