const Usuario = require('./../models/UsuarioModel');
const clienteController = require('./../controllers/ClienteController');

//-----------------------------------------------------------------
const salvarUsuario = (req, res, next) => {

  let usuario = new Usuario(req.body.email, req.body.senha);

  usuario.cadastrarNovoUsuario(usuario).then((result) => {
    res.send(result);
    /*
        console.log(resposta.serverStatus == 2 && resposta.affectedRows == 1);
        if (resposta.serverStatus == 2 && resposta.affectedRows == 1) {
          //Salvar cliente
          //-------------------
          req.body.id_usuario = resposta.insertId;
          clienteController.salvarCliente(req, res, next);
    
        }
        */
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
//----------------------------------------------------------

const entrar = (req, res, next) => {
  let usuario = new Usuario(req.body.email, req.body.senha);
  usuario.entrar(usuario).then(usuario => {
    res.send(usuario);
  }).catch(err => {
    res.send(err.message);
  });
};


module.exports = { salvarUsuario, editarUsuario, entrar };