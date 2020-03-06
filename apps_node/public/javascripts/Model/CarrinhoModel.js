export class CarrinhoModel {
  constructor (mainCode, mainDescription, arrayItensCode, priceTotal, itensDescription, image) {
    this._mainCode = mainCode;
    this._mainDescription = mainDescription;
    this._arrayItensCode = arrayItensCode;
    this._priceTotal = priceTotal;
    this._itensDescription = itensDescription;
    this._mainImage = image;
  }

  get mainCode() {
    return this._mainCode;
  }

  set mainCode(value) {
    this._mainCode = value;
  }

  get mainDescription() {
    return this._mainDescription;
  }

  set mainDescription(value) {
    this._mainDescription = value;
  }

  get arrayItensCode() {
    return this._arrayItensCode;
  }

  set arrayItensCode(value) {
    this._arrayItensCode = value;
  }

  get priceTotal() {
    return this._priceTotal;
  }

  set priceTotal(value) {
    this._priceTotal = value;
  }

  get itensDescription() {
    return this._itensDescription;
  }

  set itensDescription(value) {
    this._itensDescription = value;
  }

  get image() {
    return this._mainImage;
  }

  set image(value) {
    this._mainImage = value;
  }
}