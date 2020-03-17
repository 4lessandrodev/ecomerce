import { CestaModel } from './../Model/CestaModel.js';

export class CestaController {
  constructor (model, view) {
    this.model = model;
    this.view = view;
  }

  novaCesta() {
    let id = document.getElementById('id_cesta').value;
    let preco = document.getElementById('preco_unitario').value;
    let quantidade = document.getElementById('quantidade').value;
    let prdutos = document.querySelectorAll('tbody .itens-da-cesta .tr-id .id_produto_cesta');
    let arr_codigos_produtos = [];


    for (let produto of prdutos) {
      arr_codigos_produtos.push(produto.value);
    }

    const cesta = new CestaModel(id, '', quantidade, preco, arr_codigos_produtos);

    return cesta;

  }

  comprarCesta(compra, cesta, redirecionar) {
    cesta._id_compra = compra;
        fetch(`/comprar-cesta`, {
      headers: { "Content-Type": "application/json" },
      method: 'POST',
      body: JSON.stringify(cesta)
    }).then(response => response.json())
      .then(json => {
        if (json.serverStatus == 2 && json.affectedRows == 1) {
          if (redirecionar) {
            swal({
              title: "Boa escolha",
              text: "Cesta adicionada com sucesso!",
              icon: "success",
              buttons: true,
              dangerMode: false
            }).then(() => {
              location.href = '/carrinho';
            });
          } else {
            swal("Boa escolha!", "Cesta adicionada com sucesso!", "success");
          }
        } else {
          swal("Oops!", `Ocorreu um erro ao comprar produto`, "error");
          reject('Ocorreu um erro ao comprar produto');
        }
      });
  }

}


