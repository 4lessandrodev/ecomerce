const conect = require('./../config/CONECT_BD');
class ProdutosParaCestaModel {
  constructor (id_produto, id_cesta) {
    this._id = null;
    this._id_produto = id_produto;
    this._id_cesta = id_cesta;
  }
  get id_produto() {
    return this._id_produto;
  }
  set id_produto(value) {
    this._id_produto = value;
  }
  get id_cesta() {
    return this._id_cesta;
  }
  set id_cesta(value) {
    this._id_cesta = value;
  }
  get id() {
    return this._id;
  }
  set id(value) {
    this._id = value;
  }


  salvarProdutoParaCesta(produto) {
    return new Promise((resolve, reject) => {
      conect.query(`INSERT INTO tb_produtos_para_cesta(id_produto, id_cesta) VALUES(?,?)`, [produto._id_produto, produto._id_cesta], (err, result) => {
        if (err) {
          console.log(err.message);
          reject(err.message);
        } else {
          resolve(result);
        }
      });
    });
  }


  listarProdutoParaCesta(produto) {
    return new Promise((resolve, reject) => {
      conect.query(`SELECT * FROM tb_produtos_para_cesta`, (err, result) => {
        if (err) {
          console.log(err.message);
          reject(err.message);
        } else {
          resolve(result);
        }
      });
    });
  }

  atualizarProdutoParaCesta(produto) {
    return new Promise((resolve, reject) => {
      conect.query(`UPDATE tb_produtos_para_cesta SET id_produto = ?, id_cesta = ? WHERE id = ?`, [produto._id_produto, produto._id_cesta, produto._id], (err, result) => {
        if (err) {
          console.log(err.message);
          reject(err.message);
        } else {
          resolve(result);
        }
      });
    });
  }


  excluirProdutoParaCesta(produto) {
    return new Promise((resolve, reject) => {
      conect.query(`DELETE FROM tb_produtos_para_cesta WHERE id_produto = ? AND id_cesta = ?`, [produto._id_produto, produto._id_cesta, produto._id], (err, result) => {
        if (err) {
          console.log(err.message);
          reject(err.message);
        } else {
          resolve(result);
        }
      });
    });
  }


  listarProdutosDeUmaCestaEspecifica(produto) {
    return new Promise((resolve, reject) => {
      conect.query(`SELECT produto.id AS 'id_produto', cesta.id AS 'id_cesta', cesta.imagem AS 'imagem_cesta', produto.imagem AS 'imagem_produto', produto.descricao AS 'descricao_produto', cesta.descricao AS 'descricao_cesta', produto.fator_multiplicador, cesta.preco
FROM tb_produtos_para_cesta AS pc, tb_produtos AS produto, tb_cestas AS cesta
WHERE produto.id = pc.id_produto AND pc.id_cesta = cesta.id AND cesta.id = ?`, [produto._id_cesta], (err, result) => {
        if (err) {
          console.log(err.message);
          reject(err.message);
        } else {
          resolve(result);
        }
      });
    });
  }

  listarProdutosDeCestas(produto) {
    return new Promise((resolve, reject) => {
      conect.query(`SELECT produto.id AS 'id_produto', cesta.id AS 'id_cesta', cesta.imagem AS 'imagem_cesta', produto.imagem AS 'imagem_produto', produto.descricao AS 'descricao_produto', cesta.descricao AS 'descricao_cesta', produto.fator_multiplicador, cesta.preco
FROM tb_produtos_para_cesta AS pc, tb_produtos AS produto, tb_cestas AS cesta
WHERE produto.id = pc.id_produto AND pc.id_cesta = cesta.id`, (err, result) => {
        if (err) {
          console.log(err.message);
          reject(err.message);
        } else {
          resolve(result);
        }
      });
    });
  }

  /*
   
   SELECT produto.id AS 'id_produto', cesta.id AS 'id_cesta', cesta.imagem AS 'imagem_cesta', produto.imagem AS 'imagem_produto', produto.descricao AS 'descricao_produto', cesta.descricao AS 'descricao_cesta', produto.fator_multiplicador, cesta.preco
FROM tb_produtos_para_cesta AS pc, tb_produtos AS produto, tb_cestas AS cesta
WHERE produto.id = pc.id_produto AND pc.id_cesta = cesta.id AND cesta.id = 1


   */


}
module.exports = ProdutosParaCestaModel;