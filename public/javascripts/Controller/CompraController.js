import { CompraModel } from './../Model/CompraModel.js';
export class CompraController {
  constructor (model, view, pController, cController) {
    this.model = model;
    this.view = view;
    this.pController = pController;
    this.cController = cController;
  }
  iniciarCompra(tipo, item, redirecionar = false) {
    let logado = document.querySelector('#login').dataset.login;
    if (logado == 'true') {
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
                this.pController.comprarProduto(compra.id, item, redirecionar);
              } else {
                this.cController.comprarCesta(compra.id, item, redirecionar);
              }
            } else {
              swal("Oops!", `Ocorreu um erro ao iniciar a compra`, "error");
              reject('Ocorreu um erro ao iniciar a compra');
            }
          });
      } else {
        if (tipo == 'Produto') {
          this.pController.comprarProduto(id_compra, item, redirecionar);
        } else {
          this.cController.comprarCesta(id_compra, item, redirecionar);
        }
      }
    } else {
      swal({
        title: "LOGIN",
        text: "É preciso se cadastrar ou realizar o login!",
        icon: "info",
        buttons: true,
        dangerMode: false,
      })
        .then(() => {
          location.href = '/login';
        });
            //swal("Oops!", `Faça login antes de realizar a compra`, "info");
    }
  }

}
