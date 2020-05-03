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
    let trs = ``;
    let contador = 0;
    
    for (let produto of produtos_carrinho) {
      if (contador == 0) {
        trs += `
        <tr>
        <th style="border:1px solid black; padding:5px">${produto.cells[1].textContent}</th>
        <th style="border:1px solid black; padding:5px">${produto.cells[2].textContent}</th> 
        <th style="border:1px solid black; padding:5px">${produto.cells[3].textContent}</th>
        <th style="border:1px solid black; padding:5px">${produto.cells[4].textContent}</th>
        </tr>`;
      } else {
        trs += `<tr>
        <td style="border:1px solid black; padding:5px">${produto.cells[1].textContent}</td>
        <td style="border:1px solid black; padding:5px"> 0${produto.cells[2].textContent}</td>
        <td style="border:1px solid black; padding:5px">${produto.cells[3].textContent}</td>
        <td style="border:1px solid black; padding:5px">R$ ${produto.cells[4].textContent}</td>
        </tr>`;
      }
      contador++;
    }
    
    let email = `
    <h1>${saudacao}</h1>
    <h2 style="padding:0px; margin:1px; color:#245725">Recebemos seu pedido</h2>
    <h3 style="padding:0px; margin:1px; color:#245725">Veja os detalhes</h3>
    <br>
    <table>
    ${trs}
    </table>
    <br>
    <h3 style="padding:0px; margin:1px; color:#245725">Ecobag retornável</h3>
    <p style="line-height:1; margin-top:0; padding-top:0">${ecobag}</p>
    <h3 style="padding:0px; margin:1px; color:#245725">Frete</h3>
    <p style="line-height:1; margin-top:0; padding-top:0">R$ ${frete}</p>
    <h3 style="padding:0px; margin:1px; color:#245725">Total</h3>
    <p style="line-height:1; margin-top:0; padding-top:0">R$ ${total}</p>
    <h3 style="padding:0px; margin:1px; color:#245725">Forma de pagamento</h3>
    <p style="line-height:1; margin-top:0; padding-top:0">${forma_pagamento}</p>
    <h3 style="padding:0px; margin:1px; color:#245725">Endereço de entrega</h3>
    <p style="line-height:1; margin-top:0; padding-top:0">${endereco_de_entrega}</p>
    <p style="padding-bottom:1px; margin-bottom:1px">Em caso de dúvidas entre em contato conosco</p>
    <a href="mailto:contato@fazendautopia.com.br" style="padding-bottom:1px; margin-bottom:1px">contato@fazendautopia.com.br</a><br>
    <a href="tel:021999018668" style="padding-bottom:1px; margin-bottom:1px">(21) 9.9901-8668</a>
    
    <p>Atenciosamente:<br>Equipe Fazendautopia</p>
    `;
    
    return email;
  }
  novoPedido() {
    
    let input_ecobag = document.querySelector('#ecobag_adicional');
    let input_id_tipo_pagamento = document.querySelector('#id_tipo_de_pagamento');
    let input_retirada_na_loja = document.querySelector('#retirar_na_loja');
    let input_anotacoes = document.querySelector('#anotacoes');
    let input_total = document.querySelector('#total');
    
    
    //(ecobag_adicional, id_tipo_de_pagamento, retirar_na_loja, anotacoes, id_compras, status = 1)
    let pedido = new PedidoModel(input_total.value, input_ecobag.checked, input_id_tipo_pagamento.value, input_retirada_na_loja.value, input_anotacoes.value);
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
              text: `Recebemos com sucesso seu pedido`,
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

