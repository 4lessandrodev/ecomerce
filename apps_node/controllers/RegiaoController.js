const Regiao = require('./../models/RegiaoModel');

//--------------------------------------------------------------------------------
const renderizar = (req, res, next, regioes) => {
  res.render('admin/regioes', {
    regioes,
    data: '',
    navbar: true,
    pagina: 'Regiões',
    btnLabel: 'Nova regiao',

    btn: {
      label: 'Voltar',
      classe: 'display-none',
      classe2: '',
      caminho: '/admin'
    }
  });
};
//--------------------------------------------------------------------------------

//----------------------------------------------------------------
const salvarRegiao = (req, res, next) => {
  let regiao = new Regiao(req.body.descricao, req.body.status);
  regiao.salvarRegiao(regiao).then(result => {
    res.redirect('regiao');
  }).catch(err => {
    res.send(err.message);
  });
};
//----------------------------------------------------------------
const editarRegiao = (req, res, next) => {
  let regiao = new Regiao(req.body.descricao, req.body.status);
  regiao.id = req.body.id;
  regiao.atualizarRegiao(regiao).then(result => {
    regiao.listarTodasRegioes(regiao).then(regioes => {
      renderizar(req, res, next, regioes);
    });
  }).catch(err => {
    res.send(err.message);
  });
};
//----------------------------------------------------------------
const listarTodasRegioes = (req, res, next) => {
  let regiao = new Regiao();
  regiao.listarTodasRegioes(regiao).then(regioes => {
    renderizar(req, res, next, regioes);
  }).catch(err => {
    res.send(err.message);
  });
};
//----------------------------------------------------------------
const listarRegioesAtivas = (req, res, next) => {
  let regiao = new Regiao();
  regiao.listarRegioesAtivas(regiao).then(regioes => {
    res.send(regioes);
  }).catch(err => {
    res.send(err.message);
  });
};
//----------------------------------------------------------------
const desativarRegiao = (req, res, next) => {
  let regiao = new Regiao(req.body.descricao, req.body.status);
  regiao.id = req.params.id;
  regiao.regiao_excluida = 1;
  regiao.desabilitarRegiao(regiao).then(result => {
    res.send(result);
  }).catch(err => {
    res.send(err.message);
  });
};
//----------------------------------------------------------------

module.exports = { salvarRegiao, editarRegiao, listarTodasRegioes, desativarRegiao, listarRegioesAtivas };