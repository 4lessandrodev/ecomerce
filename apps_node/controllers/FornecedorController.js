const Fornecedor = require('./../models/FornecedorModel');

//--------------------------------------------------------------------------------
const renderizar = (req, res, next, fornecedores) => {
  res.render('admin/fornecedores', {
    fornecedores,
    data: '',
    navbar: true,
    pagina: 'Fornecedores',
    btnLabel: 'Novo Fornecedor',

    btn: {
      label: 'Voltar',
      classe: 'display-none',
      classe2: '',
      caminho: '/admin'
    }
  });
};
//--------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------
const salvarFornecedor = (req, res, next) => {
  let fornecedor = new Fornecedor(req.body.razao_social, req.body.cnpj_cpf, req.body.cep, req.body.cidade, req.body.estado, req.body.endereco, req.body.phone, req.body.email, req.body.bairro, req.body.nome_fantasia, req.body.status);
  fornecedor.salvarFornecedor(fornecedor).then(fornecedor => {
    res.redirect('fornecedor');
  }).catch(err => {
    res.send(err.message);
  });
};
//----------------------------------------------------------------------------------------------
const editarFornecedor = (req, res, next) => {
  let fornecedor = new Fornecedor(req.body.razao_social, req.body.cnpj_cpf, req.body.cep, req.body.cidade, req.body.estado, req.body.endereco, req.body.phone, req.body.email, req.body.bairro, req.body.nome_fantasia, req.body.status);
  fornecedor.id = req.body.id;
  fornecedor.atualizarFornecedor(fornecedor).then(result => {
    fornecedor.listarTodosFornecedores(fornecedor).then(fornecedores => {
      renderizar(req, res, next, fornecedores);
    });
  }).catch(err => {
    res.send(err.message);
  });
};
//----------------------------------------------------------------------------------------------
const listarFornecedores = (req, res, next) => {
  let fornecedor = new Fornecedor();
  fornecedor.listarTodosFornecedores(fornecedor).then(fornecedores => {
    renderizar(req, res, next, fornecedores);
  }).catch(err => {
    res.send(err.message);
  });
};
//----------------------------------------------------------------------------------------------
const desabilitarFornecedor = (req, res, next) => {
  let fornecedor = new Fornecedor();
  fornecedor.id = req.params.id;
  fornecedor.fornecedor_excluido = 1;
  fornecedor.desabilitarFornecedor(fornecedor).then(result => {
    res.send(result);
  }).catch(err => {
    res.send(err.message);
  });
};

module.exports = { salvarFornecedor, listarFornecedores, editarFornecedor, desabilitarFornecedor };