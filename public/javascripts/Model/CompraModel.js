export class CompraModel {
  constructor (id_usuario, data_compra = new Date(), pedido_aberto = 1) {
    this._id = null;
    this._id_usuario = id_usuario;
    this._data_compra = data_compra;
    this._pedido_aberto = pedido_aberto;
  }
  get id_usuario() {
    return this._id_usuario;
  }
  get data_compra() {
    return this._data_compra;
  }
  get pedido_aberto() {
    return this._pedido_aberto;
  }
  get id() {
    return localStorage.getItem('id_compra');
  }
  set id(value) {
    localStorage.setItem('id_compra', value);
    this._id = value;
  }
  set data_compra(value) {
    this._data_compra = value;
  }
  set pedido_aberto(value) {
    this._pedido_aberto = value;
  }
  set id_usuario(value) {
    this._id_usuario = value;
  }

}
