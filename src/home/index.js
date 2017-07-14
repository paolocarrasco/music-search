import { inject, bindable } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { ItunesService } from '../services/itunes-service';

@inject(ItunesService, EventAggregator)
export class HomeIndex {

  @bindable() filterText = '';

  constructor(service, eventAggregator) {
    this.service = service;
    this.eventAggregator = eventAggregator;
  }

  filterTextChanged(oldValue, newValue) {
    this.eventAggregator.publish('search.started');
    this.service
      .getSongsByText(this.filterText)
        .then(result => this.result = result)
        .catch(error => console.log(error))
        .then(() => this.eventAggregator.publish('search.finished'));
  }

}

