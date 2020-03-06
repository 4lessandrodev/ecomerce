import { CarrinhoModel } from './../Model/CarrinhoModel.js';

//let qtdItensNoCarrinho = document.querySelector('#cart-value');
let btnSubmit = document.querySelector('button[type=submit]');

function addToCart() {
  let itens = document.querySelectorAll('input[type=hidden], .item');
  let arrayItensCode = [];
  let itensDescription = [];

  let item = new CarrinhoModel();

  for (let _input of itens) {
    //console.log('Campo: ' + _input.name + ' Valor: ' + _input.value);
    switch (_input.name) {
      case 'mainCode':
        item.mainCode = _input.value;
        break;
      case 'mainDescription':
        item.mainDescription = _input.value;
        break;
      case 'itensDecription':
        itensDescription.push(_input.value);
        break;
      case 'priceTotal':
        item.priceTotal = _input.value;
        break;
      case 'arrayItensCode':
        arrayItensCode.push(_input.value);
        break;
      case 'mainImage':
        item.image = _input.value;
        break;
      default:
        break;
    }

  }
  item.itensDescription = itensDescription;
  item.arrayItensCode = arrayItensCode;
  console.log(item);
  adicionarItemEmLocalStorage(item);
}

btnSubmit.addEventListener('click', addToCart);

function atualizarQtdItensNoCarrinho() {
  //FOI UTILIZADO O ATUALIZAR NA PAGINA DA CLASSE UTILS
  /*   let itens = obterItensDoCarrinho();
    qtdItensNoCarrinho.textContent = itens.length;
    qtdItensNoCarrinho.classList.remove('hidden'); */
}


function obterItensDoCarrinho() {
  let itens = [];
  if (localStorage.getItem('itensDoCarrinho') != null) {
    itens = localStorage.getItem('itensDoCarrinho');
    itens = JSON.parse(itens);
  }
  return itens;
}


function adicionarItemEmLocalStorage(item) {
  //AQUI ADICIONAVA O ITEM EM UM ARRAY - MAS DEU PROBLEMA AO SALVAR
  //let itens = obterItensDoCarrinho();
  //itens.push(item);
  let itens = [];
  itens.push(item);

  localStorage.setItem('itensDoCarrinho', JSON.stringify(itens));
  //atualizarQtdItensNoCarrinho();
  location.href = '/';
}

