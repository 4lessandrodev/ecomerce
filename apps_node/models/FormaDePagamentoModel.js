const conect = require('./../config/CONECT_BD');
class FormaDePagamentoModel {
  constructor (desconto, descricao_regras, descricao, tipo_pagamento_excluido = 0, status = 1) {
    this._id = null;
    this._desconto = desconto;
    this._status = status;
    this._descricao_regras = descricao_regras;
    this._descricao = descricao;
    this._tipo_pagamento_excluido = tipo_pagamento_excluido;
  }
  get desconto() {
    return this._desconto;
  }
  get status() {
    return this._status;
  }
  set desconto(value) {
    this._desconto = value;
  }
  set status(value) {
    this._status = value;
  }
  get descricao_regras() {
    return this._descricao_regras;
  }
  set descricao_regras(value) {
    this._descricao_regras = value;
  }
  get tipo_pagamento_excluido() {
    return this._tipo_pagamento_excluido;
  }
  set tipo_pagamento_excluido(value) {
    this._tipo_pagamento_excluido = value;
  }
  get id() {
    return this._id;
  }
  set id(value) {
    this._id = value;
  }
  get descricao() {
    return this._descricao;
  }
  set descricao(value) {
    this._descricao = value;
  }


  salvarFormaPagamento(formaPagamento) {
    return new Promise((resolve, reject) => {
      conect.query(`INSERT INTO tb_tipos_pagamento(desconto, descricao_regras, status, descricao) VALUES(?,?,?,?)`, [
        formaPagamento._desconto, formaPagamento._descricao_regras, formaPagamento._status, formaPagamento._descricao
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


  listarFormasPagamento(formaPagamento) {
    return new Promise((resolve, reject) => {
      conect.query(`SELECT * FROM tb_tipos_pagamento WHERE tipo_pagamento_excluido = ?`, [formaPagamento._tipo_pagamento_excluido], (err, result) => {
        if (err) {
          console.log(err.message);
          reject(err.message);
        } else {
          resolve(result);
        }
      });
    });
  }

  atualizarFormaPagamento(formaPagamento) {
    return new Promise((resolve, reject) => {
      conect.query(`UPDATE tb_tipos_pagamento SET desconto = ?, descricao_regras = ?, status = ?, descricao = ? WHERE id = ?`, [
        formaPagamento._desconto, formaPagamento._descricao_regras, formaPagamento._status, formaPagamento._descricao, formaPagamento._id
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


  desabilitarFormaPagamento(formaPagamento) {
    return new Promise((resolve, reject) => {
      conect.query(`UPDATE tb_tipos_pagamento SET tipo_pagamento_excluido = ?, WHERE id = ?`, [
        formaPagamento.tipo_pagamento_excluido, formaPagamento._id
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

module.exports = FormaDePagamentoModel;