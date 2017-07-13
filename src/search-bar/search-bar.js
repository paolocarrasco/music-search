import { bindable } from 'aurelia-framework';

export class SearchBar {

  @bindable() filterText = '';
  @bindable query = '';
  timeoutHandle;

  executeSearch() {
    clearTimeout(this.timeoutHandle);
    this.filterText = this.query;
  }

  queryChanged(oldValue, newValue) {
    clearTimeout(this.timeoutHandle);
    this.timeoutHandle = setTimeout(() => this.executeSearch(), 400);
  }
}
