const UndMed = require('./../models/UnidadeMedidaModel');



//--------------------------------------------------------------------------------
const renderizar = (req, res, next, unidades) => {
  res.render('admin/unidades-medida', {
    unidades,
    data: '',
    navbar: true,
    pagina: 'Unidades Medidas',
    btnLabel: 'Nova und. medida',

    btn: {
      label: 'Voltar',
      classe: 'display-none',
      classe2: '',
      caminho: '/admin'
    }
  });
};
//------------------------------------------------------------------
const salvarUndMed = (req, res, next) => {
  let und = new UndMed(req.body.descricao, req.body.status);
  und.salvarUnidadeMedida(und).then(und => {
    res.redirect('unidade-medida');
  }).catch(err => {
    console.log(err.message);
    res.send(err.message);
  });
};
//------------------------------------------------------------------
const editarUndMed = (req, res, next) => {
  let und = new UndMed(req.body.descricao, req.body.status);
  und.id = req.body.id;
  und.atualizarUnidadeMedida(und).then(result => {
    und.listarTodasUnidadesMedida(und).then(unidades => {
      renderizar(req, res, next, unidades);
    });
  }).catch(err => {
    console.log(err.message);
    res.send(err.message);
  });
};
//------------------------------------------------------------------
const listarTodasUndMed = (req, res, next) => {
  let und = new UndMed();
  und.listarTodasUnidadesMedida(und).then(unds => {
    renderizar(req, res, next, unds);
  }).catch(err => {
    console.log(err.message);
    res.send(err.message);
  });
};
//------------------------------------------------------------------
const listarUndMedAtivas = (req, res, next) => {
  let und = new UndMed();
  und.listarUnidadesMedidaAtivas(und).then(und => {
    res.send(und);
  }).catch(err => {
    console.log(err.message);
    res.send(err.message);
  });
};
//------------------------------------------------------------------
const desativarUndMed = (req, res, next) => {
  let und = new UndMed();
  und.id = req.params.id;
  und.categoria_excluida = 1;
  und.desabilitarUnidadeMedida(und).then(result => {
    res.send(result);
  }).catch(err => {
    console.log(err.message);
    res.send(err.message);
  });
};

module.exports = { salvarUndMed, editarUndMed, listarTodasUndMed, desativarUndMed, listarUndMedAtivas };