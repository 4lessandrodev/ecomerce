const Produto = require('./../models/ProdutoModel');
const Categoria = require('./../models/CategoriaProdutoModel');
const UndMedida = require('./../models/UnidadeMedidaModel');

//--------------------------------------------------------------------------------
const renderizar = (req, res, next, produtos, categorias, unidade) => {
  res.render('admin/produtos', {
    produtos,
    data: '',
    navbar: true,
    pagina: 'Produtos',
    btnLabel: 'Novo Produto',
    categorias,
    unidade,
    fornecedor: [],
    local: 'http://localhost:3000',

    btn: {
      label: 'Voltar',
      classe: 'display-none',
      classe2: '',
      caminho: '/admin'
    }
  });
};
//--------------------------------------------------------------------------------
const renderizarEdicao = (req, res, next, produto, categorias, unidade) => {
  res.render('admin/editar-produto', {
    produto,
    data: '',
    navbar: true,
    pagina: 'Editar Produto',
    btnLabel: 'Novo Produto',
    categorias,
    unidade,
    fornecedor: [],
    local: 'http://localhost:3000',

    btn: {
      label: 'Voltar',
      classe: '',
      classe2: 'display-none',
      caminho: '/admin/produto'
    }
  });
};
//-----------------------------------------------------------------------------------
const salvarProduto = (req, res, next) => {
  let produto = new Produto(
    req.body.descricao, req.body.id_categoria_produto, req.body.preco_venda, req.body.id_unidade_medida, req.body.info_nutricional,
    req.body.imagem, req.body.status, req.body.produto_especial, req.body.fator_multiplicador
  );
  produto.salvarProduto(produto).then(produto => {
    res.redirect('produto');
  }).catch(err => {
    res.send(err.message);
  });
};
//-----------------------------------------------------------------------------------
const editarProduto = (req, res, next) => {
  let categoria = new Categoria();
  let unidade = new UndMedida();
  let produto = new Produto(
    req.body.descricao, req.body.id_categoria_produto, req.body.preco_venda, req.body.id_unidade_medida, req.body.info_nutricional,
    req.body.imagem, req.body.status, req.body.produto_especial, req.body.fator_multiplicador
  );
  produto.id = req.body.id;
  console.log(produto.id);
  produto.atualizarProduto(produto).then(result => {
    produto.listarTodosProdutos(produto).then(produtos => {
      categoria.listarCategoriasAtivas(categoria).then(categorias => {
        unidade.listarUnidadesMedidaAtivas(unidade).then(unidades => {
          renderizar(req, res, next, produtos, categorias, unidades);
        });
      });
    }).catch(err => {
      res.send(err.message);
    });
  }).catch(err => {
    res.send(err.message);
  });
};
//-----------------------------------------------------------------------------------
const listarProdutoEspeciaisAtivos = (req, res, next) => {
  let produto = new Produto();
  produto.produto_especial = 1;
  produto.listarProdutosEspeciaisAtivos(produto).then(produto => {
    res.send(produto);
  }).catch(err => {
    res.send(err.message);
  });
};
//-----------------------------------------------------------------------------------
const listarTodosProdutos = (req, res, next) => {
  let produto = new Produto();
  let categoria = new Categoria();
  let unidade = new UndMedida();
  produto.listarTodosProdutos(produto).then(produtos => {
    categoria.listarCategoriasAtivas(categoria).then(categorias => {
      unidade.listarUnidadesMedidaAtivas(unidade).then(unidades => {
        renderizar(req, res, next, produtos, categorias, unidades);
      });
    });
  }).catch(err => {
    res.send(err.message);
  });
};
//-----------------------------------------------------------------------------------
const exibirProdutoSelecionado = (req, res, next) => {
  let produto = new Produto();
  produto.id = req.params.id;
  let categoria = new Categoria();
  let unidade = new UndMedida();
  produto.listarProdutoSelecionado(produto).then(produto => {
    categoria.listarCategoriasAtivas(categoria).then(categorias => {
      unidade.listarUnidadesMedidaAtivas(unidade).then(unidades => {
        renderizarEdicao(req, res, next, produto[0], categorias, unidades);
        //res.send(produto);
      });
    });
  }).catch(err => {
    res.send(err.message);
  });
};
//-----------------------------------------------------------------------------------
const desativarProduto = (req, res, next) => {
  let produto = new Produto();
  produto.id = req.body.id;
  produto.produto_excluido = 1;
  produto.desabilitarProduto(produto).then(produto => {
    res.send(produto);
  }).catch(err => {
    res.send(err.message);
  });
};

module.exports = { salvarProduto, editarProduto, listarProdutoEspeciaisAtivos, desativarProduto, listarTodosProdutos, exibirProdutoSelecionado };