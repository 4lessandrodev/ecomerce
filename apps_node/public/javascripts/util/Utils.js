
class Utils {
  static exibirFormulario(element, classe, reset = false) {
    let item = document.querySelector(element);
    item.classList.remove(classe);
    if (reset) {
      item.querySelector('form').reset();
      if (item.querySelector('img') != null) {
        item.querySelector('img').src = './../images/images/SemImagem-300x300px.png';
      }
    }
  }
  static ocultarFormulario(element, classe, reset = false) {
    let item = document.querySelector(element);
    item.classList.add(classe);
    if (reset) {
      item.querySelector('form').reset();
      if (item.querySelector('img') != null) {
        item.querySelector('img').src = './../images/images/SemImagem-300x300px.png';
      }
    }
  }
  static alterarBooleanPorStatusString(numero) {
    if (numero == 1 || numero == true) {
      return 'Ativo';
    } else {
      return 'Bloqueado';
    }
  }

  static uploadImg() {
    document.querySelector("input[type='file']").click();
  }

  static getItemById(el, id = null) {
    // el.getItemById(id);
    let code = el.querySelector('.item-id').value;
    async function get() {
      location.href = `/cestas/${code}`;
      let promise = await fetch(`/cestas/${code}`);
      if (!promise.ok) {
        throw new Error('Erro');
      }
    }
    get();
  }


  static getProdutoById(el, id = null) {
    // el.getItemById(id);
    let code = el.querySelector('.item-id').value;
    async function getItem() {
      location.href = `/produtos/${code}`;
      let promise = await fetch(`/cestas/${code}`);
      if (!promise.ok) {
        throw new Error('Erro');
      }
    }
    getItem();
  }

  static atualizarQtdItensNoCarrinho() {
    let qtdItensNoCarrinho = document.querySelector('#cart-value');
    if (localStorage.getItem('itensDoCarrinho') != null) {
      let itens = JSON.parse(localStorage.getItem('itensDoCarrinho'));
      qtdItensNoCarrinho.textContent = itens.length;
      qtdItensNoCarrinho.classList.remove('hidden');
    } else {
      qtdItensNoCarrinho.classList.add('hidden');
    }
  }

  static buscarCep(cep) {
    return fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Erro ao buscar cep');
        }
        return res;
      })
      .then(res => {
        let json = res.json();
        return json;
      });
  }

  static retornarEndereco() {
    let cep = document.querySelector('input[name=zipCode]');
    cep = cep.value;
    cep = cep.replace('-', '');
    if (cep.length == 8 && !isNaN(cep)) {
      this.buscarCep(cep)
        .then(res => {
          let inputs = document.querySelectorAll('input');
          for (let input of inputs) {
            switch (input.name) {
              case 'ibgeCode':
                input.value = res.ibge;
                break;
              case 'street':
                input.value = res.logradouro;
                break;
              case 'province':
                input.value = res.uf;
                break;
              case 'zone':
                input.value = res.bairro;
                break;
              case 'city':
                input.value = res.localidade;
                break;
              default:
                break;
            }
          }
        });
    }
  }
}
