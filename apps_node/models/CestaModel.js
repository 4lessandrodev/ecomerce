const conect = require('./../config/CONECT_BD');
class CestaModel {
  constructor (descricao, id_categoria_cesta, preco, informacoes_nutricionais, alteracoes_permitidas, imagem = '/uploads/images/no-image.jpeg', status = 1, cesta_excluida = 0, data_cadastro = new Date()) {
    this._id = null;
    this._imagem = imagem;
    this._descricao = descricao;
    this._id_categoria_cesta = id_categoria_cesta;
    this._status = status;
    this._preco = preco;
    this.__informacoes_nutricionais = informacoes_nutricionais;
    this._alteracoes_permitidas = alteracoes_permitidas;
    this._cesta_excluida = cesta_excluida;
    this._data_cadastro = data_cadastro;
  }
  get id() {
    return this._id;
  }
  set id(value) {
    this._id = value;
  }
  get imagem() {
    return this._imagem;
  }
  get descricao() {
    return this._descricao;
  }
  get id_categoria_cesta() {
    return this._id_categoria_cesta;
  }
  get status() {
    return this._status;
  }
  get preco() {
    return this._preco;
  }
  get informacoes_nutricionais() {
    return this._informacoes_nutricionais;
  }

  get alteracoes_permitidas() {
    return this._alteracoes_permitidas;
  }
  set alteracoes_permitidas(value) {
    this._alteracoes_permitidas = value;
  }
  set imagem(value) {
    this._imagem = value;
  }
  set descricao(value) {
    this._descricao = value;
  }
  set id_categoria_cesta(value) {
    this._id_categoria_cesta = value;
  }
  set status(value) {
    this._status = value;
  }
  set preco(value) {
    this._preco = value;
  }
  set informacoes_nutricionais(value) {
    this._informacoes_nutricionais = value;
  }
  get cesta_excluida() {
    return this._cesta_excluida;
  }
  set cesta_excluida(value) {
    this._cesta_excluida = value;
  }
  get data_cadastro() {
    return this._data_cadastro;
  }
  set data_cadastro(value) {
    this._data_cadastro = value;
  }


  salvarCesta(cesta) {
    return new Promise((resolve, reject) => {
      conect.query(`INSERT INTO tb_cestas(imagem, descricao, id_categoria_cesta, status, preco,
        alteracoes_permitidas, informacoes_nutricionais, cesta_excluida) VALUES(?,?,?,?,?,?,?)`, [cesta._imagem, cesta._descricao, cesta._id_categoria_cesta, cesta._status, cesta._preco, cesta._alteracoes_permitidas, cesta.__informacoes_nutricionais, cesta._cesta_excluida], (err, result) => {
        if (err) {
          console.log(err.message);
          reject(err.message);
        } else {
          resolve(result);
        }
      });
    });
  }


  listarCestas(cesta) {
    return new Promise((resolve, reject) => {
      conect.query(`SELECT * FROM tb_cestas WHERE cesta_excluida = ?`, [cesta._cesta_excluida], (err, results) => {
        if (err) {
          console.log(err.message);
          reject(err.message);
        } else {
          resolve(results);
        }
      });
    });
  }

  atualizarCesta(cesta) {
    return new Promise((resolve, reject) => {
      conect.query(`UPDATE tb_cestas SET imagem = ?, descricao = ?, id_categoria_cesta = ?, status = ?, preco = ?,
        alteracoes_permitidas = ?, informacoes_nutricionais = ?, cesta_excluida = ? WHERE id = ?`, [cesta._imagem, cesta._descricao, cesta._id_categoria_cesta, cesta._status, cesta._preco, cesta._alteracoes_permitidas, cesta.__informacoes_nutricionais, cesta._cesta_excluida, cesta._id], (err, result) => {
        if (err) {
          console.log(err.message);
          reject(err.message);
        } else {
          resolve(result);
        }
      });
    });
  }


  desabilitarCesta(cesta) {
    return new Promise((resolve, reject) => {
      conect.query(`UPDATE tb_cestas SET cesta_excluida = ? WHERE id = ?`, [cesta._cesta_excluida, cesta._id], (err, result) => {
        if (err) {
          console.log(err.message);
          reject(err.message);
        } else {
          resolve(result);
        }
      });
    });
  }


}

module.exports = CestaModel;