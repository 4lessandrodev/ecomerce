const Usuario = require('./../models/UsuarioModel');
const clienteController = require('./../controllers/ClienteController');



//Rota para renderizar a pagina de login
const renderizarPaginaLogin = (req, res, next, error) => {
  if (req.session.user == undefined) {
    res.render('login', { body: req.body, error });
  } else {
    res.redirect('/');
  }
};
//------------------------------------------------------------------------------------------------------
const salvarUsuario = (req, res, next) => {
  let usuario = new Usuario(req.body.email, req.body.senha);
  usuario.cadastrarNovoUsuario(usuario).then((result) => {
    res.send(result);
  }).catch(err => {
    res.send(err.message);
  });
  
  
  
};
//-----------------------------------------------------------------
const editarUsuario = (req, res, next) => {
  let usuario = new Usuario(req.body.email, req.body.senha);
  usuario.alterarSenha(usuario).then(usuario => {
    res.send(usuario);
  }).catch(err => {
    console.log(err.message);
    res.send(err.message);
  });
};
//----------------------------------------------------------

const entrar = (req, res, next) => {
  //Validar login do usuário 
  if (req.body.email == null || req.body.email == '' || req.body.email == undefined || req.body.email.indexOf('@') == -1) {
    res.render('login', { body: req.body, error:'Informe um email válido' });
  } else if (req.body.senha == null || req.body.senha == '' || req.body.senha == undefined) {
    renderizarPaginaLogin(req, res, next, 'Senha inválida');
  } else {
    
    //--------------------Realizar a consulta  
    let usuario = new Usuario(req.body.email, req.body.senha);
    usuario.entrar(usuario).then(usuario => {
      if (usuario[0] == null || usuario[0] == undefined || usuario[0] == '') {
        renderizarPaginaLogin(req, res, next, 'Usuário ou senha inválido');
      } else {
        req.session.user = usuario[0];
        if (req.session.user.admin == 1) {
          res.redirect('/admin');
        } else {
          res.redirect('/');
        }
      }
    }).catch(err => {
      console.log(err.message);
      renderizarPaginaLogin(req, res, next, 'Erro ao realizar login');
      res.send(err.message);
    });
  }
};

//----------------------------------------------------------
//TESTE DE SELEÇÃO DE INTERVALO PASSANDO UM ARRAY COMO PARAMETRO
const teste1 = (req, res, next) => {
  let usuario = new Usuario();
  usuario.selecionarIntervalo('26,44,46').then(result => {
    res.send(result);
  });
};
//----------------------------------------------------------
//TESTE DE SELEÇÃO DE INTERVALO PASSANDO UM ARRAY COMO PARAMETRO
const teste2 = (req, res, next) => {
  let usuario = new Usuario();
  usuario.selecionarIntervaloInverso('26,44,46,49,60').then(result => {
    res.send(result);
  });
};


module.exports = { salvarUsuario, editarUsuario, entrar, teste1, teste2, renderizarPaginaLogin };