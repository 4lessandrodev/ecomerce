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
      conect.query(`
      INSERT INTO tb_cestas(imagem, descricao, id_categoria_cesta, status, preco,
        alteracoes_permitidas, informacoes_nutricionais, cesta_excluida)
        VALUES(?,?,?,?,?,?,?,?)`, [
          cesta._imagem, cesta._descricao, cesta._id_categoria_cesta, cesta._status, cesta._preco, cesta._alteracoes_permitidas,
          cesta.__informacoes_nutricionais, cesta._cesta_excluida
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
    
    
    listarTodasCestas(cesta) {
      return new Promise((resolve, reject) => {
        conect.query(`SELECT c.imagem, c.id, c.descricao, cc.descricao AS 'categoria', c.preco, c.alteracoes_permitidas, c.informacoes_nutricionais, c.status, c.id_categoria_cesta
        FROM tb_cestas AS c, tb_categoria_cestas AS cc 
        WHERE cesta_excluida = 0 AND cc.id = c.id_categoria_cesta GROUP BY c.id`, [
          cesta._cesta_excluida], (err, results) => {
            if (err) {
              console.log(err.message);
              reject(err.message);
            } else {
              resolve(results);
            }
          });
        });
      }
      
      listarTodasCestasComFiltro(cesta) {
        return new Promise((resolve, reject) => {
          conect.query(`SELECT c.imagem, c.id, c.descricao, cc.descricao AS 'categoria', c.preco, c.alteracoes_permitidas, 
          c.informacoes_nutricionais, c.status, c.id_categoria_cesta
          FROM tb_cestas AS c, tb_categoria_cestas AS cc 
          WHERE cesta_excluida = 0 AND cc.id = c.id_categoria_cesta AND c.status LIKE '${cesta.status}%' AND c.descricao LIKE '%${cesta._descricao}%' GROUP BY c.id`, [
            cesta._cesta_excluida], (err, results) => {
              if (err) {
                console.log(err.message);
                reject(err.message);
              } else {
                resolve(results);
              }
            });
          });
        }
        
        
        listarCestasAtivas(cesta) {
          return new Promise((resolve, reject) => {
            conect.query(`SELECT c.id, c.imagem, c.descricao, cc.descricao AS 'categoria', p.descricao AS 'produtos', p.status, p.fator_multiplicador, c.preco, c.alteracoes_permitidas, c.informacoes_nutricionais, COUNT(p.descricao ) AS quantidade_itens
            FROM tb_cestas AS c, tb_produtos_para_cesta AS pc, tb_produtos AS p, tb_categoria_cestas AS cc 
            WHERE c.cesta_excluida = ? AND c.id = pc.id_cesta AND p.id = pc.id_produto AND cc.id = c.id_categoria_cesta AND c.status = ? GROUP BY c.id`, [
              cesta._cesta_excluida, cesta._status], (err, results) => {
                if (err) {
                  console.log(err.message);
                  reject(err.message);
                } else {
                  resolve(results);
                }
              });
            });
          }
          
          
          listarCestaEspecifica(cesta) {
            return new Promise((resolve, reject) => {
              conect.query(`SELECT cesta.id, cesta.imagem, cesta.descricao, cesta.id_categoria_cesta, cesta.status, cesta.preco, cesta.alteracoes_permitidas,
              cesta.informacoes_nutricionais, cesta.data_cadastro, cesta.cesta_excluida, categoria_da_cesta.descricao AS descricao_categoria
              FROM tb_cestas AS cesta, tb_categoria_cestas AS categoria_da_cesta WHERE cesta.id = ? AND cesta.cesta_excluida = ? AND categoria_da_cesta.id = cesta.id_categoria_cesta`, [
                cesta._id, cesta._cesta_excluida], (err, results) => {
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
            
            
            alterarStatus(qry) {
              return new Promise((resolve, reject) => {
                conect.query(qry, (err, result) => {
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
          
          module.exports = CestaModel;