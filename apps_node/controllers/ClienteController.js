const Cliente = require('./../models/ClienteModel');

//--------------------------------------------------------------------------------
const renderizar = (req, res, next, unidades) => {
  res.render('admin/clientes', {
    unidades,
    data: '',
    navbar: true,
    pagina: 'Cliente',
    btnLabel: 'Cliente',

    btn: {
      label: 'Voltar',
      classe: '',
      classe2: 'display-none',
      caminho: '/admin'
    }
  });
};
//-----------------------------------------------------------------------------
const salvarCliente = (req, res, next) => {
  console.log(req.body);
  let endereco = req.body.endereco + req.body.numero;
  let cliente = new Cliente(req.body.id_usuario, req.body.phone, req.body.nome, req.body.cep, req.body.cidade, req.body.estado, endereco, req.body.codigo_ibge, req.body.id_regiao, req.body.bairro, req.body.regiao_atentida);
  cliente.salvarCliente(cliente).then(result => {
    res.redirect('/');
  }).catch(err => {
    res.send(err.message);
  });
};
//-----------------------------------------------------------------------------
const editarCliente = (req, res, next) => {
  let endereco = req.body.endereco + req.body.numero;
  let cliente = new Cliente(req.body.id_usuario, req.body.phone, req.body.nome, req.body.cep, req.body.cidade, req.body.estado, endereco, req.body.codigo_ibge, req.body.id_regiao, req.body.bairro, req.body.regiao_atendida);
  cliente.atualizarCliente(cliente).then(cliente => {
    res.send(cliente);
  }).catch(err => {
    res.send(err.message);
  });
};
//-----------------------------------------------------------------------------
const desabilitarCliente = (req, res, next) => {
  let cliente = new Cliente();
  cliente.id = req.body.id;
  cliente.cliente_excluido = 1;
  cliente.desabilitarCliente(cliente).then(cliente => {
    res.send(cliente);
  }).catch(err => {
    res.send(err.message);
  });
};
//-----------------------------------------------------------------------------
const listarClientes = (req, res, next) => {
  let cliente = new Cliente();
  cliente.listarClientes(cliente).then(clientes => {
    res.send(clientes);
  }).catch(err => {
    res.send(err.message);
  });
};

module.exports = { salvarCliente, editarCliente, desabilitarCliente, listarClientes };