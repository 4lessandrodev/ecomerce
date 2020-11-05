let retirar = document.querySelector('#retirar_na_loja');
let input_endereco_cliente = document.querySelector('#endereco_cliente');
let input_frete = document.querySelector('#frete');
let input_total = document.querySelector('#total');
let check_ecobag = document.querySelector('#ecobag_adicional');
const ENDERECO_CLIENTE = input_endereco_cliente.textContent;
const ENDERECOS = JSON.parse(retirar.dataset.enderecos);
const FRETE = input_frete.dataset.frete;
const TOTAL = input_total.dataset.total;


const endereco = (e) => {
  let id = retirar.value;
  if (id == 0) {
    input_endereco_cliente.textContent = ENDERECO_CLIENTE;
    input_frete.value = FRETE;
    input_total.value = TOTAL;
  } else {
    id = id - 1;
    input_endereco_cliente.textContent = `${ENDERECOS[id].endereco}, ${ENDERECOS[id].bairro}, ${ENDERECOS[id].cidade}-${ENDERECOS[id].estado}`;
    input_frete.value = '0.00';
    let valor = parseFloat(TOTAL) - parseFloat(FRETE);
    input_total.value = valor.toFixed(2);
  }
};

//6.00 É O VALOR UNITÁRIO DE UMA ECOBAG ADICIONAL 
const ecobag = (e) => {
  if (check_ecobag.checked) {
    input_total.value = TOTAL;
  } else {
    let valor = (TOTAL - 6);
    input_total.value = valor.toFixed(2);
  }
};