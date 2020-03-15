const ProdutoCompra = require('./../models/ProdutoCompraModel');


//------------------------------------------------------------------
const salvarProdutoCompra = (req, res, next) => {
  let produtoCompra = new ProdutoCompra(req.body.id_produto, req.body.id_compra);
  produtoCompra.salvarProdutoCompra(produtoCompra).then(produtoCompra => {
    res.send(produtoCompra);
  }).catch(err => {
    console.log(err.message);
    res.send(err.message);
  });
};
//------------------------------------------------------------------
const editarProdutoCompra = (req, res, next) => {
  let produtoCompra = new ProdutoCompra(req.body.id_produto, req.body.id_compra);
  produtoCompra.id = req.body.id;
  produtoCompra.atualizarProdutoCompra(produtoCompra).then(produtoCompra => {
    res.send(produtoCompra);
  }).catch(err => {
    console.log(err.message);
    res.send(err.message);
  });
};
//------------------------------------------------------------------
const excluirProdutoCompra = (req, res, next) => {
  let produtoCompra = new ProdutoCompra();
  produtoCompra.id = req.body.id;
  produtoCompra.excluirProdutoCompra(produtoCompra).then(produtoCompra => {
    res.send(produtoCompra);
  }).catch(err => {
    console.log(err.message);
    res.send(err.message);
  });
};
//------------------------------------------------------------------
const listarProdutoCompra = (req, res, next) => {
  let produtoCompra = new ProdutoCompra();
  produtoCompra.listarProdutoCompra(produtoCompra).then(produtoCompra => {
    res.send(produtoCompra);
  }).catch(err => {
    console.log(err.message);
    res.send(err.message);
  });
};
//------------------------------------------------------------------
//LISTAR OS PRODUTOS QUE O USUARIO ADICIONOU AO CARRINHO -> A ROTA GET RECEBE O ID DA COMPRA ARMAZENADA NO LOCAL STORAGE
//TAMBEM CAPTURA O ID DO USUÁRIO LOGADO NA SESSÃO
const listarProdutosDoCarrinho = (req, res, next) => {
  let produtoCompra = new ProdutoCompra();
  produtoCompra.id_compra = req.params.id;
  let id_usuario = req.session.user.id;
  produtoCompra.listarProdutosDoCarrinho(produtoCompra, id_usuario).then(produtos => {
    return produtos;
  }).catch(err => {
    console.log(err.message);
    res.send(err.message);
  });
};


module.exports = {
  salvarProdutoCompra,
  editarProdutoCompra,
  excluirProdutoCompra,
  listarProdutoCompra,
  listarProdutosDoCarrinho
};