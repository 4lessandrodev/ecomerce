import { CompraModel } from "./CompraModel.js";

export class CestaModel {
  constructor (id_cesta, id_compra, quantidade, preco_unitario, produtos = []) {
    this._id = null;
    this._id_cesta = id_cesta;
    this._id_compra = id_compra;
    this._quantidade = quantidade;
    this._preco_unitario = preco_unitario;
    this._produtos = produtos.toString();
    this.compraModel = new CompraModel();
  }

  get id() {
    return this._id;
  }
  get id_cesta() {
    return this._id_cesta;
  }
  get quantidade() {
    return this._quantidade;
  }
  get preco_unitario() {
    return this._preco_unitario;
  }
  get produtos() {
    return this._produtos;
  }
  get id_compra() {
    return compra._id_compra;
  }
  //----------
  set id(value) {
    this._id = value;
  }
  set id_cesta(value) {
    this._id_cesta = value;
  }
  set quantidade(value) {
    this._quantidade = value;
  }
  set preco_unitario(value) {
    this._preco_unitario = value;
  }
  set produtos(value) {
    this._produtos = value.toString();
  }
  set id_compra(value) {
    this._id_compra = value;
  }
  comprarCesta(cesta) {
    this.compraModel.iniciarCompra().then(compra => {
      cesta._id_compra = compra;
      fetch(`/comprar-cesta`, {
        headers: { "Content-Type": "application/json" },
        method: 'POST',
        body: JSON.stringify(cesta)

      }).then(response => response.json())
        .then(json => {
          if (json.serverStatus == 2) {

            console.log(json);

          } else {
            swal("Oops!", `Ocorreu um erro ao comprar cesta`, "error");
            reject('Ocorreu um erro ao comprar cesta');
          }
        });
    });
  }


}