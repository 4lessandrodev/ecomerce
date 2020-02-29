class PedidoModel {
  constructor (id_compras, ecobag_adicional, id_tipo_pagamento, anotacoes, status, retirar_na_loja = false) {
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

}