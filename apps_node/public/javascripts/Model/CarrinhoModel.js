export class CarrinhoModel {
  constructor (mainCode, mainDescription, arrayItensCode, priceTotal, itensDescription, image) {
    this._mainCode = mainCode;
    this._mainDescription = mainDescription;
    this._arrayItensCode = arrayItensCode;
    this._priceTotal = priceTotal;
    this._itensDescription = itensDescription;
    this._mainImage = image;
    this._id_compra = localStorage.getItem('id_compra');
  }

  get mainCode() {
    return this._mainCode;
  }

  set mainCode(value) {
    this._mainCode = value;
  }

  get mainDescription() {
    return this._mainDescription;
  }

  set mainDescription(value) {
    this._mainDescription = value;
  }

  get arrayItensCode() {
    return this._arrayItensCode;
  }

  set arrayItensCode(value) {
    this._arrayItensCode = value;
  }

  get priceTotal() {
    return this._priceTotal;
  }

  set priceTotal(value) {
    this._priceTotal = value;
  }

  get itensDescription() {
    return this._itensDescription;
  }

  set itensDescription(value) {
    this._itensDescription = value;
  }

  get image() {
    return this._mainImage;
  }

  set image(value) {
    this._mainImage = value;
  }

  get idCompra() {
    return localStorage.getItem('id_compra');
  }

  set idCompra(value) {
    localStorage.setItem('id_compra', value);
    this._id_compra = value;
  }

  obterIdCompra() {
    let id_compra = this.idCompra();
    if (id_compra == null || id_compra == undefined || id_compra == '') {
      //Criar um id de compra
      this.iniciarCompra();
    } else {
      //Adicionar o item ao carrinho

    }

  }


  iniciarCompra() {

  }

  criarItem() {

  }

  addItemAoCarrinho(item) {
    fetch(`/register-user`, {
      headers: { "Content-Type": "application/json" },
      method: 'POST',
      body: JSON.stringify(item)

    }).then(response => response.json())
      .then(json => {
        if (json.serverStatus == 2) {
          inputId.value = json.insertId;
          dados.classList.remove('hidden');
          login.classList.add('hidden');
          btnNext.style.display = 'none';
          document.querySelector('input[name=nome]').focus();
        } else {
          swal("Oops!", `Ocorreu um erro ao cadastrar o usuário`, "error");
        }
      });
  }
}