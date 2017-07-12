import { bindable } from 'aurelia-framework';

export class Home {

  @bindable() filterText = '';

  filterTextChanged(oldValue, newValue) {
    console.log(this.filterText);
  }

}

