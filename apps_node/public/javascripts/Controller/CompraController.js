import { CompraModel } from './../Model/CompraModel.js';
export class CompraController {
  constructor (model, view, pController, cController) {
    this.model = model;
    this.view = view;
    this.pController = pController;
    this.cController = cController;
  }
  iniciarCompra(tipo, item) {
    let id_compra = this.model.id;
    if (id_compra == null || id_compra == undefined || id_compra == {} || id_compra == '') {
      fetch(`/iniciar-compra`, {
        headers: { "Content-Type": "application/json" },
        method: 'POST'
      }).then(response => response.json())
        .then(json => {
          if (json.serverStatus == 2) {
            const compra = new CompraModel();
            compra.id = json.insertId;
            if (tipo == 'Produto') {
              this.pController.comprarProduto(compra.id, item);
            } else {
              this.cController.comprarCesta(compra.id, item);
            }
          } else {
            swal("Oops!", `Ocorreu um erro ao iniciar a compra`, "error");
            reject('Ocorreu um erro ao iniciar a compra');
          }
        });
    } else {
      if (tipo == 'Produto') {
        this.pController.comprarProduto(id_compra, item);
      } else {
        this.cController.comprarCesta(id_compra, item);
      }
    }
  }

}
