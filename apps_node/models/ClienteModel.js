const conect = require('./../config/CONECT_BD');
class ClienteModel {
  constructor (id_usuario, phone, nome, cep, cidade, estado, endereco, codigo_ibge, id_regiao, bairro, regiao_atendida = 1, cliente_excluido = 0) {
    this._id = null;
    this._id_usuario = id_usuario;
    this._phone = phone;
    this._nome = nome;
    this._cep = cep;
    this._cidade = cidade;
    this._estado = estado;
    this._endereco = endereco;
    this._bairroer = bairro;
    this._codigo_ibge = codigo_ibge;
    this._id_regiao = id_regiao;
    this._regiao_atendida = regiao_atendida;
    this._cliente_excluido = cliente_excluido;
  }

  get id() {
    return this._id;
  }
  set id(value) {
    this._id = value;
  }
  get id_usuario() {
    return this._id_usuario;
  }
  set id_usuario(value) {
    this._id_usuario = value;
  }
  get phone() {
    return this._phone;
  }
  set phone(value) {
    this._phone = value;
  }
  get nome() {
    return this._nome;
  }
  set nome(value) {
    this._nome = value;
  }
  get cep() {
    return this._cep;
  }
  set cep(value) {
    this._cep = value;
  }
  get cidade() {
    return this._cidade;
  }
  set cidade(value) {
    this._cidade = value;
  }
  get estado() {
    return this._estado;
  }
  set estado(value) {
    this._estado = value;
  }
  get endereco() {
    return this._endereco;
  }
  set endereco(value) {
    this._endereco = value;
  }
  get bairro() {
    return this._bairro;
  }
  get codigo_ibge() {
    return this._codigo_ibge;
  }
  set codigo_ibge(value) {
    this._codigo_ibge = value;
  }
  get id_regiao() {
    return this._id_regiao;
  }
  set id_regiao(value) {
    this._id_regiao = value;
  }
  get regiao_atendida() {
    return this._regiao_atendida;
  }
  set regiao_atendida(value) {
    this._regiao_atendida = value;
  }
  set bairro(value) {
    this._bairro = value;
  }
  get cliente_excluido() {
    return this._cliente_excluido;
  }
  set cliente_excluido(value) {
    this._cliente_excluido = value;
  }


  salvarCliente(cliente) {
    return new Promise((resolve, reject) => {
      conect.query(`INSERT INTO tb_clientes(id_usuario, phone, nome, cep, cidade, endereco, codigo_ibge,
        estado, id_regiao, regiao_atendida, cliente_excluido, bairro) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`, [
        cliente._id_usuario, cliente._phone, cliente._nome, cliente._cep, cliente._cidade, cliente._endereco, cliente._codigo_ibge,
        cliente._estado, cliente._id_regiao, cliente._regiao_atendida, cliente._cliente_excluido, cliente._bairro
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


  listarClientes(cliente) {
    return new Promise((resolve, reject) => {
      conect.query(`SELECT c.nome, c.phone, u.email, c.endereco, c.cidade, c.estado, r.descricao as regiao, c.regiao_atendida, c.data_cadastro
FROM tb_clientes AS c, tb_usuarios AS u, tb_regioes AS r 
WHERE u.id = c.id_usuario AND r.id = c.id_regiao AND c.cliente_excluido = ?;`, [cliente._cliente_excluido], (err, result) => {
        if (err) {
          console.log(err.message);
          reject(err.message);
        } else {
          resolve(result);
        }
      });
    });
  }

  atualizarCliente(cliente) {
    return new Promise((resolve, reject) => {
      conect.query(`UPDATE tb_clientes SET phone =?, nome =?, cep =?, cidade =?, endereco =?, codigo_ibge =?,
        estado =?, id_regiao =?, regiao_atendida =?, cliente_excluido =?, bairro =?) WHERE id = ?`, [
        cliente._phone, cliente._nome, cliente._cep, cliente._cidade, cliente._endereco, cliente._codigo_ibge,
        cliente._estado, cliente._id_regiao, cliente._regiao_atendida, cliente._cliente_excluido, cliente._bairro, cliente._id
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


  desabilitarCliente(cliente) {
    return new Promise((resolve, reject) => {
      conect.query(`UPDATE tb_clientes SET cliente_excluido = ? WHERE id = ?`, [
        cliente._cliente_excluido, cliente._id
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

module.exports = ClienteModel;