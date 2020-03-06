const conect = require('./../config/CONECT_BD');
class id_fornecedorParaProdutoModel {
  constructor (id, id_fornecedor, id_produto) {
    this._id = id;
    this._id_fornecedor = id_fornecedor;
    this._id_produto = id_produto;
  }
  get id_fornecedor() {
    return this._id_fornecedor;
  }
  set id_fornecedor(value) {
    this._id_fornecedor = value;
  }
  get id_produto() {
    return this._id_produto;
  }
  set id_produto(value) {
    this._id_produto = value;
  }

  get id() {
    return this._id;
  }
  set id(value) {
    this._id = value;
  }


  salvarCategoriaCesta(forn_prod) {
    return new Promise((resolve, reject) => {
      conect.query(`
      INSERT INTO tb_fornecedor_produtos(id_fornecedor, id_produto) VALUES(?,?)
      `, [forn_prod._id_fornecedor, forn_prod._id_produto], (err, result) => {
        if (err) {
          console.log(err.message);
          reject(err.message);
        } else {
          resolve(result);
        }
      });
    });
  }


  listarFornecedoresParaProduto(forn_prod) {
    return new Promise((resolve, reject) => {
      conect.query(`
      SELECT * FROM tb_fornecedor_produtos
      `, (err, result) => {
        if (err) {
          console.log(err.message);
          reject(err.message);
        } else {
          resolve(result);
        }
      });
    });
  }

  atualizarFornecedoresParaProduto(forn_prod) {
    return new Promise((resolve, reject) => {
      conect.query(`
      UPDATE tb_fornecedor_produtos SET id_fornecedor = ?, id_produto = ? WHERE id = ?
      `, [forn_prod._id_fornecedor, forn_prod._id_produto, forn_prod._id], (err, result) => {
        if (err) {
          console.log(err.message);
          reject(err.message);
        } else {
          resolve(result);
        }
      });
    });
  }

  excluirFornecedoresParaProduto(forn_prod) {
    return new Promise((resolve, reject) => {
      conect.query(`
       DELETE FROM tb_fornecedor_produtos WHERE id = ?
      `, [forn_prod._id], (err, result) => {
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

module.exports = FornecedorParaProdutoModel;