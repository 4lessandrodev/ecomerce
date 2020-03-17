let PRODUTOS_DA_CESTA = document.querySelectorAll('#produtos-cesta tr');
let PRODUTOS_ADICIONAIS = document.querySelectorAll('#produtos-adicionais tr');
let quantidade_retirada = 0;
let fator_multiplicador_saldo = 0;
const BTNS_EXCLUIR = document.querySelectorAll('#produtos-cesta .opcoes');
const BTNS_ADICIONAR = document.querySelectorAll('#produtos-adicionais .opcoes');
const QUANTIDADE_ALTERACOES_PERMITIDAS = JSON.parse(document.querySelector('.modal').dataset.limite);
const qtd_produtos_cesta = PRODUTOS_DA_CESTA.length;
let qtd_alteracoes_realizadas = 0;


const retirarItem = (el) => {
  let El = el.parentNode;
  fator_multiplicador_saldo += parseInt(El.dataset.fator);
  qtd_alteracoes_realizadas++;
  console.log(El.dataset.fator);
  console.log(fator_multiplicador_saldo);
  console.log(qtd_alteracoes_realizadas);
  //el.remove();
};


const adicionarItem = (el) => {
  let El = el.target();
  fator_multiplicador_saldo = El.dataset.fator - fator_multiplicador_saldo;
  el.remove();
};


const desabilitarBtnsExcluir = (e) => {
  BTNS_EXCLUIR.forEach(function(btn) {
    btn.disabled = true;
  });
};





const ativarBotaoAdicionarItem = (e) => {
  document.querySelector('#adicionar-produto').style.backgroundColor = 'green';
  document.querySelector('#adicionar-produto').style.color = 'white';
  document.querySelector('#adicionar-produto').disabled = false;
};

const desativarBotaoAdicionarItem = (e) => {
  document.querySelector('#adicionar-produto').style.backgroundColor = 'white';
  document.querySelector('#adicionar-produto').style.color = '#f2f2f2';
  document.querySelector('#adicionar-produto').disabled = true;
};