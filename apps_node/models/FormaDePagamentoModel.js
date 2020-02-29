class FormaDePagamentoModel {
  constructor (desconto, status, descricao_regras, tipo_pagamento_excluido) {
    this._id = null;
    this._desconto = desconto;
    this._status = status;
    this._descricao_regras = descricao_regras;
    this._tipo_pagamento_excluido = tipo_pagamento_excluido;
  }
  get desconto() {
    return this._desconto;
  }
  get status() {
    return this._status;
  }
  set desconto(value) {
    this._desconto = value;
  }
  set status(value) {
    this._status = value;
  }
  get descricao_regras() {
    return this._descricao_regras;
  }
  set descricao_regras(value) {
    this._descricao_regras = value;
  }
  get tipo_pagamento_excluido() {
    return this._tipo_pagamento_excluido;
  }
  set tipo_pagamento_excluido(value) {
    this._tipo_pagamento_excluido = value;
  }
  get id() {
    return this._id;
  }
  set id(value) {
    this._id = value;
  }
}

module.exports = FormaDePagamentoModel;