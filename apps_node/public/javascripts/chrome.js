const LOGADO = document.getElementById('login').dataset.login;
const PRODUTOS_ADICIONAIS = document.querySelectorAll('#produtos-adicionais tr');
const BTN_CLOSE_MODAL = document.querySelector('#close-modal');
let BTNS_EXCLUIR = document.querySelectorAll('#produtos-cesta .opcoes');
const BTNS_ADICIONAR = document.querySelectorAll('#produtos-adicionais .opcoes');
const QUANTIDADE_ALTERACOES_PERMITIDAS = JSON.parse(document.querySelector('.modal').dataset.limite);
const CATEGORIA_DESCRICAO = document.querySelector('#div-cesta-selecionada #categoria').dataset.categoria.toUpperCase().trim();
const BTN_ADD = document.querySelector('#adicionar-produto');
let PRODUTOS_DA_CESTA = document.querySelectorAll('#produtos-cesta tr');
const TABELA_PRODUTOS_DA_CESTA = document.querySelector('#tabela-produtos-da-cesta');
let TBODY_PRODUTOS_DA_CESTA = document.querySelector('#produtos-cesta');
const qtd_produtos_cesta = PRODUTOS_DA_CESTA.length;
let quantidade_retirada = 0;
let fator_multiplicador_saldo = 0;

let TABELA_PRODUTOS_ADICIONAIS_GERAL = document.querySelector('#produtos-adicionais');
let TABELA_PRODUTOS_ADICIONAIS_PERSONALIZADO = document.querySelector('#produtos-adicionais-personalizado');
let qtd_produtos_inseridos = 0;
let qtd_produtos_retirados = 0;



const retirarItem = (El) => {
  if (LOGADO == 'false') {
    swal('Oops!', 'Você precisa fazer login', 'info');
    return false;
  }

  if (qtd_produtos_retirados < QUANTIDADE_ALTERACOES_PERMITIDAS && CATEGORIA_DESCRICAO == 'PERSONALIZADA') {
    ativarBotaoAdicionarItem();
    removerElemento(El);
    //desabilitarBtnsExcluir();
    listarProdutosGeral();
    qtd_produtos_retirados++;
  } else if (qtd_produtos_retirados < QUANTIDADE_ALTERACOES_PERMITIDAS && CATEGORIA_DESCRICAO != 'PERSONALIZADA') {
    ativarBotaoAdicionarItem();
    removerElemento(El);
    //desabilitarBtnsExcluir();
    qtd_produtos_retirados++;
    listarProdutosDeAcordoComFatorMultiplicador(El);  
  }else {
    notificarLimiteDeAlt();
    //desabilitarBtnsExcluir();
    //desativarBotaoAdicionarItem();
  }
};



//ALERTAS 
//------------------------------------------------------
const notificarLimiteDeAlt = (e) => {
  swal('Oops!', 'Você atingiu o limite de alterações para esta cesta', 'info');
};
const itemAdicionado = () => {
  swal({
    buttons: false,
    timer: 1500,
    title: "Feito!",
    text: "O item foi adicionado a sua cesta",
    icon: "success",
  });
};


const itemRemovido = () => {
  swal("Item removido!", {
    buttons: false,
    timer: 1500,
    title: "Feito!",
    text: "O item foi removido de sua cesta",
    icon: "success",
  });
};

//-------------------------------------------------------
// BTN EXCLUIR DA TABELA DE PRODUTOS DA CESTA 
const desabilitarBtnsExcluir = (e) => {
  for (let btn of BTNS_EXCLUIR) {
    btn.hidden = true;
  }
};


// BTN EXCLUIR DA TABELA DE PRODUTOS DA CESTA 
const habilitarBtnsExcluir = (e) => {
  BTNS_EXCLUIR = document.querySelectorAll('#produtos-cesta .opcoes');
  for (let btn of BTNS_EXCLUIR) {
    btn.hidden = false;
  }
};


TABELA_PRODUTOS_DA_CESTA.addEventListener('click', function(e){
  if (e.target.parentElement.parentNode.tagName == 'TR') {
    retirarItem(e.target.parentElement.parentNode);
  }
  e.stopPropagation();
});


//Adicionar produto cesta comun 
TABELA_PRODUTOS_ADICIONAIS_PERSONALIZADO.addEventListener('click', function remover(e) {
  if (e.target.parentElement.parentNode.tagName == 'TR') {
    if (qtd_produtos_inseridos < QUANTIDADE_ALTERACOES_PERMITIDAS && CATEGORIA_DESCRICAO != 'PERSONALIZADA') {
      if (qtd_produtos_retirados > qtd_produtos_inseridos){
        adicionarItemAosProdutosDaCesta(e.target.parentElement.parentNode);
        //BTN_CLOSE_MODAL.click();
        itemAdicionado();
        qtd_produtos_inseridos++;
        fator_multiplicador_saldo = parseFloat(e.target.parentElement.parentNode.dataset.fator) - fator_multiplicador_saldo;
      } else {
        notificarLimiteDeAlt();
      }
    } else {
      notificarLimiteDeAlt();
    }
  }
});


//Adicionar produto cesta personalizada
TABELA_PRODUTOS_ADICIONAIS_GERAL.addEventListener('click', function adicionar(e) {
  if (e.target.parentElement.parentNode.tagName == 'TR') {
    if (qtd_produtos_inseridos < QUANTIDADE_ALTERACOES_PERMITIDAS && CATEGORIA_DESCRICAO == 'PERSONALIZADA') {
     // if (qtd_produtos_retirados > qtd_produtos_inseridos) {
        adicionarItemAosProdutosDaCesta(e.target.parentElement.parentNode);
        //BTN_CLOSE_MODAL.click();
        itemAdicionado();
        qtd_produtos_inseridos++;
        fator_multiplicador_saldo = parseFloat(e.target.parentElement.parentNode.dataset.fator) - fator_multiplicador_saldo;
     // } else {
     //   notificarLimiteDeAlt();
     // }
    } else {
      notificarLimiteDeAlt();
    }
  }
});

//-------------------------------------------

const removerElemento = (El) => {
  El.remove();
  itemRemovido();
};


const ativarBotaoAdicionarItem = (e) => {
  BTN_ADD.style.backgroundColor = 'green';
  BTN_ADD.style.color = 'white';
  BTN_ADD.disabled = false;
};

const desativarBotaoAdicionarItem = (e) => {
  BTN_ADD.style.backgroundColor = 'white';
  BTN_ADD.style.color = 'green';
  BTN_ADD.disabled = true;
};


//LISTAS DE PRODUTOS ADICIONAIS E GERAL 
//-------------------------------------------------------------
const ocultarListaPersonalizadaDeProdutos = () => {
  TABELA_PRODUTOS_ADICIONAIS_PERSONALIZADO.style.display = 'none';
};
const exibirListaPersonalizadaDeProdutos = () => {
  TABELA_PRODUTOS_ADICIONAIS_PERSONALIZADO.style.display = '';
};

const ocultarListaGeral = () => {
  TABELA_PRODUTOS_ADICIONAIS_GERAL.style.display = 'none';
};
const exibirListaGeral = () => {
  TABELA_PRODUTOS_ADICIONAIS_GERAL.style.display = '';
};

listarProdutosDeAcordoComFatorMultiplicador = (El) => {
  let fator = El.dataset.fator;
  for (let item of PRODUTOS_ADICIONAIS) {
    if (parseFloat(fator_multiplicador_saldo) <= parseFloat(fator)) {
      TABELA_PRODUTOS_ADICIONAIS_PERSONALIZADO.append(item);
    }
  }
  ocultarListaGeral();
};


listarProdutosGeral = () => {
  exibirListaGeral();
  ocultarListaPersonalizadaDeProdutos();
};

//-------------------------------------------------------------

const adicionarItemAosProdutosDaCesta = (item) => {
  TBODY_PRODUTOS_DA_CESTA.innerHTML = TBODY_PRODUTOS_DA_CESTA.innerHTML + item.innerHTML;
  TBODY_PRODUTOS_DA_CESTA = document.querySelector('#produtos-cesta');
  removerEventoAddDaTR();
  habilitarBtnsExcluir();
  desativarBotaoAdicionarItem();
};

//-------------------------------------------------------------
//Remover item da cesta
const removerEventoAddDaTR = (e) => {
  let TR = document.querySelectorAll('#produtos-cesta tr');
  TR[TR.length - 1].cells[5].addEventListener('click', function(){
    swal('Oops!', 'Este item não pode ser alterado', 'info');
  });
};

//DESABILITAR BOTAO ADD ITENS SE FOR DIFERENTE DE PERSONALIZADA
if (CATEGORIA_DESCRICAO != 'PERSONALIZADA') {
  desativarBotaoAdicionarItem();
} else {
  ativarBotaoAdicionarItem();
}









