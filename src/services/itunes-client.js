import { inject } from 'aurelia-framework';
import { ItunesHttpHandler } from './itunes-http-handler';
import constants from '../util/constants';

@inject(ItunesHttpHandler)
export class ItunesClient {

  constructor(httpHandler) {
    this.httpHandler = httpHandler;
  }

  getSongs(text) {
    const searchQuery = `search?term=${text}&limit=${constants.paginationLimit}`;
    return this.httpHandler.fetch(searchQuery);
  }

}

