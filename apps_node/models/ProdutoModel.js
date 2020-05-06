const conect = require('./../config/CONECT_BD');
class ProdutoModel {
  constructor (descricao, id_categoria_produto, preco_venda, id_unidade_medida, info_nutricional, imagem = '/uploads/images/no-image.jpeg', status = 1, produto_especial = 0, fator_multiplicador = 1, data_cadastro = new Date(), produto_excluido = 0) {
    this._id = null;
    this._imagem = imagem;
    this._descricao = descricao;
    this._id_categoria_produto = id_categoria_produto;
    this._preco_venda = preco_venda;
    this._produto_excluido = produto_excluido;
    this._id_unidade_medida = id_unidade_medida;
    this._data_cadastro = data_cadastro;
    this._status = status;
    this._info_nutricional = info_nutricional;
    this._produto_especial = produto_especial;
    this._fator_multiplicador = fator_multiplicador;
  }
  
  get id() {
    return this._id;
  }
  get imagem() {
    return this._imagem;
  }
  get descricao() {
    return this._descricao;
  }
  get id_categoria_produto() {
    return this._id_categoria_produto;
  }
  get preco_venda() {
    return this._preco_venda;
  }
  get data_cadastro() {
    return this._data_cadastro;
  }
  get id_unidade_medida() {
    return this._id_unidade_medida;
  }
  get status() {
    return this._status;
  }
  get info_nutricional() {
    return this._info_nutricional;
  }
  get produto_especial() {
    return this._produto_especial;
  }
  get fator_multiplicador() {
    return this._fator_multiplicador;
  }
  set id(value) {
    this._id = value;
  }
  set imagem(value) {
    this._imagem = value;
  }
  set descricao(value) {
    this._descricao = value;
  }
  set id_categoria_produto(value) {
    this._id_categoria_produto = value;
  }
  set preco_venda(value) {
    this._preco_venda = value;
  }
  set data_cadastro(value) {
    this._data_cadastro = value;
  }
  set id_unidade_medida(value) {
    this._id_unidade_medida = value;
  }
  set status(value) {
    this._status = value;
  }
  set info_nutricional(value) {
    this._info_nutricional = value;
  }
  set produto_especial(value) {
    this._produto_especial = value;
  }
  set fator_multiplicador(value) {
    this._fator_multiplicador = value;
  }
  get produto_excluido() {
    return this._produto_excluido;
  }
  set produto_excluido(value) {
    this._produto_excluido = value;
  }
  
  
  salvarProduto(produto) {
    return new Promise((resolve, reject) => {
      conect.query(`INSERT INTO tb_produtos(descricao, imagem, info_nutricional, id_categoria_produto, status, produto_especial, fator_multiplicador,
        preco_venda, produto_excluido, id_unidade_medida) VALUES(?,?,?,?,?,?,?,?,?,?)`, [
          produto._descricao, produto._imagem, produto._info_nutricional, this.id_categoria_produto,
          produto._status, produto._produto_especial, produto._fator_multiplicador, produto._preco_venda, produto._produto_excluido, produto._id_unidade_medida
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
    
    
    
    listarTodosProdutos(produto) {
      return new Promise((resolve, reject) => {
        conect.query(`
        SELECT p.id, p.imagem, p.descricao, p.info_nutricional, c.descricao AS categoria, p.status, p.produto_especial, p.fator_multiplicador, p.preco_venda, p.data_cadastro, p.id_unidade_medida, p.id_categoria_produto, u.descricao AS unidade_medida, (entrada.total - saida.total) AS estoque_disponivel 
        FROM tb_produtos AS p
        INNER JOIN tb_categoria_produtos AS c ON c.id = p.id_categoria_produto
        INNER JOIN tb_und_medidas AS u ON u.id = p.id_unidade_medida
        INNER JOIN estoque_saida saida ON saida.id_produto = p.id
        INNER JOIN estoque_entrada entrada ON entrada.id_produto = p.id
        WHERE p.produto_excluido = ? AND p.status = ?`, [
          produto._produto_excluido, produto._status], (err, result) => {
            if (err) {
              console.log(err.message);
              reject(err.message);
            } else {
              resolve(result);
            }
          });
        });
      }
      
      listarTodosProdutosAdicionais(produto) {
        return new Promise((resolve, reject) => {
          conect.query(`
          SELECT p.id, p.imagem, p.descricao, p.info_nutricional, c.descricao AS categoria, p.status, p.produto_especial, p.fator_multiplicador, p.preco_venda, p.data_cadastro, p.id_unidade_medida, p.id_categoria_produto, u.descricao AS unidade_medida, (entrada.total - saida.total) AS estoque_disponivel 
          FROM tb_produtos AS p
          INNER JOIN tb_categoria_produtos AS c ON c.id = p.id_categoria_produto 
          INNER JOIN  tb_und_medidas AS u ON u.id = p.id_unidade_medida
          INNER JOIN estoque_saida saida ON saida.id_produto = p.id
          INNER JOIN estoque_entrada entrada ON entrada.id_produto = p.id
          WHERE p.produto_excluido = ? AND p.status = ? AND p.produto_especial = ?
          HAVING estoque_disponivel > 0`, [
            produto._produto_excluido, produto._status, produto._produto_especial], (err, result) => {
              if (err) {
                console.log(err.message);
                reject(err.message);
              } else {
                resolve(result);
              }
            });
          });
        }
        
        
        listarTodosProdutosParaAdmin(produto) {
          return new Promise((resolve, reject) => {
            conect.query(`
            SELECT p.id, p.imagem, p.descricao, p.info_nutricional, c.descricao AS categoria, p.status, p.produto_especial, p.fator_multiplicador, p.preco_venda, p.data_cadastro, p.id_unidade_medida, p.id_categoria_produto, u.descricao AS unidade_medida
            FROM tb_produtos AS p, tb_categoria_produtos AS c, tb_und_medidas AS u
            WHERE p.produto_excluido = ? AND c.id = p.id_categoria_produto AND u.id = p.id_unidade_medida AND p.descricao LIKE ${"'" + produto._descricao + "%'"} AND p.status LIKE ${"'"+produto._status+"%'"}`, [
              produto._produto_excluido], (err, result) => {
                if (err) {
                  console.log(err.message);
                  reject(err.message);
                } else {
                  resolve(result);
                }
              });
            });
          }
          
          
          
          listarTodosProdutosEmEstoque(produto) {
            return new Promise((resolve, reject) => {
              conect.query(`
              SELECT p.id, p.imagem, p.descricao, p.preco_venda, p.produto_especial, p.status, ctg.descricao AS categoria_descricao, COALESCE(saida.total, 0) AS total_saida, COALESCE(entrada.total, 0) AS total_entrada, (COALESCE(entrada.total, 0) - COALESCE(saida.total,0)) AS estoque_disponivel 
              FROM tb_produtos AS p
              LEFT JOIN estoque_saida saida ON saida.id_produto = p.id
              LEFT JOIN estoque_entrada entrada ON entrada.id_produto = p.id
              INNER JOIN tb_categoria_produtos ctg ON ctg.id = p.id_categoria_produto
              WHERE p.produto_excluido = 0 AND p.descricao LIKE ${"'"+produto._descricao+"%'"} AND p.status LIKE ${"'"+produto._status+"%'"}
              GROUP BY p.id`, [
                produto._produto_excluido], (err, result) => {
                  if (err) {
                    console.log(err.message);
                    reject(err.message);
                  } else {
                    resolve(result);
                  }
                });
              });
            }
            
            
            listarProdutosEspeciaisAtivos(produto) {
              return new Promise((resolve, reject) => {
                conect.query(`
                SELECT p.id, p.imagem, p.descricao, p.info_nutricional, c.descricao AS categoria, p.status, p.produto_especial, p.fator_multiplicador, p.preco_venda, p.data_cadastro, p.id_unidade_medida, p.id_categoria_produto, u.descricao AS unidade_medida, (entrada.total - saida.total) AS estoque_disponivel 
                FROM tb_produtos AS p
                INNER JOIN tb_categoria_produtos AS c ON c.id = p.id_categoria_produto
                INNER JOIN tb_und_medidas AS u ON u.id = p.id_unidade_medida
                INNER JOIN estoque_saida saida ON saida.id_produto = p.id
                INNER JOIN estoque_entrada entrada ON entrada.id_produto = p.id
                WHERE p.produto_excluido = ? AND p.status = ? AND p.produto_especial = ?
                HAVING estoque_disponivel > 0`, [
                  produto._produto_excluido, produto._status, produto._produto_especial], (err, result) => {
                    if (err) {
                      console.log(err.message);
                      reject(err.message);
                    } else {
                      resolve(result);
                    }
                  });
                });
              }
              
              
              atualizarProduto(produto) {
                return new Promise((resolve, reject) => {
                  conect.query(`UPDATE tb_produtos SET descricao = ?, imagem = ?, info_nutricional = ?, id_categoria_produto = ?, status = ?, produto_especial = ?, fator_multiplicador = ?,
                  preco_venda = ?, produto_excluido = ?, id_unidade_medida = ? WHERE id = ?`, [
                    produto._descricao, produto._imagem, produto._info_nutricional, this.id_categoria_produto,
                    produto._status, produto._produto_especial, produto._fator_multiplicador, produto._preco_venda, produto._produto_excluido, produto._id_unidade_medida,
                    produto._id
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
              
              listarProdutoSelecionado(produto) {
                return new Promise((resolve, reject) => {
                  conect.query(`
                  SELECT * FROM tb_produtos AS p WHERE p.produto_excluido = ? AND p.id = ?`, [
                    produto._produto_excluido, produto._id], (err, result) => {
                      if (err) {
                        console.log(err.message);
                        reject(err.message);
                      } else {
                        resolve(result);
                      }
                    });
                  });
                }
                
                desabilitarProduto(produto) {
                  return new Promise((resolve, reject) => {
                    conect.query(`UPDATE tb_produtos SET produto_excluido = ? WHERE id = ?`, [
                      produto._produto_excluido, produto._id], (err, result) => {
                        if (err) {
                          console.log(err.message);
                          reject(err.message);
                        } else {
                          resolve(result);
                        }
                      });
                    });
                  }
                  
                  
                  abrirProdutoSelecionadoNaHome(produto) {
                    return new Promise((resolve, reject) => {
                      conect.query(`SELECT * FROM tb_produtos  WHERE produto_excluido = ? AND id = ? AND status = ?`, [
                        produto._produto_excluido, produto._id, produto._status], (err, result) => {
                          if (err) {
                            console.log(err.message);
                            reject(err.message);
                          } else {
                            resolve(result);
                          }
                        });
                      });
                    }
                    
                    
                    
                    abrirProdutosIndicados(produto) {
                      return new Promise((resolve, reject) => {
                        conect.query(`SELECT p.id, p.descricao, p.imagem, p.info_nutricional, u.descricao AS und_descricao, p.preco_venda FROM tb_produtos AS p, tb_und_medidas AS u WHERE p.produto_excluido = ? AND p.status = ? AND u.id = p.id_unidade_medida AND p.produto_especial = 1 LIMIT 7`, [
                          produto._produto_excluido, produto._status], (err, result) => {
                            if (err) {
                              console.log(err.message);
                              reject(err.message);
                            } else {
                              resolve(result);
                            }
                          });
                        });
                      }
                      
                      editarStatusProdutos(qry) {
                        return new Promise((resolve, reject) => {
                          conect.query(qry, (err, result) => {
                            if (err) {
                              reject(err);
                            } else {
                              resolve(result);
                            }
                          });
                        });
                      }
                      
                      
                      
                    }
                    
                    module.exports = ProdutoModel;