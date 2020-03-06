const Usuario = require('./../models/UsuarioModel');

//-----------------------------------------------------------------
const salvarUsuario = (req, res, next) => {
  let usuario = new Usuario(req.body.email, req.body.senha);
  usuario.cadastrarNovoUsuario(usuario).then(usuario => {
    res.send(usuario);
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
    res.send(err.message);
  });
};
//-----------------------------------------------------------------
const entrar = (req, res, next) => {
  let usuario = new Usuario(req.body.email, req.body.senha);
  usuario.entrar(usuario).then(usuario => {
    res.send(usuario);
  }).catch(err => {
    res.send(err.message);
  });
};


module.exports = { salvarUsuario, editarUsuario, entrar };