class CompraModel {
  constructor (id_cliente, data_compra = new Date(), pedido_aberto = true) {
    this.id = null;
    this._id_cliente = id_cliente;
    this._data_compra = data_compra;
    this._pedido_aberto = pedido_aberto;
  }

  get id_cliente() {
    return this._id_cliente;
  }
  set id_cliente(value) {
    this._id_cliente = value;
  }
  get data_compra() {
    return this._data_compra;
  }
  set data_compra(value) {
    this._data_compra = value;
  }
  get pedido_aberto() {
    return this._pedido_aberto;
  }
  set pedido_aberto(value) {
    this._pedido_aberto = value;
  }
  get id() {
    return this_.id;
  }
  set id(value) {
    this._id = value;
  }
}

module.exports = CompraModel;