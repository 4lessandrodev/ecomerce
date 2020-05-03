var conect = require('../config/CONECT_BD');
class DashboardModel {
  constructor (produtos, cestas, inscricoes, pedidos, clientes, fretes, regioes, lojas, mensagens) {
    this._produtos = produtos;
    this._cestas = cestas;
    this._inscricoes = inscricoes;
    this._pedidos = pedidos;
    this._clientes = clientes;
    this._fretes = fretes;
    this._regioes = regioes;
    this._lojas = lojas;
    this._mensagens = mensagens;
  }

  get dashboard() {
    return globalThis;
  }

  buscarDadosDashBoardNoBD() {
    return new Promise((resolve, reject) => {
      conect.query(`
SELECT(
      SELECT COUNT(*)
	  FROM   tb_cestas WHERE cesta_excluida = 0 AND status = 1
	  ) AS cestas,
	  (SELECT COUNT(*)
	  FROM   tb_produtos WHERE status = 1 AND produto_excluido = 0
	  ) AS produtos,
	  (SELECT COUNT(*)
	  FROM   tb_inscricoes
	  ) AS inscricoes,
	  (SELECT COUNT(*)
	  FROM tb_pedidos WHERE status = 1
	  ) AS pedidos,
	  (SELECT COUNT(*)
	  FROM   tb_clientes WHERE cliente_excluido = 0
	  ) AS clientes,
	  (SELECT COUNT(*)
	  FROM   tb_fretes WHERE tabela_excluida = 0
	  ) AS fretes,
      (SELECT COUNT(*)
	  FROM   tb_contatos WHERE mensagem_lida = 0
	  ) AS emails,
      (SELECT COUNT(*)
	  FROM   tb_lojas WHERE loja_excluida = 0 AND status = 1
	  ) AS lojas,
      (SELECT COUNT(*)
	  FROM   tb_regioes WHERE regiao_excluida = 0 AND status = 1
	  ) AS regioes,
      (SELECT COUNT(*)
	  FROM   tb_pacotes_planos WHERE plano_excluido = 0 AND status = 1
	  ) AS planos,
      (SELECT (SUM(COALESCE(entrada.total,0))) - (SUM(COALESCE(saida.total,0)))
	  FROM   estoque_entrada entrada
      LEFT JOIN estoque_saida saida ON entrada.id_produto = saida.id_produto
	  ) AS estoque
FROM dual
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

}
module.exports = DashboardModel;