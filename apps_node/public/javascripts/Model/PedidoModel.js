export class PedidoModel {
  constructor (total, ecobag_adicional, id_tipo_de_pagamento, retirar_na_loja, anotacoes, id_compras, status = 1, email = ``) {
    let result = 0;
    if (ecobag_adicional) {
      result = 1;
    } else {
      result = 0;
    }
    this._id = null;
    this._ecobag_adicional = result;
    this._id_tipo_de_pagamento = id_tipo_de_pagamento;
    this._retirar_na_loja = retirar_na_loja;
    this._anotacoes = anotacoes;
    this._status = status;
    this._id_compras = localStorage.getItem('id_compra');
    this._email = email;
    this._total = total;
  }

  get id() {
    return this._id;
  }
  get ecobag_adicional() {
    return this._ecobag_adicional;
  }
  get id_tipo_de_pagamento() {
    return this._id_tipo_de_pagamento;
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
  get id_compras() {
    return localStorage.getItem('id_compra');
  }

  get total() {
    return this._total;
  }

  get email() {
    return this._email;
  }

  set id(value) {
    this._id = value;
  }
  set ecobag_adicional(value) {
    let result = 0;
    if (value) {
      result = 1;
    } else {
      result = 0;
    }
    this._ecobag_adicional = result;
  }
  set id_tipo_de_pagamento(value) {
    this._id_tipo_de_pagamento = value;
  }
  set retirar_na_loja(value) {
    this._retirar_na_loja = value;
  }
  set anotacoes(value) {
    this._anotacoes = value;
  }
  set status(value = 1) {
    this._status = value;
  }
  set id_compras(value) {
    this._id_compras = localStorage.getItem('id_compra');
  }
  set email(value) {
    this._email = value;
  }

  set total(value) {
    this._total = value;
  }

}