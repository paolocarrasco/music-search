import { inject, bindable } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { ItunesService } from '../services/itunes-service';

@inject(ItunesService, EventAggregator)
export class ArtistIndex {

  constructor(service, eventAggregator) {
    this.service = service;
    this.eventAggregator = eventAggregator;
  }

  activate(paramsFromUrl) {
    this.artistId = paramsFromUrl.id;
  }

  attached() {
   this.songsByArtist();
  }

  songsByArtist() {
    this.service
    .getSongsByArtist(this.artistId)
      .then(result => this.result = result)
      .catch(error => console.log(error))
  }

}

