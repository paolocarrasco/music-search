import {PLATFORM} from 'aurelia-pal';

export class App {
  configureRouter(config, router) {
    config.title = 'Music Search';
    config.map([
      {
        route: ['', 'home'], name: 'home',
        moduleId: PLATFORM.moduleName('./home/home'),
        nav: true, title: 'Home'
      }
    ]);

    this.router = router;
  }
}
