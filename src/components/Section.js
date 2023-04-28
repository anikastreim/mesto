export default class Section {
  constructor({ renderer }, container) {
    this._renderer = renderer;
    this._container = container;
  }
  
  renderItems(items) {
    items.forEach(this._renderer);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  addItems(items) {
    this._container.append(items);
  } 
}