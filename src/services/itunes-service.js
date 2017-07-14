import { inject } from 'aurelia-framework';
import { ItunesClient } from './itunes-client';
import Constants from '../util/constants';

@inject(ItunesClient)
export class ItunesService {

  constructor(itunesClient) {
    this.itunesClient = itunesClient;
  }

  getSongsByText(text) {
    return this.itunesClient
            .getSongs(text)
            .then(response => response.json())
            .then(json => json.results )
  }

  getSongsByArtist(id) {
    return this.itunesClient
            .getSongsByArtist(id)
            .then(response => response.json())
            .then(json => json.results )
            .then(json => json.filter(x => x.kind == 'song') )
  }

}

