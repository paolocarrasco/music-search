import { inject, bindable } from 'aurelia-framework';
import { ItunesService } from '../services/itunes-service';

@inject(ItunesService)
export class HomeIndex {

  @bindable() filterText = '';

  constructor(service) {
    this.service = service;
  }

  filterTextChanged(oldValue, newValue) {
    this.service
      .getSongsByText(this.filterText)
      .then((result) => {
        this.result = result;
      })
  }

}

