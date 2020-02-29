class PlanoCompraModel {
  constructor (id_plano, id_compra) {
    this._id = null;
    this._id_plano = id_plano;
    this._id_compra = id_compra;
  }
  get id_plano() {
    return this._id_plano;
  }
  set id_plano(value) {
    this._id_plano = value;
  }

  get id() {
    return this._id;
  }
  set id(value) {
    this._id = value;
  }

  get id_compra() {
    return this._id_compra;
  }
  set id_compra(value) {
    this._id_compra = value;
  }
}