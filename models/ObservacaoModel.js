const conect = require('./../config/CONECT_BD');
class ObservacaoModel {
  constructor (observacao, id_plano_compra, id_remetente) {
    this._id = null;
    this._observacao = observacao;
    this._id_plano_compra = id_plano_compra;
    this._id_remetente = id_remetente;
  }
  
  get id() {
    return this._id;
  }
  get observacao() {
    return this._observacao;
  }
  get id_plano_compra() {
    return this._id_plano_compra;
  }
  get id_remetente() {
    return this._id_remetente;
  }
  set id(value) {
    this._id = value;
  }
  set observacao(value) {
    this._observacao = value;
  }
  set id_plano_compra(value) {
    this._id_plano_compra = value;
  }
  set id_remetente(value) {
    this._id_remetente = value;
  }
  
  salvar(modelo_observacao) {
    return new Promise((resolve, reject) => {
      conect.query(`INSERT INTO tb_obs_plano (observacao, id_plano_compra, id_remetente) VALUES(?,?,?)      
      `, [
        modelo_observacao.observacao, modelo_observacao.id_plano_compra, modelo_observacao.id_remetente
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
  
  
  listar(modelo_observacao) {
    return new Promise((resolve, reject) => {
      conect.query(`SELECT plano.*, DATE_FORMAT(plano.data_hora,'%d/%m/%Y %h:%i') AS hora, cliente.nome FROM tb_obs_plano plano
      INNER JOIN tb_clientes cliente ON cliente.id_usuario = plano.id_remetente
      WHERE id_plano_compra = ?      
      `, [
        modelo_observacao.id_plano_compra
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
  
}

module.exports = ObservacaoModel;