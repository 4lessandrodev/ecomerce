const conect = require('./../config/CONECT_BD');
class PacotesPlanosModel {
  constructor (descricao, titulo, id_cesta, preco, quantidade_cestas, status = 1, plano_excluido = 0, regulamento = 'Em caso de dúvidas entre em contato') {
    this._id = null;
    this._descricao = descricao;
    this._titulo = titulo;
    this._status = status;
    this._id_cesta = id_cesta;
    this._preco = preco;
    this._quantidade_cestas = quantidade_cestas;
    this._plano_excluido = plano_excluido;
    this._regulamento = regulamento;
  }
  get id() {
    return this._id;
  }
  get descricao() {
    return this._descricao;
  }
  get titulo() {
    return this._titulo;
  }
  get status() {
    return this._status;
  }
  get id_cesta() {
    return this._id_cesta;
  }
  get preco() {
    return this._preco;
  }
  get quantidade_cestas() {
    return this._quantidade_cestas;
  }
  get regulamento() {
    return this._regulamento;
  }
  set id(value) {
    this._id = value;
  }
  set descricao(value) {
    this._descricao = value;
  }
  set titulo(value) {
    this._titulo = value;
  }
  set status(value) {
    this._status = value;
  }
  set id_cesta(value) {
    this._id_cesta = value;
  }
  set preco(value) {
    this._preco = value;
  }
  set quantidade_cestas(value) {
    this._quantidade_cestas = value;
  }
  get plano_excluido() {
    return this._plano_excluido;
  } set plano_excluido(value) {
    this._plano_excluido = value;
  }
  set regulamento(value) {
    this._regulamento = value;
  }
  
  salvarPacote(pacote) {
    console.log(pacote);
    return new Promise((resolve, reject) => {
      conect.query(`INSERT INTO tb_pacotes_planos (quantidade_cestas, id_cesta, preco, descricao, titulo, status, regulamento) VALUES(?,?,?,?,?,?,?)      
      `, [
        pacote.quantidade_cestas, pacote._id_cesta, pacote._preco, pacote._descricao, pacote._titulo, pacote._status, pacote._regulamento
      ], (err, result) => {
        if (err) {
          console.log(err);
          reject(err.message);
        } else {
          resolve(result);
        }
      });
    });
  }
  
  
  listarPacotesPlanosAtivos(pacote) {
    return new Promise((resolve, reject) => {
      conect.query(`SELECT plano.*, cesta.descricao AS cesta, ctg.descricao AS categoria FROM tb_pacotes_planos plano
      INNER JOIN tb_cestas cesta ON cesta.id = plano.id_cesta
      INNER JOIN tb_categoria_cestas ctg ON ctg.id = cesta.id_categoria_cesta 
      WHERE plano.plano_excluido = ? AND plano.status = ?`, [pacote._plano_excluido, pacote._status], (err, result) => {
        if (err) {
          console.log(err.message);
          reject(err.message);
        } else {
          resolve(result);
        }
      });
    });
  }
  listarPacotePlanoSelecionado(pacote) {
    return new Promise((resolve, reject) => {
      conect.query(`SELECT plano.*, cesta.descricao AS cesta, ctg.descricao AS categoria FROM tb_pacotes_planos plano
      INNER JOIN tb_cestas cesta ON cesta.id = plano.id_cesta
      INNER JOIN tb_categoria_cestas ctg ON ctg.id = cesta.id_categoria_cesta 
      WHERE plano.id = ?`, [pacote._id], (err, result) => {
        if (err) {
          console.log(err.message);
          reject(err.message);
        } else {
          resolve(result);
        }
      });
    });
  }
  
  listarTodosPacotesPlanos(pacote) {
    return new Promise((resolve, reject) => {
      conect.query(`SELECT plano.*, cesta.descricao AS cesta, ctg.descricao AS categoria FROM tb_pacotes_planos plano
      INNER JOIN tb_cestas cesta ON cesta.id = plano.id_cesta
      INNER JOIN tb_categoria_cestas ctg ON ctg.id = cesta.id_categoria_cesta 
      WHERE plano_excluido = ?`, [pacote._plano_excluido], (err, result) => {
        if (err) {
          console.log(err.message);
          reject(err.message);
        } else {
          resolve(result);
        }
      });
    });
  }
  
  atualizarpacote(pacote) {
    return new Promise((resolve, reject) => {
      conect.query(`UPDATE tb_pacotes_planos SET quantidade_cestas = ?, id_cesta = ?, preco = ?, descricao = ?, titulo = ?, status = ?, regulamento = ? WHERE id = ?`, [
        pacote.quantidade_cestas, pacote._id_cesta, pacote._preco, pacote._descricao, pacote._titulo, pacote._status, pacote._regulamento, pacote._id
      ], (err, result) => {
        if (err) {
          console.log(err.message);
          reject(err.message);
        } else {
          resolve(result);
        }
      });
    });
  }
  
  
  desabilitarpacote(pacote) {
    return new Promise((resolve, reject) => {
      conect.query(`UPDATE tb_pacotes_planos SET plano_excluido = ? WHERE id = ?`, [
        pacote.plano_excluido, pacote._id
      ], (err, result) => {
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

module.exports = PacotesPlanosModel;