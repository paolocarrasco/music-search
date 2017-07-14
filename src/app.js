import { PLATFORM } from 'aurelia-pal';

export class App {
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
}
