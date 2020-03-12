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

  static retornarEndereco(input) {
    input.value = input.value.replace('-', '');
    let cep = input.value;
    if (cep.length == 8 && !isNaN(cep)) {
      this.buscarCep(cep)
        .then(res => {
          let inputs = document.querySelectorAll('input');
          for (let input of inputs) {
            switch (input.name) {
              case 'codigo_ibge':
                (res.ibge != undefined) ? input.value = res.ibge : '';
                break;
              case 'endereco':
                (res.logradouro != undefined) ? input.value = res.logradouro : '';
                break;
              case 'estado':
                (res.uf != undefined) ? input.value = res.uf : '';
                break;

              case 'bairro':
                (res.bairro != undefined) ? input.value = res.bairro : '';
                break;
              case 'cidade':
                (res.localidade != undefined) ? input.value = res.localidade : '';
                break;
              default:
                break;
            }
          }
        });
    }
  }


  //ADICIONAR PRODUTO NA CESTA 
  static adicionarProdutoNaCesta(produto) {
    let id_cesta = parseInt(document.querySelector('#id').value);
    let id_produto = parseInt(produto.querySelector('input[type=hidden]').value);
    let descricao = produto.textContent;
    return fetch(`/admin/produto-para-cesta/${id_produto}/${id_cesta}`, {
      method: 'POST'
    }).then(res => {
      if (!res.ok) {
        swal("Oops!", "Algo errado ocorreu!", "error");
        throw new Error('Erro ao salvar o produto na cesta arquivo Utils');
      }
      return res;
    }).then(res => {

      //Adicionar elemento no html 
      var select = document.querySelector('#produtos').innerHTML;
      var option = `<option value="${id_produto}">${descricao}</option>`;
      select = select + option;
      select = document.querySelector('#produtos').innerHTML = select;
      swal("Boa!", "Produto adicionado com sucesso!", "success");
      let json = res.json();
      return json;
    });
  }



  static excluirProdutoDaCesta() {
    let id_produto = null;
    let produtoEl;
    let produtos = document.querySelector('#produtos');
    for (let produto of produtos) {
      if (produto.selected) {
        id_produto = produto.value;
        produtoEl = produto;
      }
    }
    if (id_produto == null || id_produto == '' || id_produto == undefined) {
      swal("Oops!", "Você esqueceu de selecionar o produto", "info");
      return false;
    }
    let id_cesta = parseInt(document.querySelector('#id').value);
    return fetch(`/admin/produto-para-cesta/${id_produto}/${id_cesta}`, {
      method: 'DELETE'
    }).then(res => {
      if (!res.ok) {
        swal("Oops!", "Algo errado ocorreu!", "error");
        throw new Error('Erro ao excluir o produto na cesta arquivo Utils');
      }
      return res;
    }).then(res => {
      produtoEl.remove();
      swal("Boa!", "Produto removido com sucesso!", "success");
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



  static obterIdUsuario(email, senha) {
    let inputId = document.getElementById("id_usuario");
    let usuario = { email, senha };

    fetch(`/register-user`, {
      headers: { "Content-Type": "application/json" },
      method: 'POST',
      body: JSON.stringify(usuario)

    }).then(response => response.json())
      .then(json => {
        if (json.serverStatus == 2) {
          inputId.value = json.insertId;
          dados.classList.remove('hidden');
          login.classList.add('hidden');
          btnNext.style.display = 'none';
          document.querySelector('input[name=nome]').focus();
        } else {
          swal("Oops!", `Ocorreu um erro ao cadastrar o usuário`, "error");
        }
      });
  }
}


