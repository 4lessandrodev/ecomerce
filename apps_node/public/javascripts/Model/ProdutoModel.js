import { CompraModel } from "./CompraModel.js";

export class ProdutoModel {
  constructor (id_produto, id_compra, quantidade, preco_unitario) {
    this._id = null;
    this._id_produto = id_produto;
    this._id_compra = id_compra;
    this._quantidade = quantidade;
    this._preco_unitario = preco_unitario;
    this.compraModel = new CompraModel();
  }
  get id() {
    return this._id;
  }
  get id_produto() {
    return this._id_produto;
  }
  get id_compra() {
    return this._id_compra;
  }
  get quantidade() {
    return this._quantidade;
  }
  get preco_unitario() {
    return this._preco_unitario;
  }

  set id(value) {
    this._id = value;
  }
  set id_produto(value) {
    this._id_produto = value;
  }
  set id_compra(value) {
    this._id_compra = value;
  }
  set quantidade(value) {
    this._quantidade = value;
  }
  set preco_unitario(value) {
    this._preco_unitario = value;
  }
}