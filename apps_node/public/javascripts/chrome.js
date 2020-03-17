
let PRODUTOS_DA_CESTA = document.querySelectorAll('#produtos-cesta tr');
let PRODUTOS_ADICIONAIS = document.querySelectorAll('#produtos-adicionais tr');
let quantidade_retirada = 0;
let fator_multiplicador_saldo = 0;
const BTNS_EXCLUIR = document.querySelectorAll('#produtos-cesta .opcoes');
const BTNS_ADICIONAR = document.querySelectorAll('#produtos-adicionais .opcoes');
const QUANTIDADE_ALTERACOES_PERMITIDAS = JSON.parse(document.querySelector('.modal').dataset.limite);
const qtd_produtos_cesta = PRODUTOS_DA_CESTA.length;
const CATEGORIA_DESCRICAO = document.querySelector('#div-cesta-selecionada #categoria').dataset.categoria.toUpperCase().trim();
let qtd_alteracoes_realizadas = 0;


const retirarItem = (el) => {
  if (fator_multiplicador_saldo > 0 && CATEGORIA_DESCRICAO == 'PERSONALIZADA') {
    //Regras para cestas personalizadas 
    let El = el.parentNode;
    fator_multiplicador_saldo += parseInt(El.dataset.fator);
    qtd_alteracoes_realizadas++;
    //el.remove();
  } else if (fator_multiplicador_saldo > 0 && CATEGORIA_DESCRICAO != 'PERSONALIZADA') {
    //Regra para cestas normais
    let El = el.parentNode;
    fator_multiplicador_saldo += parseInt(El.dataset.fator);
    qtd_alteracoes_realizadas++;
  }else {
    //Voce atingiu o limite de alterações para esta cesta
    notificarLimiteDeAlt();
  }
};

const notificarLimiteDeAlt = (e) => {
  swal('Oops!', 'Você atingiu o limite de alteraçõe para esta cesta', 'info');
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