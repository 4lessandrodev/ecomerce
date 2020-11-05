const Frete = require('./../models/FreteModel');
const Loja = require('./../models/LojaModel');
const Regiao = require('./../models/RegiaoModel');

//------------------------------------------------------------------------
const renderizar = (req, res, next, fretes, lojas, regioes) => {
  let logado = (req.session.user != undefined);
  res.render('admin/tabela-frete', {
    logado,
    fretes,
    regioes,
    lojas,
    data: '',
    navbar: true,
    pagina: 'Fretes por região',
    btnLabel: 'Novo frete',

    btn: {
      label: 'Voltar',
      classe: 'display-none',
      classe2: '',
      caminho: '/admin'
    }
  });
};
//------------------------------------------------------------------------
const salvarFrete = (req, res, next) => {
  let frete = new Frete(req.body.id_origem, req.body.id_destino, req.body.preco);
  frete.salvarFrete(frete).then(result => {
    res.redirect('frete');
  }).catch(err => {
    console.log(err.message);
    res.send(err.message);
  });
};
//------------------------------------------------------------------------
const editarFrete = (req, res, next) => {
  let loja = new Loja();
  let regiao = new Regiao();
  let frete = new Frete(req.body.id_origem, req.body.id_destino, req.body.preco);
  frete.id = req.body.id;
  console.log(frete);
  frete.atualizarFrete(frete).then(result => {
    frete.listarFretes(frete).then(fretes => {
      loja.listarLojasAtivasParaFrete(loja).then(lojas => {
        regiao.listarRegioesAtivas(regiao).then(regioes => {
          renderizar(req, res, next, fretes, lojas, regioes);
        }).catch(err => {
          console.log(err.message);
          res.send(err.message);
        });
      }).catch(err => {
        console.log(err.message);
        res.send(err.message);
      });
    }).catch(err => {
      console.log(err.message);
      res.send(err.message);
    });
  }).catch(err => {
    console.log(err.message);
    res.send(err.message);
  });
};
//------------------------------------------------------------------------
const desabilitarFrete = (req, res, next) => {
  let frete = new Frete();
  frete.id = req.params.id;
  frete.tabela_excluida = 1;
  frete.desabilitarFrete(frete).then(result => {
    res.send(result);
  }).catch(err => {
    console.log(err.message);
    res.send(err.message);
  });
};
//------------------------------------------------------------------------
const listarFretes = (req, res, next) => {
  let frete = new Frete();
  let loja = new Loja();
  let regiao = new Regiao();
  frete.listarFretes(frete).then(fretes => {
    loja.listarLojasAtivasParaFrete(loja).then(lojas => {
      regiao.listarRegioesAtivas(regiao).then(regioes => {
        renderizar(req, res, next, fretes, lojas, regioes);
      }).catch(err => {
        res.send(err.message);
      });
    }).catch(err => {
      res.send(err.message);
    });
  }).catch(err => {
    res.send(err.message);
  });
};

module.exports = { salvarFrete, editarFrete, desabilitarFrete, listarFretes };