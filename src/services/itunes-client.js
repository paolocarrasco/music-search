import { inject } from 'aurelia-framework';
import { ItunesHttpHandler } from './itunes-http-handler';
import constants from '../util/constants';

@inject(ItunesHttpHandler)
export class ItunesClient {

  constructor(httpHandler) {
    this.httpHandler = httpHandler;
  }

  getSongs(text) {
    const searchQuery = `search?term=${text}&entity=song&limit=${constants.paginationLimit}`;
    return this.httpHandler.fetch(searchQuery);
  }

  getSongsByArtist(id) {
    const searchQuery = `lookup?id=${id}&entity=song`;
    return this.httpHandler.fetch(searchQuery);
  }

}

