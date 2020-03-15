import { PedidoModel } from './../Model/PedidoModel.js';
export class PedidoController {
  constructor (model, view) {
    this.model = model;
    this.view = view;
  }
  
  novoPedido() {
    
    
    let input_ecobag = document.querySelector('#ecobag_adicional');
    let input_id_tipo_pagamento = document.querySelector('#id_tipo_de_pagamento');
    let input_retirada_na_loja = document.querySelector('#retirar_na_loja');
    let input_anotacoes = document.querySelector('#anotacoes');
    

//(ecobag_adicional, id_tipo_de_pagamento, retirar_na_loja, anotacoes, id_compras, status = 1)

    let pedido = new PedidoModel(input_ecobag.value, input_id_tipo_pagamento.value, input_retirada_na_loja.value, input_anotacoes.textContent);
    
    return pedido;
    
  }
  
  salvarPedido(pedido) {
    
    fetch(`/salvar-pedido`, {
      headers: { "Content-Type": "application/json" },
      method: 'POST',
      body: JSON.stringify(pedido)
    }).then(response => response.json())
    .then(json => {
      if (json.serverStatus == 2) {
        let pedido = json.insertId;
        if (pedido != undefined) {
          localStorage.clear();
          
          swal(`Recebemos com sucesso seu pedido, anota ai 000${pedido}`)
          .then((value) => {
            window.location.href = '/';
          });
        }
      } else {
        swal("Oops!", `Ocorreu um erro ao iniciar a compra`, "error");
        reject('Ocorreu um erro ao iniciar a compra');
      }
    });
  }
}

