import { PedidoModel } from './../Model/PedidoModel.js';
export class PedidoController {
  constructor (model, view) {
    this.model = model;
    this.view = view;
  }
  criarEmail() {
    
    let saudacao = document.querySelector('#nav-lateral h2').textContent;
    let endereco_de_entrega = document.querySelector('#endereco_cliente').value;
    let frete = document.querySelector('#frete').value;
    let total = document.querySelector('#total').value;
    let forma_pagamento = document.querySelector('#id_tipo_de_pagamento').selectedOptions[0].innerText;
    let produtos_carrinho = document.querySelectorAll('table tr');
    let ecobag = document.querySelector('#ecobag_adicional').checked;
    ecobag = (ecobag) ? 'R$ 6.00' : 'R$ 0.00';
    let lis = ``;
    
    for (let produto of produtos_carrinho) {
      lis += `<li>${produto.cells[1].textContent} - ${produto.cells[2].textContent} - ${produto.cells[3].textContent} - R$ ${produto.cells[4].textContent}</li>`;
    }
    
    let email = `
    <h1>${saudacao}</h1>
    <h2>Recebemos seu pedido</h2>
    <h2>Veja os detalhes</h2>
    <ul>
    ${lis}
    </ul>
    <h3>Ecobag retornável</h3>
    <p>${ecobag}</p>
    <h3>Frete</h3>
    <p>R$ ${frete}</p>
    <h3>Total</h3>
    <p>R$ ${total}</p>
    <h3>Forma de pagamento</h3>
    <p>${forma_pagamento}</p>
    <h3>Endereço de entrega</h3>
    <p>${endereco_de_entrega}</p>
    `;
    
    return email;
  }
  novoPedido() {
    
    let input_ecobag = document.querySelector('#ecobag_adicional');
    let input_id_tipo_pagamento = document.querySelector('#id_tipo_de_pagamento');
    let input_retirada_na_loja = document.querySelector('#retirar_na_loja');
    let input_anotacoes = document.querySelector('#anotacoes');
    
    
    //(ecobag_adicional, id_tipo_de_pagamento, retirar_na_loja, anotacoes, id_compras, status = 1)
    
    let pedido = new PedidoModel(input_ecobag.value, input_id_tipo_pagamento.value, input_retirada_na_loja.value, input_anotacoes.value);
    pedido.email = this.criarEmail();
    return pedido;
    
  }
  
  salvarPedido(pedido) {

    let total = document.querySelector('#total').value;
    total = parseFloat(total);
    if (total > 50) {
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
          
              swal({
                title: "Muito Obrigado",
                text: `Recebemos com sucesso seu pedido: 000${pedido}`,
                icon: "success",
                buttons: true,
                dangerMode: false
              }).then(() => {
                window.location.href = '/';
              });
          
            }
          } else {
            swal("Oops!", `Ocorreu um erro ao iniciar a compra`, "error");
            reject('Ocorreu um erro ao iniciar a compra');
          }
        });
    } else {
      swal("Oops!", `O valor total do pedido deve ser no mínimo R$ 50.00`, "info");
    }
  }
}

