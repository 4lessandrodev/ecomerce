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
    let produtos = document.querySelectorAll('#produtos-cesta tr');
    let arr_codigos_produtos = [];


    for (let produto of produtos) {
      arr_codigos_produtos.push(parseInt(produto.cells[0].textContent.trim()));
    }

    const cesta = new CestaModel(id, '', quantidade, preco, arr_codigos_produtos);
    console.log(cesta);
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
              swal({
                title: "Novidade",
                text: "Gostaria de ver nossos produtos de mercearia?",
                icon: "success",
                buttons: true,
                dangerMode: false,
              })
                .then((irMercearia) => {
                  if (irMercearia) {
                    location.href = '/cestas#mercearia';
                  } else {
                    location.href = '/carrinho';
                  }
                });

            });
          } else {
            swal("Boa escolha!", "Cesta adicionada com sucesso!", "success");
            swal({
              title: "Novidade",
              text: "Gostaria de ver nossos produtos de mercearia?",
              icon: "success",
              buttons: true,
              dangerMode: false,
            })
              .then((irMercearia) => {
                if (irMercearia) {
                  location.href = '/cestas#mercearia';
                } 
              });

          }
        } else {
          swal("Oops!", `Ocorreu um erro ao comprar produto`, "error");
          reject('Ocorreu um erro ao comprar produto');
        }
      });
  }

}


