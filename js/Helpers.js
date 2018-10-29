function $(element) {
  this.element = element;
  this.el = document.querySelectorAll(element);
  return this.el.length === 1 ? this.el[0] : this.el;
}
