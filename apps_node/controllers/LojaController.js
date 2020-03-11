const Loja = require('./../models/LojaModel');
const Regiao = require('./../models/RegiaoModel');

//-------------------------------------------------------------------------------------------
const renderizar = (req, res, next, lojas, regioes) => {
  res.render('admin/lojas', {
    lojas,
    regioes,
    data: '',
    navbar: true,
    pagina: 'Lojas',
    btnLabel: 'Nova loja',

    btn: {
      label: 'Voltar',
      classe: 'display-none',
      classe2: '',
      caminho: '/admin'
    }
  });
};
//-------------------------------------------------------------------------------------------
const salvarLoja = (req, res, next) => {
  let loja = new Loja(req.body.razao_social, req.body.nome_fantasia, req.body.cnpj_cpf, req.body.cep, req.body.cidade, req.body.estado, req.body.endereco, req.body.phone, req.body.email, req.body.id_regiao, req.body.bairro, req.body.status);
  loja.endereco = `${req.body.endereco} ${req.body.numero}`;
  console.log(loja);
  loja.salvarLoja(loja).then(loja => {
    res.redirect('loja');
  }).catch(err => {
    res.send(err.message);
  });
};
//-------------------------------------------------------------------------------------------
const editarLoja = (req, res, next) => {
  let regiao = new Regiao();
  let loja = new Loja(req.body.razao_social, req.body.nome_fantasia, req.body.cnpj_cpf, req.body.cep, req.body.cidade, req.body.estado, req.body.endereco, req.body.phone, req.body.email, req.body.id_regiao, req.body.bairro, req.body.status);
  loja.id = req.body.id;
  loja.atualizarLoja(loja).then(result => {
    loja.listarTodasLojas(loja).then(lojas => {
      regiao.listarRegioesAtivas(regiao).then(regioes => {
        renderizar(req, res, next, lojas, regioes);
      });
    });
  }).catch(err => {
    res.send(err.message);
  });
};
//-------------------------------------------------------------------------------------------
const desabilitarLoja = (req, res, next) => {
  let loja = new Loja();
  loja.loja_excluida = 1;
  loja.id = req.params.id;
  loja.desabilitarLoja(loja).then(loja => {
    res.send(loja);
  }).catch(err => {
    res.send(err.message);
  });
};
//-------------------------------------------------------------------------------------------
const listarLojasAtivas = (req, res, next) => {
  let loja = new Loja();
  loja.listarLojasAtivas(loja).then(result => {
    res.send(result);
  }).catch(err => {
    res.send(err.message);
  });
};
//-------------------------------------------------------------------------------------------
const listarTodasLojas = (req, res, next) => {
  let loja = new Loja();
  let regiao = new Regiao();
  loja.listarTodasLojas(loja).then(lojas => {
    regiao.listarRegioesAtivas(regiao).then(regioes => {
      renderizar(req, res, next, lojas, regioes);
    });
  }).catch(err => {
    res.send(err.message);
  });
};


module.exports = { salvarLoja, editarLoja, desabilitarLoja, listarLojasAtivas, listarTodasLojas };