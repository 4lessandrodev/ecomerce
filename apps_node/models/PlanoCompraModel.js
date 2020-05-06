const conect = require('./../config/CONECT_BD');
class PlanoCompraModel {
  constructor (id_plano, id_usuario, quantidade, preco_unitario, data_compra, status = 1) {
    this._id = null;
    this._id_plano = id_plano;
    this._id_usuario = id_usuario;
    this._quantidade = quantidade;
    this._preco_unitario = preco_unitario;
    this._data_compra = data_compra;
    this._status = status;
  }
  get id_plano() {
    return this._id_plano;
  }
  get id() {
    return this._id;
  }
  get id_usuario() {
    return this._id_usuario;
  }
  get quantidade() {
    return this._quantidade;
  }
  get preco_unitario() {
    return this._preco_unitario;
  }
  get data_compra() {
    return this._data_compra;
  }
  get status() {
    return this._status;
  }
  
  set id_plano(value) {
    this._id_plano = value;
  }
  
  set id(value) {
    this._id = value;
  }
  set id_usuario(value) {
    this._id_usuario = value;
  }
  set quantidade(value) {
    this._quantidade = value;
  }
  set preco_unitario(value) {
    this._preco_unitario = value;
  }
  set data_compra(value) {
    this._data_compra = value;
  }
  set status(value) {
    this._status = value;
  }
  
  salvarPlanoCompra(planoCompra) {
    console.log(planoCompra);
    return new Promise((resolve, reject) => {
      conect.query(`INSERT INTO tb_planos_compra(id_plano, id_usuario, quantidade, preco_unitario, status) VALUES(?,?,?,?,?)`, [
        planoCompra._id_plano, planoCompra._id_usuario, planoCompra._quantidade, planoCompra._preco_unitario, planoCompra._status
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
  
  
  listarPlanoCompra() {
    return new Promise((resolve, reject) => {
      conect.query(`
      SELECT compra.id, cliente.nome AS cliente, plano.titulo, plano.descricao AS descricao_plano, DATE_FORMAT(compra.data_compra, '%d/%m/%Y') AS data_pedido, cesta.descricao AS cesta, ctg.descricao AS categoria, (compra.quantidade * plano.quantidade_cestas) AS quantidade_cestas, COUNT(ctp.id_plano_compra) AS entregas, (compra.quantidade * compra.preco_unitario) AS preco_unitario, sts.descricao AS status
      FROM tb_planos_compra compra
      INNER JOIN tb_pacotes_planos plano ON compra.id_plano = plano.id
      INNER JOIN tb_cestas cesta ON cesta.id = plano.id_cesta
      INNER JOIN tb_categoria_cestas ctg ON ctg.id = cesta.id_categoria_cesta
      INNER JOIN tb_usuarios usuario ON usuario.id = compra.id_usuario
      INNER JOIN tb_clientes cliente ON cliente.id_usuario = usuario.id
      INNER JOIN tb_status_pedido sts ON sts.id = compra.status
      LEFT JOIN tb_cesta_plano ctp ON ctp.id_plano_compra = compra.id
      GROUP BY compra.id
      HAVING entregas < quantidade_cestas;
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
  
  listarPlanoCompraCliente(cliente) {
    return new Promise((resolve, reject) => {
      conect.query(`
      SELECT compra.id, plano.titulo, plano.descricao AS descricao_plano, DATE_FORMAT(compra.data_compra, '%d/%m/%Y') AS data_pedido, cesta.descricao AS cesta, ctg.descricao AS categoria, (compra.quantidade * plano.quantidade_cestas) AS quantidade_cestas, COUNT(ctp.id_plano_compra) AS entregas, (compra.quantidade * compra.preco_unitario) AS preco_unitario, sts.descricao AS status
      FROM tb_planos_compra compra
      INNER JOIN tb_pacotes_planos plano ON compra.id_plano = plano.id
      INNER JOIN tb_cestas cesta ON cesta.id = plano.id_cesta
      INNER JOIN tb_categoria_cestas ctg ON ctg.id = cesta.id_categoria_cesta
      INNER JOIN tb_usuarios usuario ON usuario.id = compra.id_usuario
      INNER JOIN tb_clientes cliente ON cliente.id_usuario = usuario.id
      INNER JOIN tb_status_pedido sts ON sts.id = compra.status
      LEFT JOIN tb_cesta_plano ctp ON ctp.id_plano_compra = compra.id
      WHERE cliente.id_usuario = ?
      GROUP BY compra.id
      LIMIT 7
      `,[cliente._id_usuario], (err, result) => {
        if (err) {
          console.log(err.message);
          reject(err.message);
        } else {
          resolve(result);
        }
      });
    });
  }
  
  
  selecionarPlanoCompra(plano) {
    return new Promise((resolve, reject) => {
      conect.query(`
      SELECT compra.id , sts.descricao AS status , cliente.endereco, cliente.bairro , cliente.estado , cliente.cidade , cliente.phone , cliente.nome , ctg.descricao AS categoria , cesta.descricao AS cesta , plano.titulo , plano.descricao AS plano_descricao,plano.regulamento, COUNT(ctp.id_plano_compra) AS entregas, DATE_FORMAT(compra.data_compra, '%d/%m/%Y %h:%i:%s') AS data_compra, (compra.quantidade * plano.quantidade_cestas) AS quantidade_total_cestas, (compra.preco_unitario * compra.quantidade) AS preco_total
      FROM tb_planos_compra compra
      INNER JOIN tb_pacotes_planos plano ON compra.id_plano = plano.id
      INNER JOIN tb_cestas cesta ON cesta.id = plano.id_cesta
      INNER JOIN tb_categoria_cestas ctg ON ctg.id = cesta.id_categoria_cesta
      INNER JOIN tb_usuarios usuario ON usuario.id = compra.id_usuario
      INNER JOIN tb_clientes cliente ON cliente.id_usuario = usuario.id
      INNER JOIN tb_status_pedido sts ON sts.id = compra.status
      LEFT JOIN tb_cesta_plano ctp ON ctp.id_plano_compra = compra.id
      WHERE compra.id = ?
      GROUP BY compra.id;
      `, [plano._id], (err, result) => {
        if (err) {
          console.log(err.message);
          reject(err.message);
        } else {
          resolve(result);
        }
      });
    });
  }
  
  
  lancarCestaEntregue(id) {
    return new Promise((resolve, reject) => {
      conect.query(`INSERT INTO tb_cesta_plano (id_plano_compra) VALUES(?)`, [id], (err, result) => {
        if (err) {
          console.log(err);
          reject(err.message);
        } else {
          resolve(result);
        }
      });
    });
  }
  
  
  listarCestasDoPlano(plano) {
    return new Promise((resolve, reject) => {
      conect.query(`SELECT id, DATE_FORMAT(data_entrega, '%d/%m/%Y %h:%i:%s') AS data_entrega FROM tb_cesta_plano 
      WHERE id_plano_compra = ?`, [plano._id], (err, result) => {
        if (err) {
          console.log(err);
          reject(err.message);
        } else {
          resolve(result);
        }
      });
    });
  }
  
  atualizarStatusPlanoCompra(planoCompra) {
    return new Promise((resolve, reject) => {
      conect.query(`UPDATE tb_planos_compra SET status = ? WHERE id = ?`, [
        planoCompra._status, planoCompra._id
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
  
  
  excluirPlanoCompra(planoCompra) {
    return new Promise((resolve, reject) => {
      conect.query(`DELETE FROM tb_planos_compra WHERE id = ?`, [
        produtoCompra._id
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
module.exports = PlanoCompraModel;