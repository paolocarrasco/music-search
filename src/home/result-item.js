import { inject, bindable } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class ResultItem {

  @bindable() item;

  constructor(eventAggregator) {
    this.eventAggregator = eventAggregator;
  }

  handleClick() {
    this.eventAggregator
      .publish('audio.started', this.item);
  }

}

