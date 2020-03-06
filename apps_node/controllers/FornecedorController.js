const Fornecedor = require('./../models/FornecedorModel');

//----------------------------------------------------------------------------------------------
const salvarFornecedor = (req, res, next) => {
  let fornecedor = new Fornecedor(req.body.razao_social, req.body.cnpj_cpf, req.body.cep, req.body.cidade, req.body.estado, req.body.endereco, req.body.phone, req.body.email, req.body.bairro, req.body.nome_fantasia, req.body.status);
  fornecedor.salvarFornecedor(fornecedor).then(fornecedor => {
    res.send(fornecedor);
  }).catch(err => {
    res.send(err.message);
  });
};
//----------------------------------------------------------------------------------------------
const editarFornecedor = (req, res, next) => {
  let fornecedor = new Fornecedor(req.body.razao_social, req.body.cnpj_cpf, req.body.cep, req.body.cidade, req.body.estado, req.body.endereco, req.body.phone, req.body.email, req.body.bairro, req.body.nome_fantasia, req.body.status);
  fornecedor.atualizarFornecedor(fornecedor).then(fornecedor => {
    res.send(fornecedor);
  }).catch(err => {
    res.send(err.message);
  });
};
//----------------------------------------------------------------------------------------------
const listarFornecedores = (req, res, next) => {
  let fornecedor = new Fornecedor();
  fornecedor.listarFornecedores(fornecedor).then(fornecedores => {
    res.send(fornecedores);
  }).catch(err => {
    res.send(err.message);
  });
};
//----------------------------------------------------------------------------------------------
const desabilitarFornecedor = (req, res, next) => {
  let fornecedor = new Fornecedor();
  fornecedor.id = req.body.id;
  fornecedor.desabilitarFornecedor(fornecedor).then(fornecedor => {
    res.send(fornecedor);
  }).catch(err => {
    res.send(err.message);
  });
};

module.exports = { salvarFornecedor, listarFornecedores, editarFornecedor, desabilitarFornecedor };