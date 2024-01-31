import '@enable-ux/eds-common/components/eds-common'
import '../node_modules/knockout/build/output/knockout-latest'

ko.bindingHandlers["eds-init"] = {
  init(element, valueAccessor) {
      const callBack = valueAccessor();
      callBack(element);
  }
}

const defaultOptions = [
  {id: 1, name: 'first item'},
  {id: 2, name: 'second item'},
  {id: 3, name: 'third item'},
  {id: 4, name: 'fourth item'}
]

class ViewModel {
  constructor() {
    this.loadOptions();
  }

  placeholderText = 'options...'
  isLoading = ko.observable(false);

  options = ko.observableArray([]);
  selectedOptions = ko.observableArray([]);

  public initAutofillSearch(autoFillSearch: any): void {
    this.options.subscribe(() => {
        autoFillSearch.dropdownItems = this.options();
    });

    // We are manually setting an attribute here because there is custom logic
    autoFillSearch.setAttribute('placeholdertext', this.placeholderText);
  }


  public selectItem = (_, event) => {
    const items = event.detail;
    if (Array.isArray(items)) {
        this.selectedOptions(items);
        return;
    } else {
      this.selectedOptions([]);
    }
  }

  public searchItems = (_, event) => {
      const searchTerm = event.detail as string;
      this.loadOptions(searchTerm);
  }

  private loadOptions = (searchTerm?) => {
    this.isLoading(true);
    setTimeout(() => {
      if (!searchTerm) {
        this.options(defaultOptions);
      } else {
        const filteredItems = defaultOptions.filter(o =>o.name.toLocaleLowerCase()
            .includes(searchTerm.toLocaleLowerCase()))
        this.options(filteredItems)
      }

      this.isLoading(false);
    }, 500);
  
  };
}
  

ko.applyBindings(new ViewModel()); // This makes Knockout get to work