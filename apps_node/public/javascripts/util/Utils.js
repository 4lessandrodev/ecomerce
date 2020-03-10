class Utils {
  static exibirFormulario(element, classe, reset = false, editar = false) {
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

  static uploadImg(form) {
    form.querySelector("input[type='file']").click();
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
              case 'codigo_ibge':
                input.value = res.ibge;
                break;
              case 'endereco':
                input.value = res.logradouro;
                break;
              case 'province':
                input.value = res.uf;
                break;
              case 'bairro':
                input.value = res.bairro;
                break;
              case 'cidade':
                input.value = res.localidade;
                break;
              default:
                break;
            }
          }
        });
    }
  }


  static adicionarProdutoNaCesta(produto) {
    let id_cesta = parseInt(document.querySelector('#form-edit #id').value);
    let id_produto = parseInt(produto.querySelector('input[type=hidden]').value);
    return fetch(`/admin/produto-para-cesta/${id_produto}/${id_cesta}`, {
      method: 'POST'
    }).then(res => {
      if (!res.ok) {
        swal("Oops!", "Algo errado ocorreu!", "error");
        throw new Error('Erro ao salvar o produto na cesta arquivo Utils');
      }
      return res;
    }).then(res => {
      swal("Boa!", "Produto adicionado com sucesso!", "success");
      let json = res.json();
      return json;
    });
  }



  static excluirProdutoDaCesta(produto) {
    let id_cesta = parseInt(document.querySelector('#form-edit #id').value);
    let id_produto = parseInt(produto.querySelector('input[type=hidden]').value);
    return fetch(`/admin/produto-para-cesta/${id_produto}/${id_cesta}`, {
      method: 'DELETE'
    }).then(res => {
      if (!res.ok) {
        swal("Oops!", "Algo errado ocorreu!", "error");
        throw new Error('Erro ao excluir o produto na cesta arquivo Utils');
      }
      return res;
    }).then(res => {
      swal("Boa!", "Produto adicionado com sucesso!", "success");
      let json = res.json();
      return json;
    });
  }


  static leitorDeImagem(inputFile, img, callback) {
    document.querySelector(inputFile).addEventListener('change', e => {
      callback(e.target.files[0]).then(result => {
        document.querySelector(img).src = result;
        document.querySelector('input[name=imagem]').value = result;
      });
    });
  }

  static atribuirImagem(file) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.onerror = function () {
        reject('Não foi possível ler a imagem');
      };
      reader.readAsDataURL(file);
    });
  }

}


