const conect = require('./../config/CONECT_BD'); 
class PedidoModel {
  constructor (id_compras, ecobag_adicional, id_tipo_pagamento, anotacoes, retirar_na_loja = 0, status = 1) {
    this._id = null;
    this._id_compras = id_compras;
    this._ecobag_adicional = ecobag_adicional;
    this._id_tipo_pagamento = id_tipo_pagamento;
    this._retirar_na_loja = retirar_na_loja;
    this._anotacoes = anotacoes;
    this._status = status;
  }
  get id_compras() {
    return this._id_compras;
  }
  get ecobag_adicional() {
    return this._ecobag_adicional;
  }
  get id_tipo_pagamento() {
    return this._id_tipo_pagamento;
  }
  get retirar_na_loja() {
    return this._retirar_na_loja;
  }
  get anotacoes() {
    return this._anotacoes;
  }
  get status() {
    return this._status;
  }
  
  set id_compras(value) {
    this._id_compras = value;
  }
  set ecobag_adicional(value) {
    this._ecobag_adicional = value;
  }
  set id_tipo_pagamento(value) {
    this._id_tipo_pagamento = value;
  }
  set retirar_na_loja(value) {
    this._retirar_na_loja = value;
  }
  set anotacoes(value) {
    this._anotacoes = value;
  }
  set status(value) {
    this._status = value;
  }
  get id() {
    return this._id;
  }
  set id(value) {
    this._id = value;
  }
  
  salvarPedido(pedido) {
    return new Promise((resolve, reject) => {
      conect.query(`INSERT INTO tb_pedidos(ecobag_adicional, id_tipo_de_pagamento, retirar_na_loja, anotacoes, status, id_compras) 
      VALUES(?,?,?,?,?,?)`,[pedido._ecobag_adicional, pedido._id_tipo_pagamento, pedido._retirar_na_loja, pedido._anotacoes, pedido.status, pedido._id_compras], (err, result) => {
        if (err) {
          console.log(err.message);
          reject(err.message);
        } else {
          resolve(result);
        }
      });
    });
  }
  
  
  listarPedidos(pedido) {
    return new Promise((resolve, reject) => {
      conect.query(`SELECT * FROM tb_pedidos`, (err, result) => {
        if (err) {
          console.log(err.message);
          reject(err.message);
        } else {
          resolve(result);
        }
      });
    });
  }
  
  atualizarPedido(pedido) {
    return new Promise((resolve, reject) => {
      conect.query(`
      UPDATE tb_pedidos SET ecobag_adicional = ?, id_tipo_de_pagamento = ?, retirar_na_loja = ?, anotacoes = ?, status = ?, id_compras = ? WHERE id = ?`,
      [
        pedido._ecobag_adicional, pedido._id_tipo_pagamento, pedido._retirar_na_loja, pedido._anotacoes, pedido._anotacoes, pedido.status, pedido._id_compras, pedido._id
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
  
  
  excluirPedido(pedido) {
    return new Promise((resolve, reject) => {
      conect.query(`DELETE FROM tb_pedidos WHERE id = ?`, [pedido._id], (err, result) => {
        if (err) {
          console.log(err.message);
          reject(err.message);
        } else {
          resolve(result);
        }
      });
    });
  }
  
  
  //EM STATUS ABERTO 
  listarResumoCestasVendidas(pedido) {
    return new Promise((resolve, reject) => {
      conect.query(`SELECT pedido.id, cesta.descricao, categoria.descricao AS categoria, COUNT(cesta.id) AS qtd_venda, ccompra.preco_unitario, (COUNT(cesta.id) * ccompra.preco_unitario) AS subtotal
      FROM tb_pedidos AS pedido, tb_cestas_compra AS ccompra, tb_cestas AS cesta, tb_categoria_cestas AS categoria
      WHERE pedido.id_compras = ccompra.id_compra AND cesta.id = ccompra.id_cesta AND categoria.id = cesta.id_categoria_cesta AND pedido.status = ? GROUP BY cesta.id`, [pedido._status], (err, result) => {
        if (err) {
          console.log(err.message);
          reject(err.message);
        } else {
          resolve(result);
        }
      });
    });
  }
  
  listarResumoProdutosVendidos(pedido) {
    return new Promise((resolve, reject) => {
      conect.query(`SELECT pedido.id, produto.descricao, categoria.descricao AS categoria, COUNT(produto.id) AS qtd_venda, pcompra.preco_unitario, (COUNT(produto.id) * pcompra.preco_unitario) AS subtotal
      FROM tb_pedidos AS pedido, tb_produtos_compra AS pcompra, tb_produtos AS produto, tb_categoria_produtos AS categoria
      WHERE pedido.id_compras = pcompra.id_compra AND produto.id = pcompra.id_produto AND categoria.id = produto.id_categoria_produto AND pedido.status = ? GROUP BY produto.id`, [pedido._status], (err, result) => {
        if (err) {
          console.log(err.message);
          reject(err.message);
        } else {
          resolve(result);
        }
      });
    });
  }
  
  
  
  listarCestasVendidaSelecionada(pedido) {
    return new Promise((resolve, reject) => {
      conect.query(`SELECT pedido.id, cesta.descricao, categoria.descricao AS categoria, COUNT(cesta.id) AS qtd_venda, ccompra.preco_unitario, (COUNT(cesta.id) * ccompra.preco_unitario) AS subtotal
      FROM tb_pedidos AS pedido, tb_cestas_compra AS ccompra, tb_cestas AS cesta, tb_categoria_cestas AS categoria
      WHERE pedido.id_compras = ccompra.id_compra AND cesta.id = ccompra.id_cesta AND categoria.id = cesta.id_categoria_cesta AND pedido.status = ? AND pedido.id = ? GROUP BY cesta.id`, [pedido._status, pedido._id], (err, result) => {
        if (err) {
          console.log(err.message);
          reject(err.message);
        } else {
          resolve(result);
        }
      });
    });
  }
  
  listarProdutosVendidoSelecionado(pedido) {
    return new Promise((resolve, reject) => {
      conect.query(`SELECT pedido.id, produto.descricao, categoria.descricao AS categoria, COUNT(produto.id) AS qtd_venda, pcompra.preco_unitario, (COUNT(produto.id) * pcompra.preco_unitario) AS subtotal
      FROM tb_pedidos AS pedido, tb_produtos_compra AS pcompra, tb_produtos AS produto, tb_categoria_produtos AS categoria
      WHERE pedido.id_compras = pcompra.id_compra AND produto.id = pcompra.id_produto AND categoria.id = produto.id_categoria_produto AND pedido.status = ? AND pedido.id = ? GROUP BY produto.id`, [pedido._status, pedido._id], (err, result) => {
        if (err) {
          console.log(err.message);
          reject(err.message);
        } else {
          resolve(result);
        }
      });
    });
  }
  
  selecionarIdsDosProdutosDeUmaCesta(pedido) {
    return new Promise((resolve, reject) => {
      conect.query(`SELECT produtos AS codigos FROM fazendautopia.tb_cestas_compra WHERE id_compra = (SELECT id_compras FROM tb_pedidos WHERE id = ?)`, [pedido._id], (err, result) => {
        if (err) {
          console.log(err.message);
          reject(err.message);
        } else {
          resolve(result);
        }
      });
    });
  }
  
  selecionarProdutosDeUmaCestaComprada(arrayDeIds) {
    return new Promise((resolve, reject) => {
      //SELECT descricao FROM tb_produtos WHERE id IN (1,2,3)
      conect.query(`SELECT id, descricao FROM tb_produtos WHERE id IN (${arrayDeIds})`, (err, result) => {
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

module.exports = PedidoModel;