import { ProdutoModel } from './../Model/ProdutoModel.js';

export class ProdutoController {
  constructor (model, view) {
    this.model = model;
    this.view = view;
  }

  novoProduto() {

    let id = document.getElementById('id_produto').value;
    let preco = document.getElementById('preco_unitario').value;
    let quantidade = document.getElementById('quantidade').value;

    const produto = new ProdutoModel(id, '', quantidade, preco);

    return produto;

  }

  comprarProduto(compra, produto, redirecionar) {
    produto._id_compra = compra;
    fetch(`/comprar-produto`, {
      headers: { "Content-Type": "application/json" },
      method: 'POST',
      body: JSON.stringify(produto)
    }).then(response => response.json())
      .then(json => {
        if (json.serverStatus == 2 && json.affectedRows == 1) {
          if (redirecionar) {
            swal({
              title: "Boa escolha",
              text: "Produto adicionado com sucesso!",
              icon: "success",
              buttons: true,
              dangerMode: false              
            }).then(()=> {
              location.href = '/carrinho';
            });
          } else {
            swal("Boa escolha!", "Produto adicionado com sucesso!", "success");
          }
        } else {
          swal("Oops!", `Ocorreu um erro ao comprar produto`, "error");
          reject('Ocorreu um erro ao comprar produto');
        }
      });
  }

}
