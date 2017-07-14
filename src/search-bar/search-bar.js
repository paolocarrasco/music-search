import { inject, bindable } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class SearchBar {

  @bindable() filterText = '';
  @bindable query = '';

  timeoutHandle;

  constructor(eventAggregator) {
    this.eventAggregator = eventAggregator;
  }

  attached() {
    this.searchStartedSubscription = this.eventAggregator
      .subscribe('search.started', this.onSearchStart.bind(this));
    this.searchFinishedSubscription = this.eventAggregator
      .subscribe('search.finished', this.onSearchFinish.bind(this));
  }

  detached() {
      this.searchStartedSubscription.dispose();
      this.searchFinishedSubscription.dispose();
  }

  executeSearch() {
    clearTimeout(this.timeoutHandle);
    this.filterText = this.query;
  }

  queryChanged(oldValue, newValue) {
    clearTimeout(this.timeoutHandle);
    this.timeoutHandle = setTimeout(() => this.executeSearch(), 400);
  }

  onSearchStart() {
    this.loading = true;
  }

  onSearchFinish() {
    this.loading = false;
  }
}
