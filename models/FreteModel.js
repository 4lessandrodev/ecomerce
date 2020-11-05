const conect = require('./../config/CONECT_BD');
class FreteModel {
  constructor (id_origem, id_destino, preco, data_cadastro = new Date(), tabela_excluida = 0) {
    this._id = null;
    this._id_origem = id_origem;
    this._id_destino = id_destino;
    this._preco = preco;
    this._data_cadastro = data_cadastro;
    this._tabela_excluida = tabela_excluida;
  }
  get id() {
    return this._id;
  }
  set id(value) {
    this._id = value;
  }
  get id_origem() {
    return this._id_origem;
  }
  set id_origem(value) {
    this._id_origem = value;
  }
  get id_destino() {
    return this._id_destino;
  }
  set id_destino(value) {
    this._id_destino = value;
  }
  get preco() {
    return this._preco;
  }
  set preco(value) {
    this._preco = value;
  }
  get data_cadastro() {
    return this._data_cadastro;
  }
  set data_cadastro(value) {
    this._data_cadastro = value;
  }
  
  get tabela_excluida() {
    return this._tabela_excluida;
  }
  set tabela_excluida(value) {
    this._tabela_excluida = value;
  }
  
  salvarFrete(frete) {
    return new Promise((resolve, reject) => {
      conect.query(`INSERT INTO tb_fretes(id_origem, id_destino, preco) VALUES(?,?,?)`, [
        frete._id_origem, frete._id_destino, frete._preco
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
  
  
  listarFretes(frete) {
    return new Promise((resolve, reject) => {
      conect.query(`SELECT frete.id, loja.id AS 'id_origem', CONCAT(loja.razao_social,' | ', loja.endereco) AS 'origem', loja.id_regiao AS 'id_regiao_loja', regiao.id AS 'id_destino', regiao.descricao AS 'destino', frete.preco FROM tb_fretes AS frete, tb_regioes AS regiao, tb_lojas AS loja WHERE frete.tabela_excluida = ? AND frete.id_origem = loja.id AND frete.id_destino = regiao.id AND loja.loja_excluida = 0 AND regiao.regiao_excluida = 0`, [
        frete._tabela_excluida
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
  
  atualizarFrete(frete) {
    return new Promise((resolve, reject) => {
      conect.query(`UPDATE tb_fretes SET id_origem = ?, id_destino = ?, preco = ? WHERE id = ?`, [
        frete._id_origem, frete._id_destino, frete._preco, frete._id], (err, result) => {
          if (err) {
            console.log(err.message);
            reject(err.message);
          } else {
            resolve(result);
          }
        });
      });
    }
    
    
    desabilitarFrete(frete) {
      return new Promise((resolve, reject) => {
        conect.query(`UPDATE tb_fretes SET tabela_excluida = ? WHERE id = ?`, [
          frete._tabela_excluida, frete._id], (err, result) => {
            if (err) {
              console.log(err.message);
              reject(err.message);
            } else {
              resolve(result);
            }
          });
        });
      }
      
      listarFretesParaCarrinho(frete) {
        return new Promise((resolve, reject)=> {
          conect.query(`SELECT f.id, f.id_origem, f.id_destino, f.preco
          FROM tb_fretes AS f
          WHERE f.tabela_excluida = ? AND f.id_destino = ?`,[frete._tabela_excluida, frete._id_destino], (err, result) => {
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
    
    module.exports = FreteModel;