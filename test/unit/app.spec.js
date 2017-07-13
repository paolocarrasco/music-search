import { App } from 'app';

class RouterStub {
  routes;

  configure(handler) {
    handler(this);
  }

  map(routes) {
    this.routes = routes;
  }
}

describe('the App module', () => {
  let sut;
  let mockedRouter;

  beforeEach(() => {
    mockedRouter = new RouterStub();
    sut = new App();
    sut.configureRouter(mockedRouter, mockedRouter);
  });

  it('contains a router property', () => {
    expect(sut.router).toBeDefined();
  });

  it('configures the router title', () => {
    expect(sut.router.title).toEqual('Music Search');
  });

  it('should have a welcome route', () => {
    expect(sut.router.routes).toContainEqual({
      route: ['', 'home'],
      name: 'home',
      moduleId: './home/home',
      nav: true,
      title: 'Home'
    });
  });
});
