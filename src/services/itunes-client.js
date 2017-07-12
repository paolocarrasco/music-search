import { inject } from 'aurelia-framework';
import { ItunesHttpHandler } from './itunes-http-handler';

@inject(ItunesHttpHandler)
export class ItunesClient {

  constructor(http) {
    this.http = http;
  }

  getSongs(text) {
    return this.http.fetch(`search?term=${text}`);
  }

}

