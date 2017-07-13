import { inject } from 'aurelia-framework';
import { ItunesHttpHandler } from './itunes-http-handler';

@inject(ItunesHttpHandler)
export class ItunesClient {

  constructor(httpHandler) {
    this.httpHandler = httpHandler;
  }

  getSongs(text) {
    return this.httpHandler.fetch(`search?term=${text}`);
  }

}

